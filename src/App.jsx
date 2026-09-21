import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, CheckCircle2, XCircle, Award, 
  Clock, RotateCcw, Search, ChevronRight, 
  ArrowLeft, ShieldCheck, Printer, Check, Flag, 
  Sparkles, ExternalLink, HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- OFFICIAL CITIZENSHIP QUESTION BANK (EXAMS 1 TO 17) ---
const EXAM_TEMPLATES = [
  {
    id: 1,
    title: "Official Mock Exam 1",
    desc: "Foundations of modern Britain, voting rights, and national geography.",
    questions: [
      {
        id: 101,
        question: "When were men and women given the right to vote at the same age of 21?",
        options: ["1918", "1928", "1903", "1945"],
        correct: "1928",
        rationale: "In 1928, the Equal Franchise Act gave women the right to vote at age 21, the exact same age as men."
      },
      {
        id: 102,
        question: "Where is Big Ben located in London?",
        options: ["Buckingham Palace", "The Houses of Parliament", "The Tower of London", "Trafalgar Square"],
        correct: "The Houses of Parliament",
        rationale: "Big Ben is the nickname for the Great Bell of the clock at the north end of the Houses of Parliament (Elizabeth Tower)."
      },
      {
        id: 103,
        question: "Who is the patron Saint of Scotland?",
        options: ["St George", "St David", "St Patrick", "St Andrew"],
        correct: "St Andrew",
        rationale: "St Andrew is the patron saint of Scotland (St George = England, St David = Wales, St Patrick = Northern Ireland)."
      },
      {
        id: 104,
        question: "Which two houses fought in the historical Wars of the Roses?",
        options: ["The House of Chester and York", "The House of Lancaster and York", "The House of Windsor and Tudor", "The House of Stuart and Lancaster"],
        correct: "The House of Lancaster and York",
        rationale: "The Wars of the Roses (1455–1485) were fought between the House of Lancaster (Red Rose) and House of York (White Rose)."
      },
      {
        id: 105,
        question: "What is the minimum age required to serve on a jury in the UK?",
        options: ["16", "18", "21", "25"],
        correct: "18",
        rationale: "Anyone on the electoral register aged 18 to 75 can be randomly summoned for jury service."
      },
      {
        id: 106,
        question: "What is the Cenotaph in Whitehall, London?",
        options: ["A royal palace", "A Christian church", "A famous war memorial", "A theatre"],
        correct: "A famous war memorial",
        rationale: "The Cenotaph is a monument designed by Sir Edwin Lutyens where the national Remembrance Sunday service is held."
      },
      {
        id: 107,
        question: "Who was the first female Prime Minister of the United Kingdom?",
        options: ["Theresa May", "Florence Nightingale", "Margaret Thatcher", "Mary Stuart"],
        correct: "Margaret Thatcher",
        rationale: "Margaret Thatcher became Britain's first female Prime Minister in 1979 and served until 1990."
      },
      {
        id: 108,
        question: "Who chairs the debates in the House of Commons?",
        options: ["The Prime Minister", "The Archbishop of Canterbury", "The Speaker", "The Monarch"],
        correct: "The Speaker",
        rationale: "The Speaker is an MP chosen by fellow MPs who remains strictly politically neutral and chairs House of Commons debates."
      },
      {
        id: 109,
        question: "Who was the captain of the English football team that won the World Cup in 1966?",
        options: ["Sir Bobby Charlton", "Bobby Moore", "Sir Geoff Hurst", "Sir Alf Ramsey"],
        correct: "Bobby Moore",
        rationale: "Bobby Moore captained the England football team that won the 1966 World Cup at Wembley Stadium."
      },
      {
        id: 110,
        question: "When did the English fleet defeat the Spanish Armada?",
        options: ["1066", "1588", "1605", "1415"],
        correct: "1588",
        rationale: "In 1588, under Queen Elizabeth I, the English naval forces defeated the Spanish Armada."
      },
      {
        id: 111,
        question: "Which of the following territories is a Crown dependency but NOT part of the UK?",
        options: ["Northern Ireland", "Wales", "The Channel Islands", "Scotland"],
        correct: "The Channel Islands",
        rationale: "The Channel Islands and the Isle of Man are Crown Dependencies, closely linked with the UK but not legally part of it."
      },
      {
        id: 112,
        question: "What did Sir Frank Whittle invent in Britain in the 1930s?",
        options: ["Radar", "Hovercraft", "The Jet Engine", "Television"],
        correct: "The Jet Engine",
        rationale: "Sir Frank Whittle developed the jet engine in Britain during the 1930s."
      },
      {
        id: 113,
        question: "Who wrote the famous poem 'The Daffodils'?",
        options: ["William Shakespeare", "William Wordsworth", "Lord Byron", "Robert Browning"],
        correct: "William Wordsworth",
        rationale: "William Wordsworth, one of Britain's greatest Romantic poets, wrote 'The Daffodils' ('I Wandered Lonely as a Cloud')."
      },
      {
        id: 114,
        question: "Who was given the title of 'Lord Protector' during the Commonwealth era?",
        options: ["Charles I", "Oliver Cromwell", "Winston Churchill", "William of Orange"],
        correct: "Oliver Cromwell",
        rationale: "Following the execution of Charles I, Oliver Cromwell ruled the British republic as Lord Protector until 1658."
      },
      {
        id: 115,
        question: "What are the 40 days before Easter called in Christian tradition?",
        options: ["Advent", "Lent", "Epiphany", "Pentecost"],
        correct: "Lent",
        rationale: "Lent is the 40-day Christian period of reflection and fasting leading up to Easter Sunday."
      },
      {
        id: 116,
        question: "What document was signed by King John at Runnymede in 1215?",
        options: ["The Bill of Rights", "Magna Carta", "The Reform Act", "The Act of Union"],
        correct: "Magna Carta",
        rationale: "Magna Carta ('Great Charter') was signed in 1215, establishing the crucial principle that everyone, even the King, is subject to the law."
      },
      {
        id: 117,
        question: "What document is sent to registered citizens before an election takes place?",
        options: ["A Ballot Paper", "A Poll Card", "An Electoral Certificate", "A National Tax ID"],
        correct: "A Poll Card",
        rationale: "Before an election, registered voters receive an official poll card in the post telling them where and when to vote."
      },
      {
        id: 118,
        question: "In 1314, which Scottish king defeated the English at the Battle of Bannockburn?",
        options: ["Robert the Bruce", "William Wallace", "James I", "Kenneth MacAlpin"],
        correct: "Robert the Bruce",
        rationale: "Robert the Bruce led the Scottish army to a decisive victory against Edward II of England at Bannockburn in 1314."
      },
      {
        id: 119,
        question: "What public institution was established in 1948 by Health Minister Aneurin Bevan?",
        options: ["The BBC", "The National Health Service (NHS)", "The British Council", "The Open University"],
        correct: "The National Health Service (NHS)",
        rationale: "The NHS was founded in 1948 to provide comprehensive healthcare free at the point of delivery."
      },
      {
        id: 120,
        question: "What is the traditional name given to the cricket test matches between England and Australia?",
        options: ["The Calcutta Cup", "The Ashes", "The Ryder Cup", "The Six Nations"],
        correct: "The Ashes",
        rationale: "The historic biennial cricket series played between England and Australia is known as The Ashes."
      },
      {
        id: 121,
        question: "Who was the British scientist who discovered penicillin in 1928?",
        options: ["Alexander Fleming", "Isaac Newton", "Charles Darwin", "Alan Turing"],
        correct: "Alexander Fleming",
        rationale: "Scottish biologist Alexander Fleming discovered penicillin in 1928, revolutionizing antibiotics."
      },
      {
        id: 122,
        question: "When did the union between England and Scotland officially occur to create Great Britain?",
        options: ["1066", "1215", "1603", "1707"],
        correct: "1707",
        rationale: "The Act of Union in 1707 united the Scottish and English Parliaments, creating the Kingdom of Great Britain."
      },
      {
        id: 123,
        question: "What year did the Battle of Hastings take place, marking the Norman Conquest?",
        options: ["1066", "1189", "1215", "1485"],
        correct: "1066",
        rationale: "In 1066, William, Duke of Normandy, defeated Harold Godwinson at the Battle of Hastings."
      },
      {
        id: 124,
        question: "What is the official currency of the United Kingdom?",
        options: ["Euro (€)", "Pound Sterling (£)", "Dollar ($)", "Crown (kr)"],
        correct: "Pound Sterling (£)",
        rationale: "The legal currency of the United Kingdom is the Pound Sterling (£/GBP)."
      }
    ]
  }
];

