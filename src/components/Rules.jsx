import React, { useState } from "react";
import Quiz from "../components/Quiz";

const Rules = () => {
  const [quiz, setQuiz] = useState(true);

  const rules = [
    "Only single participation is allowed.",
    "The medium of the questions will be only English.",
    "There will be no screening round.",
    "Answer the question or wait for the timer to proceed to the next one; you cannot go back.",
    "On the average score derived from all the rounds, winners will be declared.",
    "There will be a certain time span for each round (30sec).",
  ];

  const handleStartQuiz = () => {
    setQuiz(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {quiz ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4 text-indigo-600">
            Quiz Rules
          </h1>
          <div className="mb-4 text-left">
            <h2 className="text-xl font-semibold mb-2">Rules:</h2>
            {rules.map((rule, index) => (
              <p key={index} className="text-lg text-gray-600 ml-4">
                {`${index + 1}. ${rule}`}
              </p>
            ))}
          </div>
          <button
            onClick={handleStartQuiz}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <Quiz />
      )}
    </div>
  );
};

export default Rules;
