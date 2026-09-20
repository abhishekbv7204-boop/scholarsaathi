import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { ScholarshipMatch, StudentProfile } from '../types';
import {
  AssistantMessage,
  DEFAULT_SUGGESTED_QUESTIONS,
  askScholarSaathiAssistant,
} from '../services/assistantService';
import { useLanguage } from '../context/LanguageContext';

interface ScholarSaathiAssistantProps {
  matches: ScholarshipMatch[];
  student: StudentProfile | null;
  activeScholarshipId?: string;
  onSelectScholarship?: (id: string) => void;
}

const DEFAULT_SUGGESTED_QUESTIONS_KN = [
  'ನನಗೆ ಈ ಫಲಿತಾಂಶ ಏಕೆ ಬಂದಿದೆ?',
  'ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?',
  'ಈ ವಿದ್ಯಾರ್ಥಿವೇತನವನ್ನು ವಿವರಿಸಿ',
  'ನಾನು ಏನನ್ನು ಪರಿಶೀಲಿಸಬೇಕು?',
  'ಕುಟುಂಬದ ಆದಾಯ ಮಿತಿ ಎಂದರೇನು?',
  'ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮೊದಲು ಏನನ್ನು ಪರಿಶೀಲಿಸಬೇಕು?',
];

export const ScholarSaathiAssistant: React.FC<ScholarSaathiAssistantProps> = ({
  matches,
  student,
  activeScholarshipId,
  onSelectScholarship,
}) => {
  const { language, t } = useLanguage();

  const [selectedId, setSelectedId] = useState<string>(() => {
    if (activeScholarshipId && matches.some((m) => m.scholarship.id === activeScholarshipId)) {
      return activeScholarshipId;
    }
    return matches[0]?.scholarship.id || '';
  });

  useEffect(() => {
    if (activeScholarshipId && matches.some((m) => m.scholarship.id === activeScholarshipId)) {
      setSelectedId(activeScholarshipId);
    }
  }, [activeScholarshipId, matches]);

  const activeMatch = matches.find((m) => m.scholarship.id === selectedId) || matches[0] || null;

  const getInitialMessage = (): AssistantMessage => ({
    id: 'msg-init',
    sender: 'assistant',
    text:
      language === 'kn'
        ? 'ನಮಸ್ಕಾರ! ನಾನು **ಸ್ಕಾಲರ್‌ಸಾಥಿ ಎಐ ಸಹಾಯಕ**.\n\n' +
          'ಪರಿಶೀಲಿಸಿದ ನಿಯಮಗಳು ಮತ್ತು ನಿಮ್ಮ ಅರ್ಹತಾ ಎಂಜಿನ್ ಮೌಲ್ಯಮಾಪನಗಳ ಆಧಾರದ ಮೇಲೆ ನಾನು ಸರಳ ವಿವರಣೆಗಳನ್ನು ಒದಗಿಸುತ್ತೇನೆ.\n\n' +
          '• ಅರ್ಹತಾ ಎಂಜಿನ್ ಏಕೈಕ ಅಧಿಕೃತ ಮೂಲವಾಗಿದೆ — ನಾನು ಎಂದಿಗೂ ಅರ್ಹತೆಯನ್ನು ಊಹಿಸುವುದಿಲ್ಲ.\n' +
          '• ಕೆಳಗಿನ ತ್ವರಿತ ಪ್ರಶ್ನೆಯನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ ಅಥವಾ ಸರಳವಾಗಿ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ.'
        : 'Namaste! I am the **ScholarSaathi AI Assistant**.\n\n' +
          'I provide simple, student-friendly explanations based **strictly on verified scholarship rules and your deterministic eligibility engine evaluations**.\n\n' +
          '• The eligibility engine is the single source of truth — I never guess or recalculate your eligibility.\n' +
          '• Click any quick question below or ask in plain English or Kannada.',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestedQuestions: language === 'kn' ? DEFAULT_SUGGESTED_QUESTIONS_KN : DEFAULT_SUGGESTED_QUESTIONS,
  });

  const [messages, setMessages] = useState<AssistantMessage[]>([getInitialMessage()]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleScholarshipChange = (newId: string) => {
    setSelectedId(newId);
    if (onSelectScholarship) {
      onSelectScholarship(newId);
    }
    const match = matches.find((m) => m.scholarship.id === newId);
    if (match) {
      const noticeMessage: AssistantMessage = {
        id: `notice-${Date.now()}`,
        sender: 'assistant',
        text:
          language === 'kn'
            ? `ಸಕ್ರಿಯ ವಿಷಯವನ್ನು **${match.scholarship.name}** (ಸ್ಥಿತಿ: **${match.status}**) ಗೆ ಬದಲಾಯಿಸಲಾಗಿದೆ.\nಈ ವಿದ್ಯಾರ್ಥಿವೇತನ ಅಥವಾ ಅದರ ಅಗತ್ಯತೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?`
            : `Switched context to **${match.scholarship.name}** (Status: **${match.status}**).\nHow can I help you understand this scholarship or its requirements?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: language === 'kn' ? DEFAULT_SUGGESTED_QUESTIONS_KN : DEFAULT_SUGGESTED_QUESTIONS,
      };
      setMessages((prev) => [...prev, noticeMessage]);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMessage: AssistantMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    try {
      const responseText = await askScholarSaathiAssistant({
        question: query,
        studentProfile: student,
        scholarship: activeMatch?.scholarship || null,
        eligibilityResult: activeMatch || null,
      });

      const assistantMessage: AssistantMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: language === 'kn' ? DEFAULT_SUGGESTED_QUESTIONS_KN : DEFAULT_SUGGESTED_QUESTIONS,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: AssistantMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text:
          language === 'kn'
            ? 'ಸಹಾಯಕ ತಾತ್ಕಾಲಿಕವಾಗಿ ಲಭ್ಯವಿಲ್ಲ. ನೀವು ಮೇಲಿನ ಪುರಾವೆ ಮತ್ತು ವಿವರಣೆಗಳನ್ನು ವೀಕ್ಷಿಸಬಹುದು.'
            : 'Assistant is temporarily unavailable. You can still view the eligibility explanation and evidence above.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: language === 'kn' ? DEFAULT_SUGGESTED_QUESTIONS_KN : DEFAULT_SUGGESTED_QUESTIONS,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([getInitialMessage()]);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col h-[calc(100vh-8rem)] w-full overflow-x-hidden" id="main-content">
      {/* Assistant Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-300 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-[#0b2545] text-white shadow-sm shrink-0">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-[#0b2545]">
                {language === 'kn' ? 'ಸ್ಕಾಲರ್‌ಸಾಥಿ ಎಐ ಸಹಾಯಕ' : 'ScholarSaathi AI Assistant'}
              </h1>
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-900 border border-emerald-300">
                {language === 'kn' ? 'ಎಂಜಿನ್ ಆಧಾರಿತ' : 'ENGINE GROUNDED'}
              </span>
            </div>
            <p className="text-xs text-slate-600">
              {language === 'kn'
                ? 'ರಚನಾತ್ಮಕ ನಿಯಮಗಳ ಸರಳ ವಿವರಣೆ • ಯಾವುದೇ ಕಾಲ್ಪನಿಕ ಮಾನದಂಡಗಳಿಲ್ಲ'
                : 'Plain-language explanation of deterministic rules • Zero invented requirements'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            id="assistant-reset-chat-btn"
            onClick={handleResetChat}
            className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-9"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
            <span>{language === 'kn' ? 'ಚಾಟ್ ತೆರವುಗೊಳಿಸಿ' : 'Clear Chat'}</span>
          </button>
        </div>
      </header>

      {/* Active Scholarship Context Card */}
      {activeMatch && (
        <section
          aria-label="Active scholarship context"
          className="mt-3 rounded-lg border border-slate-300 bg-white p-3 shadow-xs shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-3"
        >
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {language === 'kn' ? 'ಸಕ್ರಿಯ ವಿಷಯ:' : 'Active Context:'}
              </span>
              <label htmlFor="scholarship-context-select" className="sr-only">
                {language === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನದ ವಿಷಯ ಆಯ್ಕೆಮಾಡಿ' : 'Select scholarship context'}
              </label>
              <select
                id="scholarship-context-select"
                value={activeMatch.scholarship.id}
                onChange={(e) => handleScholarshipChange(e.target.value)}
                className="rounded border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-900 focus:border-[#0b2545] focus:outline-none max-w-xs sm:max-w-md truncate"
              >
                {matches.map((m) => (
                  <option key={m.scholarship.id} value={m.scholarship.id}>
                    {m.scholarship.name} ({m.status})
                  </option>
                ))}
              </select>

              {/* Status Pill */}
              <span
                className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-bold border ${
                  activeMatch.status === 'Likely Eligible'
                    ? 'border-emerald-300 bg-emerald-100 text-emerald-900'
                    : activeMatch.status === 'Needs Verification'
                    ? 'border-amber-300 bg-amber-100 text-amber-900'
                    : 'border-slate-300 bg-slate-200 text-slate-800'
                }`}
              >
                {activeMatch.status === 'Likely Eligible' && (
                  <CheckCircle2 className="h-3 w-3 text-emerald-700" aria-hidden="true" />
                )}
                {activeMatch.status === 'Needs Verification' && (
                  <AlertTriangle className="h-3 w-3 text-amber-700" aria-hidden="true" />
                )}
                {activeMatch.status === 'Not Eligible' && (
                  <XCircle className="h-3 w-3 text-rose-700" aria-hidden="true" />
                )}
                <span>
                  {activeMatch.status === 'Likely Eligible'
                    ? t.status.likelyEligible
                    : activeMatch.status === 'Needs Verification'
                    ? t.status.needsVerification
                    : t.status.notEligible}
                </span>
              </span>
            </div>

            <div className="text-[11px] text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
              <span>
                <strong>{language === 'kn' ? 'ಉತ್ತೀರ್ಣ:' : 'Passed:'}</strong> {activeMatch.passedCount}
              </span>
              <span>
                <strong>{language === 'kn' ? 'ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ:' : 'Needs Verification:'}</strong>{' '}
                {activeMatch.needsVerificationCount}
              </span>
              <span>
                <strong>{language === 'kn' ? 'ಅನರ್ಹ:' : 'Failed:'}</strong> {activeMatch.failedCount}
              </span>
              <span>
                <strong>{language === 'kn' ? 'ಅಗತ್ಯ ದಾಖಲೆಗಳು:' : 'Required Documents:'}</strong>{' '}
                {activeMatch.scholarship.documents.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={activeMatch.scholarship.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-[#0b2545] hover:bg-slate-100 transition min-h-8"
            >
              <span>{t.buttons.officialSource}</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </section>
      )}

      {/* Safety & Grounding Banner */}
      <aside
        aria-label="Assistant policy"
        className="mt-2 rounded border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 flex items-start gap-2 shrink-0"
      >
        <ShieldCheck className="h-4 w-4 text-[#0b2545] shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          <strong className="text-slate-900">
            {language === 'kn' ? 'ನಿರ್ಣಾಯಕ ಎಂಜಿನ್ ಸುರಕ್ಷತೆ:' : 'Deterministic Engine Safeguard:'}
          </strong>{' '}
          {language === 'kn'
            ? 'ಸ್ಕಾಲರ್‌ಸಾಥಿ ನಿರ್ಣಾಯಕ ಅರ್ಹತಾ ಎಂಜಿನ್ ಏಕೈಕ ಅಧಿಕೃತ ಮೂಲವಾಗಿದೆ. ಸಹಾಯಕನು ನಿಯಮಗಳ ಮೌಲ್ಯಮಾಪನವನ್ನು ಸರಳ ಭಾಷೆಗೆ ಅನುವಾದಿಸುತ್ತಾನೆ ಮತ್ತು ಎಂಜಿನ್ ನಿರ್ಧಾರಗಳನ್ನು ಅತಿಕ್ರಮಿಸುವುದಿಲ್ಲ.'
            : 'The ScholarSaathi deterministic eligibility engine is the sole source of truth. The assistant translates rule evaluations into plain language and never overrides engine decisions.'}
        </p>
      </aside>

      {/* Chat Messages Log Area */}
      <section
        aria-label="Conversation log"
        className="mt-3 flex-1 overflow-y-auto rounded-lg border border-slate-300 bg-white p-4 sm:p-5 space-y-4"
      >
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
            >
              {isAssistant && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#0b2545] text-white">
                  <Bot className="h-4 w-4" aria-hidden="true" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  isAssistant
                    ? 'bg-slate-50 text-slate-900 border border-slate-300'
                    : 'bg-[#0b2545] text-white font-medium'
                }`}
              >
                <div className="space-y-1.5 whitespace-pre-wrap">
                  {msg.text.split('\n').map((line, idx) => {
                    if (line.startsWith('• ')) {
                      return (
                        <div key={idx} className="pl-2 flex items-start gap-1.5">
                          <span className="text-[#0b2545] font-bold">•</span>
                          <span>{line.replace('• ', '')}</span>
                        </div>
                      );
                    }
                    return <p key={idx}>{line}</p>;
                  })}
                </div>

                <div
                  className={`mt-2 text-[10px] ${
                    isAssistant ? 'text-slate-500' : 'text-slate-200 text-right'
                  }`}
                >
                  {msg.timestamp}
                </div>

                {/* Suggested Questions Pills */}
                {isAssistant && msg.suggestedQuestions && (
                  <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap gap-1.5">
                    <span className="text-[11px] font-bold text-slate-700 block w-full mb-1">
                      {language === 'kn' ? 'ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು:' : 'Quick Questions:'}
                    </span>
                    {msg.suggestedQuestions.map((sq, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(sq)}
                        className="rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-8"
                      >
                        {sq}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {!isAssistant && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-slate-300 text-slate-800">
                  <User className="h-4 w-4" aria-hidden="true" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-500 p-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-[#0b2545] text-white animate-pulse">
              <Bot className="h-3 w-3" aria-hidden="true" />
            </div>
            <span>
              {language === 'kn'
                ? 'ಸ್ಕಾಲರ್‌ಸಾಥಿ ಸಹಾಯಕ ನಿಯಮಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...'
                : 'ScholarSaathi Assistant is analyzing structured rules...'}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </section>

      {/* Input Field Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="mt-3 shrink-0"
      >
        <div className="relative flex items-center">
          <input
            id="assistant-query-input"
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              language === 'kn'
                ? 'ಕೇಳಿ: ನಾನು ಏಕೆ ಅರ್ಹನಲ್ಲ? ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು? ಈ ಯೋಜನೆಯನ್ನು ಸರಳವಾಗಿ ವಿವರಿಸಿ...'
                : 'Ask: Why am I not eligible? What documents do I need? Explain this scholarship simply...'
            }
            className="w-full rounded border border-slate-300 bg-white px-4 py-3 pr-12 text-xs sm:text-sm text-slate-900 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
          />
          <button
            id="assistant-send-btn"
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="absolute right-2 rounded bg-[#0b2545] p-2 text-white hover:bg-[#133b68] disabled:opacity-40 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-9 min-w-9 flex items-center justify-center"
            aria-label={language === 'kn' ? 'ಪ್ರಶ್ನೆಯನ್ನು ಕಳುಹಿಸಿ' : 'Send query to guidance assistant'}
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
};
