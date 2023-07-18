import { Review, CommonDBFields } from "~/types";

interface Props {
  data: Review & CommonDBFields,
  type: 'restaurant' | 'item'
}

export default function LatestReview({data, type}: Props) {

  return (
    <div className={`latest-review type-${type}`}>
    <h5>Latest Review</h5>
     <p className="rating">★{data.rating|| '-'} {data.description && <i>{data.description}</i>}</p>
    </div>
  );
};