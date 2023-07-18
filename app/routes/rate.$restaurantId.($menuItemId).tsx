import { useParams } from 'react-router-dom';
import type { LinksFunction } from "@remix-run/node";
import stylesUrl from "~/styles/rate.css";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import RatingForm from '~/components/ratingForm';
import { useActionData } from "@remix-run/react";
import { submitReview } from '~/models/review.server';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const action = async ({ request, params }: ActionArgs) => {
  const { restaurantId, menuItemId } = params;
  try {
    const formData = await request.formData();
    const rating = formData.get("star");
    const description = formData.get("description");
  
    if (!rating) {
      return 'Rating is required'
    } 

    await submitReview(
      String(restaurantId),
      Number(rating),
      String(description),
      menuItemId || null
    )

    return redirect('/')
  } catch (err: any) {
    throw new Error(err)
  }
};

function Rate() {
  const { menuItemId } = useParams();
  const error = useActionData<typeof action>();

  return (
    <div>
      <main>
        <h1>Rate {menuItemId ? 'restaurant' : 'item'}</h1>
        <RatingForm error={error ? String(error) : null} />
      </main>
    </div>
  );
}

export default Rate;
