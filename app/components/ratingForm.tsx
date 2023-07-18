import { Form } from "@remix-run/react";

interface Props {
  error: string | null;
}


export default function RatingForm({error}: Props) {

  return (
    <Form method="post">
      <div>
        <label>Your rating</label>
        <div className="rating">
          <input id="star5" name="star" type="radio" value="5" className="radio-btn hide" />
          <label htmlFor="star5" >☆</label>
          <input id="star4" name="star" type="radio" value="4" className="radio-btn hide" />
          <label htmlFor="star4" >☆</label>
          <input id="star3" name="star" type="radio" value="3" className="radio-btn hide" />
          <label htmlFor="star3" >☆</label>
          <input id="star2" name="star" type="radio" value="2" className="radio-btn hide" />
          <label htmlFor="star2" >☆</label>
          <input id="star1" name="star" type="radio" value="1" className="radio-btn hide" />
          <label htmlFor="star1" >☆</label>
          <div className="clear"></div>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      <div>
        <label>Description</label>
        <textarea name="description" />
      </div>
      <button type="submit">
          Submit Review
       </button>
    </Form>
  );
}
