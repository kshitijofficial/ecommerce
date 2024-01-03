import  { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productList } from "../constants/productList";
import { useAuth } from "../contexts/useAuth";
import Review from "../components/Review";

const ProductDetails = () => {
  const { id } = useParams();
  const { loggedInUser } = useAuth();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigateTo('/');
    }
  }, [loggedInUser, navigateTo]);

  if (!loggedInUser) {
    return null;
  }

  const { cartProductIdList } = loggedInUser;
  const item = productList.find((product) => Number(id) === product.id);

  const addProductToCart = () => {
    const productInCart = cartProductIdList.find(({id})=>id===item.id)
    console.log(productInCart)
    if(productInCart){
      productInCart.qty++;
      navigateTo("/cart");
    }else{
      const productQuantity={
        id:item.id,
        name:item.name,
        img:item.img,
        qty:1
      }
      cartProductIdList.push(productQuantity);
      navigateTo("/cart");
    } 
  };


  return (
    <div>
      {item ? (
        <div>
          <div>
            <p>Product Id: {item.id}</p>
            <p>Description: {item.description}</p>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Review: {item.review}</p>
          </div>
          {item.quantity > 0 ? (
            <div>
              <button onClick={addProductToCart}>Add to cart</button>
            </div>
          ) : (
            <p>Product is out of stock</p>
          )}
        </div>
      ) : (
        <p>Product is not found</p>
      )}
     <Review productId={item.id}/>
    </div>
  );
};

export default ProductDetails;
