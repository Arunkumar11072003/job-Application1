import React, { useContext, useEffect, useState } from 'react'
import EditIdContext from './EditIdContext'
import { Modal, Select } from 'antd'
import axios from 'axios';
import { CloseOutlined } from '@ant-design/icons'; 
import { useNavigate } from 'react-router-dom';
import "./Update.css";


const { Option } = Select; 
const Update = ({arr,departments,url,fetchData}) => {
  const { editId, setEditId } = useContext(EditIdContext)
  const [updatedName,setUpdatedName]=useState("")
  const [updatedDepartment,setUpdatedDepartment]=useState("")
  const [updatedDOB,setUpdatedDOB]=useState("")
  const [updatedMail,setUpdatedMail]=useState("")
  const [updatedNumber,setUpdatedNumber]=useState("")
  const [updatedAddress,setUpdatedAddress]=useState("")
  const [updatedData,setUpdatedData]=useState({})
  const navigate=useNavigate()
    const [ClosehoverText,setHoverCloseText]=useState("")
    const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (editId) {
      // Assuming editId is the id value (not the whole object)
      const foundItem = arr.find(item => item.id === editId);
      if (foundItem) {
        setUpdatedName(foundItem.name)
        setUpdatedDepartment(foundItem.department)
        setUpdatedDOB(foundItem.DOB)
        setUpdatedMail(foundItem.mail)
        setUpdatedNumber(foundItem.number)
        setUpdatedAddress(foundItem.address)
      } else {
        setUpdatedName('')
        setUpdatedName('')
        setUpdatedDepartment('')
        setUpdatedDOB('')
        setUpdatedMail('')
        setUpdatedNumber('')
        setUpdatedAddress('')
      }
    }
  }, [editId, arr]);
  useEffect(()=>{
    setUpdatedData({
      name:updatedName,
     department: updatedDepartment,
      DOB: updatedDOB,
      mail: updatedMail,
      number: updatedNumber,
      address:updatedAddress
    });
  },[updatedName, updatedDepartment, updatedDOB, updatedMail, updatedNumber, updatedAddress])
 
  
const handleUpdate=async()=>{
  const foundSame = arr.find(item => item.id === editId);
  if(updatedAddress===foundSame.address&&updatedDOB===foundSame.DOB&&updatedDepartment===foundSame.department){
    setIsModalVisible(true)
    setTimeout(() => {
      setIsModalVisible(false);
    }, 3000);
  }
  else{
 await axios.put(`${url}/${editId}`,updatedData)
 setEditId(null)
 alert("datas successfully updated")
 fetchData()
 navigate("/")
}}
const handleClose=()=>{
  navigate("/")
}

  return (
    <div id="login">
      
      <CloseOutlined
        style={{ cursor: "pointer", marginLeft: "600px", fontSize: "24px" }}
        onClick={() => navigate("/")}
        title='Close the page'
        onMouseOver={() => setHoverCloseText("Close the page")}  
        
        onMouseOut={() => setHoverCloseText("")}  
      />

      <h1>Update Page</h1>

        <form>
        <div>
        <label>Student Name</label>
          <input
          placeholder='Name'
  className="input"
  value={updatedName}
 />
 </div>
<div>
          <label >Select Department</label>
          <Select
          className='input'
  showSearch
  placeholder="Select a department"
  value={updatedDepartment||undefined}
  onChange={(e) => setUpdatedDepartment(e)}
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
            value={updatedDOB}
            onChange={(e)=>setUpdatedDOB(e.target.value)}
          />  
          </div>
<div>
           <label  >E-mail *</label>
          <input
           className='input'
           placeholder='Mail' 
           
            value={updatedMail}    /> 
</div>
<div>
<label  >Number</label>
          <input
           className='input'
            placeholder='Number'
           
            value={updatedNumber}    /> 
</div>
<div>
<label >Address</label>
          <input
          className='input'
            type="text"
            placeholder="Adress"
            value={updatedAddress}
            onChange={(e)=>setUpdatedAddress(e.target.value)}
          />  
          </div>
          
  
      </form>
      <button className='Update button' onClick={handleUpdate} title='Click here to update'>update</button><br/>
      <Modal
        title="No Changes Detected"
        open={isModalVisible}
        footer={null}
        closable={false}
        width={250}
        hight={30}
      >
       
      </Modal>
      <button className='Update button' onClick={handleClose} title='Navigate to Home page'>Close</button>
    </div>
  )
}

export default Update