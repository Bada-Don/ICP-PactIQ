import React, { useState } from "react";
import {
  Scale,
  Shield,
  Brain,
  MessageCircle,
  Upload,
  CheckCircle,
  BarChart3,
  FileText,
  Zap,
  Loader2,
  Home,
} from "lucide-react";
import { FileUpload } from "../components/contract-analysis/FileUpload";
import { PDFViewer } from "../components/contract-analysis/PDFViewer";
import { ContractAnalysis } from "../components/contract-analysis/ContractAnalysis";
import { ChatInterface } from "../components/contract-analysis/ChatInterface";
import { geminiService } from "../services/geminiService";
import {
  ContractAnalysis as ContractAnalysisType,
  ChatMessage,
  ContractRisk,
} from "../types/contract";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";
import { AppSidebar } from "../components/dashboard/app-sidebar";
import { SiteHeader } from "../components/dashboard/site-header";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../components/ui/resizable";

function ContractAnalysisPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ContractAnalysisType | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [contractText, setContractText] = useState("");
  const [analysisProgress, setAnalysisProgress] = useState("");

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsAnalyzing(true);
    setAnalysis(null);
    setMessages([]);
    setContractText("");

    try {
      // Step 1: Extract text from PDF
      setAnalysisProgress("Extracting text from PDF document...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const text = await geminiService.extractTextFromPDF(file);
      setContractText(text);

      // Step 2: Analyze contract with AI
      setAnalysisProgress(
        "Analyzing contract with AI for risks and insights..."
      );
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const contractAnalysis = await geminiService.analyzeContract(text);

      // Step 3: Finalize analysis
      setAnalysisProgress("Finalizing analysis and preparing insights...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAnalysis(contractAnalysis);

      // Add initial AI message
      const initialMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `I've completed the comprehensive analysis of your ${
          contractAnalysis.contractType
        }. I found ${contractAnalysis.risks.length} potential risk${
          contractAnalysis.risks.length !== 1 ? "s" : ""
        } with an overall risk score of ${
          contractAnalysis.overallRiskScore
        }/100. 

Key findings:
- Contract Type: ${contractAnalysis.contractType}
- Parties: ${contractAnalysis.parties.join(", ")}
- Risk Level: ${
          contractAnalysis.overallRiskScore >= 80
            ? "High Risk"
            : contractAnalysis.overallRiskScore >= 60
            ? "Moderate Risk"
            : contractAnalysis.overallRiskScore >= 40
            ? "Low-Moderate Risk"
            : "Low Risk"
        }

Feel free to ask me any questions about the contract terms, specific clauses, or the risks I've identified. I can explain any part of the contract in detail!`,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages([initialMessage]);
    } catch (error) {
      console.error("Error analyzing contract:", error);
      setAnalysisProgress("Error occurred during analysis");

      // Show error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        text: "I encountered an issue while analyzing your contract. This could be due to the PDF format or content complexity. Please try uploading the file again, or consult with a legal professional for manual review.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages([errorMessage]);
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress("");
    }
  };

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Add typing indicator
    const typingMessage: ChatMessage = {
      id: "typing",
      text: "Analyzing your question...",
      sender: "ai",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      const response = await geminiService.getChatResponse(
        message,
        contractText
      );

      // Remove typing indicator and add real response
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== "typing");
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: "ai",
          timestamp: new Date(),
        };
        return [...filtered, aiMessage];
      });
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Remove typing indicator and add error message
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== "typing");
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: "I apologize, but I'm having trouble processing your question right now. Please try again, and remember to consult with qualified legal professionals for official legal advice.",
          sender: "ai",
          timestamp: new Date(),
        };
        return [...filtered, errorMessage];
      });
    }
  };

  const handleRiskClick = (risk: ContractRisk) => {
    const riskMessage = `Tell me more about the ${risk.category} risk you identified: "${risk.text}"`;
    handleSendMessage(riskMessage);
  };

  return (
    <SidebarProvider className="h-screen overflow-hidden">
      <AppSidebar variant="inset" />
      <SidebarInset className="h-screen">
        <SiteHeader title="Contract Analysis" />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Upload State */}
          {!uploadedFile && (
            <div className="flex-1 flex items-center justify-center">
              <FileUpload
                onFileUpload={handleFileUpload}
                isUploading={isAnalyzing}
              />
            </div>
          )}

          {/* Loading State */}
          {isAnalyzing && (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <h3 className="text-3xl font-bold mb-4">
                Analyzing Your Contract
              </h3>
              <p className="text-lg text-muted-foreground mb-8 text-center max-w-md">
                Our AI is reviewing your document, identifying risks, and
                preparing insights.
              </p>

              <div className="bg-card rounded-xl p-6 shadow-lg border max-w-md w-full">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    {analysisProgress}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full animate-pulse w-3/5"></div>
                </div>
              </div>

              <div className="mt-8 flex gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Text Extraction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  <span>AI Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Risk Assessment</span>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Results - Using ResizablePanelGroup for better control */}
          {uploadedFile && !isAnalyzing && analysis && (
            <div className="flex-1 overflow-hidden">
              <ResizablePanelGroup direction="horizontal" className="h-full">
                {/* Analysis Sidebar - Hidden on mobile */}
                <ResizablePanel
                  defaultSize={25}
                  minSize={20}
                  maxSize={35}
                  className="hidden lg:block"
                >
                  <div className="h-full bg-card border-r flex flex-col">
                    <div className="p-4 border-b">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h2 className="font-semibold">Analysis Complete</h2>
                      </div>
                    </div>
                    <div className="flex-1 overflow-auto p-4">
                      <ContractAnalysis
                        analysis={analysis}
                        onRiskClick={handleRiskClick}
                        fileName={uploadedFile.name}
                      />
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle className="hidden lg:flex" />

                {/* Main Content Area */}
                <ResizablePanel defaultSize={75}>
                  <ResizablePanelGroup direction="horizontal">
                    {/* PDF Viewer */}
                    <ResizablePanel defaultSize={65} minSize={40}>
                      <div className="h-full flex flex-col bg-muted/20">
                        {/* PDF Header */}
                        <div className="flex items-center justify-between p-4 bg-card border-b">
                          <div className="flex items-center gap-3 min-w-0">
                            <h3 className="font-medium truncate">
                              {uploadedFile.name}
                            </h3>
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-medium flex-shrink-0">
                              Analyzed
                            </span>
                          </div>
                        </div>

                        {/* PDF Content */}
                        <div className="flex-1 overflow-hidden">
                          <PDFViewer
                            file={uploadedFile}
                            risks={analysis.risks}
                            onRiskClick={handleRiskClick}
                          />
                        </div>
                      </div>
                    </ResizablePanel>

                    <ResizableHandle />

                    {/* Chat Panel */}
                    <ResizablePanel defaultSize={35} minSize={30} maxSize={50}>
                      <div className="h-full bg-card border-l">
                        <ChatInterface
                          isAnalyzing={false}
                          onSendMessage={handleSendMessage}
                          messages={messages}
                        />
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ContractAnalysisPage;
