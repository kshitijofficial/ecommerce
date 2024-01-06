import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { productList } from "../constants/productList";
import { carouselImageList } from "../constants/carouselmages";
import ProductCard from "../components/ProductCard";
import Modal from "../components/AdvertisingModal";
import { Frown } from "lucide-react";

import "./ProductList.css";
import { ChevronLeftCircle, Gift } from "lucide-react";

const ProductList = () => {
  const [carouselCount, setCarouselCount] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(productList);
  const [noResults, setNoResults] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigateTo = useNavigate();
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (!loggedInUser) {
      navigateTo("/");
    }
  }, [loggedInUser, navigateTo]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextCarousel();
      // }, 10000000000);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [carouselCount]);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setModalOpen(true);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const nextCarousel = () => {
    setCarouselCount((prevCount) =>
      prevCount < carouselImageList.length - 1 ? prevCount + 1 : 0
    );
  };

  const prevCarousel = () => {
    setCarouselCount((prevCount) =>
      prevCount !== 0 ? prevCount - 1 : carouselImageList.length - 1
    );
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const searchProducts = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredList = productList.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );
    // case added if input doesnt match with any product name
    setNoResults(filteredList.length === 0);

    setFilteredProducts(filteredList);
  };

  const renderProductList = () => {
    return (
      <>
        {filteredProducts.map(
          ({ id, name, description, price, category, review, img }) => (
            <ProductCard
              key={id}
              id={id}
              name={name}
              description={description}
              price={price}
              category={category}
              review={review}
              img={img}
            />
          )
        )}
        {/* Display a message when no results are found */}
        {noResults && (
          <p className="yFlex gap-4 text-[18px] font-semibold capitalize text-gray-600">
            <Frown className=" w-16 h-16 text-gray-600" /> No products found.
          </p>
        )}
      </>
    );
  };

  return (
    <div className="relative max-w-[1440px] yFlex px-2 md:px-6 lg:px-10 pt-20">
      {isModalOpen ? (
        <div className="absolute top-0 w-screen h-full bg-gray-400 bg-opacity-25 backdrop-blur-lg z-10"></div>
      ) : null}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className=" text-primary border  border-gray-400 px-4 flex justify-center items-center gap-2  rounded-lg text-[15px] font-medium py-1 mb-6 mt-4">
          <Gift className="opacity-85 " />
          Season Sale 50% off
        </h2>
        <div className="max-w-[600px] h-[200px]">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={
              "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            width={"200px"}
          ></img>
        </div>
      </Modal>
      <div className=" mt-10 w-screen">
        <div className="relative h-[500px] w-full ">
          <img
            src={carouselImageList[carouselCount]}
            width="500px"
            className=" ! h-full w-full object-cover px-2 md:px-10 lg:px-20"
            alt={`Carousel ${carouselCount}`}
          />
          <button
            className="absolute left-[12px] lg:left-[50px] top-[45%] bg-gray-200  p-4 hover:bg-gray-500 rounded-full  font-semibold text-gray-400 shadow-xl"
            onClick={prevCarousel}
          >
            <ChevronLeftCircle
              size={30}
              strokeWidth={1.5}
              className="text-gray-800"
            />
          </button>
          <button
            onClick={nextCarousel}
            className="absolute right-[12px] lg:right-[50px] top-[45%] bg-gray-200  p-4 hover:bg-gray-500 rounded-full  font-semibold text-gray-400 shadow-xl"
          >
            <ChevronLeftCircle
              size={30}
              strokeWidth={1.5}
              className="rotate-180 text-gray-800"
            />
          </button>
        </div>
        <div className="px-2 md:px-10 lg:px-20 yFlex w-full mt-20">
          <div className="w-full yFlex s:flex-row s:justify-between">
            <label
              htmlFor="searchProducts"
              className="text-[18px] font-semibold text-gray-800"
            >
              Search Products
            </label>
            <input
              id=" searchProducts"
              type="text"
              onChange={searchProducts}
              placeholder="Search Products"
              className="rounded-md px-4  py-1 border-[1.5px] border-primary  border-opacity-70 lg:w-full md:max-w-[200px] lg:max-w-[300px]"
            />
          </div>
          <div className="bg-primary bg-opacity-80 h-1 w-full mt-4"></div>

          <div className="my-10 xFlex gap-8 !justify-center !flex-wrap">
            {renderProductList()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
