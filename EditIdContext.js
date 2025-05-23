import React, { createContext, useState } from 'react'
const EditIdContext=createContext()
const EditIdProvider = ({children}) => {
  const [editId,setEditId]=useState(null);
  return (
    <EditIdContext.Provider value={{editId,setEditId}}>
      {children}
    </EditIdContext.Provider>
  )
}

export default EditIdContext
export {EditIdProvider}