/* eslint-disable react/no-unescaped-entities */
import React, { Suspense, useEffect, useMemo, useState } from "react";
import logo from "../../assets/logo.png";
import banner from "../../assets/banner.png";
import { Link, useSearchParams } from "react-router-dom";
import "../../styles/card-home.css";
import CardHome from "../../components/CardHome";
import drink from "../../assets/category/drink.jpg";
import snack from "../../assets/category/snack.jpg";
import healthyFood from "../../assets/category/healthy-food.jpg";
import frozenFood from "../../assets/category/frozen-food.jpg";
import "../../styles/home.css";
import { getProducts } from "../../utils/https/product";
import CardProduct from "../../components/CardProduct";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const controller = useMemo(() => new AbortController(), []);
  const [datas, setDatas] = useState([]);
  const [dataParams, setDataParams] = useSearchParams({
    order: "",
    categories: "",
    name: "",
    limit: 6,
  });

  const fetchingData = async () => {
    try {
      const result = await getProducts(controller, dataParams);
      setDatas(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSearch = async (value) => {
    const params = Object.fromEntries(dataParams);
    setDataParams({
      ...params,
      name: value,
    });
  };

  useEffect(() => {
    fetchingData();
  }, [dataParams]);

  return (
    <>
      <div className="w-full h-[100vh] bg-slate-100">
        <nav className="h-16 fixed top-0 bg-white w-full flex z-[999999999] shadow-lg">
          <div className="flex-1 pl-4 flex align-middle text-center lg:pl-12">
            <div className="flex text-center align-middle">
              <img src={logo} alt="" className="w-10 h-14" />
              <p className="mt-5 ml-4 font-bold font-mono">Klontong Shop</p>
            </div>
          </div>
          <div className="flex-1 flex justify-end py-2 pr-2 lg:pr-12">
            <Link
              to={"/login"}
              className="bg-secondary px-4 py-2 rounded-lg font-semibold btn">
              Login
            </Link>
          </div>
        </nav>
        <div className="w-full min-h-full flex bg-orange-100 flex-wrap pt-[100px] px-4">
          <div className="lg:flex-1 flex justify-center items-center text-center ">
            <div className="">
              <p className="text-black text-3xl">
                Welcome to our world <br /> of online shopping! 🛍️
              </p>
              <p className="text-black mt-8 text-xl mb-8">
                Let's enjoy the convenience of shopping here, just for you!
              </p>
              <button className="btn btn-primary">Find Now !</button>
            </div>
          </div>
          <div className="lg:flex-1 pt-6">
            <img src={banner} />
          </div>
        </div>
        <div className="min-h-[30vh] w-full flex flex-col">
          <div className="w-full border min-h-[4rem] flex justify-center align-middle text-center items-center">
            <p className="text-orange-500 font-bold text-3xl font-serif">
              Find Your Category
            </p>
          </div>
          <div className="border min-h-[8rem] flex flex-col lg:flex-row justify-center items-center py-12 gap-12">
            <CardHome title={"Snack"} image={snack} />
            <CardHome title={"Drink"} image={drink} />
            <CardHome title={"Healthy Food"} image={healthyFood} />
            <CardHome title={"Frozen Food"} image={frozenFood} />
          </div>
        </div>
        <div className="w-full min-h-[100vh] flex flex-col mt-8 bg-orange-50">
          <div className="w-full border min-h-[4rem] flex justify-center align-middle text-center items-center">
            <p className="text-orange-700 font-bold text-3xl font-serif">
              Shop Now !
            </p>
          </div>
          <div className="w-full min-h-[80vh]">
            {/* search bar */}
            <div className="px-8 py-8 pt-12 flex justify-center items-center">
              <div className="search">
                <input placeholder="Search..." type="text" />
                <button type="submit">Go</button>
              </div>
            </div>

            <div className="flex justify-center lg:hidden">
              <select
                name="menu-favorite"
                id=""
                className="border-b-2 border-solid border-brown-cs cursor-pointer font-semibold text-brown-cs">
                <option value="0">Favorite & Promo</option>
                <option value="1">Coffe</option>
                <option value="2">Non Coffe</option>
                <option value="3">Foods</option>
                <option value="4">Add-on</option>
              </select>
            </div>
            <div className="w-full h-min-[50vh] flex justify-center items-center">
              <div className="mt-8 w-[60%] min-h-[20vh] flex gap-12 flex-wrap border-2 rounded-md px-8 py-4 justify-center">
                {datas.map((data, i) => {
                  return (
                    <Suspense
                      fallback={<p className="text-black">Loading....</p>}
                      key={i}>
                      <CardProduct
                        title={data.name}
                        price={data.price}
                        image={data.image}
                      />
                    </Suspense>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
