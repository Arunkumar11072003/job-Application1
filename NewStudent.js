import React, { useState } from 'react';  
import "./NewStudent.css";
import { Select, Space } from 'antd';
import axios from 'axios';

import { CloseOutlined } from '@ant-design/icons'; 


  
const { Option } = Select;                                                          

const Form = ({navigate,arr,url,setArr,departments}) => {
  
  const [depart, setdepart] = useState(null);
  const [name, setName] = useState("");
  const [DO, setDO] = useState("");
  const [E_mail,setmail]=useState("")
  const [num,setnum]=useState("")
  const [Addres,setAddres]=useState("")
  const [ClosehoverText,setHoverCloseText]=useState("")
  const [submit,setsubmit]=useState("")
  const [goHome,setgoHome]=useState("")
  const [errors, setErrors] = useState({}); 

 
 const handleAlert = () => {
      let newErrors = {};
    
     
      if (!name.trim()) newErrors.name = true;
      if (!E_mail.trim()) newErrors.E_mail = true;
      if (!num.trim()) newErrors.num = true;
    
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors); 
      } else {
        let id = String(arr.length + 1);
        let obj = { id, name, department: depart, DOB: DO, mail: E_mail, number: num, address: Addres };
        console.log(obj);
    
        let updatedArr = [...arr, obj];
        setArr(updatedArr);
        axios.post(url, obj);
        navigate("/");
      }
    };
    

  
  
 
  return (
    <div id="login">
          <div style={{ position: "relative", display: "inline-block" }}>

  <CloseOutlined
        style={{ cursor: "pointer", marginLeft: "600px", fontSize: "24px" }}
        onClick={() => navigate("/")}
        onMouseOver={() => setHoverCloseText("Close the page")}  
        
        onMouseOut={() => setHoverCloseText("")}  
      />
       <div style={{marginLeft:"600px"}}>{ClosehoverText}</div>
        </div>
      <h1> Enter new students Details</h1>
      <form >
        <div>
       
          <label>Student Name *</label>
          <input
  className="input"
  type="text"
  value={name}
  onChange={(e) => {
    setName(e.target.value);
    
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.name;
      return newErrors;
    });
  }}
  style={{
    borderColor: errors.name ? "red" : "",
    boxShadow: errors.name ? "0px 0px 5px red" : ""
  }}
  placeholder={errors.name?" Name is Required field":"name"}
 />


        </div>
        <div className='department'>
     
      <label >Select Department</label>
      <Select
        showSearch
        placeholder="Select a department"
        value={depart}
        onChange={(e)=>setdepart(e)}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {departments.map((dept, index) => (
          <Option key={index} value={dept}>
            {dept}
          </Option>
        ))}
      </Select>
  
    </div>
        <div>
          <label >D.O.B</label>
          <input
          className='input'
            type='date'
            placeholder="DOB"
            value={DO}
            onChange={(e)=>setDO(e.target.value)}
          
          />
        </div>
        <div>
          <label  >E-mail *</label>
          <input
           className='input'
            type='text'
           
            value={E_mail}
            onChange={(e) => {
              setmail(e.target.value);
              
              setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors.E_mail;
                return newErrors;
              });
            }}
            style={{
              borderColor: errors.num ? "red" : "",
              boxShadow: errors.num? "0px 0px 5px red" : ""
            }}
            placeholder={errors.num?" mail is Required field":"mail"}
      
          />
        </div>
        <div>
          <label >Number *</label>
          <input
             className='input' 
             
            type='number'
            
            value={num}
            onChange={(e) => {
              setnum(e.target.value);
              
              setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors.num;
                return newErrors;
              });
            }}
            style={{
              borderColor: errors.num ? "red" : "",
              boxShadow: errors.num ? "0px 0px 5px red" : ""
            }}
            placeholder={errors.num?" number is Required field":"number"}            
          
          />
        </div>
        <div>
          <label>Addres</label>
          <input className='input'
          type='text'
          placeholder='Addres'
          value={Addres}
          onChange={(e)=>setAddres(e.target.value)}/>
        </div>
       
      </form>
      <button className="submit-button" type="button" onClick={handleAlert} onMouseOver={()=>setsubmit(<h4>Add the student</h4>)} onMouseOut={()=>setsubmit("")}>
    Submit
</button>
<h4>{submit}</h4>

<button className="home-button" onClick={() => navigate("/")} onMouseOver={()=>setgoHome(<h4>go to home page</h4>)} onMouseOut={()=>setgoHome("")}>
  Go Home
</button>
<div>{goHome}</div>
    </div>
  );
};

export default Form;
