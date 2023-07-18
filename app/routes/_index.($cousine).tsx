import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import stylesUrl from "~/styles/index.css";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCousines, getRestaurantData } from "~/models/restaurant.server";
import { RestaurantData } from "~/types";
import Restaurant from "~/components/restaurant";
import { useNavigate } from "react-router-dom";

type LoaderData = {
  restaurantData: RestaurantData[];
  cousines: string[];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Smunch Assignment" },
    { name: "description", content: "Completed assignment by Daniel Varga" },
  ];
};

export async function loader({ params }: LoaderArgs) {
  return json({
    restaurantData: await getRestaurantData(params.cousine),
    cousines: await getCousines()
  });
};

export default function Index() {

  const data = useLoaderData<typeof loader>() as LoaderData;
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>

      <div className="title-bar">
        <h1>Restaurants</h1>
        <select name="cousines" onChange={e => navigate(`/${e.target.value}`)}>
          <option value="all">All cousines</option>
          {data.cousines.map((cousine: string) => (
            <option key={cousine} value={cousine}>{cousine}</option>
          ))}
        </select>
      </div>

      <main>
        {data.restaurantData.map((restuarant: RestaurantData) => (
          <Restaurant
            key={restuarant.id} 
            data={restuarant} 
          />
        ))}
      </main>
      
    </div>
  );
}
