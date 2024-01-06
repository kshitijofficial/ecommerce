import { useEffect, useRef } from "react";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Store } from "lucide-react";
import {
  shakeInput,
  applyRedBorder,
  handleInputFocus,
} from "../utils/shakeEffect"; // Import the shake effect logic

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
      {/* nav */}
      <div className="nav absolute z-20">
        <div className="flex items-center justify-center gap-2">
          <Store className="text-primary" />
          <h1 className="nav-logo">
            Shop
            <span className="text-primary">Com</span>
          </h1>
        </div>
      </div>
      <div className=" h-screen w-screen flex flex-col justify-center items-center px-4">
        <form
          onSubmit={handleSignIn}
          id="signForm"
          className="relative px-4 s:px-10 py-20 flex flex-col justify-center items-center bg-cardBg rounded-xl shadow-2xl w-full max-w-[400px] border border-primary "
        >
          <div className="yFlex !items-start w-full">
            <label htmlFor="username" className="text-[12px] pb-2">
              UserName:
            </label>
            <input
              id="username"
              type="text"
              ref={userNameRef}
              placeholder="Username"
              className="rounded-md px-3 py-1 w-full max-w-[400px]  "
              onFocus={() => handleInputFocus(userNameRef)}
            />
          </div>

          <br />
          <div className="yFlex !items-start w-full">
            <label htmlFor="password" className="text-[12px] pb-2">
              Password:
            </label>
            <input
              type="password"
              ref={passWordRef}
              placeholder="Password"
              className="rounded-md px-3 py-1 w-full max-w-[400px]  "
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

// import { useEffect, useRef } from "react";
// import { useAuth } from "../contexts/useAuth";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Navbar from "../components/Navabar";
// import { Store } from "lucide-react";

// const SignIn = () => {
//   const userNameRef = useRef();
//   const passWordRef = useRef();
//   const navigateTo = useNavigate();
//   const { signIn, loggedInUser } = useAuth();

//   useEffect(() => {
//     if (loggedInUser) {
//       navigateTo("/product-list");
//     }
//   }, [loggedInUser, navigateTo]);

//   const handleSignIn = (e) => {
//     e.preventDefault();

//     const userNameInp = userNameRef.current.value;
//     const passWordInp = passWordRef.current.value;

//     if (isInputValid(userNameInp, passWordInp)) {
//       signIn(userNameInp, passWordInp)
//         ? navigateTo("/product-list")
//         : toast.error("User Not Found");
//     } else {
//       // Apply shake effect and red border to empty input fields
//       if (userNameInp.trim() === "") {
//         shakeInput(userNameRef);
//         applyRedBorder(userNameRef);
//       }

//       if (passWordInp.trim() === "") {
//         shakeInput(passWordRef);
//         applyRedBorder(passWordRef);
//       }

//       toast.error("Input fields cannot be empty");
//     }
//   };

//   const isInputValid = (userName, password) => {
//     return userName.trim() !== "" && password.trim() !== "";
//   };

//   // Shake effect function
//   const shakeInput = (ref) => {
//     ref.current.classList.add("shake");
//     setTimeout(() => {
//       ref.current.classList.remove("shake");
//     }, 500);
//   };

//   // Apply red border function
//   const applyRedBorder = (ref) => {
//     ref.current.style.border = "2px solid red";
//   };

//   // Reset border styles on input focus
//   const handleInputFocus = (ref) => {
//     ref.current.style.border = "";
//   };

//   return (
//     <>
//       {/* nav */}
//       <div className="nav absolute z-20">
//         <div className="flex items-center justify-center gap-2">
//           <Store className="text-primary" />
//           <h1 className="nav-logo">
//             Shop
//             <span className="text-primary">Com</span>
//           </h1>
//         </div>
//       </div>
//       <div className=" h-screen w-screen flex flex-col justify-center items-center px-4">
//         <form
//           onSubmit={handleSignIn}
//           id="signForm"
//           className="relative px-4 s:px-10 py-20 flex flex-col justify-center items-center bg-cardBg rounded-xl shadow-2xl w-full max-w-[400px] border border-primary "
//         >
//           <div className="yFlex !items-start w-full">
//             <label htmlFor="username" className="text-[12px] pb-2">
//               UserName:
//             </label>
//             <input
//               id="username"
//               type="text"
//               ref={userNameRef}
//               placeholder="Username"
//               className="rounded-md px-3 py-1 w-full max-w-[400px]  "
//               onFocus={() => handleInputFocus(userNameRef)}
//             />
//           </div>

//           <br />
//           <div className="yFlex !items-start w-full">
//             <label htmlFor="password" className="text-[12px] pb-2">
//               Password:
//             </label>
//             <input
//               type="password"
//               ref={passWordRef}
//               placeholder="Password"
//               className="rounded-md px-3 py-1 w-full max-w-[400px]  "
//               onFocus={() => handleInputFocus(passWordRef)}
//             />
//           </div>

//           <button className="btnPrimary" type="submit">
//             Sign In
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default SignIn;
