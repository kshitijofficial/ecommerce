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
          <div className="cartDetails-wrapper">
            <div className="w-[220px] h-[100px]">
              <img src={product.img} className="cartDetails-img"></img>
            </div>
            <div className="cartDetails-content  ">
              <h3 className="cartDetails-content-heading ">{product.name}</h3>
              <div className="xFlex gap-4">
                <button
                  className="cartBtn"
                  onClick={() => decreaseQuanity(product)}
                >
                  <Minus className=" h-4 w-4" />
                </button>
                <p className="cart-quantity"> {product.qty}</p>

                <button
                  className="cartBtn "
                  onClick={() => increaseQuanity(product)}
                >
                  <Plus className=" h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className=" cart-empty">
            <ShoppingCart className="w-8 h-8" />
            Cart Is Empty
          </p>
        )}
      </div>
    ));
  };

  return (
    <div className="main-cart-wrapper">
      <div className="main-cart">
        {loggedInUser ? (
          cartProductIdList.length > 0 ? (
            renderCartProducts()
          ) : (
            <h2 className="icon-cart">
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
