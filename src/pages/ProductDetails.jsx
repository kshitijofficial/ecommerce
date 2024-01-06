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
        <div className="yFlex px-4 s:px-8 md:px-10 lg:px-20  md:flex-row md:items-start md:gap-8">
          <div className="max-w-screen max-h-screen border border-gray-400 p-2 shadow-2xl my-8 rounded-xl md:flex-col ">
            <img
              src={item.img}
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="yFlex !items-start md:pt-6">
            <p className="text-[24px] font-semibold text-gray-700 mt-2">
              {item.name}
            </p>
            <p className="text-[16px] font-normal text-black text-opacity-60 text-justify mt-2">
              Description: {item.description}
            </p>
            <div className="w-full xFlex !justify-between mt-6 text-[24px] font-semibold text-gray-700">
              <p className="xFlex">
                <IndianRupee
                  size={24}
                  strokeWidth={3}
                  className="text-primary-green text-opacity-80"
                />
                {item.price}
              </p>
              <p className="p-4">
                {item.quantity}
                <span className="text-[12px] ml-1 text-primary-green text-opacity-90">
                  Items
                </span>
              </p>
            </div>

            {item.quantity > 0 ? (
              <button
                className="xFlex w-full bg-primary rounded-lg py-2 text-white text-opacity-95 font-medium hover:bg-opacity-60 my-10"
                onClick={addProductToCart}
              >
                Add to cart
              </button>
            ) : (
              // <div className="xFlex w-full bg-primary rounded-lg py-2 text-white text-opacity-95 font-medium hover:bg-opacity-60 my-10">
              //   <button onClick={addProductToCart}>Add to cart</button>
              // </div>

              <p className="yFlex gap-4 text-[18px] font-semibold capitalize text-gray-600">
                <Frown className=" w-16 h-16 text-gray-600" /> Product is out of
                stock
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="yFlex gap-4 text-[18px] font-semibold capitalize text-gray-600">
          <Frown className=" w-16 h-16 text-gray-600" /> Product is not found
        </p>
      )}
      <hr className="mt-20" />
      {/* showing no of reviews */}
      <p className="text-[18px] font-semibold ml-1 text-primary text-opacity-90  text-center mt-10">
        User Reviews
      </p>

      <Review productId={item.id} />
    </div>
  );
};

export default ProductDetails;
