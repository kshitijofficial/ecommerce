import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { productList } from "../constants/productList";
import { carouselImageList } from "../constants/carouselmages";
import ProductCard from "../components/ProductCard";
import Modal from "../components/AdvertisingModal";
import { ChevronLeftCircle, Gift, Frown } from "lucide-react";

const ProductList = () => {
  const [carouselCount, setCarouselCount] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(productList);
  // state create to store the state if there is no product on filter
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
          <p className="no-stock">
            <Frown className="icon-notFound" /> No products found.
          </p>
        )}
      </>
    );
  };

  return (
    <div className="productList-wrapper">
      {isModalOpen ? <div className="modal-bg-overlay"></div> : null}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className=" modal-title">
          <Gift className="opacity-85 " />
          Season Sale 50% off
        </h2>
        <div className="max-w-[600px] h-[200px]">
          <img
            className="productList-img"
            src={
              "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            width={"200px"}
          ></img>
        </div>
      </Modal>
      <div className=" mt-10 w-screen">
        <div className="carousel-main">
          <img
            src={carouselImageList[carouselCount]}
            width="500px"
            className="carousel-img"
            alt={`Carousel ${carouselCount}`}
          />
          <button className="carousel-btn-left" onClick={prevCarousel}>
            <ChevronLeftCircle
              size={30}
              strokeWidth={1.5}
              className="text-gray-800"
            />
          </button>
          <button onClick={nextCarousel} className="carousel-btn-right">
            <ChevronLeftCircle
              size={30}
              strokeWidth={1.5}
              className="rotate-180 text-gray-800"
            />
          </button>
        </div>
        <div className="list-search-wrapper">
          <div className="list-search-main">
            <label htmlFor="searchProducts" className="list-search-label">
              Search Products
            </label>
            <input
              id=" searchProducts"
              type="text"
              onChange={searchProducts}
              placeholder="Search Products"
              className="list-search-input"
            />
          </div>
          <div className="red-line"></div>

          <div className="render-product-list">{renderProductList()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
