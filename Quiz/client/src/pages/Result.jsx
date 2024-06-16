import React from "react";
import { Link } from "react-router-dom";

export default function Result({ questionData, timer, answers, username }) {
  const calculateMarks = () => {
    let marks = 0;
    questionData.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        marks += 1;
      }
    });
    return marks;
  };

  // Convert the timer value (in seconds) to a readable format (minutes and seconds)
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes} min ${seconds} sec`;
  };

  return (
    <div className="container h-full mb-10 mx-auto mt-8 px-4">
      <div className="mb-8 flex flex-row justify-center items-center gap-10 text-center">
        <Link
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-indigo-600
        focus:outline-none text-2xl focus:bg-blue-600 w-[10rem]"
          to="/"
        >
          Home
        </Link>
        <h1 className="text-4xl font-bold mb-2 text-blue-700">
          {username}'s Results
        </h1>
        <p className="text-2xl font-semibold">
          Total Marks: {calculateMarks()} / {answers.length}
        </p>
        <p className="text-lg font-semibold">
          Time Taken: {formatTime(300 - timer)}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {questionData.map((question, index) => (
          <div
            key={question.id}
            className="border p-6 rounded-lg shadow-lg bg-white"
          >
            <h2 className="text-xl font-bold mb-4">{question.question}</h2>
            <p className="mb-2">
              <span className="font-semibold">Correct Answer:</span>{" "}
              {question.options[question.correctAnswer]}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Your Answer:</span>{" "}
              {question.options[answers[index]]}
            </p>
            <p
              className={`text-xl font-semibold ${
                answers[index] === question.correctAnswer
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              Mark: {answers[index] === question.correctAnswer ? "1" : "0"} / 1
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
