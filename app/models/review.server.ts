import { db } from "~/utils/db.server";

export const submitReview = async (
  restaurantId: string,
  rating: number,
  description: string | null,
  menuItemId: string | null
): Promise<void> => {
  try {
    await db.review.create({
      data: {
        restaurantId,
        rating,
        userId: '12345678',
        description,
        menuItemId
      }
    })
  } catch (err: any) {
    console.log('error writing rating', err)
    throw new Error(err)
  }
}