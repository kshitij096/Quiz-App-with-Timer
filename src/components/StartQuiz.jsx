import React, { useState } from "react";
import Rules from "./Rules";

const App = () => {
  const [showStartRules, setShowStartRules] = useState(true);

  const handleStartRules = () => {
    setShowStartRules(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {showStartRules ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold mb-4 text-indigo-600">
            Welcome to the Quiz
          </h1>
          <div className="mb-4">
            <h3 className="text-lg text-gray-600">Take this Quiz for fun</h3>
          </div>
          <button
            onClick={handleStartRules}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none"
          >
            Go Through The Rules
          </button>
        </div>
      ) : (
        <Rules />
      )}
    </div>
  );
};

export default App;
