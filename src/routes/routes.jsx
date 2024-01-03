import { createBrowserRouter } from "react-router-dom"
import SignIn from "../pages/SignIn"
import ProductList from "../pages/ProductList"
import ProductDetails from "../pages/ProductDetails"
import CartDetails from "../pages/CartDetails"
import NotFound from "../pages/NotFound"

export const routes=createBrowserRouter([
    {path:"/",element:<SignIn/>},
    {path:"/product-list",element:<ProductList/>},
    {path:"/product/:id",element:<ProductDetails/>},
    {path:"/cart",element:<CartDetails/>},
    {path:"*",element:<NotFound/>}

  ])