import React from "react";

export default function QuizForm({
  question,
  setQuestion,
  options,
  setOptions,
  correctOption,
  setCorrectOption,
  handleAddOption,
  handleRemoveOption,
  handleSubmit,
  mode,
  handleEditSubmit,
  handleCheck,
  isCheck
}) {
  return (
    <form className="w-full max-w-lg mx-auto mt-2">
         <div className=" flex">
         <label className="block mb-2 font-semibold mr-2">Is Required</label> <input type="checkbox" checked={isCheck} onChange={handleCheck} />
      
         </div>
   
      <div className="mb-6">
      <label htmlFor="question" className="block  font-semibold">
          Question:
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Options:</label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-3">
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
            {options.length > 2 && (
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddOption}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Add Option
        </button>
        
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Correct Option:</label>
        <select
          value={correctOption}
          onChange={(e) => setCorrectOption(parseInt(e.target.value))}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
        >
          {options.map((_, index) => (
            <option key={index} value={index}>
              Option {index + 1}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={mode === "edit" ? handleEditSubmit : handleSubmit}
      >
        {mode === "edit" ? "Edit Question" : "Add Question"}
      </button>
    </form>
  );
}
