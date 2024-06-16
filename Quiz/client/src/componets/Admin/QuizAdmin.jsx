import React, { useState } from "react";
import QuizForm from "./QuizForm";
import QuizList from "./QuizList";
import { nanoid } from "nanoid";


const QuizAdmin = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [mode, setMode] = useState("add");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [isCheck ,setIsCheck] =  useState(false);
  const [id, setId] = useState(nanoid());


const handleCheck = (e) =>{
    setIsCheck(e.target.checked);
  }
  

console.log(isCheck);

  React.useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch("http://localhost:8001/question");
      const data = await response.json();
      const questions = data[0].questionArray;
      setQuizQuestions(questions);
    }

    fetchQuestions();
  }, []);

  const handleAddQuestion = () => {
    setId(nanoid());
    let newQuestion;
    
    newQuestion = {
      id: id,
      isCheck:isCheck,
      question,
      options,
      correctOption,
    };

    console.log(newQuestion);
    async function postQuestion() {
      
      const dataToSend = {
        isCheck:isCheck,
        id: newQuestion.id,
        question: newQuestion.question,
        options: newQuestion.options,
        correctAnswer: newQuestion.correctOption,
      };
      
      console.log(dataToSend);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend), // Convert data to JSON string
      };
      const response = await fetch("http://localhost:8001/question", options);
      const data = await response.json()
      console.log(data);
      setIsCheck(false)
    }

    postQuestion();
    setQuizQuestions([...quizQuestions, newQuestion]);
  };

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = quizQuestions.filter((q) => {
      return q.id != id;
    });

    async function deleteQuestion(id) {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `http://localhost:8001/question/${id}`,
        options
      );
    }

    deleteQuestion(id);
    setQuizQuestions(updatedQuestions);
  };

  const handleEditQuestion = (id) => {
    
    setMode("edit");
    const question = quizQuestions.find((q) => q.id === id);
    setQuestion(question.question);
    setIsCheck(question.isCheck)
    setOptions(question.options);
    setCorrectOption(question.correctOption);
    setId(id);
  };

  // --------- form ----------------

  const handleAddOption = () => {
    setOptions([...options, ""]);
    
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleAddQuestion();
 
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectOption(0);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    let newQuestion = {
      id,
      isCheck,
      question,
      options,
      correctOption,
    };
    
    const updatedQuestions = quizQuestions.map((question) => {
      if (question.id === id) {
        return newQuestion;
      }
      return question;
    });

    async function editQues(id) {
      const dataToSend = newQuestion;

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend), // Convert data to JSON string
      };

      const response = await fetch(
        `http://localhost:8001/question/${id}`,
        options
      );
    }

    editQues(newQuestion.id);

    setQuizQuestions(updatedQuestions);
   
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectOption(0);
    setMode("add");
  };

  // -----------------------------------

  return (
    
    <div>
       
    <div className="container mx-auto mt-5">
    </div>
      
      <div className="grid grid-cols-2 gap-4 ">
        <QuizForm
          question={question}
          setQuestion={setQuestion}
          options={options}
          setOptions={setOptions}
          correctOption={correctOption}
          setCorrectOption={setCorrectOption}
          setId={setId}
          isCheck={isCheck}
          mode={mode} // edit or submit
          setMode={setMode}
          handleAddOption={handleAddOption}
          handleRemoveOption={handleRemoveOption}
          handleSubmit={handleSubmit}
          handleEditSubmit={handleEditSubmit}
          handleCheck={handleCheck}
        />

        <QuizList
          questions={quizQuestions}
          onDeleteQuestion={handleDeleteQuestion}
          onEditQuestion={handleEditQuestion}
        />
      </div>
    </div>
  );
};

export default QuizAdmin;
