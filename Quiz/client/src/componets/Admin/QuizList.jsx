import React from "react";

const QuizList = ({ questions, onDeleteQuestion, onEditQuestion }) => {
 
  console.log(questions);
  return (
    <div className="container mx-auto mt-8 px-4 h-[30rem] overflow-scroll max-w-3xl">
      <h2 className="text-2xl font-medium mb-4 text-center">Quiz Questions</h2>
       <label>total question : {questions.length }</label>
      <div className="grid gap-4">
        {questions?.map((question, index) => (
          <div key={index} className="border rounded-md shadow-md p-4">
            <div className="mb-4 font-semibold">{
              `${question.question} ${question?.isCheck ? ("*"): "" }`
            }</div>
            <ul className="list-disc pl-6 mb-4">
              {question?.options?.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => onEditQuestion(question.id)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteQuestion(question.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
