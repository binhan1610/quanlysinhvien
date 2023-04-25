import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {  Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import { useForm } from 'react-hook-form';
import axios from "axios";


function Signup({getUser,getListSV,getdiembysv,getcauhinh,getDiembylophp}) {
  const { handleSubmit, register, formState:{errors} } = useForm();
  const Navigate = useNavigate()

  
  
  const handerclick = data => {
    const user_send={
      user_name:data.username,
      pass_word:data.password
    }
 
    axios.post('http://localhost:8080/login',JSON.stringify(user_send), {headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer <token>",
      "badrequest": "true"
    }} ).then(response=>{
      console.log(response.data);
      // setLogin(response.data)
      if (response.data.quyen === "1") {
        axios.get('http://localhost:8080/listSV',).then(response=>{
            console.log(response.data);
            getListSV(response.data)
            localStorage.setItem("ListSV",JSON.stringify(response.data))
          }).catch(errors=>{
            console.error(errors);
          })
        axios.get(`http://localhost:8080/cauhinhdiems/1`)
        .then(response=>{
          getcauhinh(response.data)
          localStorage.setItem("cauhinhthangdiem",JSON.stringify(response.data))
          console.log(response.data);})
        .catch(errors=>{console.error(errors);})
        axios.get(`http://localhost:8080/diembyLop/1`)
        .then(response=>{
          getDiembylophp(response.data)
          localStorage.setItem("diembylophp",JSON.stringify(response.data))
        })
        .catch(errors=>{
          console.error(errors);
        })
          toast.success("đăng nhập thành công");
          getUser(response.data)
          getdiembysv(-1)
          localStorage.setItem("inforuser",JSON.stringify(response.data))
          localStorage.setItem("diembysv",JSON.stringify(-1))
          Navigate("/home")
       }
        else if(response.data.quyen==="0"){
          axios.get(`http://localhost:8080/diembysv/${response.data.id}`,).then(response=>{
            console.log(response.data);
            getdiembysv(response.data)
            localStorage.setItem("diembysv",JSON.stringify(response.data))
            
          }).catch(errors=>{
            console.error(errors);
          })
      
          toast.success("đăng nhập thành công");
          // const findindex =user.findIndex((el)=>data.username === el.username&& data.password===el.password)
          getUser(response.data)
          localStorage.setItem("inforuser",JSON.stringify(response.data))
          Navigate("/home")
        } 
        else{
          toast.error("Tài khoản hoặc mật khẩu không chính xác")
          getUser(-1)
          getdiembysv(-1)
          localStorage.setItem("inforuser",JSON.stringify(-1))
          localStorage.setItem("diembysv",JSON.stringify(-1))
        }
    }).catch(error => {
      console.error(error);
    })

  }
    


    

    
   
    


  return (
    <div>
           <Helmet>
          <title>Đăng Nhập</title>
        </Helmet>
      <img style={{width:"2000px",height:"800px"}}
        src="https://th.bing.com/th/id/OIP.R3-Ls3JMAVvHMuO_-y3VtAHaEK?w=294&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        alt="slide"
      ></img>
      <Modal show={true} >
        <Modal.Header>
          <Modal.Title>Đăng Nhập</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <form onSubmit={handleSubmit(handerclick)}>
          <div className="form-group">
            <label >Tài Khoản</label>
            <input
              type="text"
          
              name='username'
              {...register('username', {required:true,minLength:8,maxLength:32})}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
             
            />
            {errors.username &&errors.username.type==="required" &&(
              <div className="invalid-feedback">Không được để trống tài khoản</div>
            )}
            {errors.username&&errors.username.type==="minLength"&&
            <div className="invalid-feedback">Vui lòng nhập tài khoản có độ dài từ 8 đến 32 ký tự</div>}
            {errors.username&&errors.username.type==="maxLength"&&
            <div className="invalid-feedback">Vui lòng nhập tài khoản có độ dài từ 8 đến 32 ký tự</div>}
          </div>
          <div className="form-group">
            <label >Mật Khẩu</label>
            <input
              type="password"
          
              name='password'
              {...register('password', {required:true,minLength:8,maxLength:32})}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
             
            />
            {errors.password && errors.password.type==="required"&& (
              <div className="invalid-feedback">Không được để trống mật khẩu</div>
            )}
             {errors.password&&errors.password.type==="minLength"&&
            <div className="invalid-feedback">Vui lòng nhập mật khẩu có độ dài từ 8 đến 32 ký tự</div>}
            {errors.password&&errors.password.type==="maxLength"&&
            <div className="invalid-feedback">Vui lòng nhập mật khẩu có độ dài từ 8 đến 32 ký tự</div>}
          </div>
          <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}> 
          Đăng Nhập
          </button>
        </form>

        </Modal.Body>

      </Modal>
    </div>
  );
}

export default Signup;
