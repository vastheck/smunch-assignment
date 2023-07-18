import { RestaurantData, MenuItem, CommonDBFields } from "~/types";
import MenuItemCard from "./menuItemCard";
import LatestReview from "./latestReview";
import { Link } from "@remix-run/react";
interface Props {
  data: RestaurantData
}

export default function Restaurant({data}: Props) {

  return (
    <div className="restaurant">
      <div className="title">
        <h2>{data.name}</h2>
        <h2>★{data.avarageRating?.toFixed(1) || '-'}</h2>
      </div>
      {data.latestReview && (
        <LatestReview 
          data={data.latestReview} 
          type="restaurant"
        />
      )}
      <Link to={`/rate/${data.id}`}>
        <button className="rate-restaurant-btn">Rate restaurant</button>
      </Link>
      <div className="grid-container">
        {data.menuItems.map((item: MenuItem & CommonDBFields) => (
          <MenuItemCard
            key={item.id}
            data={item}
          />
        ))}
      </div>

    </div>
  );
};