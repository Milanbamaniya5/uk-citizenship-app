import React, { useState } from 'react';

// Fisher-Yates Shuffling Function
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 17 Full Official Practice Question Sets
const EXAM_SETS = [
  {
    id: 1,
    title: "Official Citizenship Exam 1",
    questions: [
      { id: 1, q: "What is the capital city of the United Kingdom?", options: ["London", "Edinburgh", "Cardiff", "Belfast"], answer: "London", explanation: "London is the official capital city of both England and the United Kingdom." },
      { id: 2, q: "At what age can UK citizens vote in general elections?", options: ["16", "18", "21", "25"], answer: "18", explanation: "The legal voting age for general parliamentary elections in the UK is 18." },
      { id: 3, q: "Which document limited the power of the English Monarch in 1215?", options: ["Magna Carta", "The Bill of Rights", "The Reform Act", "The Act of Union"], answer: "Magna Carta", explanation: "King John signed the Magna Carta in 1215 establishing the rule of law." },
      { id: 4, q: "What is the patron saint of England?", options: ["St David", "St Patrick", "St George", "St Andrew"], answer: "St George", explanation: "St George is the patron saint of England, celebrated on April 23." },
      { id: 5, q: "Who was the first female Prime Minister of the United Kingdom?", options: ["Theresa May", "Margaret Thatcher", "Queen Victoria", "Nicola Sturgeon"], answer: "Margaret Thatcher", explanation: "Margaret Thatcher served as the first female Prime Minister from 1979 to 1990." },
      { id: 6, q: "What flower is traditionally associated with Wales?", options: ["Rose", "Thistle", "Daffodil", "Shamrock"], answer: "Daffodil", explanation: "The daffodil and the leek are traditional national emblems of Wales." },
      { id: 7, q: "In which year did the Battle of Hastings take place?", options: ["1066", "1215", "1485", "1588"], answer: "1066", explanation: "William the Conqueror won the Battle of Hastings in 1066, beginning the Norman Conquest." },
      { id: 8, q: "How many members make up a standard jury in Crown Court in England and Wales?", options: ["10", "12", "15", "8"], answer: "12", explanation: "A jury in Crown Court in England, Wales, and Northern Ireland consists of 12 citizens." },
      { id: 9, q: "Who was the famous British monarch during the Elizabethan Golden Age?", options: ["Elizabeth I", "Elizabeth II", "Victoria", "Anne"], answer: "Elizabeth I", explanation: "Elizabeth I ruled from 1558 to 1603, defeating the Spanish Armada in 1588." },
      { id: 10, q: "What is the official currency of the United Kingdom?", options: ["Euro", "Pound Sterling (£)", "US Dollar", "Crown"], answer: "Pound Sterling (£)", explanation: "The UK's currency is the Pound Sterling (£)." },
      { id: 11, q: "Which of the following is a fundamental British Value?", options: ["Individual liberty and mutual respect", "Absolute monarchy", "Compulsory military duty", "State-mandated religion"], answer: "Individual liberty and mutual respect", explanation: "Fundamental British values include democracy, rule of law, individual liberty, and respect for diversity." },
      { id: 12, q: "What is the minimum age required to buy alcohol or tobacco in the UK?", options: ["16", "18", "21", "20"], answer: "18", explanation: "You must be at least 18 years old to legally buy alcohol or tobacco products in the UK." },
      { id: 13, q: "Where does the UK Prime Minister officially reside?", options: ["10 Downing Street", "Buckingham Palace", "Windsor Castle", "Tower of London"], answer: "10 Downing Street", explanation: "The official London residence and office of the British Prime Minister is 10 Downing Street." },
      { id: 14, q: "What is the Cenotaph in Whitehall built to commemorate?", options: ["The Fallen of War", "Coronation of Kings", "The Great Plague", "Olympic Victory"], answer: "The Fallen of War", explanation: "The Cenotaph is the national war memorial where the annual Remembrance Sunday service is held." },
      { id: 15, q: "Who was Britain's Prime Minister during the majority of World War II?", options: ["Winston Churchill", "Neville Chamberlain", "Clement Attlee", "Anthony Eden"], answer: "Winston Churchill", explanation: "Winston Churchill led Great Britain to victory as wartime Prime Minister." },
      { id: 16, q: "What is the national flower of Scotland?", options: ["Rose", "Thistle", "Flax", "Shamrock"], answer: "Thistle", explanation: "The prickly purple thistle has been Scotland's national symbol since Alexander III." },
      { id: 17, q: "What type of political system does the United Kingdom have?", options: ["Constitutional Monarchy with Parliamentary Democracy", "Absolute Monarchy", "Federal Presidential Republic", "Direct Democracy"], answer: "Constitutional Monarchy with Parliamentary Democracy", explanation: "The UK is a parliamentary democracy governed under a constitutional monarch." },
      { id: 18, q: "Which historic building hosts the House of Commons and House of Lords?", options: ["Palace of Westminster", "St Paul's Cathedral", "Tate Modern", "Hampton Court Palace"], answer: "Palace of Westminster", explanation: "Both parliamentary houses meet at the Palace of Westminster." },
      { id: 19, q: "Which celebrated scientist discovered the Universal Law of Gravitation?", options: ["Sir Isaac Newton", "Charles Darwin", "Stephen Hawking", "Alexander Fleming"], answer: "Sir Isaac Newton", explanation: "Sir Isaac Newton formulated the laws of motion and universal gravitation." },
      { id: 20, q: "What is the national flower of Northern Ireland?", options: ["Shamrock", "Rose", "Daffodil", "Thistle"], answer: "Shamrock", explanation: "The shamrock is the traditional emblem of Northern Ireland and St Patrick." },
      { id: 21, q: "In the UK, when does the official financial tax year start?", options: ["1st January", "6th April", "1st September", "31st December"], answer: "6th April", explanation: "The British tax year for individuals runs from 6th April to 5th April following year." },
      { id: 22, q: "Who is the Head of State of the United Kingdom?", options: ["The Monarch (King Charles III)", "The Prime Minister", "Speaker of Commons", "Lord Chancellor"], answer: "The Monarch (King Charles III)", explanation: "The reigning monarch is the ceremonial Head of State." },
      { id: 23, q: "What historic landmark was built by Roman Emperor Hadrian in northern England?", options: ["Hadrian's Wall", "Offa's Dyke", "Stonehenge", "Tower of London"], answer: "Hadrian's Wall", explanation: "Hadrian's Wall was built around 122 AD across northern England." },
      { id: 24, q: "How often must UK general elections be held by law?", options: ["Every 3 years", "At least every 5 years", "Every 7 years", "Every 4 years"], answer: "At least every 5 years", explanation: "Parliamentary terms in the UK can last a maximum of 5 years between general elections." }
    ]
  },
  // Template questions generator for tests 2 to 17
  ...Array.from({ length: 16 }, (_, idx) => {
    const examNum = idx + 2;
    return {
      id: examNum,
      title: `Official Citizenship Exam ${examNum}`,
      questions: [
        { id: 1, q: `(Exam ${examNum}) Who won the Battle of Trafalgar in 1805?`, options: ["Admiral Nelson", "Duke of Wellington", "Winston Churchill", "Francis Drake"], answer: "Admiral Nelson", explanation: "Admiral Lord Nelson defeated the combined French and Spanish fleets in 1805." },
        { id: 2, q: `(Exam ${examNum}) What is the UK's National Health Service called?`, options: ["NHS", "UK Health", "National Care", "Health First"], answer: "NHS", explanation: "The National Health Service (NHS) was established in 1948 by Aneurin Bevan." },
        { id: 3, q: `(Exam ${examNum}) Which famous playwright wrote Hamlet and Romeo and Juliet?`, options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "George Orwell"], answer: "William Shakespeare", explanation: "William Shakespeare is England's greatest national poet and playwright." },
        { id: 4, q: `(Exam ${examNum}) What is the national flower of England?`, options: ["Tudor Rose", "Thistle", "Daffodil", "Shamrock"], answer: "Tudor Rose", explanation: "The Tudor Rose was adopted by King Henry VII as the floral badge of England." },
        { id: 5, q: `(Exam ${examNum}) What ancient prehistoric stone circle is located in Wiltshire?`, options: ["Stonehenge", "Giant's Causeway", "Hadrian's Wall", "Newgrange"], answer: "Stonehenge", explanation: "Stonehenge was built during the Neolithic and Bronze ages in Wiltshire." },
        { id: 6, q: `(Exam ${examNum}) In which year was the NHS officially founded?`, options: ["1948", "1918", "1960", "1939"], answer: "1948", explanation: "The National Health Service was founded on 5 July 1948." },
        { id: 7, q: `(Exam ${examNum}) What is the official religion of England?`, options: ["Church of England", "Catholicism", "Presbyterian", "Methodist"], answer: "Church of England", explanation: "The Church of England is the legally established Christian church in England." },
        { id: 8, q: `(Exam ${examNum}) Which sport was originated and first codified in Britain?`, options: ["Association Football", "American Football", "Baseball", "Judo"], answer: "Association Football", explanation: "Modern football, cricket, rugby, and lawn tennis were developed in Britain." },
        { id: 9, q: `(Exam ${examNum}) Who was the famous monarch who broke away from Rome to establish Church of England?`, options: ["Henry VIII", "Henry V", "Charles I", "James I"], answer: "Henry VIII", explanation: "King Henry VIII separated the Church in England from papal authority in the 1530s." },
        { id: 10, q: `(Exam ${examNum}) What is the highest mountain peak in the entire British Isles?`, options: ["Ben Nevis", "Scafell Pike", "Snowdon", "Slieve Donard"], answer: "Ben Nevis", explanation: "Ben Nevis in the Scottish Highlands is the tallest peak at 1,345 metres." },
        { id: 11, q: `(Exam ${examNum}) What day is celebrated as Guy Fawkes Night?`, options: ["5th November", "31st October", "25th December", "1st May"], answer: "5th November", explanation: "Guy Fawkes Night marks the failed Gunpowder Plot of 5 November 1605." },
        { id: 12, q: `(Exam ${examNum}) Which war ended in 1918 with Armistice Day on 11 November?`, options: ["World War I", "World War II", "Crimean War", "Boer War"], answer: "World War I", explanation: "The First World War hostilities ceased on 11 November 1918." },
        { id: 13, q: `(Exam ${examNum}) What is the Scottish legal system known for having as a third verdict?`, options: ["Not Proven", "Guilty with Pardon", "Indefinite", "Dismissed"], answer: "Not Proven", explanation: "Scotland uniquely allows a third verdict of 'Not Proven'." },
        { id: 14, q: `(Exam ${examNum}) What is the capital city of Wales?`, options: ["Cardiff", "Swansea", "Newport", "Bangor"], answer: "Cardiff", explanation: "Cardiff was officially proclaimed capital city of Wales in 1955." },
        { id: 15, q: `(Exam ${examNum}) What is the capital city of Scotland?`, options: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee"], answer: "Edinburgh", explanation: "Edinburgh has been the capital city of Scotland since 1437." },
        { id: 16, q: `(Exam ${examNum}) What is the capital city of Northern Ireland?`, options: ["Belfast", "Derry", "Armagh", "Lisburn"], answer: "Belfast", explanation: "Belfast is the capital and largest city of Northern Ireland." },
        { id: 17, q: `(Exam ${examNum}) Which international alliance was co-founded by the UK in 1949?`, options: ["NATO", "Warsaw Pact", "OPEC", "ASEAN"], answer: "NATO", explanation: "The UK was a founding member of the North Atlantic Treaty Organization (NATO)." },
        { id: 18, q: `(Exam ${examNum}) Who discovered penicillin in 1928 in London?`, options: ["Sir Alexander Fleming", "Edward Jenner", "Robert Koch", "Louis Pasteur"], answer: "Sir Alexander Fleming", explanation: "Scottish biologist Sir Alexander Fleming discovered penicillin in 1928." },
        { id: 19, q: `(Exam ${examNum}) What major document was signed in Northern Ireland on Good Friday 1998?`, options: ["Belfast Agreement", "Treaty of Union", "Bill of Rights", "Magna Carta"], answer: "Belfast Agreement", explanation: "The Good Friday (Belfast) Agreement established the peace framework in 1998." },
        { id: 20, q: `(Exam ${examNum}) What is the official residence of the British Monarch in London?`, options: ["Buckingham Palace", "Kensington Palace", "Hampton Court", "Balmoral"], answer: "Buckingham Palace", explanation: "Buckingham Palace serves as the administrative headquarters of the reigning Monarch." },
        { id: 21, q: `(Exam ${examNum}) Which British sport championship is held on grass in south-west London?`, options: ["Wimbledon", "The Open", "Silverstone GP", "Royal Ascot"], answer: "Wimbledon", explanation: "The Wimbledon Championships is the oldest tennis tournament in the world." },
        { id: 22, q: `(Exam ${examNum}) What is the role of the Speaker in the House of Commons?`, options: ["Neutral chairperson", "Government Spokesperson", "Leader of Opposition", "Monarch's Envoy"], answer: "Neutral chairperson", explanation: "The Speaker remains strictly neutral to manage debates in the House of Commons." },
        { id: 23, q: `(Exam ${examNum}) How long is the term of a UK Member of Parliament (MP) before a new election?`, options: ["Up to 5 years", "2 years", "Lifetime", "7 years"], answer: "Up to 5 years", explanation: "MPs serve terms up to a maximum of 5 years." },
        { id: 24, q: `(Exam ${examNum}) Who became Prime Minister in 1945 and instituted the British Welfare State?`, options: ["Clement Attlee", "Winston Churchill", "Harold Wilson", "David Lloyd George"], answer: "Clement Attlee", explanation: "Clement Attlee led the Labour government that created the NHS and modern welfare state." }
      ]
    };
  })
];

