import { productList } from "../constants/productList";
import { useRef, useState } from "react";
const Review = ({ productId }) => {
  const reviewRef = useRef();
  const { review } = productList[2];
  const [reload, setReload] = useState(false);

  const addReview = (e) => {
    e.preventDefault();
    const customerReview = reviewRef.current.value;

    const reviewObj = {
      reviewText: customerReview,
      rating: 5,
    };
    review.push(reviewObj);
    setReload(!reload);
  };
  const renderReviewOfCustomers = () => {
    return review.map((customerReview) => {
      return (
        <div
          key={customerReview.reviewText}
          className="text-[14px] w-full xFlex !justify-start gap-4 capitalize text-start bg-cardBg p-2 rounded-lg shadow border border-gray-400  s:w-full s:max-w-[500px]"
        >
          <p>{customerReview.reviewText}</p>
          <p>{customerReview.rating}</p>
        </div>
      );
    });
  };
  return (
    <div>
      <form
        onSubmit={addReview}
        className="yFlex px-4  w-screen h-auto mt-10 pb-10 "
      >
        <div className="yFlex  w-screen px-4 s:px-8 md:px-10 lg:px-20">
          <label
            htmlFor="reviewText"
            className="text-[12px] mb-2 w-full s:w-full s:max-w-[500px] text-left "
          >
            Write Review
          </label>

          <input
            id="reviewText"
            type="text"
            ref={reviewRef}
            className="rounded-md px-3 py-1 border-[1.5px] border-primary  border-opacity-50 w-full s:w-full s:max-w-[500px]"
          ></input>
          <button
            type="submit"
            className="xFlex w-full bg-primary rounded-lg px-6 py-2 text-white text-opacity-95 font-medium hover:bg-opacity-60 mt-8 s:w-full s:max-w-[500px]"
          >
            Add Review
          </button>
        </div>
      </form>
      <div className="yFlex px-4 w-screen  pb-10  rounded-lg gap-4">
        {review ? renderReviewOfCustomers() : <p>No Reviewes</p>}
      </div>
    </div>
  );
};
export default Review;
