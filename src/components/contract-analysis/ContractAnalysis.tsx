import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Info, Users, FileText, TrendingUp, Shield, Clock, Eye, Home } from 'lucide-react';
import { ContractAnalysis as ContractAnalysisType, ContractRisk } from '../../types/contract';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface ContractAnalysisProps {
  analysis: ContractAnalysisType;
  onRiskClick?: (risk: ContractRisk) => void;
  fileName?: string;
}

export const ContractAnalysis: React.FC<ContractAnalysisProps> = ({ analysis, onRiskClick, fileName }) => {
  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-50 border-red-200';
    if (score >= 60) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'critical': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'medium': return <Info className="w-4 h-4 text-yellow-600" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const riskCounts = analysis.risks.reduce((acc, risk) => {
    acc[risk.riskLevel] = (acc[risk.riskLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8 font-sans ">
      {/* Risk Score Card */}
      <div className="bg-card dark:bg-[#18181b] rounded-2xl shadow-lg border border-border p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
            <h3 className="text-lg font-bold text-foreground">Risk Score</h3>
          </div>
          <div className={`px-4 py-1 rounded-full text-sm font-bold border-2 border-[var(--primary)] text-[var(--primary)] bg-[var(--badge-bg)]`}>{analysis.overallRiskScore}/100</div>
        </div>
        <div className="w-full bg-muted rounded-full h-3 mb-4 border border-blue-500/30">
          <div
            className="h-3 rounded-full transition-all duration-1000 bg-blue-500"
            style={{
              width: `${Math.max(2, Math.min(analysis.overallRiskScore, 100))}%`,
              minWidth: analysis.overallRiskScore > 0 ? 8 : 0 // ensures a sliver is visible for very low nonzero scores
            }}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {analysis.overallRiskScore >= 80 ? 'High risk contract requiring immediate attention' :
           analysis.overallRiskScore >= 60 ? 'Moderate risk with several concerns' :
           analysis.overallRiskScore >= 40 ? 'Low to moderate risk level' : 'Low risk contract'}
        </p>
      </div>

      {/* Contract Info */}
      <div className="bg-card dark:bg-[#18181b] rounded-2xl shadow-md border border-border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="w-5 h-5 text-[var(--primary)]" />
          <h3 className="text-lg font-bold text-foreground">Contract Info</h3>
        </div>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-muted-foreground">Type</span>
            <p className="text-sm text-foreground font-medium">{analysis.contractType}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">Parties</span>
            <div className="mt-1">
              {analysis.parties.map((party, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="w-3 h-3 text-[var(--primary)]" />
                  <span>{party}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Breakdown */}
      <div className="bg-card dark:bg-[#18181b] rounded-2xl shadow-md border border-border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="w-5 h-5 text-[var(--primary)]" />
          <h3 className="text-lg font-bold text-foreground">Risk Breakdown</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/30 rounded-full border-2 border-red-200 dark:border-red-700 text-muted-foreground">
            <div className="text-lg font-bold text-red-600 dark:text-red-400">{riskCounts.critical || 0}</div>
            <div className="text-xs text-red-600 dark:text-red-400">Critical</div>
          </div>
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/30 rounded-full border-2 border-orange-200 dark:border-orange-700 text-muted-foreground">
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{riskCounts.high || 0}</div>
            <div className="text-xs text-orange-600 dark:text-orange-400">High</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-full border-2 border-yellow-200 dark:border-yellow-700 text-muted-foreground">
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{riskCounts.medium || 0}</div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400">Medium</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/30 rounded-full border-2 border-green-200 dark:border-green-700 text-muted-foreground">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">{riskCounts.low || 0}</div>
            <div className="text-xs text-green-600 dark:text-green-400">Low</div>
          </div>
        </div>
      </div>

      {/* Key Terms */}
      <div className="bg-card dark:bg-[#18181b] rounded-2xl shadow-md border border-border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-5 h-5 text-[var(--primary)]" />
          <h3 className="text-lg font-bold text-foreground">Key Terms</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {analysis.keyTerms.slice(0, 6).map((term, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[var(--badge-bg)] text-[var(--badge-text)] rounded-full text-xs font-medium border border-[var(--primary)]"
            >
              {term}
            </span>
          ))}
          {analysis.keyTerms.length > 6 && (
            <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium border border-border">
              +{analysis.keyTerms.length - 6} more
            </span>
          )}
        </div>
      </div>

      {/* All Identified Risks */}
      <div className="bg-card dark:bg-[#18181b] rounded-2xl shadow-lg border border-border p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 p-2 rounded-full"><Eye className="w-5 h-5 text-[var(--primary)]" /></span>
            <h3 className="text-lg font-bold text-foreground tracking-tight">Identified Risks</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground bg-[var(--badge-bg)] px-2 py-1 rounded-full shadow-sm">
              {analysis.risks.length} total
            </span>
          </div>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto flex flex-col items-center">
          {analysis.risks.map((risk) => (
            <div
              key={risk.id}
              className="flex items-start space-x-3 p-5 mb-2 bg-muted dark:bg-muted/40 rounded-xl cursor-pointer border-2 border-border hover:bg-card transition-colors hover:scale-[1.01] hover:shadow-2xl shadow-lg outline-none max-w-lg w-full"
              onClick={() => onRiskClick?.(risk)}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getRiskIcon(risk.riskLevel)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground truncate tracking-tight">{risk.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium bg-[var(--badge-bg)] text-[var(--badge-text)] border-[var(--primary)] shadow-sm`}>
                      {risk.riskLevel}
                    </span>
                    <span className="text-xs text-muted-foreground bg-card px-2 py-0.5 rounded border shadow-sm">
                      Page {risk.pageNumber}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2 tracking-normal">{risk.description}</p>
                <div className="text-xs text-muted-foreground bg-card p-2 rounded border italic shadow-sm">
                  "{risk.text}"
                </div>
              </div>
            </div>
          ))}
        </div>
        {analysis.risks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Shield className="w-12 h-12 mx-auto mb-3 text-muted" />
            <p className="text-sm">No risks identified in this contract</p>
          </div>
        )}
      </div>
      <div className="border-t border-[var(--primary)]/10" />
      {/* Export Data Button */}
      <div className="mt-6">
        <button
          onClick={() => {
            const data = analysis.risks.map(risk => ({
              'Risk': risk.category,
              'Severity': risk.riskLevel.charAt(0).toUpperCase() + risk.riskLevel.slice(1),
              'Reason': risk.description,
              'Recommendation': risk.recommendation,
            }));
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Risks');
            let exportName = 'contract_risks.xlsx';
            if (fileName) {
              const base = fileName.replace(/\.[^/.]+$/, "");
              exportName = `analyzed_${base}.xlsx`;
            }
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), exportName);
          }}
          className="w-full px-6 py-3 rounded-xl bg-[var(--primary)] text-white text-base font-semibold border border-[var(--primary)] hover:bg-[var(--primary-dark)] transition-all shadow-lg"
          title="Export Data as Excel"
        >
          Export Analyzed Data
        </button>
      </div>
    </div>
  );
};