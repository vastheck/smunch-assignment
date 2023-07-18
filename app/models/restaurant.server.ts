import { db } from "~/utils/db.server";
import { ReviewData, RestaurantData } from "~/types";

export const getCousines = async (): Promise<string[]> => {
  const result = await db.restaurant.findMany({
    distinct: ['cousine'],
    select: {
      cousine: true,
    },
  });
  return result.map(item => item.cousine)
}


export const getRestaurantData = async (cousine: string | undefined): Promise<RestaurantData[]> => {
  try {
  await getCousines()
  const [ restaurants, menuItems ] = await Promise.all([
    db.restaurant.findMany(cousine && cousine !== 'all' ? {
      where: {
        cousine: {
          equals: cousine,
        },
      },
    } : undefined),
    db.menuItem.findMany()
  ])
  const [menuItemReviews, restaurantReviews] =  await Promise.all([
    Promise.all(menuItems.map(menuItem => getReview(menuItem.id))),
    Promise.all(restaurants.map(restaurant => getReview(undefined, restaurant.id)))
  ])

  return restaurants.map((restaurant, i) => ({
    ...restaurant,
    latestReview: restaurantReviews[i].latestReview,
    avarageRating: restaurantReviews[i].avarageRating,
    menuItems: menuItems
      .filter(menuItem => menuItem.restaurantId === restaurant.id)
      .map( menuItem => {
        const review = menuItemReviews.find( review => review.menuItemId === menuItem.id)
        if (review) {
          return {
            ...menuItem,
            latestReview: review.latestReview,
            avarageRating: review.avarageRating
          }
        } else {
          return menuItem
        }
      }),
  }))
  } catch (err: any) {
    console.log('error loading restaurants', err)
    throw new Error(err)
  }
}

const getReview = async (menuItemId: string | undefined, restaurantId?: string): Promise<ReviewData & { menuItemId: string | undefined}> => {
  const [latestReview, avarageRating] = await Promise.all([
    db.review.findFirst({
      where: menuItemId ? { menuItemId } : { restaurantId, menuItemId: null },
      orderBy: { createdAt: "desc" }
    }),
    db.review.aggregate({
      where: menuItemId ? { menuItemId } : { restaurantId, menuItemId: null },
      _avg: { rating: true },
    })
  ])

  return {
    menuItemId,
    latestReview,
    avarageRating: avarageRating._avg.rating
  }
}