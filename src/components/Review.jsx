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
        <div key={customerReview.reviewText} className="customerReview">
          <p>{customerReview.reviewText}</p>
          <p>{customerReview.rating}</p>
        </div>
      );
    });
  };
  return (
    <div>
      <form onSubmit={addReview} className="review-form ">
        <div className="review-form-wrapper ">
          <label htmlFor="reviewText" className="review-label ">
            Write Review
          </label>

          <input
            id="reviewText"
            type="text"
            ref={reviewRef}
            className="review-input"
          ></input>
          <button type="submit" className="review-btn">
            Add Review
          </button>
        </div>
      </form>
      <div className="all-reviews">
        {review ? renderReviewOfCustomers() : <p>No Reviewes</p>}
      </div>
    </div>
  );
};
export default Review;
