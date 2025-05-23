import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Input, Pagination, Select, Space, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./Table.css";
import {  Divider, Flex, Radio, Tooltip } from 'antd';
import EditIdContext from "./EditIdContext";

const { Option } = Select;

const Table = ({ arr, handleDelete, fetchData, departments }) => {
  const { editId, setEditId } = useContext(EditIdContext)
  const [newData, setNewData] = useState({});
  const [search, setSearch] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [hover, setHover] = useState(false);
  const [sortedArr, setSortedArr] = useState(arr);
  const [position, setPosition] = useState('end');
  const[filteredArr,setFilteredArr]=useState(arr)
  const [sortOrder, setSortOrder] = useState({ id: "asc", name: "asc",address:"asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const handleSearch = () => {
    const filteredData = sortedArr.filter((item) => {
      return (
        (searchId.trim() === "" || String(item.id).includes(searchId)) &&
        (search.trim() === "" || item.name.toLowerCase().includes(search.toLowerCase())) &&
        (searchDepartment.trim() === "" || item.department.toLowerCase().includes(searchDepartment.toLowerCase()))
      );
    });
    setFilteredArr(filteredData)
    setCurrentPage(1)
  };




  

  const handleEditClick = (item) => {
    setEditId(item.id);
    setNewData({
      name: item.name,
      department: item.department,
      DOB: item.DOB,
      mail: item.mail,
      number: item.number,
      address:item.address
    });
  };

  const groupedStudents = [];
  for (let i = 0; i < filteredArr.length; i += 10) {
    groupedStudents.push(filteredArr.slice(i, i + 10));
  }

  useEffect(()=>{
    setSortedArr(arr);
    setFilteredArr(arr)
  },[arr])

  const handleSort = (field) => {
    const order = sortOrder[field] === "asc" ? "desc" : "asc";
    const sortedData = [...filteredArr].sort((a, b) => {
      if (field === "id") {
        return order === "asc" ? a.id - b.id : b.id - a.id;
      }
      return order === "asc"
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    });
    setFilteredArr(sortedData);
    setSortOrder({ ...sortOrder, [field]: order });
  }

  const startIndex=(currentPage-1)*pageSize
  const currentItem=filteredArr.slice(startIndex,startIndex+pageSize)


  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when page size changes
  }
  return (
    <div className="table-container">

      <h1>Student Records</h1>
      
      
      <div style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" ,marginLeft:"-200px"}}>
        <Input 
          placeholder="ID"
          value={searchId}
          type="number"
          onChange={(e) => setSearchId(e.target.value)}
          style={{ width: "100px", marginBottom: "10px", borderColor: "black" }}
          title="Enter Search ID"
        />
        <Input
          placeholder="Search Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "200px", marginBottom: "10px", marginTop: "-20px", borderColor: "black" }}
        />
        <div className="searchDepartment">
        <Space >
          <Select 
            showSearch
            style={{ width: "200px", height: "40px", borderColor: "black" }}
            placeholder="Search Department"
            value={searchDepartment || undefined}
            onChange={(value) => setSearchDepartment(value)}
          >
            {departments.map((dept, index) => (
              <Option key={index} value={dept}>
                {dept}
              </Option>
            ))}
          </Select>
        </Space>
        </div>
        <Button className="search" icon={<SearchOutlined />}  iconPosition={position} onClick={handleSearch}>
            Search
          </Button>
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredArr.length}
        onChange={(page) => setCurrentPage(page)}
        onShowSizeChange={handlePageSizeChange}
        pageSizeOptions={['5', '10', '15', '20']}
        showSizeChanger
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        style={{ marginTop: "20px", textAlign: "center" }}
      /><br/>
    
            <table border={1} className="simple-table">
              <thead>
                <tr>
                  <th>ID{""}
                  <button className="sort" size="small" onClick={() => handleSort("id")} title={sortOrder.address === "asc" ? "Sort Ascending" : "Sort Descending"}>
                {sortOrder.id === "asc" ? "🔼" : "🔽"}
              </button>
                  </th>
                  <th>Student Name{""}
                  <button className="sort" size="small" onClick={() => handleSort("name")} title={sortOrder.address === "asc" ? "Sort Ascending" : "Sort Descending"}>
                {sortOrder.name === "asc" ? "🔼" : "🔽"}
              </button>
                  </th>
                  <th>Department</th>
                  <th>DOB</th>
                  <th>E-mail</th>
                  <th>Mobile Number</th>
                  <th>Address{""}
                  <button className="sort" onClick={() => handleSort("address")} title={sortOrder.address === "asc" ? "Sort Ascending" : "Sort Descending"}>
                {sortOrder.address === "asc" ? "🔼" : "🔽"}
              </button>
                  </th>
                  
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentItem.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><Link to="/Update" style={{textDecoration:"none"}}title="Click here to update" onClick={()=>handleEditClick(item)}> <span title="Click here to update">{item.name}</span></Link></td>
                    <td>{item.department}</td>
                    <td>{item.DOB}</td>
                    <td>{item.mail}</td>
                    <td>{item.number}</td>
                    <td>{item.address} </td>
                    
                    <td>
                      <button
                        className="delet-button"
                        style={{ padding: "5px 10px", margin: "2px", fontSize: "15px", backgroundColor: "red", color: "black" }}
                        onClick={() => handleDelete(item.id)} 
                        title="Click here to delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           
    
      
      <Link to="/add student">
        <button className="addstudent">Add Student</button>
      </Link>
    </div>
  );
};

export default Table;
