import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import { productList } from '../constants/productList';
import { carouselImageList } from '../constants/carouselmages';
import ProductCard from '../components/ProductCard';
import Modal from '../components/AdvertisingModal';

import './ProductList.css';

const ProductList = () => {
  const [carouselCount, setCarouselCount] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(productList);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigateTo = useNavigate();
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (!loggedInUser) {
      navigateTo('/');
    }
  }, [loggedInUser, navigateTo]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextCarousel();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [carouselCount]);
  
  useEffect(()=>{
      const intervalId = setTimeout(()=>{
        setModalOpen(true);
      },5000)
      return ()=>clearInterval(intervalId)
    },[])

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
    setFilteredProducts(filteredList);
  };

  const renderProductList = () => {
    return filteredProducts.map(({ id, name, description, price, category, review, img }) => (
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
    ));
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Season Sale 50% off</h2>
        <img src={"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} width={"200px"}></img>
      </Modal>
        <img src={carouselImageList[carouselCount]} width="500px" alt={`Carousel ${carouselCount}`}/>
        <button onClick={prevCarousel}>Prev</button>
        <button onClick={nextCarousel}>Next</button>
        <br />
        <input type="text" onChange={searchProducts} placeholder="Search Products" />
        <div className="card-container">{renderProductList()}</div>
      
    </div>
  );
};

export default ProductList;
