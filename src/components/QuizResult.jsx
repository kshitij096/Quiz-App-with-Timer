import React from "react";

const QuizResult = ({ score, totalScore, tryAgain }) => {
  let suggestion;
  if (score >= 1 && score <= 4) {
    suggestion = "Weak";
  } else if (score >= 5 && score <= 7) {
    suggestion = "Average";
  } else if (score >= 8 && score <= 9) {
    suggestion = "Good";
  } else if (score === 10) {
    suggestion = "Excellent";
  }

  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-md text-center">
      <p className="text-5xl font-semibold text-indigo-600 mb-6">Quiz Score</p>
      <p className="text-2xl font-semibold mb-4">
        Your Score: {score} / {totalScore}
      </p>
      {suggestion && (
        <p className="text-lg font-semibold mb-4">
          Your performance: {suggestion}
        </p>
      )}
      <button
        onClick={tryAgain}
        className="bg-indigo-600 text-white text-lg px-6 py-3 rounded-full hover:bg-indigo-700 focus:outline-none transition duration-300 ease-in-out"
      >
        Try Again
      </button>
    </div>
  );
};

export default QuizResult;
