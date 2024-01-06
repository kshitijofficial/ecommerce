import { Link } from "react-router-dom";

const ProductCard = ({ id, name, img }) => {
  return (
    <div className=" productCard-wrapper">
      <Link to={`/product/${id}`}>
        <div>
          <div className="h-[200px] w-[250px]">
            <img src={img} className="productCard-img" />
          </div>
          <p className="productCard-name">{name}</p>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
