import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import { Helmet } from "react-helmet";
const nullStudent={
      sinhviens:{
        masv:"",
        khoa:"",
        lopcq:""
      },
      users:{
        diachi:"",
        email:"",
        gioitinh:"",
        hoten:"",
        ngaysinh:"",
        sdt:"",
      }
    }
function ManegementUser({listSV}) {
  

  const [classCQ, setClassCQ] = useState("B19CQCN01");
  const {
    handleSubmit,
    
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [showAdd, setShowAdd] = useState(false);
  const [showCorrec, setShowCorrec] = useState(false);
  const [studentCorrec, setStudentCorrec] = useState(nullStudent);
  const [listStudent, setListStudent] = useState(!JSON.parse(localStorage.getItem("ListSV"))?(-1):(JSON.parse(localStorage.getItem("ListSV"))));
  // const [correc, setCorrec] = useState({
  //   MaSV: "",
  //   Hovaten: "",
  //   Lop: "",
  // });
  const handershowmodaladd = () => {
    setShowAdd(true);
    reset();
  };
  const handeradd = (student) => {

    const user={
      sinhviens:{
        khoa:student.khoa,
        lopcq:student.classHP,
        masv:student.MSV.toUpperCase(),
      },
      users:{
        diachi:student.address,
        email:student.email,
        gioitinh:student.gioitinh,
        hoten:student.fullName,
        ngaysinh:student.date,
        sdt:student.Sdt,
      }
    }
    console.log(user);
    const findMSV = listStudent.find((el) => student.MSV.toUpperCase() === el.sinhviens.masv.toUpperCase());
    if (!findMSV === false) return toast.error("Mã sinh viên đã tồn tại");


    axios.post('http://localhost:8080/sinhvien',JSON.stringify(user), {headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer <token>",
      "badrequest": "true"
    }} ).then(response=>{
          toast.success("thêm thàng công");
          setListStudent([...listStudent,user])
      console.log(response);
          axios.get('http://localhost:8080/listSV',).then(response=>{
      console.log(response.data);
      setListStudent( response.data);
      localStorage.setItem("ListSV",JSON.stringify(response.data))
    }).catch(errors=>{
      toast.error("Có lỗi sảy ra")
      console.error(errors);
    })
    }).catch(error => {
      toast.error("Có lỗi sảy ra")
      console.error(error);
    })

    

    reset();
  };
  // tat modal
  const handleClose = () => {
    setShowAdd(false);
    setShowCorrec(false);
    reset();
  };
  const handerShowCorrec = (el) => {
    setStudentCorrec(el);
    setShowCorrec(true);
    console.log(el);
    reset();
  };

  const save = (student) => {
    console.log(student);
    
    axios.put(`http://localhost:8080/sinhvien?hoten=${student.fullName}&email=${student.email}&&sdt=${student.Sdt}&&gioitinh=${student.gioitinh}&&ngaysinh=${student.date}&&khoa=${student.khoa}&&masv=${student.MSV}&&lopcq=${student.classHP}&&id=${studentCorrec.sinhviens.id}&&diachi=${student.address}&`)
    .then(response=>{
      if(response.data==="trùng mã sv") return toast.error("Trùng mã sinh viên")
      toast.success("Sửa thành công");
      console.log(response.data);
      axios.get('http://localhost:8080/listSV',).then(response=>{
        console.log(response.data);
        setListStudent( response.data);
        localStorage.setItem("ListSV",JSON.stringify(response.data))
      }).catch(errors=>{
        console.error(errors);
      })
    }).catch(errors=>{
      console.error(errors);
      toast.error("Có lỗi sảy ra")
    })

  };
  const handerdelete = (idSV) => {
    axios.delete(`http://localhost:8080/sinhvien/${idSV}`)
    .then(response=>{
      toast.success("xóa thành công");
      console.log(response.data);
      axios.get('http://localhost:8080/listSV',).then(response=>{
        console.log(response.data);
        setListStudent( response.data);
        localStorage.setItem("ListSV",JSON.stringify(response.data))
      }).catch(errors=>{
        console.error(errors);
      })
    }).catch(errors=>{
      console.error(errors);
      toast.error("có lỗi sảy ra")
    })
    // const studentdelete = listStudent.filter((el) => el.sinhviens.id !== idSV);

    // localStorage.setItem("listStudent", JSON.stringify(studentdelete));
    // setListStudent(studentdelete);
    
  };
  useEffect(() => {
    console.log(listStudent);
    setStudentCorrec(nullStudent)
    // setCorrec({
    //   MaSV: "",
    //   Hovaten: "",
    //   Lop: "",
    // });

    // setListStudent(
    //   localStorage.getItem("ListSV")
    //     ? JSON.parse(localStorage.getItem("ListSV"))
    //     : []
    // );
    setListStudent(JSON.parse(localStorage.getItem("ListSV")))
  }, []);
  return (
    <div style={{ paddingTop: "50px" }}>
                  <Helmet>
        <title>Quản lý sinh viên</title>
      </Helmet>
      <h1 style={{textAlign:"center"}}>Quản lý sinh viên</h1>
      <Button onClick={handershowmodaladd}>Thêm Sinh Viên</Button><br></br>
      <select 
      style={{marginTop:"10px"}}
        value={classCQ}
        onChange={(el) => setClassCQ(el.target.value)}
      >
        <option value="B19CQCN01">B19CQCN01</option>
        <option value="B19CQCN02">B19CQCN02</option>
      </select>
      {/* modal add */}
      <Modal show={showAdd} onHide={handleClose}>
        <Modal.Header closeButton={handleClose}>
          <Modal.Title>Thêm Sinh Viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handeradd)} className="formAdd">
            <div className="form-group">
              <label>Mã Sinh Viên</label>
              <input
                type="text"
                name="MSV"
                {...register("MSV", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}
                className={`form-control ${errors.MSV ? "is-invalid" : ""}`}
              />
              {errors.MSV && errors.MSV.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống mã sinh viên
                </div>
              )}
              {errors.MSV && errors.MSV.type === "minLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập 10 ký tự cho mã sinh viên
                </div>
              )}
              {errors.MSV && errors.MSV.type === "maxLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập 10 ký tự cho mã sinh viên
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Họ và Tên</label>
              <input
                type="text"
                name="fullName"
                {...register("fullName", {
                  required: true,
                  minLength: 8,
                  maxLength: 100,
                  pattern: /^[\p{L}\s'-]+$/u,
                })}
                className={`form-control ${
                  errors.fullName ? "is-invalid" : ""
                }`}
              />
              {errors.fullName && errors.fullName.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống họ và tên
                </div>
              )}
              {errors.fullName && errors.fullName.type === "minLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập 8 đến 100 ký tự cho họ và tên
                </div>
              )}
              {errors.fullName && errors.fullName.type === "maxLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập 8 đến 100 ký tự cho họ và tên
                </div>
              )}
              {errors.fullName && errors.fullName.type === "pattern" && (
                <div className="invalid-feedback">
                  Vui lòng nhập đúng định dạng ...
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                {...register("email", {
                  required: true,
                  minLength: 10,
                  maxLength: 50,
                  pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && errors.email.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống email
                </div>
              )}
              {errors.email && errors.email.type === "minLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập 10 đến 50 ký tự cho email
                </div>
              )}
              {errors.email && errors.email.type === "maxLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập 10 đến 50 ký tự cho email
                </div>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <div className="invalid-feedback">
                 Vui lòng nhập đúng định dạng ...
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="Sdt"
                {...register("Sdt", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                  pattern: /^[0-9]{10}$/,
                })}
                className={`form-control ${errors.Sdt ? "is-invalid" : ""}`}
              />
              {errors.Sdt && errors.Sdt.type === "required" && (
                <div className="invalid-feedback">Không được để trống số điện thoại</div>
              )}
              {errors.Sdt && errors.Sdt.type === "minLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập tối đa 10 ký tự cho số điện thoại
                </div>
              )}
              {errors.Sdt && errors.Sdt.type === "maxLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập tối đa 10 ký tự cho số điện thoại
                </div>
              )}
              {errors.Sdt && errors.Sdt.type === "pattern" && (
                <div className="invalid-feedback">
                  Vui lòng nhập đúng định dạng ...
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Địa Chỉ</label>
              <input
                name="address"
                {...register("address", { required: false, maxLength: 255 })}
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
              />
              {errors.address && errors.address.type === "maxLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập tối đa 255 ký tự cho địa chỉ
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Ngày sinh</label>
              {/* <Controller
                name="date"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DatePicker
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                  />
                )}
              /> */}
              <input
                type="text"
                name="date"
                {...register("date", {
                  required: false,
                  pattern: /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/,
                })}
                className={`form-control ${errors.date ? "is-invalid" : ""}`}
              />
              {errors.date && errors.date.type === "pattern" && (
                <div className="invalid-feedback">
                  Vui lòng nhập đúng định dạng ...
                </div>
              )}
            </div>
            <div className="form-group" style={{paddingTop:"10px"}}>
              <label style={{marginRight:"10px"}}>Lớp chính quy:</label>
              <select name="classHP" {...register("classHP")}>
                <option value="B19CQCN01">B19CQCN01</option>
                <option value="B19CQCN02">B19CQCN02</option>
              </select>
            </div>
            <div className="form-group" style={{paddingTop:"10px"}}>
              <label style={{marginRight:"10px"}}>Khoa:</label>
              <select name="khoa" {...register("khoa")}>
                <option value="CNTT">CNTT</option>
                <option value="ATTT">ATTT</option>
              </select>
            </div>
            <div className="form-group" style={{paddingTop:"10px"}}>
              <label style={{marginRight:"10px"}}>Giới tính:</label>
              <select name="gioitinh" {...register("gioitinh")}>
                <option value="nam">Nam</option>
                <option value="nữ">Nữ</option>
              </select>
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
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal sửa */}
      <Modal show={showCorrec} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa Sinh Viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(save)} className="formSave">
            <div className="form-group">
              <label>Mã Sinh Viên</label>
              <input
              defaultValue={studentCorrec.sinhviens.masv}
                type="text"
                name="MSV"
                {...register("MSV", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}
                className={`form-control ${errors.MSV ? "is-invalid" : ""}`}
              />
              {errors.MSV && errors.MSV.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống mã sinh viên
                </div>
              )}
              {errors.MSV && errors.MSV.type === "minLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập 10 ký tự cho mã sinh viên
                </div>
              )}
              {errors.MSV && errors.MSV.type === "maxLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập 10 ký tự cho mã sinh viên
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Họ và Tên</label>
              <input
               defaultValue={studentCorrec.users.hoten}
                type="text"
                name="fullName"
                {...register("fullName", {
                  required: true,
                  minLength: 8,
                  maxLength: 100,
                  pattern: /^[\p{L}\s'-]+$/u,
                })}
                className={`form-control ${
                  errors.fullName ? "is-invalid" : ""
                }`}
              />
              {errors.fullName && errors.fullName.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống họ và tên
                </div>
              )}
              {errors.fullName && errors.fullName.type === "minLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập 8 đến 100 ký tự cho họ và tên
                </div>
              )}
              {errors.fullName && errors.fullName.type === "maxLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập 8 đến 100 ký tự cho họ và tên
                </div>
              )}
              {errors.fullName && errors.fullName.type === "pattern" && (
                <div className="invalid-feedback">
                  Vui lòng nhập đúng định dạng ...
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
               defaultValue={studentCorrec.users.email}
                type="text"
                name="email"
                {...register("email", {
                  required: true,
                  minLength: 10,
                  maxLength: 50,
                  pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && errors.email.type === "required" && (
                <div className="invalid-feedback">
                  Không được để trống email
                </div>
              )}
              {errors.email && errors.email.type === "minLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập 10 đến 50 ký tự cho email
                </div>
              )}
              {errors.email && errors.email.type === "maxLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập 10 đến 50 ký tự cho email
                </div>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <div className="invalid-feedback">
                  Vui lòng nhập đúng định dạng ...
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                defaultValue={studentCorrec.users.sdt}
                
                name="Sdt"
                {...register("Sdt", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                  pattern: /^[0-9]{10}$/,
                })}
                className={`form-control ${errors.Sdt ? "is-invalid" : ""}`}
              />
              {errors.Sdt && errors.Sdt.type === "required" && (
                <div className="invalid-feedback">Không được để trống số điện thoại</div>
              )}
              {errors.Sdt && errors.Sdt.type === "minLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập tối đa 10 ký tự cho số điện thoại
                </div>
              )}
              {errors.Sdt && errors.Sdt.type === "maxLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập tối đa 10 ký tự cho số điện thoại
                </div>
              )}
              {errors.Sdt && errors.Sdt.type === "pattern" && (
                <div className="invalid-feedback">
                  Vui lòng nhập đúng định dạng ...
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Địa Chỉ</label>
              <input
              defaultValue={studentCorrec.users.diachi}
                name="address"
                {...register("address", { required: false, maxLength: 255 })}
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
              />
              {errors.address && errors.address.type === "maxLength" && (
                <div className="invalid-feedback">
                  Vui lòng nhập tối đa 255 ký tự cho address
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Ngày sinh</label>
              {/* <Controller
                name="date"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DatePicker
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                  />
                )}
              /> */}
              <input
              defaultValue={studentCorrec.users.ngaysinh}
                type="text"
                name="date"
                {...register("date", {
                  required: false,
                  pattern: /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/,
                })}
                className={`form-control ${errors.date ? "is-invalid" : ""}`}
              />
              {errors.date && errors.date.type === "pattern" && (
                <div className="invalid-feedback">
                  Vui lòng nhập đúng định dạng ...
                </div>
              )}
            </div>
            <div className="form-group" style={{paddingTop:"10px"}}>
              <label style={{marginRight:"10px"}}>Lớp chính quy:</label>
              <select name="classHP" {...register("classHP")}
               defaultValue={studentCorrec.sinhviens.lopcq}
              >
                <option value="B19CQCN01">B19CQCN01</option>
                <option value="B19CQCN02">B19CQCN02</option>
              </select>
            </div>
            <div className="form-group" style={{paddingTop:"10px"}}>
              <label style={{marginRight:"10px"}}>Khoa:</label>
              <select name="khoa" {...register("khoa")}
               defaultValue={studentCorrec.sinhviens.khoa}
              >
                <option value="CNTT">CNTT</option>
                <option value="ATTT">ATTT</option>
              </select>
            </div>
            <div className="form-group" style={{paddingTop:"10px"}}>
              <label style={{marginRight:"10px"}}>Giới tính:</label>
              <select name="gioitinh" {...register("gioitinh")}
               defaultValue={studentCorrec.users.gioitinh}>
                <option value="nam">Nam</option>
                <option value="nữ">Nữ</option>
              </select>
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
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal sửa */}
      <div>
        {!listStudent||listStudent===null ?  (
          <h1>Không có sinh viên nào</h1>
        ): (
          <table className="table">
            <thead>
              <tr>
                <td style={{ textAlign: "center" }}>Mã Sinh Viên</td>
                <td style={{ textAlign: "center" }}>Họ và Tên</td>
                <td style={{ textAlign: "center" }}>Khoa</td>
                <td style={{ textAlign: "center" }}>Lớp chính quy</td>
                <td style={{ textAlign: "center" }}>Email</td>
                <td style={{ textAlign: "center" }}>Số điện thoại</td>
                <td style={{ textAlign: "center" }}>Địa Chỉ</td>
                <td style={{ textAlign: "center" }}>Ngày sinh</td>
                <td style={{ textAlign: "center" }}>Sửa</td>
                <td style={{ textAlign: "center" }}>Xóa</td>
                
              </tr>
            </thead>
            <tbody>
              {!listStudent||listStudent===null?(<div></div>):(listStudent.filter((el)=>el.sinhviens.lopcq===classCQ)).map((el,index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{el.sinhviens.masv}</td>
                  <td style={{ textAlign: "center" }}>{el.users.hoten}</td>
                  <td style={{ textAlign: "center" }}>{el.sinhviens.khoa}</td>
                  <td style={{ textAlign: "center" }}>{el.sinhviens.lopcq}</td>
                  <td style={{ textAlign: "center" }}>{el.users.email}</td>
                  <td style={{ textAlign: "center" }}>{el.users.sdt}</td>
                  <td style={{ textAlign: "center" }}>{el.users.diachi}</td>
                  <td style={{ textAlign: "center" }}>{el.users.ngaysinh}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="primary"
                      onClick={() => handerShowCorrec(el)}
                    >
                      Sửa
                    </Button>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="primary"
                      onClick={() => handerdelete(el.sinhviens.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        )}
      </div>
    </div>
  );
}

export default ManegementUser;
