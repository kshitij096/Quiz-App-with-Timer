import React, { useState } from "react";
import QuizData from "../Data/QuizData";
import QuizResult from "../components/QuizResult";
import Timer from "../components/Timer";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(QuizData.length).fill("")
  );
  const [showResult, setShowResult] = useState(false);
  const [timerKeys, setTimerKeys] = useState(QuizData.map(() => Date.now()));
  const [timerRunning, setTimerRunning] = useState(true);
  const [disableBack, setDisableBack] = useState(false);

  const handleOptionClick = (choice) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestion] = choice;
    setSelectedOptions(updatedSelectedOptions);
    setTimerRunning(true);
  };

  const handleClickNext = () => {
    updateScore();
    if (currentQuestion < QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimerKeys((prevTimerKeys) => {
        const updatedTimerKeys = [...prevTimerKeys];
        updatedTimerKeys[currentQuestion + 1] = Date.now();
        return updatedTimerKeys;
      });
      setDisableBack(true); // Disable the back button when proceeding to the next question
      setTimerRunning(false); // Pause the timer
      setTimeout(() => {
        setTimerRunning(true); // Start the timer after 100 milliseconds
      }, 100);
    } else {
      setShowResult(true);
    }
  };

  //Below code is commented because this functionality is uded in back button and back button is not required right now according to scenario.
  // if you want to use back button then modified it accordingly
  // const handleClickBack = () => {
  //   if (currentQuestion > 0 && !disableBack) {
  //     setCurrentQuestion(currentQuestion - 1);
  //     setTimerRunning(false);
  //     setTimerKeys((prevTimerKeys) => {
  //       const updatedTimerKeys = [...prevTimerKeys];
  //       updatedTimerKeys[currentQuestion - 1] = Date.now();
  //       return updatedTimerKeys;
  //     });
  //   }
  // };

  const updateScore = () => {
    const selectedOptionAsString = selectedOptions[currentQuestion].toString();
    const correctAnswer = QuizData[currentQuestion].correctAnswer;
    if (selectedOptionAsString === correctAnswer) {
      setScore(score + 1);
    }
  };

  const reTry = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setSelectedOptions(Array(QuizData.length).fill(""));
    setScore(0);
    setTimerKeys(QuizData.map(() => Date.now()));
    setTimerRunning(true);
  };

  const handleTimeEnd = () => {
    if (currentQuestion < QuizData.length - 1) {
      handleClickNext();
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10 px-20 max-w-screen-sm">
        <p className="text-4xl font-semibold text-center mb-10">Quiz</p>
        {showResult ? (
          <QuizResult
            score={score}
            totalScore={QuizData.length}
            tryAgain={reTry}
          />
        ) : (
          <>
            <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
              <div className="font-semibold mb-4">
                Question {currentQuestion + 1} of {QuizData.length}
              </div>
              <div className="text-lg">
                {QuizData[currentQuestion].question}
              </div>
            </div>
            <div className="space-y-4">
              {QuizData[currentQuestion].choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(choice)}
                  className={`block w-full p-3 rounded-lg text-lg border border-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 ${
                    selectedOptions[currentQuestion] === choice
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              {/* below button is commented because there is no back button when you start the quiz */}
              {/* <button
                className={`py-2 px-4 rounded-lg bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white hover:border-blue-500 border border-gray-300 ${
                  currentQuestion === 0 || disableBack ? "invisible" : ""
                }`}
                disabled={disableBack} // Disable the back button based on the disableBack state
                onClick={handleClickBack}
              >
                Back
              </button> */}
              <Timer
                key={timerKeys[currentQuestion]}
                initialTime={30}
                onTimeout={handleTimeEnd}
                running={timerRunning}
              />
              <button
                className={`py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 ${
                  selectedOptions[currentQuestion] === ""
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                onClick={handleClickNext}
              >
                {currentQuestion === QuizData.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
