import { Link } from "react-router-dom";
import "./ProductCard.css"
const ProductCard = ({id,name,img})=>{
 return(
   <div>
    <Link to={`/product/${id}`}>
      <div className="card">
        <p>{name}</p>
        <img src={img} width={"200px"}/>
      </div>
    </Link>
    </div>

 )
}
export default ProductCard;