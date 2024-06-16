
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";

import UserQuiz from "./pages/UserQuiz";
import Admin from "./componets/Admin/Admin";
import UserResult from "./componets/Admin/UserResult";
import QuizAdmin from "./componets/Admin/QuizAdmin";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<UserQuiz />} />
        <Route path="/admin" element={<Admin/>} >
           <Route path="userResult" element={<UserResult/>}/>
           <Route path="quizAdmin" element={<QuizAdmin/>} />
        </Route>
        
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
