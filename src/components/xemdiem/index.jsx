import React, { useEffect, useState } from "react";
import "./style.css"
import { CSVLink } from "react-csv";
import { Helmet } from "react-helmet";
import axios from "axios";

function XemDiem({diembylophp}) {
  const [classHPbyid,setClassHPbyid]=useState("1")
  const [diemlophp,setDiemlophp]=useState(diembylophp)
  const getdiembyclass=(el)=>{
    console.log(el);
    setClassHPbyid(el)
    axios.get(`http://localhost:8080/diembyLop/${el}`).then(
      response=>{
        setDiemlophp(response.data)
        
      }
    ).catch(errors=>{
      console.error(errors);
    })
  }
  console.log(diemlophp);
  useEffect(()=>{
    axios.get('http://localhost:8080/diembyLop/1').then(
      response=>{
        setDiemlophp(response.data)
      }
    ).catch(errors=>{
      console.error(errors);
    })
  },[])
  return (
    <div style={{paddingTop:"50px"}}>
            <Helmet>
        <title>Điểm sinh viên</title>
      </Helmet>
      <h1 style={{textAlign:"center"}}>Điểm sinh viên</h1>
  <select 
      style={{marginTop:"10px"}}
        value={classHPbyid}
        onChange={(el) => getdiembyclass(el.target.value)}
      >
        <option value="1">Lập trình C++ 01</option>
        <option value="4">Lập trình C++ 02</option>
        <option value="7">Lập trình C++ 03</option>
        <option value="2">Lập trình hướng đối tượng 01</option>
        <option value="5">Lập trình hướng đối tượng 02</option>
        <option value="8">Lập trình hướng đối tượng 03</option>
        <option value="3">Lập trình python 01</option>
        <option value="6">Lập trình python 02</option>
        <option value="9">Lập trình python 03</option>
      </select>
       <div>
        {!diemlophp||diemlophp===null||diemlophp.length===0?(
          <div>Chưa cập nhật bảng điểm</div>
        ):(
          <table className="table" style={{marginTop:"10px"}}>
          <thead >
            <tr>
              <td style={{textAlign:"center"}}>Họ và Tên</td>
              <td style={{textAlign:"center"}}>Mã Sinh Viên</td>
              <td style={{textAlign:"center"}}>Điểm chuyên cần</td>
              <td style={{textAlign:"center"}}>Điểm bài tập</td>
              <td style={{textAlign:"center"}}>Điểm kiểm tra</td>
              <td style={{textAlign:"center"}}>Điểm thực hành</td>
              <td style={{textAlign:"center"}}>Điểm cuối kỳ</td>
              <td style={{textAlign:"center"}}>Điểm hệ số 10</td>
              <td style={{textAlign:"center"}}>Điểm hệ số 4</td>
            </tr>
          </thead>
          <tbody>
            {!diemlophp||diemlophp===null?(<div></div>):(diemlophp.map((el,index) => (
              <tr key={index}>
                <td style={{textAlign:"center"}}>{el.tenSinhVien}</td>
                <td style={{textAlign:"center"}}>{el.maSv}</td>
                <td style={{textAlign:"right"}}>{parseFloat(el.diemcc).toFixed(1)}</td>
                <td style={{textAlign:"right"}}>{parseFloat(el.diembt).toFixed(1)}</td>
                <td style={{textAlign:"right"}}>{parseFloat(el.diemkt).toFixed(1)}</td>
                <td style={{textAlign:"right"}}>{parseFloat(el.diemth).toFixed(1)}</td>
                <td style={{textAlign:"right"}}>{parseFloat(el.diemck).toFixed(1)}</td>
                <td style={{textAlign:"right"}}>{parseFloat(el.diemtk10).toFixed(1)}</td>
                <td style={{textAlign:"right"}}>{parseFloat(el.diemtk4).toFixed(1)}</td>

              </tr>
            )))}
          </tbody>
        </table>
        )}
       </div>
      {!diemlophp||diemlophp===null?(<div></div>):<CSVLink data={diemlophp}>Export to CSV</CSVLink>}
    </div>
  );
}

export default XemDiem;
