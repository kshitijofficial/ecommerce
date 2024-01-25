import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productList } from "../constants/productList";
import { useAuth } from "../contexts/useAuth";
import Review from "../components/Review";
import { IndianRupee } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const { loggedInUser } = useAuth();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigateTo("/");
    }
  }, [loggedInUser, navigateTo]);

  if (!loggedInUser) {
    return null;
  }

  const { cartProductIdList } = loggedInUser;
  const item = productList.find((product) => Number(id) === product.id);

  const addProductToCart = () => {
    console.log("addProductToCart");
    const productInCart = cartProductIdList.find(({ id }) => id === item.id);
    console.log(productInCart);
    if (productInCart) {
      productInCart.qty++;
      navigateTo("/cart");
    } else {
      const productQuantity = {
        id: item.id,
        name: item.name,
        img: item.img,
        qty: 1,
      };
      cartProductIdList.push(productQuantity);
      navigateTo("/cart");
    }
  };
  return (
    <div className="w-screen h-screen pt-20">
      {item ? (
        <div className="productDetails-wrapper">
          <div className=" productDetails-main">
            <img src={item.img} alt="" className="productDetails-img" />
          </div>

          <div className="products-content">
            <p className="products-content-name">{item.name}</p>
            <p className="products-content-desc">
              Description: {item.description}
            </p>
            <div className="products-content-price">
              <p className="xFlex">
                <IndianRupee size={24} strokeWidth={3} className="icon-rupee" />
                {item.price}
              </p>
              <p className="p-4">
                {item.quantity}
                <span className="products-content-quantity">Items</span>
              </p>
            </div>

            {item.quantity > 0 ? (
              <button className="addCartBtn" onClick={addProductToCart}>
                Add to cart
              </button>
            ) : (
              <p className="no-stock">
                <Frown className=" icon-notFound" /> Product is out of stock
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="no-stock">
          <Frown className="icon-notFound" /> Product is not found
        </p>
      )}
      <hr className="mt-20" />

      <p className="product-user-review">User Reviews</p>

      <Review productId={item.id} />
    </div>
  );
};

export default ProductDetails;
