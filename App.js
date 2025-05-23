import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import NewStudent from "./NewStudent";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Form } from "react-router-dom";
import Search from "./Search";
import EditIdContext, { EditIdProvider } from "./EditIdContext";

import Update from "./Update";

function App() {
  const [arr, setArr] = useState([]);
  const url = "http://localhost:4200/arr";

  let navigate=useNavigate()


  let departments = [
    "Computer Science",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Information Technology",
    "Electronics & Communication",
    "Bio Technology"
  ];


 
  
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setArr(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      fetchData(); 
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (


    <EditIdProvider>
   
          <div className="App" style={{textAlign:"center"}}>
           
           <Search/>
     <Routes>
      <Route path="/" element={ <Table arr={arr} handleDelete={handleDelete} fetchData={fetchData} departments={departments}/>
}>

      </Route>
      
      <Route path="/add student" element={<NewStudent 

                            departments={departments}
                            navigate={navigate}
                            arr={arr}
                            url={url}
                            setArr={setArr}
                            
                />}>

      </Route>
      <Route path="/Update" element={<Update  arr={arr} departments={departments} url={url} fetchData={fetchData}/>
}>

      </Route>
     </Routes>
      
      

      
    
    </div>
    </EditIdProvider>
   
  );
}

export default App;
