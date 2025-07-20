export interface ContractRisk {
  id: string;
  text: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  description: string;
  recommendation: string;
  pageNumber: number;
  searchText: string;
}

export interface ContractAnalysis {
  contractType: string;
  parties: string[];
  keyTerms: string[];
  risks: ContractRisk[];
  overallRiskScore: number;
  summary: string;
  recommendations: string[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}