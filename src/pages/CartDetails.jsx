import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import './CartDetails.css';

const CartDetails = () => {
  const navigateTo = useNavigate();
  const { loggedInUser } = useAuth();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!loggedInUser) {
      navigateTo('/');
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
    localStorage.setItem('cartData', JSON.stringify(loggedInUser.cartProductIdList));
    // Trigger a reload by changing the state
    setReload(!reload);
  };

  const renderCartProducts = () => {
    return cartProductIdList.map((product) => (
      <div key={product.id}>
        {product.qty > 0 ? (
          <p>
            <button onClick={() => decreaseQuanity(product)}>-</button>
            <img src={product.img} width={"70px"}></img>
            {product.name} - {product.qty}
            <button onClick={() => increaseQuanity(product)}>+</button>
          </p>
        ):<h1>Car Empty</h1>}
      </div>
    ));
  };

  return (
    <div>
      {loggedInUser ? (
        cartProductIdList.length > 0 ? (
          renderCartProducts()
        ) : (
          <h2>Cart Empty</h2>
        )
      ) : null}
    </div>
  );
};

export default CartDetails;
