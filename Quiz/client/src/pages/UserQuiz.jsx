import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Result from "./Result";
import { SelectedContext } from "../SelectedContext";
import { Button, Form, Radio, Space, Typography } from 'antd';


const { Text } = Typography;

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        setData(jsonResponse[0].questionArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, loading };
}

const UserQuiz = () => {

  const pageSize = 5; // Number of questions per page
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState(Array(pageSize).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes timer (in seconds)
  const [intervalId, setIntervalId] = useState(null); // State to hold interval ID
  const [isPassValue,setIsPassValue] = useState(null)
  const { formData } = useContext(SelectedContext);
  const userData = formData;
  const { data, loading } = useFetch("http://localhost:8001/question");
  const questionData = data;

  const choosenAns = questionData.map((q, index) => {
    return questionData[index]?.options[answers[index]];
  });



  const correctAnser =  questionData.map((q,index)=>{
    return questionData[index]?.correctAnswer
  })
  

  const totalCorrectAnswer = answers.filter((ans,index)=>{
        return    ans === correctAnser[index]
  })

  const totalQuestion  =  questionData.length
 

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0 && !isSubmitted) {
          onSubmitQuiz();
          clearInterval(intervalId); // Clear the interval when timer reaches 0
          return 0; // Stop decrementing further
        }
        return prevTimer - 1;
      });
    }, 1000);

    setIntervalId(id); // Store interval ID
    return () => clearInterval(id); // Cleanup function to clear interval
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmitQuiz() {
    const dataToSend = {
      username: userData.username,
      email: userData.email,
      correctAnswers: totalCorrectAnswer.length,
      totalQuestion: totalQuestion,
    };
    console.log(dataToSend);
    async function postQuiz() {
      const response = await fetch("http://localhost:8001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const data = await response.json();
      console.log(data);
    }

    postQuiz();
    toast.success("Quiz submitted Successfully");
    setIsSubmitted(true);
  }

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    
    
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
 

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

   const passValueHandler =()=>{
    setIsPassValue('next')
   }

  const submitQuizUser= ()=>{
    console.log("inside quiz user")
    onSubmitQuiz();
    clearInterval(intervalId);
  }

  const handleSubmitQuiz = (value) => {
  console.log('done')
   if(isPassValue === "next"){
    handleNextPage()
    setIsPassValue(null)
   }
  else{
    submitQuizUser()
  }
  };

   function handleFinishFail(err){
    console.log('fail' ,err);
   }
  
  const startQuestionIndex = currentPage * pageSize;
 
  const endQuestionIndex = startQuestionIndex + pageSize;
  const displayedQuestions = questionData.slice(
    startQuestionIndex,
    endQuestionIndex
  );

  if (isSubmitted) {
    return (
      <Result
        username={userData.username}
        questionData={questionData}
        timer={timer}
        answers={answers}
      />
    );
  } else {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Quiz Page</h2>
        <div className="mb-6">
          <p className="text-2xl font-semibold">
            Time Remaining: {Math.floor(timer / 60)}:
            {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
          </p>
        </div>
        {loading ? (
          <p className="text-gray-600 text-lg text-center">
            Loading questions...
          </p>
        ) : (
           <div>
              <Form 
              layout="vertical"
              
               onFinish={handleSubmitQuiz}
               onFinishFailed={handleFinishFail}
             >
              {displayedQuestions.map((question, index) => (
            <Space key={index} direction="vertical" style={{ width: '100%' }}>
            
              <Form.Item
                name={`question_${startQuestionIndex + index}`}
               
                rules={[
                  {
                    required: question?.isCheck ,
                    message: "Please select an answer",
                  },
                ]}
                validateTrigger="onChange"
              >
            <div>
            <Text className="text-xl font-semibold mb-4"   >
              {`${startQuestionIndex + index + 1})${  question.question } ${question.isCheck ? '*' : ""}`}
              </Text>

                <Radio.Group
                className="flex flex-col"
                  onChange={(e) => handleAnswerSelect(startQuestionIndex + index, e.target.value)}
                  value={answers[startQuestionIndex + index]}
                >
                  {question.options.map((option, optionIndex) => (
                    <Radio key={optionIndex} value={optionIndex}>
                      {option}
                    </Radio>
                  ))}
                </Radio.Group>
                </div>
              </Form.Item>
            </Space>
          ))}
          <div className="flex justify-between">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className=" bg-gray-400 text-white rounded-md text-lg hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
            >
              Prev
            </Button>
       
            <Button
              
               htmlType="submit"
               onClick={passValueHandler}
               value={"next"}
              disabled={currentPage === Math.ceil(questionData.length / pageSize) - 1}
              className=" bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Next
            </Button>
            {currentPage === Math.ceil(questionData.length / pageSize) - 1 && (
           
            <Button
           htmlType="submit"
             
            className=" bg-green-500 text-white rounded-md text-lg hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
                Submit Quiz
              </Button>
                 )}
               
          </div>
              </Form>
           </div>
        )}
      </div>
    );
  }
};

               

export default UserQuiz;
