import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, MessageCircle, Bot, User, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import { ChatMessage } from '../../types/contract';

interface ChatInterfaceProps {
  isAnalyzing: boolean;
  onSendMessage: (message: string) => void;
  messages: ChatMessage[];
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  isAnalyzing, 
  onSendMessage, 
  messages 
}) => {
  const [input, setInput] = useState('');
  const [maximized, setMaximized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, maximized]);

  const handleSend = () => {
    if (input.trim() && !isAnalyzing) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "What are the main risks in this contract?",
    "Explain the termination clause",
    "Are there any unusual terms?",
    "What should I negotiate?"
  ];

  const chatBox = (
    <div className="h-full bg-card dark:bg-[#18181b] flex flex-col font-sans">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 flex-shrink-0 bg-card flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-[var(--badge-bg)] p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-[var(--primary)]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">AI Legal Assistant</h3>
            <p className="text-[var(--primary)] text-xs font-medium">Ask me anything about your contract</p>
          </div>
        </div>
        <button
          onClick={() => setMaximized(m => !m)}
          className="p-2 rounded-full hover:bg-muted transition-all ml-2"
          title={maximized ? 'Restore Chat' : 'Maximize Chat'}
        >
          {maximized ? <Minimize2 className="w-5 h-5 text-muted-foreground" /> : <Maximize2 className="w-5 h-5 text-muted-foreground" />}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted max-h-[70vh]">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="bg-card dark:bg-[#18181b] p-4 rounded-xl mb-4 shadow-sm">
              <Bot className="w-12 h-12 mx-auto mb-3 text-[var(--primary)]" />
              <p className="text-foreground font-semibold mb-2">Ready to help with your contract!</p>
              <p className="text-sm text-muted-foreground">Upload a contract to start the analysis, or ask me any legal questions.</p>
            </div>
            {/* Suggested Questions */}
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="px-4 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] text-xs font-semibold border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-5 py-3 rounded-2xl shadow-sm ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-3xl' // Changed from bg-[var(--primary)] to bg-blue-600
                  : 'bg-card dark:bg-[#18181b] text-foreground rounded-bl-3xl border border-border'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <div className={`p-1 rounded-full ${
                  message.sender === 'user' ? 'bg-white/20' : 'bg-[var(--badge-bg)]'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-3 h-3 text-white" />
                  ) : (
                    <Bot className="w-3 h-3 text-[var(--primary)]" />
                  )}
                </div>
                <span className={`text-xs ${
                  message.sender === 'user' ? 'text-white/80' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.sender === 'ai' ? (
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <h1 {...props} className="text-xl font-bold mt-4 mb-2" />,
                      h2: ({node, ...props}) => <h2 {...props} className="text-lg font-bold mt-4 mb-2" />,
                      h3: ({node, ...props}) => <h3 {...props} className="text-base font-bold mt-4 mb-2" />,
                      h4: ({node, ...props}) => <h4 {...props} className="text-base font-semibold mt-4 mb-2" />,
                      h5: ({node, ...props}) => <h5 {...props} className="text-base font-medium mt-4 mb-2" />,
                      h6: ({node, ...props}) => <h6 {...props} className="text-base font-medium mt-4 mb-2" />,
                      p: ({node, ...props}) => <p {...props} className="mb-1 last:mb-0" />,
                      code: (props) =>
                        props.inline ? (
                          <code {...props} className="bg-muted rounded px-1 py-0.5 text-[var(--primary)] font-mono text-xs" >{props.children}</code>
                        ) : (
                          <pre className="bg-gray-900 text-white rounded-lg p-3 overflow-x-auto my-1 text-xs"><code {...props}>{props.children}</code></pre>
                        ),
                      ul: ({node, ...props}) => <ul {...props} className="list-disc ml-6 mb-1 last:mb-0" />,
                      ol: ({node, ...props}) => <ol {...props} className="list-decimal ml-6 mb-1 last:mb-0" />,
                      li: ({node, ...props}) => {
                        // If the only child is a heading, break it out of the list
                        const childrenArr = React.Children.toArray(props.children);
                        if (childrenArr.length === 1 && React.isValidElement(childrenArr[0])) {
                          const type = childrenArr[0].type;
                          if (type === 'h1' || type === 'h2' || type === 'h3' || type === 'h4' || type === 'h5' || type === 'h6') {
                            return <>{childrenArr[0]}</>;
                          }
                        }
                        return <li {...props} className="mb-0.5 last:mb-0" />;
                      },
                      blockquote: ({node, ...props}) => <blockquote {...props} className="border-l-4 border-[var(--primary)] pl-4 italic text-muted-foreground my-1 last:mb-0" />,
                      a: ({node, ...props}) => <a {...props} className="text-[var(--primary)] underline" target="_blank" rel="noopener noreferrer" />,
                      strong: ({node, ...props}) => <strong {...props} className="font-semibold" />,
                      em: ({node, ...props}) => <em {...props} className="italic" />,
                    }}
                  >
                    {message.text
                      .replace(/^[ \t\n]+|[ \t\n]+$/g, '') // Trim all leading/trailing whitespace and blank lines
                      .replace(/\n{2,}/g, '\n') // Collapse multiple blank lines to a single blank line
                      .replace(/[ \t]+\n/g, '\n') // Remove trailing spaces before newlines
                      .replace(/\n[ \t]+/g, '\n') // Remove leading spaces after newlines
                    }
                  </ReactMarkdown>
                ) : (
                  message.text
                )}
              </p>
            </div>
          </div>
        ))}
        {isAnalyzing && (
          <div className="flex justify-start">
            <div className="bg-card dark:bg-[#18181b] text-foreground px-5 py-3 rounded-2xl shadow-sm max-w-[85%] border border-border">
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-[var(--badge-bg)] rounded-full">
                  <Bot className="w-3 h-3 text-[var(--primary)]" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border flex-shrink-0 bg-card">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your contract..."
              className="w-full px-5 py-3 pr-14 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none text-base shadow-sm bg-background text-foreground"
              disabled={isAnalyzing}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isAnalyzing}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[var(--primary)] text-white rounded-full hover:bg-[var(--primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          AI responses are for informational purposes. Consult legal professionals for advice.
        </p>
      </div>
    </div>
  );

  if (maximized) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: 'rgba(0,0,0,0.18)'}}>
        <div style={{ width: '100%', height: '100%', maxWidth: '900px', maxHeight: '90vh', position: 'relative' }}>
          <div className="rounded-2xl shadow-2xl w-full h-full dark:bg-[#18181b] bg-white flex flex-col" style={{ position: 'absolute', inset: 0, zIndex: 10, overflow: 'hidden' }}>
            {chatBox}
          </div>
        </div>
      </div>
    );
  }
  return chatBox;
};