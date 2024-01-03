import { productList } from "../constants/productList";
import { useRef,useState} from "react";
const Review = ({productId})=>{
  const reviewRef = useRef()
  const {review} = productList[2]
  const [reload,setReload]=useState(false)
  const addReview = (e)=>{
    e.preventDefault()
    const customerReview = reviewRef.current.value;
    
      const reviewObj={
        reviewText: customerReview,
        rating: 5
      }
    review.push(reviewObj)
    setReload(!reload)
  }
  const renderReviewOfCustomers = ()=>{
    return review.map((customerReview)=>{
     return(
      <div key={customerReview.reviewText}>
          <p>{customerReview.reviewText}</p>
          <p>{customerReview.rating}</p>
        </div>
     )})
  }
  return(
    <div>
     <form onSubmit={addReview}>
         <label htmlFor="reviewText">Type Your Review Here:</label>
         <input type="text" ref={reviewRef}></input>
         <button type="submit">Add Review</button>
      </form>
      {review?renderReviewOfCustomers():<p>No Reviewes</p>}
     </div>
  )
}
export default Review;