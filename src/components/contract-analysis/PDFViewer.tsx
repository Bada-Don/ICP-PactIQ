import React, { useState, useRef, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, RotateCw, Maximize2, AlertTriangle, XCircle, Info, CheckCircle, FileText } from 'lucide-react';
import { ContractRisk } from '../../types/contract';

interface PDFViewerProps {
  file: File;
  risks: ContractRisk[];
  onRiskClick: (risk: ContractRisk) => void;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ file, risks, onRiskClick }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(0.6);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [pageHeight, setPageHeight] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);
  const [tooltipHeights, setTooltipHeights] = useState<Record<string, number>>({});

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onPageLoadSuccess = async (page: any) => {
    const viewport = page.getViewport({ scale: 1.0 });
    setPageWidth(viewport.width);
    setPageHeight(viewport.height);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-500 border-red-600 text-red-600';
      case 'high': return 'bg-orange-500 border-orange-600 text-orange-600';
      case 'medium': return 'bg-yellow-500 border-yellow-600 text-yellow-600';
      case 'low': return 'bg-green-500 border-green-600 text-green-600';
      default: return 'bg-blue-500 border-blue-600 text-blue-600';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return <XCircle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Info className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const pageRisks = risks.filter(risk => risk.pageNumber === pageNumber);
  const scaledWidth = pageWidth * scale;
  const scaledHeight = pageHeight * scale;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      documentRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Effect to measure tooltip heights and adjust positioning
  useEffect(() => {
    const measureTooltips = () => {
      const newHeights: Record<string, number> = {};
      pageRisks.forEach(risk => {
        const tooltipElement = document.getElementById(`main-tooltip-${risk.id}`);
        if (tooltipElement) {
          newHeights[risk.id] = tooltipElement.offsetHeight;
        }
      });
      setTooltipHeights(newHeights);
    };

    // Measure after a short delay to ensure tooltips are rendered
    const timer = setTimeout(measureTooltips, 100);
    return () => clearTimeout(timer);
  }, [pageRisks, scale]);

  // Generate positions for risk indicators in a grid pattern
  const getRiskIndicatorPosition = (index: number, total: number) => {
    const margin = 20;
    const indicatorSize = 40;
    const spacing = 50;
    
    // Calculate grid dimensions
    const maxPerRow = Math.floor((scaledWidth - margin * 2) / spacing);
    const rows = Math.ceil(total / maxPerRow);
    const cols = Math.min(total, maxPerRow);
    
    const row = Math.floor(index / maxPerRow);
    const col = index % maxPerRow;
    
    // Center the grid
    const totalWidth = cols * spacing;
    const startX = (scaledWidth - totalWidth) / 2;
    
    return {
      x: startX + (col * spacing) + margin,
      y: margin + (row * spacing),
      size: indicatorSize
    };
  };

  return (
    <div ref={documentRef} className="h-full flex flex-col bg-[var(--badge-bg)] dark:bg-background font-sans">
      {/* Enhanced PDF Controls */}
      <div className="backdrop-blur-md bg-card/70 dark:bg-card/80 px-8 py-4 border-b border-border flex-shrink-0 shadow-[0_2px_16px_0_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Page Navigation */}
            <div className="flex items-center gap-2 bg-card/60 dark:bg-card/70 backdrop-blur-md rounded-xl border border-[var(--primary)]/30 shadow-sm p-1">
              <button
                onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                disabled={pageNumber <= 1}
                className="p-2 rounded-lg hover:bg-[var(--primary)]/10 focus:bg-[var(--primary)]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-transparent focus:border-[var(--primary)] shadow-sm"
              >
                <ChevronLeft className="w-4 h-4 text-[var(--primary)]" />
              </button>
              <div className="px-4 py-1 text-base font-semibold text-[var(--primary)] min-w-[80px] text-center bg-card/80 dark:bg-card/90 rounded-lg border border-[var(--primary)]/20 shadow-inner">
                {pageNumber} / {numPages}
              </div>
              <button
                onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                disabled={pageNumber >= numPages}
                className="p-2 rounded-lg hover:bg-[var(--primary)]/10 focus:bg-[var(--primary)]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-transparent focus:border-[var(--primary)] shadow-sm"
              >
                <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
              </button>
            </div>
            {/* Risk Indicator */}
            {pageRisks.length > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50/80 border border-red-200/60 rounded-xl shadow-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-base font-semibold text-red-700">
                  {pageRisks.length} risk{pageRisks.length !== 1 ? 's' : ''} on this page
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-card/60 dark:bg-card/70 backdrop-blur-md rounded-xl border border-[var(--primary)]/30 shadow-sm p-1">
              <button
                onClick={() => setScale(Math.max(0.5, scale - 0.2))}
                className="p-2 rounded-lg hover:bg-[var(--primary)]/10 focus:bg-[var(--primary)]/20 transition-all border border-transparent focus:border-[var(--primary)] shadow-sm"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4 text-[var(--primary)]" />
              </button>
              <div className="px-4 py-1 text-base font-semibold text-[var(--primary)] min-w-[60px] text-center bg-card/80 dark:bg-card/90 rounded-lg border border-[var(--primary)]/20 shadow-inner">
                {Math.round(scale * 100)}%
              </div>
              <button
                onClick={() => setScale(Math.min(3, scale + 0.2))}
                className="p-2 rounded-lg hover:bg-[var(--primary)]/10 focus:bg-[var(--primary)]/20 transition-all border border-transparent focus:border-[var(--primary)] shadow-sm"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4 text-[var(--primary)]" />
              </button>
            </div>
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setScale(0.6)}
                className="px-4 py-2 text-base bg-card/60 dark:bg-card/70 backdrop-blur-md border border-[var(--primary)]/30 hover:bg-[var(--primary)]/10 focus:bg-[var(--primary)]/20 rounded-xl transition-all font-semibold text-[var(--primary)] shadow-sm"
                title="Reset Zoom"
              >
                60%
              </button>
              <button 
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-card/60 dark:bg-card/70 backdrop-blur-md border border-[var(--primary)]/30 hover:bg-[var(--primary)]/10 focus:bg-[var(--primary)]/20 transition-all shadow-sm"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4 text-[var(--primary)]" />
              </button>
              <button 
                className="p-2 rounded-lg bg-card/60 dark:bg-card/70 backdrop-blur-md border border-[var(--primary)]/30 hover:bg-[var(--primary)]/10 focus:bg-[var(--primary)]/20 transition-all shadow-sm"
                title="Download"
              >
                <Download className="w-4 h-4 text-[var(--primary)]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* PDF Content with Risk Indicators */}
      <div 
        ref={containerRef}
        className="flex-1 bg-muted dark:bg-muted/40 p-6 min-h-0 min-w-0 overflow-hidden flex justify-center items-center max-h-[70vh] overflow-y-auto"
      >
        <div className="flex justify-center">
          <div className="relative shadow-2xl rounded-2xl overflow-hidden bg-card dark:bg-card">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex items-center justify-center h-96 bg-card rounded-2xl">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading document...</p>
                  </div>
                </div>
              }
              error={
                <div className="flex items-center justify-center h-96 bg-card rounded-2xl">
                  <div className="text-center">
                    <p className="text-destructive mb-2">Error loading PDF</p>
                    <p className="text-muted-foreground text-sm">Please try uploading the file again</p>
                  </div>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                className="shadow-lg"
                onLoadSuccess={onPageLoadSuccess}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
              {/* Risk Indicators Overlay - CORRECTED */}
              {scaledWidth > 0 && scaledHeight > 0 && pageRisks.length > 0 && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    width: `${scaledWidth}px`,
                    height: `${scaledHeight}px`,
                  }}
                >
                  {pageRisks.map((risk, index) => {
                    const position = getRiskIndicatorPosition(index, pageRisks.length);
                    const colorClasses = getRiskColor(risk.riskLevel);
                    // Get container dimensions for boundary detection
                    const container = containerRef.current;
                    const containerRect = container?.getBoundingClientRect();
                    const containerScrollLeft = container?.scrollLeft || 0;
                    const containerScrollTop = container?.scrollTop || 0;
                    const containerViewportWidth = container?.clientWidth || scaledWidth;
                    const containerViewportHeight = container?.clientHeight || scaledHeight;
                    const tooltipWidth = 450;
                    const tooltipMargin = 20;
                    // Use actual container dimensions for boundary detection
                    const effectiveContainerWidth = containerViewportWidth;
                    const effectiveContainerHeight = containerViewportHeight;
                    // Horizontal positioning with edge detection
                    let tooltipLeft = position.x - (tooltipWidth / 2);
                    // Ensure tooltip stays within viewport bounds
                    const minLeft = tooltipMargin;
                    const maxLeft = scaledWidth - tooltipWidth - tooltipMargin;
                    if (tooltipLeft < minLeft) {
                      tooltipLeft = minLeft;
                    } else if (tooltipLeft > maxLeft) {
                      tooltipLeft = maxLeft;
                    }
                    // Calculate arrow position relative to tooltip
                    const arrowLeft = (position.x + (position.size / 2)) - tooltipLeft;
                    // Vertical positioning
                    const mainTooltipHeight = 120;
                    let mainTooltipTop = position.y + position.size + 15;
                    // Check if tooltip would go off the bottom
                    if (mainTooltipTop + mainTooltipHeight > scaledHeight - tooltipMargin) {
                      mainTooltipTop = position.y - mainTooltipHeight - 15;
                    }
                    // White tooltip positioning
                    const blackTooltipHeight = tooltipHeights[risk.id] || 120;
                    const whiteTooltipHeight = 60;
                    let whiteTooltipTop = mainTooltipTop + blackTooltipHeight + 20;
                    // Check bounds for white tooltip
                    if (whiteTooltipTop + whiteTooltipHeight > scaledHeight - tooltipMargin) {
                      whiteTooltipTop = mainTooltipTop - whiteTooltipHeight - 20;
                    }
                    // Determine arrow directions
                    const isMainTooltipAbove = mainTooltipTop < position.y;
                    const isWhiteTooltipAbove = whiteTooltipTop < mainTooltipTop;
                    return (
                      <div key={risk.id} className="absolute pointer-events-auto group">
                        {/* Main Risk Indicator */}
                        <div
                          className={`absolute rounded-full border-3 shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl z-20 ${colorClasses.split(' ')[0]} border-white`}
                          style={{
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                            width: `${position.size}px`,
                            height: `${position.size}px`,
                          }}
                          onClick={() => onRiskClick(risk)}
                          title={`${risk.category}: Click for details`}
                        >
                          {/* Icon */}
                          <div className="absolute inset-0 flex items-center justify-center text-white">
                            {getRiskIcon(risk.riskLevel)}
                          </div>
                          {/* Pulsing ring */}
                          <div className={`absolute inset-0 rounded-full animate-ping ${colorClasses.split(' ')[0]} opacity-75`}></div>
                          {/* Risk number badge */}
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-bold text-gray-700 shadow-sm">
                            {index + 1}
                          </div>
                        </div>
                        {/* Hover Tooltip */}
                        <div 
                          className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 pointer-events-none"
                          id={`tooltip-${risk.id}`}
                          style={{
                            left: `${tooltipLeft}px`,
                            top: `${mainTooltipTop}px`,
                            width: `${tooltipWidth}px`
                          }}
                        >
                          <div className="bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg px-4 py-3 shadow-2xl border border-gray-700 relative" id={`main-tooltip-${risk.id}`}>
                            <div className="font-semibold mb-2 text-yellow-300 dark:text-yellow-200">{risk.category}</div>
                            <div className="text-gray-300 dark:text-gray-200 mb-2 leading-relaxed">{risk.description}</div>
                            <div className="text-xs text-gray-400 dark:text-gray-300 border-t border-gray-700 pt-2 mt-2">
                              <div className="flex items-center justify-between">
                                <span>Risk Level: <span className="capitalize font-medium text-white">{risk.riskLevel}</span></span>
                                <span className="text-blue-300 dark:text-blue-200">Click for details</span>
                              </div>
                            </div>
                            {/* Tooltip arrow */}
                            {isMainTooltipAbove ? (
                              <div 
                                className="absolute -bottom-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"
                                style={{ left: `${Math.max(8, Math.min(arrowLeft - 4, tooltipWidth - 16))}px` }}
                              ></div>
                            ) : (
                              <div 
                                className="absolute -top-2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"
                                style={{ left: `${Math.max(8, Math.min(arrowLeft - 4, tooltipWidth - 16))}px` }}
                              ></div>
                            )}
                          </div>
                        </div>
                        {/* Risk Text Preview */}
                        <div 
                          className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-40 pointer-events-none"
                          id={`text-preview-${risk.id}`}
                          style={{
                            left: `${tooltipLeft}px`,
                            top: `${whiteTooltipTop}px`,
                            width: `${tooltipWidth}px`
                          }}
                        >
                          <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl text-xs relative">
                            <div className="font-medium text-foreground mb-1">Risky Text:</div>
                            <div className="text-muted-foreground italic leading-relaxed">"{risk.text}"</div>
                            {/* White tooltip arrow */}
                            {isWhiteTooltipAbove ? (
                              <>
                                <div 
                                  className="absolute -bottom-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"
                                  style={{ left: `${Math.max(8, Math.min(arrowLeft - 4, tooltipWidth - 16))}px` }}
                                ></div>
                                <div 
                                  className="absolute -bottom-2.5 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-300"
                                  style={{ left: `${Math.max(8, Math.min(arrowLeft - 4, tooltipWidth - 16))}px` }}
                                ></div>
                              </>
                            ) : (
                              <>
                                <div 
                                  className="absolute -top-2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white"
                                  style={{ left: `${Math.max(8, Math.min(arrowLeft - 4, tooltipWidth - 16))}px` }}
                                ></div>
                                <div 
                                  className="absolute -top-2.5 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-300"
                                  style={{ left: `${Math.max(8, Math.min(arrowLeft - 4, tooltipWidth - 16))}px` }}
                                ></div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            {/* Page Info Overlay */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white text-xs px-3 py-2 rounded-lg z-10">
              Page {pageNumber} of {numPages}
              {pageRisks.length > 0 && (
                <span className="ml-2 text-red-300">• {pageRisks.length} risk{pageRisks.length !== 1 ? 's' : ''}</span>
              )}
            </div>
          </Document>
          </div>
        </div>
      </div>

      {/* Enhanced Risk Legend - Redesigned Footer */}
      <footer className="bg-card/90 dark:bg-card/95 backdrop-blur-md px-8 py-3 border-t border-border shadow-[0_-2px_16px_0_rgba(0,0,0,0.04)] flex-shrink-0">
        <div className="flex items-center justify-between gap-6 flex-wrap w-full">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground dark:text-muted-foreground mr-2">Risk Types:</span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold border border-red-200"><XCircle className="w-3 h-3 mr-1" />Critical</span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold border border-orange-200"><AlertTriangle className="w-3 h-3 mr-1" />High</span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold border border-yellow-200"><Info className="w-3 h-3 mr-1" />Medium</span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold border border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Low</span>
          </div>
          <span className="text-xs text-muted-foreground dark:text-muted-foreground ml-2">Hover for details • Click to discuss with AI</span>
        </div>
      </footer>
    </div>
  );
};