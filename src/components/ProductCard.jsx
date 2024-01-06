import { Link } from "react-router-dom";

const ProductCard = ({ id, name, img }) => {
  return (
    <div className=" bg-cardBg pb-4 rounded-xl hover:border hover:border-primary hover:shadow-2xl">
      <Link to={`/product/${id}`}>
        <div className="">
          <div className="h-[200px] w-[250px]">
            <img
              src={img}
              className="rounded-t-xl h-full w-full object-cover object-center"
            />
          </div>
          <p className="ml-4 mt-3 text-[18px] font-semibold text-gray-800">
            {name}
          </p>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
