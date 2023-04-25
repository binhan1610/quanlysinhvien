import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./Home";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home1 from "./Home1";
import InforUser from "./components/inforUser";
import ManegementUser from "./components/manegementUser";
import XemDiem from "./components/xemdiem";
import Header from "./components/Header";
import Header1 from "./components/Header1";

import Cauhinh from "./components/cauHinh";
function App() {
  const [diembylophp,setDiembylophp]=useState()
  const [user, setUser] = useState({});
  const [listSV,setListSV]=useState([])
  const [diembysv,setDiembysv]=useState()
  const [cauhinh,setCauHinh]=useState()
  const getUser = (el) => {
    setUser(el);
  };
  const getListSV=(el)=>{
    setListSV(el)
  }
  const getdiembysv=(el)=>{
    setDiembysv(el)
  }
  const getcauhinh=(el)=>{
    setCauHinh(el)
  }
  const getDiembylophp=(el)=>{
    setDiembylophp(el)
  }
useEffect(()=>{
  // localStorage.setItem("checkLogin",JSON.stringify(-1))
  setUser(JSON.parse(localStorage.getItem("inforuser")))
},[])
  return (
    <div>
{(!user===true||user===-1)&&(
          <BrowserRouter>
          <Routes>
            <Route path="*" element={<Login getUser={getUser} getListSV={getListSV} getdiembysv={getdiembysv} getcauhinh={getcauhinh} getDiembylophp={getDiembylophp}/>} />
          </Routes>
        </BrowserRouter>
)}
    

        {!user!==true&&user.quyen==="1"&& (
          <BrowserRouter>
          <Header />
            <Routes>
              <Route path="*" element={<Home/>} />
              <Route path="/xemdiem" element={<XemDiem diembylophp={diembylophp}/>} />
              <Route path="inforuser" element={<InforUser user={user} diembysv={diembysv}/>}/>
              <Route path="/manegementUser" element={<ManegementUser listSV={listSV} />} />
              <Route path="/cauhinh" element={<Cauhinh cauhinh={cauhinh}/>}/>
            </Routes>
          </BrowserRouter>
   
        )}
        {!user!==true&& user.quyen==="0"&&(
          <BrowserRouter>
              <Header1 />
            <Routes>
              <Route path="*" element={<Home1/>} />
              <Route path="/inforUser" element={<InforUser user={user} diembysv={diembysv}/>} />
            </Routes>
          </BrowserRouter>
        )}

      <ToastContainer />
    </div>
  );
}
export default App;
