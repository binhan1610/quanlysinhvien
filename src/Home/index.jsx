import React from "react";
import "./style.css";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
function Home() {
  return (
    <>
    <Header />
    <div style={{paddingTop:"50px"}}>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <h1 style={{textAlign:"center"}}>Trang chủ</h1>
      <p>Đang cập nhật ....</p>
    </div>
    </>
  );
}

export default Home;
