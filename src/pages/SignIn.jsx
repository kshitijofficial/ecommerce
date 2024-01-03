import { useEffect, useRef } from "react";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignIn = () => {
  const userNameRef = useRef();
  const passWordRef = useRef();
  const navigateTo = useNavigate();
  const { signIn, loggedInUser } = useAuth();

  useEffect(() => {
    if (loggedInUser) {
      navigateTo('/product-list');
    }
  }, [loggedInUser, navigateTo]);

  const handleSignIn = (e) => {
    e.preventDefault();

    const userNameInp = userNameRef.current.value;
    const passWordInp = passWordRef.current.value;

    if (isInputValid(userNameInp, passWordInp)) {
      signIn(userNameInp, passWordInp)
        ? navigateTo("/product-list")
        : toast.error("User Not Found");
    } else {
      alert("Input fields cannot be empty");
    }
  };

  const isInputValid = (userName, password) => {
    return userName.trim() !== "" && password.trim() !== "";
  };

  return (
    <>
      <form onSubmit={handleSignIn}>
        <label htmlFor="username">UserName:</label>
        <input type="text" ref={userNameRef} placeholder="Username" />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" ref={passWordRef} placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};

export default SignIn;
