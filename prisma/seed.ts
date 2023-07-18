import { Restaurant, MenuItem, Review, CommonDBFields } from "~/types";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();


interface MenuItemsAndreviews {
  [key: string]: MenuItem[]
}

async function addRestaurant(restaurant: Restaurant) {
  const { id: restaurantId } = await db.restaurant.create({ data: restaurant })
  const menuItems: MenuItem[] = getMenuItemsAndreviews()[restaurant.name]
  await Promise.all(menuItems.map(async (item: MenuItem) => {
    let menuItem: MenuItem & CommonDBFields = await db.menuItem.create({
      data: {
        restaurantId,
        name: item.name,
        description: item.description
      }
    })

    const { id: menuItemId } = menuItem;
    const reviews: Review[] = item.reviews || [];
    return Promise.all(reviews.map((review: Review) => {
      return db.review.create({
        data: {
          menuItemId,
          restaurantId,
          rating: review.rating,
          userId: '12345678',
          description: review.description
        }
      })
    }))
  }))
}

async function seed() {
  await Promise.all(
    getRestaurants().map((restaurant) => addRestaurant(restaurant))
  );
}

seed();

function getRestaurants(): Restaurant[] {
  return [
    {
      name: "Saba Restaurant",
      cousine: 'Middle Eastern'
    },
    {
      name: "Texas Chicken",
      cousine: 'Fast Food'
    },
    {
      name: "Stuff'd",
      cousine: 'Fusion'
    },
  ];
}

function getMenuItemsAndreviews(): MenuItemsAndreviews {
  return {
    "Saba Restaurant": [
      {
        name: 'Mix Appetizers',
        description: 'A selection of the best appetizers of the day. Server with bread.',
        reviews: [
          { rating: 3, description: null },
          { rating: 4, description: null },
          { rating: 5, description: 'Good and healthy food' }
        ]
      },
      {
        name: 'Tabulah',
        description: 'Fresh chopped parsely, diced tomatoes and onies, mixed with curesh wheat, lemon juice and olive oil.'
      },
      {
        name: 'Mandi Chicken',
        description: 'Tender steamed chicken with fragnant traditional Yemeni spices.',
        reviews: [
          { rating: 4, description: null },
          { rating: 4, description: null },
          { rating: 5, description: 'Best chicken I have ever had' }
        ]
      },
      {
        name: 'Fattoush',
        description: 'Chilled mixed greens tossed with cubes of toasted bread.',
        reviews: [
          { rating: 2, description: null },
          { rating: 5, description: null },
          { rating: 4, description: null },
          { rating: 4, description: null }
        ]
      }
    ],
    "Texas Chicken": [
      {
        name: '5 Pcs Chicken Combo',
        description: '5pc Chicken, 2 Honey-Butter Biscuits, 2 Sides (L)',
        reviews: [
          { rating: 3, description: null },
          { rating: 5, description: 'liked it' },
          { rating: 4, description: 'not too bad' }
        ]
      },
      {
        name: 'Spicy Tex Supreme Combo',
        description: '1 Spicy Tex Supreme & 1 Drink (L)',
        reviews: [
          { rating: 2, description: null },
          { rating: 5, description: null },
          { rating: 4, description: null },
          { rating: 4, description: null },
          { rating: 4, description: null },
          { rating: 4, description: null },
          { rating: 3, description: null },
        ]
      },
      {
        name: 'Mexicana Burger Combo',
        description: '1 Mexicana Burger & 1 Drink (L)',
        reviews: [
          { rating: 3, description: null },
          { rating: 5, description: 'Loved the food' },
          { rating: 5, description: null },
          { rating: 4, description: 'A bit spicy but delicious' }
        ]
      },
      {
        name: 'Classic Burger Combo',
        description: '1 Classic Burger & 1 Drink (L)',
        reviews: [
          { rating: 3, description: null },
          { rating: 3, description: null },
          { rating: 1, description: 'The food was tasteless. Would not recommend.' }
        ]
      },
      {
        name: 'Nuggets',
        description: '4 Pcs Nuggets. Comes with dipping sauce.'
      }
    ],
    "Stuff'd": [
      {
        name: 'Veggie Daily Bowl',
        description: 'Crunchy and flavourful vegetables served with fluffy white rice',
        reviews: [
          { rating: 4, description: null },
          { rating: 5, description: null },
          { rating: 5, description: null },
          { rating: 5, description: 'Love this food. Could eat it every day.' }
        ]
      },
      {
        name: 'Beef Quesadilla',
        description: 'Crispy flour tortillas stuffed with tender beef, peppers, onions and delicious melted cheese'
      },
      {
        name: 'Veggie Burrito',
        description: 'Crunchy and flavourful vegetables wrapped in a tortilla wrap with various ingredients',
        reviews: [
          { rating: 4, description: null },
          { rating: 3, description: null },
          { rating: 4, description: null },
          { rating: 4, description: 'Recommended.' }
        ]
      },
    ]
  }
}