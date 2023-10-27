import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import Loader from "./Loader";

const QUERY = gql`
{
    dishes {
      data {
        id
        attributes {
          name
          description
          price
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

function DishCard({ data }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="h-full bg-gray-100 rounded-2xl">
        <Image
          className="w-full rounded-2xl"
          height={300}
          width={300}
          src={`${process.env.STRAPI_URL || "http://127.0.0.1:1337"}${
            data.attributes.image.data.attributes.url
          }`}
          alt=""
        />
        <div className="p-8">
          <h3 className="mb-3 font-heading text-xl text-gray-900 hover:text-gray-700 group-hover:underline font-black">
            {data.attributes.name}
          </h3>
          <p className="text-sm text-gray-500 font-bold">
            {data.attributes.description}
          </p>
          <div className="flex flex-wrap md:justify-center -m-2">
            <div className="w-full md:w-auto p-2 my-6">
              <Link
                className="block w-full px-12 py-3.5 text-lg text-center text-white font-bold bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-600 rounded-full"
                href={`/dish/${data.id}`}
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DishList(props) {
  const { loading, error, data } = useQuery(QUERY);

  if (error) {
    console.error("Error loading dishes:", error);
    return "Error loading dishes";
  }

  if (loading) {
    console.log("Loading dishes...");
    return <Loader />;
  }

  if (data.dishes && data.dishes.data.length) {
    let displayDishes = data.dishes.data;

    if (props.query) {
      displayDishes = data.dishes.data.filter((dish) =>
        dish.attributes.name.toLowerCase().includes(props.query.toLowerCase())
      );
    }

    if (displayDishes.length !== 0) {
      return (
        <div className="py-16 px-8 bg-white rounded-3xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap -m-4 mb-6">
              {displayDishes.map((dish) => {
                return <DishCard key={dish.id} data={dish} />;
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>No Dishes Found</h1>;
    }
  }
  return <h5>Add Dish</h5>;
}

export default DishList;



// import { gql, useQuery } from "@apollo/client";
// import Link from "next/link";
// import Image from "next/image";
// import Loader from "./Loader";

// const QUERY = gql`
// {
//     dishes {
//       data {
//         id
//         attributes {
//           name
//           description
//           price
//           image {
//             data {
//               attributes {
//                 url
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// function DishCard({ data }) {
//   return (
//     <div className="w-full md:w-1/2 lg:w-1/3 p-4">
//       <div className="h-full bg-gray-100 rounded-2xl">
//         <Image
//           className="w-full rounded-2xl"
//           height={300}
//           width={300}
//           src={`${process.env.STRAPI_URL || "http://127.0.0.1:1337"}${
//             data.attributes.image.data[0].attributes.url
//           }`}
//           alt=""
//         />
//         <div className="p-8">
//           <h3 className="mb-3 font-heading text-xl text-gray-900 hover:text-gray-700 group-hover:underline font-black">
//             {data.attributes.name}
//           </h3>
//           <p className="text-sm text-gray-500 font-bold">
//             {data.attributes.description}
//           </p>
//           <div className="flex flex-wrap md:justify-center -m-2">
//             <div className="w-full md:w-auto p-2 my-6">
//               <Link
//                 className="block w-full px-12 py-3.5 text-lg text-center text-white font-bold bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-600 rounded-full"
//                 href={`/dish/${data.id}`}
//               >
//                 View
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function DishList(props) {
//   const { loading, error, data } = useQuery(QUERY);

//   if (error) return "Error loading dishes";
//   if (loading) return <Loader />;

//   if (data.dishes && data.dishes.length) {
//     const searchQuery = data.dishes.filter((query) =>
//       query.attributes.name.toLowerCase().includes(props.query.toLowerCase())
//     );

//     if (searchQuery.length != 0) {
//       return (
//         <div className="py-16 px-8 bg-white rounded-3xl">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex flex-wrap -m-4 mb-6">
//               {searchQuery.map((res) => {
//                 return <DishCard key={res.id} data={res} />;
//               })}
//             </div>
//           </div>
//         </div>
//       );
//     } else {
//       return <h1>No Dishes Found</h1>;
//     }
//   }
//   return <h5>Add Dish</h5>;
// }
// export default DishList;