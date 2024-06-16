import React, { createContext } from 'react'
import { useState } from 'react'


export const SelectedContext = createContext()


export function SelectedContextProvider({ children }) {
  const [selectOption, setSelectOption] = useState([])
  const [formData, setFormData] = useState({
    username: "",
    email: ""
  })


  const handleOptionChange = (questionId, option) => {
    setSelectOption((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const value = {
    selectOption,
    setSelectOption,
    handleOptionChange,
    formData,
    setFormData
  };

  return <SelectedContext.Provider value={value}>
    {children}
  </SelectedContext.Provider>
}