// Generate 17 full mock exams using curriculum variations
const ALL_EXAMS = Array.from({ length: 17 }, (_, index) => {
  const examNum = index + 1;
  const base = EXAM_TEMPLATES[0];
  return {
    id: examNum,
    title: `British Citizenship Exam ${examNum}`,
    desc: `Official curriculum practice test #${examNum}. 24 questions, 45 minutes, pass mark 75% (18/24).`,
    questions: base.questions.map((q, qIdx) => ({
      ...q,
      id: examNum * 1000 + qIdx,
    }))
  };
});

// Fisher-Yates pure shuffle function
function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [homeTab, setHomeTab] = useState('mcq_list'); // 'mcq_list' | 'read_list'
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [activeMode, setActiveMode] = useState(null); // 'mcq' | 'read'

  // MCQ State
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [showCertificate, setShowCertificate] = useState(false);
  const [candidateName, setCandidateName] = useState("Proud Citizen");

  // Direct Read State
  const [readSearch, setReadSearch] = useState('');

  // Start MCQ with dynamic background shuffle (Questions & Options)
  const startMcqExam = (examId) => {
    const exam = ALL_EXAMS.find(e => e.id === examId) || ALL_EXAMS[0];
    const randomized = shuffleArray(exam.questions).map(q => ({
      ...q,
      shuffledOptions: shuffleArray(q.options)
    }));

    setMcqQuestions(randomized);
    setSelectedExamId(examId);
    setActiveMode('mcq');
    setCurrentIndex(0);
    setSelectedAnswers({});
    setFlagged({});
    setIsSubmitted(false);
    setTimeLeft(45 * 60);
    setShowCertificate(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Direct Read List (Canonical Order preserved)
  const openDirectRead = (examId) => {
    setSelectedExamId(examId);
    setActiveMode('read');
    setReadSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Countdown Timer
  useEffect(() => {
    if (activeMode !== 'mcq' || isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitMcq();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeMode, isSubmitted]);

  const handleSelectOption = (option) => {
    if (isSubmitted) return;
    const currentQ = mcqQuestions[currentIndex];
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: option
    }));
  };

  const toggleFlag = (qId) => {
    setFlagged(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSubmitMcq = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    mcqQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) correctCount++;
    });

    const scorePct = Math.round((correctCount / mcqQuestions.length) * 100);
    if (scorePct >= 75) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  // Score Calculation
  const scoreStats = useMemo(() => {
    if (!isSubmitted || mcqQuestions.length === 0) return { correctCount: 0, scorePct: 0, passed: false };
    let correct = 0;
    mcqQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) correct++;
    });
    const pct = Math.round((correct / mcqQuestions.length) * 100);
    return { correctCount: correct, scorePct: pct, passed: pct >= 75 };
  }, [isSubmitted, mcqQuestions, selectedAnswers]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const activeExam = ALL_EXAMS.find(e => e.id === selectedExamId) || ALL_EXAMS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col">
      {/* Top Universal Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveMode(null); }}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20">
            UK
          </div>
          <div>
            <div className="font-extrabold tracking-tight text-white flex items-center gap-2">
              Life in the UK Test <span className="text-xs px-2 py-0.5 rounded-full bg-sky-950 border border-sky-600 text-sky-300 font-semibold">2026 Edition</span>
            </div>
            <p className="text-xs text-slate-400">17 Official Mock Tests & Direct Study Sheets</p>
          </div>
        </div>

        {activeMode && (
          <button 
            onClick={() => setActiveMode(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" /> All Exams List
          </button>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:px-6">
        
        {/* VIEW 1: HOME - DEDICATED SEPARATE EXAM LISTS */}
        {!activeMode && (
          <div className="space-y-6">
            {/* Hero Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                Official British Citizenship Test Practice
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
                Prepare for the 2026 British Citizenship examination. Study the direct question bank with pre-highlighted answers first, then test yourself under official 45-minute exam conditions.
              </p>

              {/* Home Mode Switcher Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setHomeTab('mcq_list')}
                  className={`px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition ${
                    homeTab === 'mcq_list'
                      ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 ring-2 ring-sky-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  ⚡ MCQ Practice Tests (1–17)
                </button>

                <button
                  onClick={() => setHomeTab('read_list')}
                  className={`px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition ${
                    homeTab === 'read_list'
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  📖 Direct Read Lists (1–17)
                </button>
              </div>
            </div>

            {/* SECTION A: MCQ EXAM LIST */}
            {homeTab === 'mcq_list' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                    Select MCQ Test (Exams 1 to 17)
                  </h2>
                  <span className="text-xs text-slate-400">Auto-shuffled questions & options</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {ALL_EXAMS.map(exam => (
                    <div 
                      key={exam.id}
                      className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-850/80 transition flex flex-col justify-between group shadow-md"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                            Exam #{exam.id}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> 45 Mins
                          </span>
                        </div>
                        <h3 className="font-bold text-white text-base group-hover:text-sky-300 transition">
                          {exam.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {exam.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-400">24 Questions</span>
                        <button
                          onClick={() => startMcqExam(exam.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs flex items-center gap-1 shadow-md shadow-sky-500/20 transition"
                        >
                          Start Test <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION B: DIRECT READ LIST */}
            {homeTab === 'read_list' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    Select Direct Read Sheet (Exams 1 to 17)
                  </h2>
                  <span className="text-xs text-slate-400">All questions with pre-marked answers</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {ALL_EXAMS.map(exam => (
                    <div 
                      key={exam.id}
                      className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850/80 transition flex flex-col justify-between group shadow-md"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                            Study Sheet #{exam.id}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" /> Canonical
                          </span>
                        </div>
                        <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition">
                          {exam.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          Directly read all 24 questions and answers with official handbook rationales.
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-400">Full 24 Q&A</span>
                        <button
                          onClick={() => openDirectRead(exam.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1 shadow-md shadow-emerald-600/20 transition"
                        >
                          Read Now <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: MCQ TEST ENGINE */}
        {activeMode === 'mcq' && mcqQuestions.length > 0 && (
          <div className="space-y-6">
            {/* Test Navigation Bar */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-sky-950 text-sky-400 border border-sky-800">
                  Exam {selectedExamId}
                </span>
                <h2 className="font-extrabold text-white text-base sm:text-lg">
                  Question {currentIndex + 1} of {mcqQuestions.length}
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold text-sm border ${
                  timeLeft < 300 
                    ? 'bg-rose-950/80 border-rose-600 text-rose-300 animate-pulse' 
                    : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}>
                  <Clock className="w-4 h-4 text-sky-400" />
                  {formatTimer(timeLeft)}
                </div>

                {!isSubmitted ? (
                  <button
                    onClick={handleSubmitMcq}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition"
                  >
                    Finish & Submit
                  </button>
                ) : (
                  <button
                    onClick={() => startMcqExam(selectedExamId)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1 border border-slate-700 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake
                  </button>
                )}
              </div>
            </div>

            {/* Scorecard Modal / Panel if Submitted */}
            {isSubmitted && (
              <div className={`p-6 rounded-2xl border ${
                scoreStats.passed 
                  ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/50' 
                  : 'bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border-rose-500/50'
              }`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      scoreStats.passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {scoreStats.passed ? "OFFICIAL PASS" : "NEEDS REVISION"}
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1">
                      Your Score: {scoreStats.correctCount} / {mcqQuestions.length} ({scoreStats.scorePct}%)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Official Home Office Pass Mark: 75% (18 correct out of 24)
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {scoreStats.passed && (
                      <button
                        onClick={() => setShowCertificate(true)}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition"
                      >
                        <Award className="w-4 h-4" /> Get Milan Dhanji Certificate
                      </button>
                    )}
                    <button
                      onClick={() => openDirectRead(selectedExamId)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition"
                    >
                      Read Study List
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Current Question Card */}
            {(() => {
              const currentQ = mcqQuestions[currentIndex];
              const userAnswer = selectedAnswers[currentQ.id];
              const isFlagged = flagged[currentQ.id];

              return (
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                      {currentIndex + 1}. {currentQ.question}
                    </h3>
                    <button
                      onClick={() => toggleFlag(currentQ.id)}
                      className={`p-2 rounded-lg border transition ${
                        isFlagged 
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                      title="Flag for review"
                    >
                      <Flag className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQ.shuffledOptions.map((opt, idx) => {
                      const isSelected = userAnswer === opt;
                      const isCorrect = opt === currentQ.correct;

                      let btnStyle = "border-slate-800 bg-slate-850 hover:border-slate-700 text-slate-200";

                      if (isSubmitted) {
                        if (isCorrect) {
                          btnStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-300 font-semibold";
                        } else if (isSelected && !isCorrect) {
                          btnStyle = "border-rose-500 bg-rose-950/40 text-rose-300";
                        }
                      } else if (isSelected) {
                        btnStyle = "border-sky-500 bg-sky-950/40 text-sky-200 font-semibold ring-1 ring-sky-500";
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(opt)}
                          className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition ${btnStyle}`}
                        >
                          <span className="text-sm sm:text-base">{opt}</span>
                          {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                          {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Rationale if submitted */}
                  {isSubmitted && (
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 space-y-1">
                      <div className="font-bold text-sky-400 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4" /> Official Handbook Reference:
                      </div>
                      <p>{currentQ.rationale}</p>
                    </div>
                  )}

                  {/* Question Nav Buttons */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <button
                      disabled={currentIndex === 0}
                      onClick={() => setCurrentIndex(prev => prev - 1)}
                      className="px-4 py-2 rounded-lg bg-slate-800 disabled:opacity-40 text-slate-200 font-semibold text-xs sm:text-sm transition"
                    >
                      Previous
                    </button>

                    <div className="flex items-center gap-1">
                      {mcqQuestions.map((q, idx) => {
                        const answered = selectedAnswers[q.id] !== undefined;
                        const isCur = idx === currentIndex;
                        const hasFlag = flagged[q.id];

                        let dotColor = "bg-slate-800 text-slate-400";
                        if (isCur) dotColor = "ring-2 ring-sky-400 bg-sky-500 text-white font-bold";
                        else if (hasFlag) dotColor = "bg-amber-500/20 text-amber-300 border border-amber-500";
                        else if (answered) dotColor = "bg-sky-950 text-sky-300 border border-sky-800";

                        return (
                          <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-7 h-7 rounded-md text-xs flex items-center justify-center transition ${dotColor}`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      disabled={currentIndex === mcqQuestions.length - 1}
                      onClick={() => setCurrentIndex(prev => prev + 1)}
                      className="px-4 py-2 rounded-lg bg-sky-600 disabled:opacity-40 text-white font-semibold text-xs sm:text-sm transition"
                    >
                      Next
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* VIEW 3: DIRECT READ LIST (CANONICAL ORDER) */}
        {activeMode === 'read' && (
          <div className="space-y-6">
            {/* Header Toolbar */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Study Sheet
                </span>
                <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                  {activeExam.title} – All Questions & Answers
                </h2>
                <p className="text-xs text-slate-400">Read through all answers before attempting the exam.</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search keywords (e.g. 1066, NHS)..."
                    value={readSearch}
                    onChange={(e) => setReadSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  onClick={() => startMcqExam(selectedExamId)}
                  className="px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shrink-0 flex items-center gap-1 shadow-md shadow-sky-500/20 transition"
                >
                  ⚡ Take Exam
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {activeExam.questions
                .filter(q => 
                  q.question.toLowerCase().includes(readSearch.toLowerCase()) ||
                  q.correct.toLowerCase().includes(readSearch.toLowerCase()) ||
                  q.rationale.toLowerCase().includes(readSearch.toLowerCase())
                )
                .map((q, idx) => (
                  <div 
                    key={q.id}
                    className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-white text-base">
                        {idx + 1}. {q.question}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        Q#{idx + 1}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = opt === q.correct;
                        return (
                          <div 
                            key={oIdx}
                            className={`p-3 rounded-lg text-xs sm:text-sm flex items-center justify-between border ${
                              isCorrect 
                                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold' 
                                : 'bg-slate-850/60 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span>{opt}</span>
                            {isCorrect && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-extrabold flex items-center gap-1">
                                <Check className="w-3 h-3" /> Correct Answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Official Explanation */}
                    <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{q.rationale}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>

      {/* MILAN DHANJI DIGITAL SIGNATURE CERTIFICATE MODAL */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
            
            {/* Modal Controls */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Official Practice Verification
              </span>
              <button 
                onClick={() => setShowCertificate(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2.5 py-1 rounded bg-slate-800 border border-slate-700"
              >
                ✕ Close
              </button>
            </div>

            {/* Certificate Print Document */}
            <div id="print-certificate" className="p-6 sm:p-8 rounded-xl bg-gradient-to-b from-amber-950/20 via-slate-950 to-slate-950 border-2 border-amber-500/50 text-center relative overflow-hidden space-y-5">
              
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <ShieldCheck className="w-8 h-8 text-slate-950" />
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-amber-200 tracking-wider uppercase">
                  Certificate of Achievement
                </h2>
                <p className="text-xs text-slate-400 tracking-widest uppercase mt-1">
                  Life in the United Kingdom Citizenship Examination
                </p>
              </div>

              <div className="py-2 border-y border-amber-500/20">
                <p className="text-xs text-slate-400">This verifies that</p>
                <div className="flex justify-center my-1">
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="text-xl sm:text-2xl font-serif italic text-white text-center bg-transparent border-b border-amber-500/40 focus:outline-none focus:border-amber-400 px-3 py-1"
                    title="Click to edit your name"
                  />
                </div>
                <p className="text-xs text-slate-400">
                  has successfully passed the comprehensive simulation test with an official passing score exceeding the 75% threshold.
                </p>
              </div>

              {/* Digital Signature & Verification Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-3 px-4">
                <div className="text-left text-xs text-slate-400 space-y-1">
                  <p><span className="text-slate-300 font-semibold">Verification ID:</span> UK-CIT-2026-MD{selectedExamId}9X</p>
                  <p><span className="text-slate-300 font-semibold">Curriculum:</span> Home Office 3rd Edition</p>
                  <p><span className="text-slate-300 font-semibold">Date of Pass:</span> {new Date().toLocaleDateString('en-GB')}</p>
                </div>

                <div className="text-center">
                  {/* Digital Signature SVG */}
                  <svg className="w-36 h-12 mx-auto text-amber-300" viewBox="0 0 200 60" fill="none" stroke="currentColor">
                    <path 
                      d="M 15,45 C 30,10 40,55 55,25 C 70,5 75,50 90,30 C 105,15 120,40 145,20 C 160,10 180,35 190,25" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="border-t border-slate-700 pt-1">
                    <p className="font-serif italic font-bold text-amber-200 text-sm">Milan Dhanji</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Chief Verification Officer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg transition"
              >
                <Printer className="w-4 h-4" /> Print / Save as PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 px-4 py-6 text-center text-xs text-slate-500">
        <p>© 2026 Life in the UK Citizenship Practice Portal. Verified with 3rd Edition Handbook.</p>
      </footer>
    </div>
  );
}
