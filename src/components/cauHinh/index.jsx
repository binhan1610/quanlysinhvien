import axios from "axios";
import React, { useEffect, useState } from "react";
import './style.css'
import { Button, Modal } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
function CauHinh({cauhinh}) {
  const {
    handleSubmit,
    
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [idcauhinh,setidcauhinh]=useState(!JSON.parse(localStorage.getItem("cauhinhthangdiem"))[0]?(null):(JSON.parse(localStorage.getItem("cauhinhthangdiem"))[0].id) )
  const [cauhinhthangdiem,setCauhinhthangdiem]=useState(cauhinh)
  const [lophpbyid,setLophpbyid]=useState("1")
  const [showadd,setShowAdd]=useState(false)
  const [showcorrec,setShowCorrec]=useState(false)
  const selectmonhoc=(el)=>{
    
    console.log(el);
    setLophpbyid(el)
    axios.get(`http://localhost:8080/cauhinhdiems/${el}`)
    .then(respones=>{
      
      setCauhinhthangdiem(respones.data)
     
      setidcauhinh(respones.data[0].id)
      localStorage.setItem('cauhinhthangdiem',JSON.stringify(respones.data))
    })
    .catch(errors=>{console.error(errors);})
  }
  const handershowadd=()=>{
  setShowAdd(true)
  }
  const handerShowCorrec=()=>{
    setShowCorrec(true)
    console.log(`http://localhost:8080/cauhinhdiems/${idcauhinh}`);
  }
  const handerClose=()=>{
    setShowAdd(false)
    setShowCorrec(false)
    reset()
  }
  const handercorrec=(data)=>{
    console.log(data);
    if(parseInt(data.diemcc)+parseInt(data.diembt)+parseInt(data.diemkt)+parseInt(data.diemth)+parseInt(data.diemck)!==100) return toast.error("Tổng số điểm không đủ 100")
    const cauhinhcorrec={
     
      diembt:data.diembt,
      diemcc:data.diemcc,
      diemck:data.diemck,
      diemkt:data.diemkt,
      diemth:data.diemth
      
    }
    axios.put(`http://localhost:8080/cauhinhdiems/${idcauhinh}`,cauhinhcorrec,{headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer <token>",
      "badrequest": "true"
    }}).then(response=>{
      toast.success("sửa thành công")
      setShowCorrec(false)
      console.log(response.data);

      axios.get(`http://localhost:8080/cauhinhdiems/${lophpbyid}`)
      .then(respones=>{
        console.log(respones.data)
        setCauhinhthangdiem(respones.data)
        localStorage.setItem('cauhinhthangdiem',JSON.stringify(respones.data))
      })
      .catch(errors=>{console.error(errors);})
      
    }).catch(errors=>{
      console.error(errors);
    })
    reset()
  }
  const handeradd=(data)=>{
    if(parseInt(data.diemcc)+parseInt(data.diembt)+parseInt(data.diemkt)+parseInt(data.diemth)+parseInt(data.diemck)!==100) return toast.error("Tổng số điểm không đủ 100")
    const cauhinhadd={
   cauHinh:{
    diembt:data.diembt,
    diemcc:data.diemcc,
    diemck:data.diemck,
    diemkt:data.diemkt,
    diemth:data.diemth
   }
  }
  axios.post(`http://localhost:8080/cauhinhdiems/add?idMonHoc=${lophpbyid}`,JSON.stringify(cauhinhadd),{headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer <token>",
    "badrequest": "true"
  }}).then(response=>{
    axios.get(`http://localhost:8080/cauhinhdiems/${lophpbyid}`)
    .then(respones=>{

      setCauhinhthangdiem(respones.data)
      setidcauhinh(respones.data[0].id)
     
      setShowAdd(false)
      toast.success("Thêm cấu hình thành công")
      localStorage.setItem('cauhinhthangdiem',JSON.stringify(respones.data))
    })
    .catch(errors=>{console.error(errors);})
    console.log(response.data);
  }).catch(errors=>{
    console.error(errors);
  })
  reset()
  }
  useEffect(()=>{
    setidcauhinh(!JSON.parse(localStorage.getItem("cauhinhthangdiem"))[0]?(null):(JSON.parse(localStorage.getItem("cauhinhthangdiem"))[0].id))
    axios.get(`http://localhost:8080/cauhinhdiems/1`)
    .then(respones=>{

      console.log(respones.data)
      setCauhinhthangdiem(respones.data)
      localStorage.setItem('cauhinhthangdiem',JSON.stringify(respones.data))
    })
    .catch(errors=>{console.error(errors);})
  
  },[])

  return (
    <div style={{ paddingTop: "50px" }}>
      <Helmet>
        <title>Cấu hình điểm</title>
      </Helmet>
      <h1 style={{textAlign:"center"}}>Cấu hình thang điểm</h1>
      <div>
      <select 
      style={{marginTop:"10px",padding:"10px",marginLeft:"10px"}}
        value={lophpbyid}
        onChange={(el) => selectmonhoc(el.target.value)}
      >
        <option value="1">Lập trình C++</option>
        <option value="2">Lập trình hướng đối tượng</option>
        <option value="3">Lập trình Wep</option>
      </select>
 
      </div>
    {(cauhinhthangdiem=== null||!cauhinhthangdiem||cauhinhthangdiem.length===0) ?(
      <div style={{marginTop:"20px"}}>
        <div>Môn học này chưa có cấu hình thang điểm</div>
        <div style={{marginTop:"10px"}}><Button onClick={handershowadd}>Thêm cấu hình</Button></div>
      </div>
    ):(
      <Container style={{marginLeft:"10px",display:"inline-block"}}>
        <Row>

          <Col >
            <h5 className="container">Điểm chuyên cần: 
              <span className="span">{cauhinhthangdiem[0].diemcc}</span>
              </h5>
            <h5 className="container">Điểm bài tập: 
              <span className="span">{cauhinhthangdiem[0].diembt}</span>
              </h5>
            <h5 className="container">Điểm kiểm tra: 
              <span className="span">{cauhinhthangdiem[0].diemkt}</span>
              </h5>
            <h5 className="container">Điểm thực hành: 
              <span className="span">{cauhinhthangdiem[0].diemth}</span>
              </h5>
            <h5 className="container">Điểm cuối kỳ: 
              <span className="span">{cauhinhthangdiem[0].diemck}</span>
              </h5>
            <h5 className="container">Ngày bắt đầu: 
              <span className="span">{cauhinhthangdiem[0].ngaybatdau}</span>
              </h5>
          </Col> 
        </Row>
          <Button onClick={handerShowCorrec}>Sửa cấu hình</Button>
      </Container>
)}
     <div>
      <Modal show={showadd} onHide={handerClose}>
        <Modal.Header closeButton={handerClose}>
        <Modal.Title>Thêm cấu hình điểm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handeradd)}>
            <div className="form-group">
              <label>Điểm chuyên cần</label>
              <input
              
              name="diemcc"
              {...register("diemcc",{
                required:true,
                validate: (value) => {
                  const allowedValues = [0,10, 20, 30, 40, 50, 60, 70, 80, 90];
                  return allowedValues.includes(parseInt(value))
                    ? true
                    : "Giá trị không hợp lệ";
                }
              })} 
              className={`form-control ${errors.diemcc ? "is-invalid" : ""}`}
              />
                 {errors.diemcc && errors.diemcc.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống điểm chuyên cần
                </div>
              )}
                               {errors.diemcc && errors.diemcc.type === "validate" && (
                <div className="invalid-feedback">
                  Giá trị không hợp lệ
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Điểm bài tập</label>
              <input
              
              name="diembt"
              {...register("diembt",{
                required:true,
                validate: (value) => {
                  const allowedValues = [0,10, 20, 30, 40, 50, 60, 70, 80, 90];
                  return allowedValues.includes(parseInt(value))
                    ? true
                    : "Giá trị không hợp lệ";
                }
              })} 
              className={`form-control ${errors.diembt ? "is-invalid" : ""}`}
              />
                 {errors.diembt && errors.diembt.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống điểm bài tập
                </div>
              )}
                               {errors.diembt && errors.diembt.type === "validate" && (
                <div className="invalid-feedback">
                  Giá trị không hợp lệ
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Điểm kiểm tra</label>
              <input
              
              name="diemkt"
              {...register("diemkt",{
                required:true,
                validate: (value) => {
                  const allowedValues = [0,10, 20, 30, 40, 50, 60, 70, 80, 90];
                  return allowedValues.includes(parseInt(value))
                    ? true
                    : "Giá trị không hợp lệ";
                }
              })} 
              className={`form-control ${errors.diemkt ? "is-invalid" : ""}`}
              />
                 {errors.diemkt && errors.diemkt.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống điểm kiểm tra
                </div>
              )}
                               {errors.diemkt && errors.diemkt.type === "validate" && (
                <div className="invalid-feedback">
                  Giá trị không hợp lệ
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Điểm thực hành</label>
              <input
              
              name="diemth"
              {...register("diemth",{
                required:true,
                validate: (value) => {
                  const allowedValues = [0,10, 20, 30, 40, 50, 60, 70, 80, 90];
                  return allowedValues.includes(parseInt(value))
                    ? true
                    : "Giá trị không hợp lệ";
                }
              })} 
              className={`form-control ${errors.diemth ? "is-invalid" : ""}`}
              />
                 {errors.diemth && errors.diemth.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống điểm thực hành
                </div>
              )}
                               {errors.diemth && errors.diemth.type === "validate" && (
                <div className="invalid-feedback">
                  Giá trị không hợp lệ
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Điểm cuối kỳ</label>
              <input
              
              name="diemck"
              {...register("diemck",{
                required:true,
                validate: (value) => {
                  const allowedValues = [0,10, 20, 30, 40, 50, 60, 70, 80, 90];
                  return allowedValues.includes(parseInt(value))
                    ? true
                    : "Giá trị không hợp lệ";
                }
              })} 
              className={`form-control ${errors.diemck ? "is-invalid" : ""}`}
              />
                 {errors.diemck && errors.diemck.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống điểm cuối kỳ
                </div>
              )}
                 {errors.diemck && errors.diemck.type === "validate" && (
                <div className="invalid-feedback">
                  Giá trị không hợp lệ
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "20px" }}
            >
             Thêm
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handerClose}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal sửa */}
      <Modal show={showcorrec} onHide={handerClose}>
        <Modal.Header closeButton={handerClose}>
        <Modal.Title>Sửa cấu hình điểm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handercorrec)}>
            <div className="form-group">
              <label>Điểm chuyên cần</label>
              <input
              
              name="diemcc"
              {...register("diemcc",{
                required:true,
                validate: (value) => {
                  const allowedValues = [0,10, 20, 30, 40, 50, 60, 70, 80, 90];
                  return allowedValues.includes(parseInt(value))
                    ? true
                    : "Giá trị không hợp lệ";
                }
              })} 
              className={`form-control ${errors.diemcc ? "is-invalid" : ""}`}
              />
                 {errors.diemcc && errors.diemcc.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống điểm chuyên cần
                </div>
              )}
                               {errors.diemcc && errors.diemcc.type === "validate" && (
                <div className="invalid-feedback">
                  Giá trị không hợp lệ
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Điểm bài tập</label>
              <input
              
              name="diembt"
              {...register("diembt",{
                required:true,
                validate: (value) => {
                  const allowedValues = [0,10, 20, 30, 40, 50, 60, 70, 80, 90];
                  return allowedValues.includes(parseInt(value))
                    ? true
                    : "Giá trị không hợp lệ";
                }
              })} 
              className={`form-control ${errors.diembt ? "is-invalid" : ""}`}
              />
                 {errors.diembt && errors.diembt.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống điểm bài tập
                </div>
              )}
                               {errors.diembt && errors.diembt.type === "validate" && (
                <div className="invalid-feedback">
                  Giá trị không hợp lệ
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Điểm kiểm tra</label>
              <input
              
              name="diemkt"
              {...register("diemkt",{
                required:true,
                validate: (value) => {
                  const allowedValues = [0,10, 20, 30, 40, 50, 60, 70, 80, 90];
                  return allowedValues.includes(parseInt(value))
                    ? true
                    : "Giá trị không hợp lệ";
                }
              })} 
              className={`form-control ${errors.diemkt ? "is-invalid" : ""}`}
              />
                 {errors.diemkt && errors.diemkt.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống điểm kiểm tra
                </div>
              )}
                               {errors.diemkt && errors.diemkt.type === "validate" && (
                <div className="invalid-feedback">
                  Giá trị không hợp lệ
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Điểm thực hành</label>
              <input
              
              name="diemth"
              {...register("diemth",{
                required:true,
                validate: (value) => {
                  const allowedValues = [0,10, 20, 30, 40, 50, 60, 70, 80, 90];
                  return allowedValues.includes(parseInt(value))
                    ? true
                    : "Giá trị không hợp lệ";
                }
              })} 
              className={`form-control ${errors.diemth ? "is-invalid" : ""}`}
              />
                 {errors.diemth && errors.diemth.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống điểm thực hành
                </div>
              )}
                               {errors.diemth && errors.diemth.type === "validate" && (
                <div className="invalid-feedback">
                  Giá trị không hợp lệ
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Điểm cuối kỳ</label>
              <input
              
              name="diemck"
              {...register("diemck",{
                required:true,
                validate: (value) => {
                  const allowedValues = [0,10, 20, 30, 40, 50, 60, 70, 80, 90];
                  return allowedValues.includes(parseInt(value))
                    ? true
                    : "Giá trị không hợp lệ";
                }
              })} 
              className={`form-control ${errors.diemck ? "is-invalid" : ""}`}
              />
                 {errors.diemck && errors.diemck.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống điểm cuối kỳ
                </div>
              )}
                 {errors.diemck && errors.diemck.type === "validate" && (
                <div className="invalid-feedback">
                  Giá trị không hợp lệ
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "20px" }}
            >
             Sửa
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handerClose}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
     </div>
    </div>
  );
}

export default CauHinh;
