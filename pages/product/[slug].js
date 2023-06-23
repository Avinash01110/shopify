import Error from "@/components/error";
import Product from "@/models/product";
import { mongoose } from "mongoose";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";



const Post = ({ buyNow, addToCart, removeFromCart, product, variants, error}) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pincode, setPincode] = useState({ pin: "", service: null });
  const [color, setColor] = useState();
  const [size, setSize] = useState();

  useEffect(() => {
    if(!error){
      setColor(product.color)
      setSize(product.size)
    }
    console.log(variants)
    console.log(product)
  }, [router.query])
  

  const checkServiceAvailability = async () => {
    const pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    const pinjson = await pins.json();
    if (Object.keys(pinjson).includes(pincode.pin)) {
      setPincode({ service: true });
    } else {
      setPincode({ service: false });
    }
  };

  const onChangePin = (e) => {
    setPincode({ pin: e.target.value });
  };
  
  const refreshVariants = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]["slug"]}`;
    // window.location = url;
    router.push(url);
  };


  if(error == 404 || error == 400){
    return <Error statuscode = {error}></Error>
  }

  return (
    <div className="pt-16 bg-white">

      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 border-2 border-[#003d29] w-full lg:h-auto h-64 object-contain bg-white rounded-xl"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl text-justify title-font font-medium mb-1">
                {product.title}
              </h1>

              <p className="leading-relaxed text-justify">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  
                  {Object.keys(variants).includes("Brown") &&
                    Object.keys(variants["Brown"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariants(size, "Brown");
                        }}
                        className={`${
                          color == "Brown"
                            ? "border-[#003d29]"
                            : "border-gray-300"
                        } border-2 bg-amber-950 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}

                  {Object.keys(variants).includes("Green") &&
                    Object.keys(variants["Green"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariants(size, "Green");
                        }}
                        className={`${
                          color == "Green"
                            ? "border-[#003d29]"
                            : "border-gray-300"
                        } border-2 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}

                  {Object.keys(variants).includes("Yellow") &&
                    Object.keys(variants["Yellow"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariants(size, "Yellow");
                        }}
                        className={`${
                          color == "Yellow"
                            ? "border-[#003d29]"
                            : "border-gray-300"
                        } border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}

                  {Object.keys(variants).includes("Red") &&
                    Object.keys(variants["Red"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariants(size, "Red");
                        }}
                        className={`${
                          color == "Red"
                            ? "border-[#003d29]"
                            : "border-gray-300"
                        } border-2 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}

                  {Object.keys(variants).includes("Black") &&
                     Object.keys(variants["Black"]).includes(size) &&(
                      <button
                        onClick={() => {
                          refreshVariants(size, "Black");
                        }}
                        className={`${
                          color == "Black"
                            ? "border-[#003d29]"
                            : "border-gray-300"
                        } border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}

                  {Object.keys(variants).includes("White") &&
                    Object.keys(variants["White"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariants(size, "White");
                        }}
                        className={`${
                          color == "White"
                            ? "border-[#003d29]"
                            : "border-gray-300"
                        } border-2 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}

                  {Object.keys(variants).includes("Blue") &&
                    Object.keys(variants["Blue"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariants(size, "Blue");
                        }}
                        className={`${
                          color == "Blue"
                            ? "border-[#003d29]"
                            : "border-gray-300"
                        } border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => {
                        refreshVariants(e.target.value, color);
                      }}
                      className="rounded border appearance-none py-2 focus:outline-none focus:ring-2 focus:ring-[#003d29] focus:border-[#003d29] text-base pl-3 pr-10"
                    >
                      {color && Object.keys(variants[color]).includes("S") && (
                        <option>S</option>
                      )}
                      {color && Object.keys(variants[color]).includes("M") && (
                        <option>M</option>
                      )}
                      {color && Object.keys(variants[color]).includes("L") && (
                        <option>L</option>
                      )}
                      {color && Object.keys(variants[color]).includes("XL") && (
                        <option>XL</option>
                      )}
                      {color && Object.keys(variants[color]).includes("XXL") && (
                        <option>XXL</option>
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
               {product.availableqty > 0 && <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{product.price}
                </span>}
               {product.availableqty <= 0 && <span className="title-font font-medium text-2xl text-gray-900">
                  Out of stock!!
                </span>}
                <div className="flex gap-x-6">
                  <button
                    disabled={product.availableqty <= 0? true:false}
                    onClick={() => {
                      buyNow(
                        slug,
                        product.title,
                        1,
                        product.price,
                        size,
                        color
                      );
                    }}
                    className="disabled:opacity-60 flex text-white bg-[#003d29] border-0 py-2 px-6 focus:outline-none hover:bg-[#003d29] rounded"
                  >
                    Buy Now
                  </button>
                  <button
                  disabled={product.availableqty <= 0? true:false}
                    onClick={() => {
                      addToCart(
                        slug,
                        product.title,
                        1,
                        product.price,
                        size,
                        color
                      );
                    }}
                    className="disabled:opacity-60 flex ml-auto text-white bg-[#003d29] border-0 py-2 px-6 focus:outline-none hover:bg-[#003d29] rounded"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <div className="flex flex-row pt-9">
                <input
                  onChange={onChangePin}
                  className="flex items-center h-10  w-[17.13rem] px-2 rounded-l-lg border-2 border-[#003d29] "
                  type="text"
                  placeholder="Enter your pincode here"
                />
                <button
                  onClick={checkServiceAvailability}
                  className="flex justify-center items-center px-4 py-2 text-white bg-[#003d29] border-0 focus:outline-none hover:bg-[#003d29] rounded"
                >
                  Check pincode
                </button>
              </div>
              <div className="pl-2 pt-3">
                {!pincode.service && pincode.service != null && (
                  <div>
                    <span className="text-red-500 font-medium">
                      Yet now, not availability!
                    </span>
                  </div>
                )}
                {pincode.service && pincode.service != null && (
                  <div>
                    <AiFillCheckCircle className="text-[#003d29] text-xl" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  if(product == null){
    return {
      props: {
        error:404
      },
    };
  }
  let variants = await Product.find({ title: product.title,category:product.category});
  let colorSizeSlug = {}; // {red : {XL : {slug: 'furniture'}}}

  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}

export default Post;
