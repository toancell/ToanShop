import React from "react";
import { useAuth } from "../../context/auth";
import Header from "../../components/Header";
import Layout from "../../layout/Layout";
import Banner from "../../components/Banner";
import CategoryItem from "../../components/CategoryItem";
import NewArrival from "../../components/NewArrival";
const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <Banner />
      <marquee className="my-5 flex " scrollamount="7" behavior="scroll"  > 

      <span className="text-5xl font-bold flex-1" > ToanCell shop </span>
      
      </marquee>
      <CategoryItem />
      <div>
        <img src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/slider_story_1.jpg?1698225267798" alt="" />
      </div>
      <div className="my-5">
        <p className="font-bold text-6xl text-center">New Arrival</p>
      </div>
      <NewArrival />
    </Layout>
  );
};

export default HomePage;
