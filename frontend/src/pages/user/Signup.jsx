import React from "react";
import loginSignupImage from "../../assets/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../../utility/ImagetoBase64";
import axios from "axios";
import Layout from "../../layout/Layout";


const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
    phoneNumber: "",
    address: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(data);
  };
  const handleUploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, phone, address } = data;
    // check password
    if (name && email && password && confirmPassword && phone && address) {
      if (password !== confirmPassword) {
        alert(" password not equal");
      } else {
        try {
          const res = await axios.post("/api/v1/auth/register", {
            name,
            email,
            password,
            phone,
            address,
          });
          if (res && res.data.success) {
            navigate("/login");
          } else {
            alert("Error");
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    // post data
  };
  return (
    <Layout>

    
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-gray-50  m-auto flex items-center flex-col p-4">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img
            src={data.image ? data.image : loginSignupImage}
            className="w-full"
            alt=""
          />
          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center">
              <p className="text-sm p-1 text-white ">Upload</p>
            </div>
            <input
              type="file"
              id="profileImage"
              className="hidden"
              accept="image/*"
              onChange={handleUploadImage}
            />
          </label>
        </div>
        <form
          action=""
          className="w-full py-3 flex flex-col"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleOnChange}
            placeholder="..."
            className="mt-1 w-full  bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            placeholder="..."
            className="mt-1 w-full  bg-slate-200 px-2 py-1 rounded  focus-within:outline-blue-300"
          />

          <label htmlFor="password">Password</label>
          <div className="flex py-1 bg-slate-200 rounded mt-1 mb-2 items-center focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={data.password}
              onChange={handleOnChange}
              name="password"
              placeholder="..."
              className=" w-full bg-slate-200 border-none outline-none px-2   "
            />
            <span className="flex text-xl" onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <label htmlFor="password">Confirm Password</label>
          <div className="flex py-1 bg-slate-200 rounded mt-1 mb-2 items-center  focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={data.confirmPassWord}
              onChange={handleOnChange}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="..."
              className=" w-full bg-slate-200 border-none outline-none px-2   "
            />
            <span className="flex text-xl" onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="phone">Phone Number</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleOnChange}
            placeholder="..."
            className="mt-1 w-full  bg-slate-200 px-2 py-1 rounded  focus-within:outline-blue-300"
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={data.address}
            onChange={handleOnChange}
            placeholder="..."
            className="mt-1 w-full  bg-slate-200 px-2 py-1 rounded  focus-within:outline-blue-300"
          />

          <button
            type="submit"
            className="p-3 max-w-[-150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer font-medium text-center py-1 rounded-full mt-4"
          >
            Sign up
          </button>
        </form>
        <p className="text-left">
          Already have account ?{" "}
          <Link to={"/login"} className="cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
    </Layout>
  );
};

export default Signup;
