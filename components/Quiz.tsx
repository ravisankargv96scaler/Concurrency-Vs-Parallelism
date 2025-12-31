import React, { useState } from 'react';
import { Question } from '../types';

const questions: Question[] = [
  {
    id: 1,
    text: "If you have a single-core CPU, can you achieve true Parallelism?",
    options: ["Yes, if the code is optimized.", "No, only Concurrency (Time-slicing).", "Yes, using Threads.", "Only with Node.js"],
    correctAnswer: 1,
  },
  {
    id: 2,
    text: "Which approach involves 'Context Switching' overhead?",
    options: ["Parallelism", "Concurrency", "Neither", "Both equally"],
    correctAnswer: 1,
  },
  {
    id: 3,
    text: "Rendering a 4K video is typically...",
    options: ["I/O Bound (Concurrency friendly)", "Memory Bound", "CPU Bound (Parallelism friendly)", "Network Bound"],
    correctAnswer: 2,
  }
];

const Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const getScore = () => {
    return answers.reduce((acc, ans, idx) => acc + (ans === questions[idx].correctAnswer ? 1 : 0), 0);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 text-center">
        <h2 className="text-2xl font-bold mb-2 text-white">Knowledge Check</h2>
        <p className="text-slate-300">Did you grasp the difference? Let's find out.</p>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
            <h3 className="text-lg font-medium text-white mb-4">{idx + 1}. {q.text}</h3>
            <div className="space-y-2">
              {q.options.map((opt, optIdx) => {
                let btnClass = "w-full p-3 text-left rounded-lg border transition-all ";
                
                if (submitted) {
                    if (optIdx === q.correctAnswer) btnClass += "bg-green-900/50 border-green-500 text-green-200";
                    else if (answers[idx] === optIdx && optIdx !== q.correctAnswer) btnClass += "bg-red-900/50 border-red-500 text-red-200";
                    else btnClass += "bg-slate-900 border-slate-700 text-slate-500 opacity-50";
                } else {
                    if (answers[idx] === optIdx) btnClass += "bg-indigo-600 border-indigo-500 text-white";
                    else btnClass += "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700";
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(idx, optIdx)}
                    className={btnClass}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setSubmitted(true)}
            disabled={answers.includes(-1)}
            className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/10"
          >
            Submit Answers
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 text-center mt-4 animate-fade-in">
          <div className="text-4xl font-bold mb-2 text-white">{getScore()} / {questions.length}</div>
          <p className="text-slate-400">
            {getScore() === 3 ? "Perfect! You're a Multi-Core Master." : "Good try! Review the tabs to solidify the concepts."}
          </p>
          <button 
            onClick={() => { setSubmitted(false); setAnswers([-1,-1,-1]); }}
            className="mt-4 text-indigo-400 hover:text-indigo-300 underline"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;