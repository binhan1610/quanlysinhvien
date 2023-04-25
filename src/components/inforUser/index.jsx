import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Helmet } from "react-helmet";
import axios from "axios";
function InforUser({ diembysv,user }) {
    const [diemsv,setDiemsv]=useState(!JSON.parse(localStorage.getItem("diembysv"))?(-1):(JSON.parse(localStorage.getItem("diembysv"))))
    const [inforuser,setInforUser]=useState(user)
    console.log(diemsv);
  useEffect(()=>{
    axios.get(`http://localhost:8080/diembysv/${inforuser.id}`,).then(response=>{
      console.log(response.data);
      setDiemsv(response.data)
      localStorage.setItem("diembysv",JSON.stringify(response.data))
      
    }).catch(errors=>{
      console.error(errors);
    })
    // setDiemsv(JSON.parse(localStorage.getItem("diembysv")))
    setInforUser(JSON.parse(localStorage.getItem("inforuser")))
  },[])
  return (
    <div style={{ paddingTop: "50px",maxHeight:"100%" }}>
                  <Helmet>
        <title>Thông tin người dùng</title>
      </Helmet >
      <h1 style={{textAlign:"center"}}>Thông tin người dùng</h1>
      <Container style={{paddingLeft:"200px",border:"1px solid blue",padding:"10px",borderRadius:"50px",marginTop:"50px"}}>
        <Row>
          <Col md={6}>
            {inforuser.gioitinh === "nam" ? (
              <Image
                src="https://th.bing.com/th/id/OIP.ZKWIM2yUvNjriRoc49iTRwHaMY?w=128&h=214&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                fluid
                roundedCircle 
                style={{
                  height:"300px",
                  width:"300px",
                  marginLeft:"110px"
                }}
              />
            ) : (
              <Image
                src="https://th.bing.com/th/id/OIP.tIv7hMNe-YT-CYEKP1tFewHaI4?w=179&h=214&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                fluid
                roundedCircle
                style={{
                  height:"300px",
                  width:"300px",
                  marginLeft:"110px"
                }}
              />
            )}
          </Col>
          <Col md={6} style={{marginLeft:"0px",paddingLeft:"140px"}}>
            <h2>{inforuser.hoten}</h2>
            <p>Email: {inforuser.email}</p>
            <p>Số điện thoại: {inforuser.sdt}</p>
            <p>Địa chỉ: {inforuser.diachi}</p>
      
            <p>Ngày sinh: {inforuser.ngaysinh}</p>
            <p>Chức vụ: {inforuser.quyen==="1" ? (<a>Nhân Viên Quản Lý</a>):(<a>Sinh Viên</a>)}</p>
          </Col>
        </Row>
      </Container>
      {diemsv!==-1&&diemsv.length===0&&(<h4 style={{marginLeft:"130px"}}>Sinh viên chưa có điểm</h4>)}
      {diemsv!==-1&&diemsv.map((el,index)=>(
        (
          <div key={index} style={{marginLeft:"120px",marginTop:"20px",marginBottom:"20px"}}>
{ el.tenlophp.charAt(0) === 'c' ? <h3>Môn học: Lập trình C++</h3> : 
  el.tenlophp.charAt(0) === 'j' ? <h3>Môn học: Lập trình hướng đối tương</h3> :
  el.tenlophp.charAt(0) === 'p' ? <h3>Môn học: Lập trình Python</h3> :
  null
}
  <table > 
          <thead>
            <tr>
              <td>Điểm chuyên cần</td>
              <td>Điểm bài tập</td>
              <td>Điểm thực hành</td>
              <td>Điểm kiểm tra</td>
              <td>Điểm cuối kỳ</td>
              <td>Điểm hệ số 10</td>
              <td>Điểm hệ số 4</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td  style={{textAlign:"right"}}>{parseFloat(el.diemcc).toFixed(1)}</td>
              <td style={{textAlign:"right"}}>{parseFloat(el.diembt).toFixed(1)}</td>
              <td style={{textAlign:"right"}}>{parseFloat(el.diemth).toFixed(1)}</td>
              <td style={{textAlign:"right"}}>{parseFloat(el.diemkt).toFixed(1)}</td>
              <td style={{textAlign:"right"}}>{parseFloat(el.diemck).toFixed(1)}</td>
              <td style={{textAlign:"right"}}>{parseFloat(el.diemtk10).toFixed(1)}</td>
              <td style={{textAlign:"right"}}>{parseFloat(el.diemtk4).toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
          </div>
  )
      ))}
    </div>
  );
}

export default InforUser;
