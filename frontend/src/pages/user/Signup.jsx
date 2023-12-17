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
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: "",
    phone: "",
    address: "",
    image:""
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadImage = async (e) => {
    const image = await ImagetoBase64(e.target.files[0]);
    const image1 = e.target.files[0]
    setUser((prev) => {
      return {
        ...prev,
        photo: image1,
        image
      };
    });
  };
  const handleSubmit = async (e) => {
    console.log(user)
    e.preventDefault();
    const { name, email, password, confirmPassword, phone, address, photo } = user;
    // check password
    if (name && email && password && confirmPassword && phone && address && photo) {
      if (password !== confirmPassword) {
        alert(" password not equal");
      } else {
        
        try {
          const userForm = new FormData();
          userForm.append("name", name)
          userForm.append("email", email)
          userForm.append("password", password)
          userForm.append("phone",phone)
          userForm.append("address", address)
          userForm.append("photo",photo)
          const {data} = await axios.post("/api/v1/auth/register", 
            userForm
          );
          if (data?.success) {
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
            src={user.image ? user.image : loginSignupImage}
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
            value={user.name}
            onChange={handleOnChange}
            placeholder="..."
            className="mt-1 w-full  bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleOnChange}
            placeholder="..."
            className="mt-1 w-full  bg-slate-200 px-2 py-1 rounded  focus-within:outline-blue-300"
          />

          <label htmlFor="password">Password</label>
          <div className="flex py-1 bg-slate-200 rounded mt-1 mb-2 items-center focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={user.password}
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
              value={user.confirmPassWord}
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
            value={user.phone}
            onChange={handleOnChange}
            placeholder="..."
            className="mt-1 w-full  bg-slate-200 px-2 py-1 rounded  focus-within:outline-blue-300"
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={user.address}
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
