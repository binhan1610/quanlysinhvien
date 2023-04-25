import React from 'react'
import "./style.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Header() {

  const handerOut=()=>{
    localStorage.setItem("diembysv",JSON.stringify(-1))
    localStorage.setItem("inforuser",JSON.stringify(-1))
  axios.get('htpp://localhost:8080/logout')
  .then(response=>{console.log(response);})
  .catch(errors=>{console.error(errors);})
  }
  return (
    <div className='header'>
       
        <Link className='link' to={"/home"}>Trang chủ</Link>
        <Link className='link' to={'/inforUser'}>Thông tin cá nhân</Link>
        <a href='/login' onClick={handerOut} className='link'>Đăng Xuất</a>
    </div>
  )
}

export default Header