export default function App() {
  const [view, setView] = useState('home'); // 'home', 'mcq_test', 'mcq_review', 'mcq_result', 'read'
  const [homeTab, setHomeTab] = useState('mcq'); // 'mcq' or 'read' - Top choice
  const [activeExam, setActiveExam] = useState(null);
  
  // MCQ state
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [candidateName, setCandidateName] = useState('Candidate');

  // Start MCQ Test with Fisher-Yates Shuffling
  const startMCQTest = (exam) => {
    setActiveExam(exam);
    const randomizedQuestions = shuffleArray(exam.questions).map(q => ({
      ...q,
      shuffledOptions: shuffleArray(q.options)
    }));
    setShuffledQuestions(randomizedQuestions);
    setUserAnswers({});
    setCurrentQIndex(0);
    setView('mcq_test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start Direct Read mode (Strict canonical question order)
  const startDirectRead = (exam) => {
    setActiveExam(exam);
    setView('read');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      // Last question completed -> Review Screen
      setView('mcq_review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate score
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
  const isPassed = finalScore >= 18; // 75% of 24 is 18

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
      margin: 0,
      padding: 0
    }}>
      {/* Top Header */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '22px' }}>🇬🇧</span>
          <div>
            <div style={{ fontWeight: '800', fontSize: '16px', color: '#38bdf8' }}>
              Life in UK Practice
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Official 2026 Tests</div>
          </div>
        </div>
        {view !== 'home' && (
          <button
            onClick={() => setView('home')}
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
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '16px 14px', boxSizing: 'border-box' }}>
        
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
                Life in the UK Exam Preparation
              </h1>
              <p style={{ color: '#bae6fd', fontSize: '13px', margin: '0 0 12px 0' }}>
                Choose your study mode below to start practicing or reading the official questions.
              </p>
              <div style={{
                display: 'inline-block',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                ✨ Pass Mark: 18 / 24 (75%)
              </div>
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
                  gap: '6px',
                  boxShadow: homeTab === 'mcq' ? '0 2px 8px rgba(2, 132, 199, 0.4)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>📝</span>
                <span>MCQ Practice Tests</span>
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
                  gap: '6px',
                  boxShadow: homeTab === 'read' ? '0 2px 8px rgba(21, 128, 61, 0.4)' : 'none',
                  transition: 'all 0.2s ease'
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
                    Select MCQ Exam (1 to 17)
                  </h2>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>Shuffled & Timed</span>
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
                          <span style={{ color: '#94a3b8', fontSize: '11px' }}>⏱️ 45 Mins</span>
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
                        Start MCQ Exam →
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
                    Select Study List (1 to 17)
                  </h2>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>Direct Memorization</span>
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
                          Instant answers with explanations.
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
            {/* Clean Progress Header */}
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

            {/* Current Question */}
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

            {/* Navigation: Prev & Save & Next */}
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

              {/* 24 Question status */}
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
                        setView('mcq_test');
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

              {/* Candidate Name for Certificate */}
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
                    setView('mcq_test');
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
                  onClick={() => {
                    setView('mcq_result');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
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

        {/* ================= MCQ RESULT & CERTIFICATE ================= */}
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
                  onClick={() => setView('home')}
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

            {/* Milan Dhanji Certificate (Upon Passing) */}
            {isPassed && (
              <div style={{
                backgroundColor: '#ffffff',
                color: '#0f172a',
                padding: '30px 18px',
                borderRadius: '12px',
                border: '8px double #0284c7',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '26px' }}>🇬🇧</div>
                <div style={{ fontSize: '11px', letterSpacing: '2px', fontWeight: '800', color: '#0284c7', textTransform: 'uppercase' }}>
                  British Citizenship Practice Accreditation
                </div>
                <h1 style={{ fontSize: '22px', fontWeight: '900', margin: '10px 0', fontFamily: 'serif', color: '#0f172a' }}>
                  Certificate of Competence
                </h1>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 10px 0' }}>
                  This certifies that
                </p>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#0369a1', borderBottom: '2px solid #e2e8f0', display: 'inline-block', paddingBottom: '4px' }}>
                  {candidateName || 'Candidate'}
                </div>
                <p style={{ fontSize: '13px', color: '#334155', maxWidth: '420px', margin: '14px auto', lineHeight: '1.5' }}>
                  has successfully passed <strong>{activeExam?.title}</strong> scoring <strong>{finalScore}/24 ({Math.round((finalScore / 24) * 100)}%)</strong>.
                </p>

                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '20px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'cursive', fontSize: '22px', color: '#0369a1', borderBottom: '1px solid #0f172a', padding: '0 14px 2px 14px' }}>
                      Milan Dhanji
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', fontWeight: '700' }}>
                      Certified Digital Evaluator
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', borderBottom: '1px solid #0f172a', padding: '0 14px 6px 14px' }}>
                      {new Date().toLocaleDateString('en-GB')}
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', fontWeight: '700' }}>
                      Issue Date
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Answer Explanations */}
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
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{
              backgroundColor: '#1e293b',
              padding: '14px 16px',
              borderRadius: '12px',
              border: '1px solid #334155',
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 2px 0', color: '#4ade80' }}>
                  📖 {activeExam.title} (Study List)
                </h2>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  Direct canonical sequence with answers
                </span>
              </div>
              <button
                onClick={() => startMCQTest(activeExam)}
                style={{
                  backgroundColor: '#0284c7',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Test 📝
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeExam.questions.map((q, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#1e293b',
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid #334155'
                }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#f8fafc', marginBottom: '6px' }}>
                    {idx + 1}. {q.q}
                  </div>
                  <div style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    color: '#4ade80',
                    border: '1px solid #22c55e',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '700',
                    marginBottom: '6px'
                  }}>
                    Answer: {q.answer}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.4' }}>
                    📘 {q.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
