import { ContractAnalysis, ContractRisk } from '../types/contract';
import { pdfjs } from 'react-pdf';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min?url';
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

class GeminiService {
  private apiKey: string;
  private baseUrl: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  getApiKey(): string {
    return this.apiKey;
  }
  

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async extractTextFromPDF(file: File): Promise<string> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Extract text with better structure preservation
        const pageText = textContent.items
          .map((item: any) => {
            // Preserve line breaks and spacing
            if (item.str.trim() === '') return '\n';
            return item.str;
          })
          .join(' ')
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
        
        fullText += `\n=== PAGE ${pageNum} START ===\n${pageText}\n=== PAGE ${pageNum} END ===\n`;
      }

      return fullText.trim();
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF');
    }
  }

  private async callGeminiAPI(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to get response from Gemini API');
    }
  }

  async analyzeContract(text: string): Promise<ContractAnalysis> {
    const analysisPrompt = `
Analyze the following contract text and provide a comprehensive analysis in JSON format. The response must be valid JSON that can be parsed directly.

Contract Text:
${text}

Please provide the analysis in this exact JSON structure:
{
  "contractType": "string - type of contract (e.g., Employment Agreement, Service Contract, etc.)",
  "parties": ["array of strings - names of parties involved"],
  "keyTerms": ["array of strings - important terms and clauses"],
  "risks": [
    {
      "id": "string - unique identifier",
      "text": "string - exact text from contract that poses risk (quote 10-30 words from the actual problematic clause)",
      "riskLevel": "string - one of: low, medium, high, critical",
      "category": "string - category of risk (e.g., Termination, Payment Terms, Liability, Non-Compete, Confidentiality, etc.)",
      "description": "string - detailed description of why this specific text is risky",
      "recommendation": "string - specific recommendation to address this risk",
      "pageNumber": number - page number where this text appears (look for PAGE X START/END markers),
      "searchText": "string - 5-10 key words from the risky clause to help locate it on the page"
    }
  ],
  "overallRiskScore": number - overall risk score from 0-100,
  "summary": "string - comprehensive summary of the contract",
  "recommendations": ["array of strings - general recommendations for the contract"]
}

CRITICAL INSTRUCTIONS:
1. For each risk, quote EXACTLY 10-30 words from the problematic clause in the "text" field
2. Add a "searchText" field with 5-10 key words that can help locate the clause on the page
3. Determine the correct page number by looking for "=== PAGE X START ===" and "=== PAGE X END ===" markers
4. Only identify REAL risks based on actual problematic clauses in the contract
5. Be specific about why each clause is risky
6. Provide actionable recommendations
7. Risk levels should accurately reflect the severity:
   - critical: Could cause significant financial loss or legal issues
   - high: Unfavorable terms that should be negotiated
   - medium: Terms that could be improved but aren't deal-breakers
   - low: Minor concerns or standard clauses with slight issues

Respond ONLY with valid JSON, no additional text or formatting.
`;

    try {
      const response = await this.callGeminiAPI(analysisPrompt);
      
      // Extract JSON from the response
      let cleanedResponse = response.trim();
      
      // Remove markdown code block wrappers if present
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.replace(/```json\n?/, '').replace(/\n?```$/, '');
      }
      if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.replace(/```\n?/, '').replace(/\n?```$/, '');
      }

      // If the response doesn't start with { or [, try to find the JSON object
      if (!cleanedResponse.startsWith('{') && !cleanedResponse.startsWith('[')) {
        const jsonStart = cleanedResponse.indexOf('{');
        const jsonEnd = cleanedResponse.lastIndexOf('}');
        
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
          cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1);
        }
      }

      const analysis = JSON.parse(cleanedResponse);
      
      // Validate and ensure required fields exist
      if (!analysis.contractType) analysis.contractType = 'Unknown Contract Type';
      if (!Array.isArray(analysis.parties)) analysis.parties = ['Unknown Parties'];
      if (!Array.isArray(analysis.keyTerms)) analysis.keyTerms = [];
      if (!Array.isArray(analysis.risks)) analysis.risks = [];
      if (typeof analysis.overallRiskScore !== 'number') analysis.overallRiskScore = 50;
      if (!analysis.summary) analysis.summary = 'Contract analysis completed.';
      if (!Array.isArray(analysis.recommendations)) analysis.recommendations = [];

      // Ensure each risk has required fields
      analysis.risks = analysis.risks.map((risk: any, index: number) => ({
        id: risk.id || `risk-${index + 1}`,
        text: risk.text || 'Risk identified in contract text',
        riskLevel: ['low', 'medium', 'high', 'critical'].includes(risk.riskLevel) ? risk.riskLevel : 'medium',
        category: risk.category || 'General Risk',
        description: risk.description || 'This clause requires attention and review',
        recommendation: risk.recommendation || 'Review with legal counsel and consider negotiation',
        pageNumber: typeof risk.pageNumber === 'number' && risk.pageNumber > 0 ? risk.pageNumber : 1,
        searchText: risk.searchText || risk.text?.split(' ').slice(0, 5).join(' ') || 'contract clause'
      }));

      return analysis;
    } catch (error) {
      console.error('Error parsing contract analysis:', error);
      
      // Fallback analysis if parsing fails
      return {
        contractType: 'Contract Analysis',
        parties: ['Analysis in progress'],
        keyTerms: ['Contract terms identified'],
        risks: [{
          id: 'analysis-error',
          text: 'Contract analysis encountered an issue during processing',
          riskLevel: 'medium' as const,
          category: 'Analysis Error',
          description: 'The contract analysis could not be completed fully. This may be due to complex formatting or unclear text extraction.',
          recommendation: 'Try re-uploading the contract or consult with a legal professional for manual review',
          pageNumber: 1,
          searchText: 'analysis error'
        }],
        overallRiskScore: 50,
        summary: 'Contract analysis is in progress. Some features may not be fully available.',
        recommendations: ['Consult with a legal professional for comprehensive review', 'Consider re-uploading if analysis seems incomplete']
      };
    }
  }

  async getChatResponse(message: string, contractContext: string): Promise<string> {
    const chatPrompt = `
You are a legal AI assistant helping users understand their contracts. You have access to the following contract text:

${contractContext}

User question: ${message}

Please provide a helpful, informative response about the contract. Be specific and reference actual content from the contract when possible. If the question is about a specific clause or risk, explain it clearly and provide practical advice.

Guidelines:
- Quote specific clauses when relevant
- Explain legal implications in plain language
- Provide actionable recommendations
- Be conversational but professional
- Always remind users to consult with qualified legal professionals for official legal advice

Keep your response conversational but professional, and always remind users to consult with qualified legal professionals for official legal advice.
`;

    try {
      const response = await this.callGeminiAPI(chatPrompt);
      return response;
    } catch (error) {
      console.error('Error getting chat response:', error);
      return "I apologize, but I'm having trouble processing your question right now. Please try again, and remember to consult with qualified legal professionals for official legal advice.";
    }
  }
}

export const geminiService = new GeminiService();