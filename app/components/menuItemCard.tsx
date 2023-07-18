import { CommonDBFields, MenuItem, ReviewData } from "~/types";
import LatestReview from "./latestReview";
import { Link } from "@remix-run/react";

interface Props {
  data: MenuItem & CommonDBFields & Partial<ReviewData>
}

export default function MenuItemCard({data}: Props) {

  return (
    <div className="menu-item">
     <h3>{data.name}</h3>
     <h5>★{data.avarageRating?.toFixed(1) || '-'}</h5>
     <p>{data.description}</p>
     {data.latestReview && (
      <LatestReview 
        data={data.latestReview}
        type="item" 
      />
     )}
     <Link to={`/rate/${data.restaurantId}/${data.id}`}>
      <button className="rate-item-btn">Rate item</button>
     </Link>
    </div>
  );
};