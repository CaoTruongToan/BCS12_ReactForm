import React, { useState } from "react";
import { useFormik } from "formik";
import InputCustom from "./InputCustom";
import { DatePicker } from "antd";
import ButtonCustom from "./ButtonCustom";
import TableNhanVien from "./TableNhanVien";
import * as Yup from "yup";

const DemoFormReact = () => {
  const [arrNhanVien, setArrNhanVien] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const validationSchema = Yup.object({
    msnv: Yup.string().required("Vui lòng nhập MSNV."),
    hoTen: Yup.string().required("Vui lòng nhập họ tên."),
    email: Yup.string().email("Email không hợp lệ.").required("Vui lòng nhập email."),
    soDienThoai: Yup.string()
      .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ.")
      .required("Vui lòng nhập số điện thoại."),
    matKhau: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường và một ký tự đặc biệt.")
      .required("Vui lòng nhập mật khẩu."),
    gioiTinh: Yup.string().required("Vui lòng chọn giới tính."),
    ngaySinh: Yup.string().required("Vui lòng chọn ngày sinh."),
  });

  const formik = useFormik({
    initialValues: {
      msnv: "",
      hoTen: "",
      email: "",
      soDienThoai: "",
      matKhau: "",
      gioiTinh: "",
      ngaySinh: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (editIndex !== null) {
        const updatedArrNhanVien = arrNhanVien.map((item, index) =>
          index === editIndex ? values : item
        );
        setArrNhanVien(updatedArrNhanVien);
        setEditIndex(null);
      } else {
        setArrNhanVien([...arrNhanVien, values]);
      }
      formik.resetForm();
    },
  });

  const handleEdit = (index) => {
    const employee = arrNhanVien[index];
    formik.setValues(employee);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedArrNhanVien = arrNhanVien.filter((_, i) => i !== index);
    setArrNhanVien(updatedArrNhanVien);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = arrNhanVien.filter(employee =>
    employee.hoTen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Bài tập ứng dụng xây dựng form lấy dữ liệu trong React</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          {/* Form Fields */}
          <InputCustom
            labelContent={"MSNV"}
            placeholder={"Vui lòng nhập msnv"}
            name={"msnv"}
            value={formik.values.msnv}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id={"msnv"}
            error={formik.errors.msnv}
            touched={formik.touched.msnv}
          />
          <InputCustom
            labelContent={"Họ tên"}
            placeholder={"Vui lòng nhập họ tên"}
            name={"hoTen"}
            value={formik.values.hoTen}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id={"hoTen"}
            error={formik.errors.hoTen}
            touched={formik.touched.hoTen}
          />
          <InputCustom
            labelContent={"Email"}
            placeholder={"Vui lòng nhập email"}
            name={"email"}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id={"email"}
            error={formik.errors.email}
            touched={formik.touched.email}
          />
          <InputCustom
            labelContent={"Số điện thoại"}
            placeholder={"Vui lòng nhập số điện thoại"}
            name={"soDienThoai"}
            value={formik.values.soDienThoai}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id={"soDienThoai"}
            error={formik.errors.soDienThoai}
            touched={formik.touched.soDienThoai}
          />
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Ngày sinh
            </label>
            <DatePicker
              className="!w-full"
              format={"DD-MM-YYYY"}
              onChange={(date, dateString) => {
                formik.setFieldValue("ngaySinh", dateString);
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.ngaySinh && formik.errors.ngaySinh && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.ngaySinh}</div>
            )}
          </div>
          <div>
            <label
              htmlFor="gioiTinh"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Giới tính
            </label>
            <select
              id="gioiTinh"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={formik.values.gioiTinh}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="gioiTinh"
            >
              <option value="">Vui lòng chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
            {formik.touched.gioiTinh && formik.errors.gioiTinh && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.gioiTinh}</div>
            )}
          </div>
          <InputCustom
            labelContent={"Mật khẩu"}
            id={"matKhau"}
            name={"matKhau"}
            placeholder={"Vui lòng nhập mật khẩu"}
            value={formik.values.matKhau}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            classWrapper="col-span-2"
            error={formik.errors.matKhau}
            touched={formik.touched.matKhau}
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-5">
            <ButtonCustom content={editIndex !== null ? "Cập nhật nhân viên" : "Thêm nhân viên"} type="submit" />
            <ButtonCustom
              content={"Reset Form"}
              bgColor="bg-black"
              onClick={() => formik.resetForm()}
            />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg p-2 w-[30%]"
          />
        </div>
      </form>
      <TableNhanVien
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DemoFormReact;
