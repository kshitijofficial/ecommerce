import { useEffect, useRef } from "react";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Store } from "lucide-react";
import {
  shakeInput,
  applyRedBorder,
  handleInputFocus,
} from "../utils/shakeEffect";

const SignIn = () => {
  const userNameRef = useRef();
  const passWordRef = useRef();
  const navigateTo = useNavigate();
  const { signIn, loggedInUser } = useAuth();

  useEffect(() => {
    if (loggedInUser) {
      navigateTo("/product-list");
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
      // Apply shake effect and red border to empty input fields
      if (userNameInp.trim() === "") {
        shakeInput(userNameRef);
        applyRedBorder(userNameRef);
      }

      if (passWordInp.trim() === "") {
        shakeInput(passWordRef);
        applyRedBorder(passWordRef);
      }

      toast.error("Input fields cannot be empty");
    }
  };

  const isInputValid = (userName, password) => {
    return userName.trim() !== "" && password.trim() !== "";
  };

  return (
    <>
      {/* nav without authcontext */}
      <div className="nav">
        <div className="nav-main">
          <Store className="text-primary" />
          <h1 className="nav-logo">
            Shop
            <span className="text-primary">Com</span>
          </h1>
        </div>
      </div>
      <div className=" signIn-wrapper">
        <form onSubmit={handleSignIn} id="signForm" className="signIn-form  ">
          <div className="signIn-field-wrapper">
            <label htmlFor="username" className="signIn-label">
              UserName:
            </label>
            <input
              id="username"
              type="text"
              ref={userNameRef}
              placeholder="Username"
              className="signIn-input"
              onFocus={() => handleInputFocus(userNameRef)}
            />
          </div>

          <br />
          <div className="signIn-field-wrapper">
            <label htmlFor="password" className="signIn-label">
              Password:
            </label>
            <input
              type="password"
              ref={passWordRef}
              placeholder="Password"
              className="signIn-input"
              onFocus={() => handleInputFocus(passWordRef)}
            />
          </div>

          <button className="btnPrimary" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
