import React from "react";
import mongoose from "mongoose";
import Product from "../models/product";
import Link from "next/link";

// Color green : #003d29
// color grey : #EEEEEE
// color blue : #4942E4

const furniture = ({ products }) => {
  return (
    <div>
      <div className="bg-white pt-16 px-60">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Furniture
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {Object.keys(products).map((item) => {
              return (
                <div
                  key={products[item]._id}
                  className="group relative shadow-md shadow-[#003d29]"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
                    <img
                      src={products[item].img}
                      alt="Front of men&#039;s Basic Tee in black."
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 mx-2 mb-1 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link
                          className="text-black font-medium"
                          href={`/product/${products[item].slug}`}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          ></span>
                          {products[item].title}
                        </Link>
                      </h3>
                      <div className="flex flex-col gap-y-2 mt-2">
                        <div className="flex flex-row gap-x-2">
                          {products[item].size.includes("S") && (
                            <p className="border border-[#003d29] text-base px-1 rounded-md">
                              S
                            </p>
                          )}
                          {products[item].size.includes("M") && (
                            <p className="border border-[#003d29] text-base px-1 rounded-md">
                              M
                            </p>
                          )}
                          {products[item].size.includes("L") && (
                            <p className="border border-[#003d29] text-base px-1 rounded-md">
                              L
                            </p>
                          )}
                          {products[item].size.includes("XL") && (
                            <p className="border border-[#003d29] text-base px-1 rounded-md">
                              XL
                            </p>
                          )}
                          {products[item].size.includes("XXL") && (
                            <p className="border border-[#003d29] text-base px-1 rounded-md">
                              XXL
                            </p>
                          )}
                        </div>
                        <div className="flex flex-row">
                          {products[item].color.includes("Brown") && (
                            <p className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none bg-amber-950"></p>
                          )}
                          {products[item].color.includes("Green") && (
                            <p className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none bg-green-500"></p>
                          )}
                          {products[item].color.includes("Yellow") && (
                            <p className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none bg-yellow-500"></p>
                          )}
                          {products[item].color.includes("Red") && (
                            <p className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none bg-red-500"></p>
                          )}
                          {products[item].color.includes("Black") && (
                            <p className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none bg-black"></p>
                          )}
                          {products[item].color.includes("White") && (
                            <p className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none bg-white"></p>
                          )}
                          {products[item].color.includes("Blue") && (
                            <p className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none bg-blue-500"></p>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{products[item].price}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* <!-- More products... --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "furniture" });
  let furniture = {};
  for (let item of products) {
    if (item.title in furniture) {
      if (
        !furniture[item.title].color.includes(item.color) &&
        item.availableqty > 0
      ) {
        furniture[item.title].color.push(item.color);
      }
      if (
        !furniture[item.title].size.includes(item.size) &&
        item.availableqty > 0
      ) {
        furniture[item.title].size.push(item.size);
      }
    } else {
      furniture[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableqty > 0) {
        furniture[item.title].color = [item.color];
        furniture[item.title].size = [item.size];
      }else{
        furniture[item.title].color = [];
        furniture[item.title].size = [];
      }
    }
  }

  return { props: { products: JSON.parse(JSON.stringify(furniture)) } };
}

export default furniture;
