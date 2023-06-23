import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  AiOutlineDown,
  AiOutlineSearch,
  AiOutlineCloseCircle,
  AiFillLeftCircle,
  AiFillRightCircle,
} from "react-icons/ai";
import {MdAccountCircle} from "react-icons/md";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";
import Link from "next/link";


// Color green : #003d29
// color grey : #EEEEEE
// color blue : #4942E4

const Navbar = ({logOut, user, Cart, subTotal, addToCart, removeFromCart, clearCart }) => {
  const [category, setCategory] = useState({
    style: "invisible",
    animation: false,
  });

  const [cart, setCart] = useState({ style: "invisible", animation: false });
  const [menu, setMenu] = useState({ style: "invisible", animation: false });

  const toggle_category = () => {
    if (category.style == "invisible") {
      setCategory({ style: "visible", animation: true });
    } else {
      setCategory({ style: "invisible", animation: false });
    }
  };

  const toggle_cart = () => {
    if (cart.style == "invisible") {
      setCart({ style: "visible", animation: true });
    } else {
      setCart({ style: "invisible", animation: false });
    }
  };

  const toggle_menu = () => {
    if (menu.style == "invisible") {
      setMenu({ style: "visible", animation: true });
    } else {
      setMenu({ style: "invisible", animation: false });
    }
  };

  const clearcart = () => {
    setCart({ style: "visible", animation: "true" });
    clearCart();
  };
  return (
    <div id="Navbar">
      <div className="nav shadow-lg shadow-[#003d29] fixed z-10 bg-white w-full">
        <div className="text-gray-600 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link
              href={"/home"}
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer"
            >
              <Image
                src={"/Shopify_crop.png"}
                alt="Shopify"
                width={150}
                height={50}
              ></Image>
            </Link>
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-14 md:gap-x-10 md:text-black	flex flex-wrap items-center text-base font-medium justify-center">
              <li
                onClick={toggle_category}
                className={`flex items-center list-none left-4 cursor-pointer hover:text-[#4942E4]`}
              >
                Category
                <AiOutlineDown
                  onClick={toggle_category}
                  className={`mt-1 ml-2 text-black `}
                />
                </li>
                <Zoom when={category.animation}>
                  <div
                    className={`${category.style} space-y-4 px-6 border-[#003d29] border-2 bg-white w-[45rem] h-[22rem] z-20 absolute top-24 rounded-xl `}
                  >
                    <p className="font-sans text-xl pt-4">Popular Categories</p>
                    <hr className="bg-[#EEEEEE]" />
                    <div className="grid grid-cols-2 gap-6">
                      <Link onClick={toggle_category} href={"/furniture"}>
                        <div className="bg-[#EEEEEE] flex flex-row gap-x-8 h-16 w-[320px] rounded-md border-2 border-[#003d29] hover:text-[#4942E4]">
                          <div className="h-16 w-18">
                            <Image
                              className="object-fill rounded"
                              src={"/images/furniture.jpg"}
                              alt="error"
                              width={66}
                              height={27}
                            ></Image>
                          </div>
                          <span className="flex justify-center items-center text-lg font-medium cursor-pointer">
                            Furniture
                          </span>
                        </div>
                      </Link>
                      <Link onClick={toggle_category} href={"/handbag"}>
                        <div className="bg-[#EEEEEE] flex flex-row gap-x-8 h-16 w-[320px] rounded-md border-2 border-[#003d29]">
                          <div className="h-16 w-16">
                            <Image
                              className="object-fill rounded absolute"
                              src={"/images/handbag.jpg"}
                              alt="error"
                              width={66}
                              height={27}
                            ></Image>
                          </div>
                          <span className="flex justify-center items-center text-lg font-medium hover:text-[#4942E4] cursor-pointer">
                            Handbag
                          </span>
                        </div>
                      </Link>
                      <Link onClick={toggle_category} href={"/shoe"}>
                        <div className="bg-[#EEEEEE] flex flex-row gap-x-8 h-16 w-[320px] rounded-md border-2 border-[#003d29]">
                          <div className="h-16 w-16">
                            <Image
                              className="object-fill rounded absolute"
                              src={"/images/shoe.jpg"}
                              alt="error"
                              width={66}
                              height={22}
                            ></Image>
                          </div>
                          <span className="flex justify-center items-center text-lg font-medium hover:text-[#4942E4] cursor-pointer">
                            Shoe
                          </span>
                        </div>
                      </Link>
                      <Link onClick={toggle_category} href={"/headphone"}>
                        <div className="bg-[#EEEEEE] flex flex-row gap-x-8 h-16 w-[320px] rounded-md border-2 border-[#003d29]">
                          <div className="h-16 w-16">
                            <Image
                              className="object-fill rounded absolute"
                              src={"/images/headphone.jpg"}
                              alt="error"
                              width={56}
                              height={22}
                            ></Image>
                          </div>
                          <span className="flex justify-center items-center text-lg font-medium hover:text-[#4942E4] cursor-pointer">
                            Headphone
                          </span>
                        </div>
                      </Link>
                      <Link onClick={toggle_category} href={"/laptop"}>
                        <div className="bg-[#EEEEEE] flex flex-row gap-x-8 h-16 w-[320px] rounded-md border-2 border-[#003d29]">
                          <div className="h-16 w-16">
                            <Image
                              className="object-cover rounded absolute h-[3.5rem] w-16"
                              src={"/images/Laptop.jpg"}
                              alt="error"
                              width={75}
                              height={42}
                            ></Image>
                          </div>
                          <span className="flex justify-center items-center text-lg font-medium hover:text-[#4942E4] cursor-pointer">
                            Laptop
                          </span>
                        </div>
                      </Link>
                      <Link onClick={toggle_category} href={"/book"}>
                        <div className="bg-[#EEEEEE] flex flex-row gap-x-8 h-16 w-[320px] rounded-md border-2 border-[#003d29]">
                          <div className="h-16 w-16">
                            <Image
                              className="object-fill rounded absolute"
                              src={"/images/Book.jpg"}
                              alt="error"
                              width={57}
                              height={22}
                            ></Image>
                          </div>
                          <span className="flex justify-center items-center text-lg font-medium hover:text-[#4942E4] cursor-pointer">
                            Book
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </Zoom>
              

              <li className="list-none hover:text-[#4942E4] cursor-pointer">Deals</li>
              <li className="list-none hover:text-[#4942E4] cursor-pointer">What's New</li>
              <li className="list-none hover:text-[#4942E4] cursor-pointer">Delivery</li>
              <div className="flex flex-row items-center">
                <input
                  className="pl-4 h-8 w-72 rounded-l-full font-light border-[#003d29] border-2"
                  type="text"
                  placeholder="Search Products"
                />
                <AiOutlineSearch className="cursor-pointer rounded-r-full border-[#003d29] border-2 text-2xl h-8" />
              </div>
            </nav>

            {user.value && <MdAccountCircle onClick={toggle_menu} className="text-3xl text-[#003d29] hover:opacity-70"/>}
            <Fade when={menu.animation}>
            <div className={`${menu.style} flex flex-col absolute z-20 divide-y divide-[#003d29] bg-white h-[7rem] w-32 border-2 border-[#003d29] right-[9.5rem] top-[4.5rem] rounded-xl`}>
              
              <Link className="h-full w-full flex justify-center items-center text-center font-medium text-base font sans text-black hover:bg-[#003d29] hover:text-white rounded-t-lg" href={"/myaccount"}>
              <button onClick={toggle_menu} className="h-full w-full flex justify-center items-center text-center font-medium text-base font sans text-black hover:bg-[#003d29] hover:text-white rounded-t-lg">My Account</button></Link>

              <Link className="h-full w-full flex justify-center items-center text-center font-medium text-base font sans text-black hover:bg-[#003d29] hover:text-white" href={"/orders"}>
              <button onClick={toggle_menu} className="h-full w-full flex justify-center items-center text-center font-medium text-base font sans text-black hover:bg-[#003d29] hover:text-white">My orders</button></Link>
              
              <button onClick={()=>{toggle_menu();logOut();}} className="h-full flex justify-center items-center text-center font-medium text-base font sans text-black hover:bg-[#003d29] hover:text-white rounded-b-lg">Log out</button>
            </div>
            </Fade>

            {!user.value && <Link href={"/login"}>
              <button className="inline-flex items-center border-0 py-1 px-4 focus:outline-none rounded text-base font-medium mt-4 md:mt-0 text-[#003d29] hover:opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                Log in
              </button>
            </Link>}

            <button
              onClick={toggle_cart}
              className="inline-flex items-center border-0 py-1 px-4 focus:outline-none rounded text-base font-medium mt-4 md:mt-0 text-[#003d29] hover:opacity-70"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              Cart
            </button>
            <Bounce right when={cart.animation}>
              <div
                className={`text-base font-medium rounded-lg bg-gray-100 h-screen w-80 fixed z-20 right-0 top-0 px-4 pt-4 space-y-7 overflow-auto ${cart.style}`}
              >
                <div className="flex flex-col gap-y-10">
                  <AiOutlineCloseCircle
                    onClick={toggle_cart}
                    className="flex items-end text-2xl text-[#003d29] hover:opacity-40"
                  />
                  <span className="flex text-start justify-start text-xl text-[#003d29]">
                    Shopping cart
                  </span>
                </div>
                {Object.keys(Cart).length == 0 && (
                  <div className="font-base text-start">
                    Add few items in cart
                  </div>
                )}
                {Object.keys(Cart).map((k, index) => {
                  return (
                    <div key={k} className="flex flex-col px-1 gap-y-6">
                      <div className="flex flex-row justify-between gap-x-6 text-start">
                        <span>
                          {index + 1}. {Cart[k].name}
                        </span>
                        <span>₹{Cart[k].price}</span>
                      </div>
                      <div className="flex gap-x-4">
                        <div className="flex h-10 w-28 items-center justify-center gap-x-2 rounded-md border-2 border-[#003d29]">
                          <span>Qty : </span>
                          <AiFillLeftCircle
                            onClick={() => {
                              removeFromCart(
                                k,
                                Cart[k].name,
                                1,
                                Cart[k].price,
                                Cart[k].size,
                                Cart[k].color
                              );
                            }}
                            className="hover:opacity-75 text-[#003d29]"
                          />
                          <span>{Cart[k].qty}</span>
                          <AiFillRightCircle
                            onClick={(e) => {
                              addToCart(
                                k,
                                Cart[k].name,
                                1,
                                Cart[k].price,
                                Cart[k].size,
                                Cart[k].color
                              );
                            }}
                            className="hover:opacity-75 text-[#003d29]"
                          />
                        </div>
                        <span className="flex items-center font-sans text-base text-[#003d29]">
                          {Cart[k].size}/{Cart[k].color}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* <hr className="shadow-sm shadow-[#003d29]" /> */}

                <hr className="shadow-sm shadow-[#003d29]" />
                <div className="flex flex-col gap-y-3 justify-end pb-6">
                  <div className="flex flex-row justify-between">
                    <span className="text-xl text-[#003d29]">Subtotal</span>
                    <span className="text-xl text-[#003d29]">₹{subTotal}</span>
                  </div>
                  <span className="text-sm text-start font-light">
                    Shipping and taxes calculated at checkout.
                  </span>
                  <div className="flex flex-row justify-between">
                    <Link href={"/checkout"}>
                      <button disabled={Object.keys(Cart).length == 0} className="disabled:opacity-60 flex justify-center items-center h-12 text-xl bg-[#4942E4] text-white rounded-lg px-6 py-4">
                        Checkout
                      </button>
                    </Link>
                    <button
                      onClick={clearcart}
                      disabled={Object.keys(Cart).length == 0}
                      className="disabled:opacity-60 flex justify-center items-center h-12 text-xl bg-[#4942E4] text-white rounded-lg px-6 py-4"
                    >
                      Clear cart
                    </button>
                  </div>
                </div>
              </div>
            </Bounce>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
