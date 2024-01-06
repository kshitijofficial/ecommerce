import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { ShoppingCart, Plus, Minus } from "lucide-react";

const CartDetails = () => {
  const navigateTo = useNavigate();
  const { loggedInUser } = useAuth();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!loggedInUser) {
      navigateTo("/");
    }
  }, [loggedInUser, navigateTo]);

  if (!loggedInUser) {
    return null;
  }

  const { cartProductIdList } = loggedInUser;

  const increaseQuanity = (product) => {
    product.qty += 1;
    updateLocalStorage();
  };

  const decreaseQuanity = (product) => {
    product.qty -= 1;
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    // Update local storage with the modified cart data
    localStorage.setItem(
      "cartData",
      JSON.stringify(loggedInUser.cartProductIdList)
    );
    // Trigger a reload by changing the state
    setReload(!reload);
  };

  const renderCartProducts = () => {
    return cartProductIdList.map((product) => (
      <div key={product.id} className="w-screen yFlex px-6 ">
        {product.qty > 0 ? (
          <div className="bg-cardBg shadow-lg xFlex  gap-4 px-6 py-6 s:px-10 s:py-10 rounded-xl w-full max-w-[400px] border ">
            <div className="w-[220px] h-[100px]">
              <img
                src={product.img}
                className="w-full h-full object-cover rounded-lg"
              ></img>
            </div>
            <div className="yFlex  gap-6 justify-between !items-center w-full max-w-[200px]  ">
              <h3 className="font-semibold text-[18px] text-primary">
                {product.name}
              </h3>
              <div className="xFlex gap-4">
                <button
                  className="bg-gray-400 bg-opacity-60  rounded-xl text-[16px] font-semibold text-gray-900 p-1 hover:bg-gray-500"
                  onClick={() => decreaseQuanity(product)}
                >
                  <Minus className=" h-4 w-4" />
                </button>
                <p className="font-semibold text-[16px] text-primary">
                  {" "}
                  {product.qty}
                </p>

                <button
                  className="bg-gray-400 bg-opacity-60 p-1 hover:bg-gray-500 rounded-xl text-[20px] font-semibold text-gray-900 "
                  onClick={() => increaseQuanity(product)}
                >
                  <Plus className=" h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className=" yFlex gap-4 text-[18px] font-semibold capitalize text-gray-600">
            <ShoppingCart className="w-8 h-8" />
            Cart Is Empty
          </p>
        )}
      </div>
    ));
  };

  return (
    <div className="yFlex h-auto w-screen px-4 pt-28 mb-10">
      <div className="yFlex gap-6 w-full max-w-[500px] yFlex bg-gray-200 py-10 rounded-xl">
        {loggedInUser ? (
          cartProductIdList.length > 0 ? (
            renderCartProducts()
          ) : (
            <h2 className="xFlex gap-4 text-primary mb-48 font-semibold text-[18px]">
              <ShoppingCart className="w-8 h-8" />
              Cart Is Empty
            </h2>
          )
        ) : null}
      </div>
    </div>
  );
};

export default CartDetails;
