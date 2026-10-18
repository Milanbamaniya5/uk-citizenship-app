import React, { useState } from 'react';
import { EXAM_SETS } from './questions.js';

// Fisher-Yates Shuffling Function
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [view, setView] = useState('home'); 
  const [homeTab, setHomeTab] = useState('mcq');
  const [activeExam, setActiveExam] = useState(null);
  
  // MCQ state
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [candidateName, setCandidateName] = useState('Candidate');

  const navigateTo = (newView) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    window.location.reload(); // Yeh page ko refresh kar dega aur home par le aayega
  };

  const startMCQTest = (exam) => {
    setActiveExam(exam);
    const randomizedQuestions = shuffleArray(exam.questions).map(q => ({
      ...q,
      shuffledOptions: shuffleArray(q.options)
    }));
    setShuffledQuestions(randomizedQuestions);
    setUserAnswers({});
    setCurrentQIndex(0);
    navigateTo('mcq_test');
  };

  const startDirectRead = (exam) => {
    setActiveExam(exam);
    navigateTo('read');
  };

  const handleSelectOption = (option) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQIndex]: option
    }));
  };

  const handleNext = () => {
    if (currentQIndex < shuffledQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('mcq_review');
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const calculateScore = () => {
    let score = 0;
    shuffledQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) {
        score++;
      }
    });
    return score;
  };

  const finalScore = activeExam ? calculateScore() : 0;
  const isPassed = finalScore >= 18;

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: 0,
      padding: 0
    }}>
      {/* Top Header - Refresh & Home on Logo Click */}
      <header style={{
        backgroundColor: '#1e293b',
        borderBottom: '1px solid #334155',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div 
          onClick={handleLogoClick} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' }}
        >
          <span style={{ fontSize: '22px' }}>🇬🇧</span>
          <div>
            <div style={{ fontWeight: '800', fontSize: '16px', color: '#38bdf8' }}>
              Life in the UK Practice
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>lifeinukpractices.co.uk</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href="https://revolut.me/a_bariya30"
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              color: '#fbbf24',
              border: '1px solid #f59e0b',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            ☕ Support
          </a>

          {view !== 'home' && (
            <button
              onClick={() => navigateTo('home')}
              style={{
                backgroundColor: '#334155',
                color: '#f8fafc',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '12px'
              }}
            >
              ← Home
            </button>
          )}
        </div>
      </header>

      {/* Main Content Container */}
      <main style={{ maxWidth: '900px', width: '100%', margin: '0 auto', padding: '16px 14px', boxSizing: 'border-box', flex: 1 }}>
        
        {/* ================= HOME VIEW ================= */}
        {view === 'home' && (
          <div>
            {/* Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #1e3a8a, #0369a1)',
              padding: '20px 16px',
              borderRadius: '14px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <h1 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 8px 0' }}>
                Life in the UK Citizenship Preparation 2026
              </h1>
              <p style={{ color: '#bae6fd', fontSize: '13px', margin: '0 0 14px 0' }}>
                Free practice questions with explanations for the Life in the UK test, taken for Indefinite Leave to Remain (ILR) and British citizenship.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  ✨ Pass Mark: 18 / 24 (75%)
                </span>
                <a
                  href="https://revolut.me/a_bariya30"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: '#f59e0b',
                    color: '#0f172a',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '800',
                    textDecoration: 'none'
                  }}
                >
                  ☕ Buy a Coffee (£3)
                </a>
              </div>
            </div>

            {/* Study guides (real pages, crawlable) */}
            <div style={{
              backgroundColor: '#1e293b',
              padding: '18px',
              borderRadius: '12px',
              border: '1px solid #334155',
              marginBottom: '20px',
              fontSize: '13px',
              color: '#cbd5e1',
              lineHeight: '1.7'
            }}>
              <h2 style={{ color: '#38bdf8', fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0' }}>
                How to use this site
              </h2>
              <p style={{ margin: '0 0 10px 0' }}>
                The Life in the UK test is a 24-question, multiple-choice exam. You need 18 correct answers (75%) to pass. Start with a study guide below, then check what you remember with a practice test. Every question has an explanation so you learn from mistakes.
              </p>
              <h3 style={{ color: '#f8fafc', fontSize: '14px', margin: '14px 0 6px 0' }}>Study guides</h3>
              <ul style={{ paddingLeft: '18px', margin: 0 }}>
                <li><a style={{ color: '#38bdf8' }} href="/guides/test-format.html">Test format, pass mark and booking</a></li>
                <li><a style={{ color: '#38bdf8' }} href="/guides/how-to-pass.html">How to pass: a 4-week revision plan</a></li>
                <li><a style={{ color: '#38bdf8' }} href="/guides/british-history-timeline.html">British history timeline</a></li>
                <li><a style={{ color: '#38bdf8' }} href="/guides/government-and-parliament.html">Government and Parliament explained</a></li>
                <li><a style={{ color: '#38bdf8' }} href="/guides/law-and-everyday-life.html">Law, rights and everyday life</a></li>
                <li><a style={{ color: '#38bdf8' }} href="/guides/traditions-and-festivals.html">Traditions, festivals and patron saints</a></li>
              </ul>
              <p style={{ margin: '12px 0 0 0' }}>
                <a style={{ color: '#38bdf8' }} href="/guides/">See all guides →</a>
              </p>
            </div>

            {/* TOP CHOICE SELECTOR (MCQ vs Read-Only) */}
            <div style={{
              backgroundColor: '#1e293b',
              padding: '6px',
              borderRadius: '12px',
              display: 'flex',
              gap: '6px',
              marginBottom: '24px',
              border: '1px solid #334155'
            }}>
              <button
                onClick={() => setHomeTab('mcq')}
                style={{
                  flex: 1,
                  padding: '12px 8px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: homeTab === 'mcq' ? '#0284c7' : 'transparent',
                  color: homeTab === 'mcq' ? '#ffffff' : '#94a3b8',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>📝</span>
                <span>Practice Tests</span>
              </button>

              <button
                onClick={() => setHomeTab('read')}
                style={{
                  flex: 1,
                  padding: '12px 8px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: homeTab === 'read' ? '#15803d' : 'transparent',
                  color: homeTab === 'read' ? '#ffffff' : '#94a3b8',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>📖</span>
                <span>Direct Read Only</span>
              </button>
            </div>

            {/* TAB CONTENT: 1. MCQ Practice Mode */}
            {homeTab === 'mcq' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#38bdf8', margin: 0 }}>
                    Select a practice test (1 to {EXAM_SETS.length})
                  </h2>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>Shuffled questions</span>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '14px'
                }}>
                  {EXAM_SETS.map((exam) => (
                    <div key={exam.id} style={{
                      backgroundColor: '#1e293b',
                      borderRadius: '12px',
                      padding: '16px',
                      border: '1px solid #334155',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ backgroundColor: '#0284c7', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px' }}>
                            Exam #{exam.id}
                          </span>
                          <span style={{ color: '#94a3b8', fontSize: '11px' }}>⏱️ about 45 min</span>
                        </div>
                        <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 6px 0' }}>{exam.title}</h3>
                        <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 14px 0' }}>
                          24 questions • Auto-shuffled options
                        </p>
                      </div>
                      <button
                        onClick={() => startMCQTest(exam)}
                        style={{
                          width: '100%',
                          backgroundColor: '#0284c7',
                          color: '#fff',
                          border: 'none',
                          padding: '10px',
                          borderRadius: '8px',
                          fontWeight: '700',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        Start practice test →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 2. Direct Read Only Mode */}
            {homeTab === 'read' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#4ade80', margin: 0 }}>
                    Select a study list (1 to {EXAM_SETS.length})
                  </h2>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>Correct answer in green</span>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '14px'
                }}>
                  {EXAM_SETS.map((exam) => (
                    <div key={exam.id} style={{
                      backgroundColor: '#1e293b',
                      borderRadius: '12px',
                      padding: '16px',
                      border: '1px solid #334155',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ backgroundColor: '#15803d', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px' }}>
                            Study List #{exam.id}
                          </span>
                          <span style={{ color: '#94a3b8', fontSize: '11px' }}>24 Items</span>
                        </div>
                        <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 6px 0' }}>{exam.title}</h3>
                        <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 14px 0' }}>
                          All options shown with the correct answer in green.
                        </p>
                      </div>
                      <button
                        onClick={() => startDirectRead(exam)}
                        style={{
                          width: '100%',
                          backgroundColor: '#15803d',
                          color: '#fff',
                          border: 'none',
                          padding: '10px',
                          borderRadius: '8px',
                          fontWeight: '700',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        Read Study List 📖
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= MCQ TEST ACTIVE VIEW ================= */}
        {view === 'mcq_test' && shuffledQuestions.length > 0 && (
          <div style={{ maxWidth: '650px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
            <div style={{
              backgroundColor: '#1e293b',
              padding: '14px 16px',
              borderRadius: '12px',
              border: '1px solid #334155',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: '700', color: '#38bdf8', fontSize: '14px' }}>
                  {activeExam?.title}
                </span>
                <span style={{ fontSize: '13px', color: '#f8fafc', fontWeight: '700' }}>
                  Question {currentQIndex + 1} of {shuffledQuestions.length}
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: '#334155', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${((currentQIndex + 1) / shuffledQuestions.length) * 100}%`,
                  backgroundColor: '#0284c7',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            <div style={{
              backgroundColor: '#1e293b',
              padding: '20px 16px',
              borderRadius: '12px',
              border: '1px solid #334155',
              marginBottom: '16px'
            }}>
              <h2 style={{ fontSize: '16px', fontWeight: '700', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                {shuffledQuestions[currentQIndex].q}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {shuffledQuestions[currentQIndex].shuffledOptions.map((opt, oIdx) => {
                  const isSelected = userAnswers[currentQIndex] === opt;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(opt)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: isSelected ? '2px solid #38bdf8' : '1px solid #475569',
                        backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.15)' : '#0f172a',
                        color: isSelected ? '#38bdf8' : '#f8fafc',
                        fontWeight: isSelected ? '700' : '500',
                        fontSize: '14px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        border: isSelected ? '2px solid #38bdf8' : '1px solid #64748b',
                        backgroundColor: isSelected ? '#38bdf8' : 'transparent',
                        color: isSelected ? '#0f172a' : '#94a3b8',
                        fontSize: '11px',
                        fontWeight: '800'
                      }}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handlePrev}
                disabled={currentQIndex === 0}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #475569',
                  backgroundColor: currentQIndex === 0 ? '#1e293b' : '#334155',
                  color: currentQIndex === 0 ? '#64748b' : '#f8fafc',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: currentQIndex === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                ← Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!userAnswers[currentQIndex]}
                style={{
                  flex: 2,
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: userAnswers[currentQIndex] ? '#0284c7' : '#334155',
                  color: userAnswers[currentQIndex] ? '#ffffff' : '#64748b',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: userAnswers[currentQIndex] ? 'pointer' : 'not-allowed'
                }}
              >
                {currentQIndex === shuffledQuestions.length - 1 ? 'Save & Review Test →' : 'Save & Next →'}
              </button>
            </div>
          </div>
        )}

        {/* ================= MCQ REVIEW SCREEN ================= */}
        {view === 'mcq_review' && (
          <div style={{ maxWidth: '650px', margin: '0 auto' }}>
            <div style={{
              backgroundColor: '#1e293b',
              padding: '20px 16px',
              borderRadius: '12px',
              border: '1px solid #334155',
              marginBottom: '16px'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 8px 0', color: '#38bdf8' }}>
                📋 Test Review Summary
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 16px 0' }}>
                Aapne {Object.keys(userAnswers).length} of {shuffledQuestions.length} questions solve kiye hain. Answer badalne ke liye kisi bhi question par tap karein.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                gap: '8px',
                marginBottom: '20px'
              }}>
                {shuffledQuestions.map((_, idx) => {
                  const isAnswered = !!userAnswers[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentQIndex(idx);
                        navigateTo('mcq_test');
                      }}
                      style={{
                        padding: '10px 8px',
                        borderRadius: '6px',
                        border: isAnswered ? '1px solid #22c55e' : '1px solid #f97316',
                        backgroundColor: isAnswered ? 'rgba(34, 197, 94, 0.15)' : 'rgba(249, 115, 22, 0.15)',
                        color: isAnswered ? '#4ade80' : '#fb923c',
                        cursor: 'pointer',
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}
                    >
                      <div>Q{idx + 1}</div>
                      <div style={{ fontSize: '10px', marginTop: '2px' }}>
                        {isAnswered ? '✓ Saved' : '⚠️ Empty'}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div style={{
                backgroundColor: '#0f172a',
                padding: '14px',
                borderRadius: '8px',
                border: '1px solid #334155',
                marginBottom: '20px'
              }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600' }}>
                  Candidate Full Name (Certificate ke liye):
                </label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #475569',
                    backgroundColor: '#1e293b',
                    color: '#f8fafc',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    setCurrentQIndex(0);
                    navigateTo('mcq_test');
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #475569',
                    backgroundColor: '#334155',
                    color: '#f8fafc',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  ← Edit
                </button>
                <button
                  onClick={() => navigateTo('mcq_result')}
                  style={{
                    flex: 2,
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#22c55e',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Submit Final Exam 🏁
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= MCQ RESULT & OFFICIAL CERTIFICATE ================= */}
        {view === 'mcq_result' && (
          <div style={{ maxWidth: '650px', margin: '0 auto' }}>
            <div style={{
              backgroundColor: '#1e293b',
              padding: '20px 16px',
              borderRadius: '12px',
              border: '1px solid #334155',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '6px' }}>
                {isPassed ? '🎉' : '📚'}
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 6px 0', color: isPassed ? '#4ade80' : '#f87171' }}>
                {isPassed ? 'Congratulations! You Passed!' : 'Need More Revision'}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 16px 0' }}>
                Your Score: <strong style={{ color: '#f8fafc' }}>{finalScore}</strong> / 24 ({Math.round((finalScore / 24) * 100)}%)
                <br />
                Pass Mark: 18 / 24 (75%)
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={() => startMCQTest(activeExam)}
                  style={{
                    backgroundColor: '#0284c7',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  ↻ Retake
                </button>
                <button
                  onClick={() => navigateTo('home')}
                  style={{
                    backgroundColor: '#334155',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  Dashboard
                </button>
              </div>
            </div>

            {/* Practice certificate */}
            {isPassed && (
              <div style={{
                backgroundColor: '#ffffff',
                color: '#0f172a',
                padding: '34px 22px',
                borderRadius: '12px',
                border: '8px double #0284c7',
                marginBottom: '24px',
                textAlign: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
              }}>
                <div style={{ fontSize: '28px', marginBottom: '4px' }}>🇬🇧</div>
                <div style={{ fontSize: '11px', letterSpacing: '2px', fontWeight: '800', color: '#0284c7', textTransform: 'uppercase' }}>
                  Life in the UK Practice
                </div>
                <h1 style={{ fontSize: '22px', fontWeight: '900', margin: '10px 0', fontFamily: 'serif', color: '#0f172a' }}>
                  Certificate of Practice Completion
                </h1>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 10px 0' }}>
                  This practice certificate shows that
                </p>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#0369a1', borderBottom: '2px solid #cbd5e1', display: 'inline-block', paddingBottom: '4px', minWidth: '220px' }}>
                  {candidateName || 'Candidate'}
                </div>
                <p style={{ fontSize: '13px', color: '#334155', maxWidth: '440px', margin: '14px auto', lineHeight: '1.6' }}>
                  has completed <strong>{activeExam?.title}</strong> scoring <strong>{finalScore}/24 ({Math.round((finalScore / 24) * 100)}%)</strong> in a practice test. This is not an official Home Office result.
                </p>

                {/* Verification Authority */}
                <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: 'serif',
                      fontWeight: '800',
                      fontSize: '15px',
                      color: '#0369a1',
                      borderBottom: '1px solid #0f172a',
                      padding: '0 10px 4px 10px',
                      letterSpacing: '0.5px'
                    }}>
                      Life in the UK Practices
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', fontWeight: '700' }}>
                      Practice site
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', borderBottom: '1px solid #0f172a', padding: '0 14px 6px 14px' }}>
                      {new Date().toLocaleDateString('en-GB')}
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', fontWeight: '700' }}>
                      Date
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Revolut Support Widget */}
            <div style={{
              backgroundColor: '#1e293b',
              padding: '20px 16px',
              borderRadius: '12px',
              border: '1px solid #f59e0b',
              textAlign: 'center',
              marginBottom: '20px',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.15)'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#fbbf24', marginBottom: '6px' }}>
                ☕ Found this practice helpful?
              </div>
              <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '0 0 14px 0', lineHeight: '1.5' }}>
                Help us keep <strong>Life in the UK Practices</strong> 100% free and up-to-date for upcoming applicants. You can send a small contribution via Apple Pay, Google Pay or Card.
              </p>
              <a
                href="https://revolut.me/a_bariya30"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#f59e0b',
                  color: '#0f172a',
                  padding: '10px 22px',
                  borderRadius: '24px',
                  fontWeight: '800',
                  fontSize: '13px',
                  textDecoration: 'none',
                  boxShadow: '0 2px 10px rgba(245, 158, 11, 0.4)'
                }}
              >
                <span>☕ Buy a Coffee (£3) on Revolut</span>
                <span>→</span>
              </a>
            </div>

            {/* Review Answers */}
            <div style={{
              backgroundColor: '#1e293b',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #334155'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 14px 0', color: '#38bdf8' }}>
                Review Answers
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {shuffledQuestions.map((q, idx) => {
                  const userAns = userAnswers[idx];
                  const isCorrect = userAns === q.answer;
                  return (
                    <div key={idx} style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: '#0f172a',
                      borderLeft: `4px solid ${isCorrect ? '#22c55e' : '#ef4444'}`
                    }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>
                        Q{idx + 1}: {q.q}
                      </div>
                      <div style={{ fontSize: '12px', color: isCorrect ? '#4ade80' : '#f87171' }}>
                        Your Answer: {userAns || 'Not Answered'} {isCorrect ? '✓' : '✗'}
                      </div>
                      {!isCorrect && (
                        <div style={{ fontSize: '12px', color: '#38bdf8' }}>
                          Correct: {q.answer}
                        </div>
                      )}
                      <div style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', marginTop: '2px' }}>
                        💡 {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= DIRECT READ STUDY VIEW ================= */}
        {view === 'read' && activeExam && (
          <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
            <div style={{
              backgroundColor: '#1e293b',
              padding: '14px 16px',
              borderRadius: '12px',
              border: '1px solid #334155',
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap'
            }}>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 2px 0', color: '#4ade80' }}>
                  📖 {activeExam.title} (Direct Read Study)
                </h2>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  Sabhi 4 options mein se sahi jawab green highlight hai
                </span>
              </div>
              <button
                onClick={() => startMCQTest(activeExam)}
                style={{
                  backgroundColor: '#0284c7',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Take MCQ Test 📝
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {activeExam.questions.map((q, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#1e293b',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #334155'
                }}>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', marginBottom: '12px', lineHeight: '1.4' }}>
                    {idx + 1}. {q.q}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = opt === q.answer;
                      return (
                        <div
                          key={oIdx}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: isCorrect ? '2px solid #22c55e' : '1px solid #334155',
                            backgroundColor: isCorrect ? 'rgba(34, 197, 94, 0.15)' : '#0f172a',
                            color: isCorrect ? '#4ade80' : '#94a3b8',
                            fontWeight: isCorrect ? '700' : '500',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '22px',
                              height: '22px',
                              borderRadius: '50%',
                              border: isCorrect ? '2px solid #22c55e' : '1px solid #475569',
                              backgroundColor: isCorrect ? '#22c55e' : 'transparent',
                              color: isCorrect ? '#0f172a' : '#64748b',
                              fontSize: '11px',
                              fontWeight: '800'
                            }}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isCorrect && (
                            <span style={{
                              backgroundColor: '#22c55e',
                              color: '#0f172a',
                              fontSize: '11px',
                              fontWeight: '800',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              whiteSpace: 'nowrap'
                            }}>
                              ✓ Correct Answer
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div style={{
                    fontSize: '12px',
                    color: '#94a3b8',
                    backgroundColor: '#0f172a',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    lineHeight: '1.4'
                  }}>
                    💡 <strong style={{ color: '#e2e8f0' }}>Historical Context:</strong> {q.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ================= FOOTER ================= */}
      <footer style={{
        backgroundColor: '#0b1120',
        borderTop: '1px solid #1e293b',
        padding: '24px 16px',
        textAlign: 'center',
        marginTop: '32px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <nav style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '14px' }}>
            <a href="/guides/" style={{ color: '#94a3b8', fontSize: '12px', textDecoration: 'underline' }}>Study Guides</a>
            <a href="/about.html" style={{ color: '#94a3b8', fontSize: '12px', textDecoration: 'underline' }}>About Us</a>
            <a href="/privacy-policy.html" style={{ color: '#94a3b8', fontSize: '12px', textDecoration: 'underline' }}>Privacy Policy</a>
            <a href="/terms.html" style={{ color: '#94a3b8', fontSize: '12px', textDecoration: 'underline' }}>Terms &amp; Disclaimer</a>
            <a href="/contact.html" style={{ color: '#94a3b8', fontSize: '12px', textDecoration: 'underline' }}>Contact</a>
          </nav>

          <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.5' }}>
            © {new Date().getFullYear()} lifeinukpractices.co.uk. Independent study resource for the Life in the UK test.
            <br />
            Not affiliated with the UK Home Office or Gov.uk.
          </div>
        </div>
      </footer>
    </div>
  );
}
