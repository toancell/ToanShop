import React from "react";
import loginSignupImage from "../../assets/login-animation.gif"
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Layout from "../../layout/Layout";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      console.log(data);
      if (res && res.data.success) {
        console.log(res);
        alert("success");

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        alert("Something Wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
   <Layout> 
    <div className="p-3 md:p-4" >
      <div className="w-full max-w-sm bg-gray-50  m-auto flex items-center flex-col p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
          <img src={loginSignupImage} className="w-full" alt="" />
        </div>
        <form
          action=""
          className="w-full py-3 flex flex-col"
          onSubmit={handleSubmit}
        >
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

          <button
            type="submit"
            className="p-3 max-w-[-150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer font-medium text-center py-1 rounded-full mt-4"
          >
            Login
          </button>
        </form>
        <p className="text-left">
          You don't have acount ?{" "}
          <Link to={"/signup"} className="cursor-pointer">
            Sign up
          </Link>
        </p>
      </div>
    </div>
    </Layout>
  );
};

export default Login
