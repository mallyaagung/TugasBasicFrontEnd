import React, { useEffect } from "react";
import Navbar from "../components/module/home/Navbar/Navbar";
import Category from "../components/module/home/Category/Category";

import "./pagesHome.css";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import slide1 from "../assets/image/carousel-trend.png";
import slide2 from "../assets/image/carousel-black.png";

import Populer from "../components/module/home/Popular/Popular";
import Footer from "../components/module/home/Footer/Footer";
import axios from "axios";
import Card from "../components/base/Card";

import { FormatRupiah } from "@arismun/format-rupiah";
import { useState } from "react";

const Home = () => {
  const [products, getProducts] = useState([]);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const gettingData = await axios.get(
        `${process.env.REACT_APP_BACKEND}/product?sortby=id&search=&sort=asc&page=1&limit=5
      `,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getProducts(gettingData.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      {/* Carousel Start*/}
      <div className="container mt-5">
        <OwlCarousel
          className="owl-theme"
          loop
          margin={30}
          autoWidth={false}
          items={1}
          autoplayTimeout={2000}
          autoplay={true}
        >
          <div class="item mt-5">
            <img src={slide1} className="slide-size" />
            <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
              <h2 className="caption">Trends in 2020</h2>
            </div>
          </div>
          <div class="item mt-5">
            <img src={slide2} className="slide-size" />
            <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
              <h2 className="caption">Black Edition</h2>
            </div>
          </div>
        </OwlCarousel>
      </div>
      {/* Carousel End */}
      <Category />
      <div className="container">
        <div className="row">
          <div className="products">
            <h3 className="title">New</h3>
            <p>What are you currently looking for</p>
          </div>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3">
            {products.map((item) => (
              <div className="col" key={item.id}>
                <Card
                  src={item.photo}
                  to={`/detail/${item.id}`}
                  titleName={item.productname}
                  price={<FormatRupiah value={item.priceproduct} />}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Populer />
      <Footer />
    </div>
  );
};

export default Home;
