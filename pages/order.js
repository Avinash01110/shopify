import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { mongoose } from "mongoose";
import Order from "../models/order";

// const orderID = localStorage.getItem('orderID')
const order = ({ order, Cart, subTotal, clearCart }) => {
  const router = useRouter();
  useEffect(() => {
    if (router.query.clearcart == 1) {
      clearCart();
    }
  }, []);

  const products = order.products;
  return (
    <div className="bg-white pt-36 px-16">
      <div className="flex flex-row w-full h-auto">
        <div className="h-screen w-1/2 border-2 border-[#0c0e0d] rounded-l-md">
          <Image
            className="flex object-fit relative h-[38.78rem] w-full"
            src={"/images/Thank.png"}
            alt="Congratulations"
            width={400}
            height={32}
          ></Image>
        </div>
        <div className="flex flex-col gap-y-16 bg-gray-100 w-1/2 h-auto rounded-r-lg">
          <div className="flex flex-col gap-y-2 px-8 pt-16">
            <span className="font-sans text-base font-medium text-[#4942E4]">
              Payment successful
            </span>
            <h2 className="text-5xl text-[#191825] font-sans font-bold">
              Thanks for ordering :
            </h2>
            <span className="font-sans text-base font-medium opacity-50 text-black">
              We appreciate your order, we're currently processing it. So hang
              tight and we'll send you confirmation very soon!
            </span>
          </div>

          <div className="flex flex-col px-8 gap-y-6">
            <div className="flex flex-col gap-y-1">
              <span className="font-sans text-base font-medium text-[#191825]">
                Order no.
              </span>
              <span className="font-sans text-base font-medium text-[#4942E4]">
                #{order.orderId}
              </span>
            </div>
            {Object.keys(products).map((k, index) => {
              return (
                <div key={k} className="flex flex-col gap-y-2">
                  <div className="flex flex-row justify-between gap-x-10 text-start">
                    <span>
                      {index + 1}. {products[k].name}
                    </span>
                    <span>₹{products[k].price}</span>
                  </div>
                  <div className="flex flex-col pl-4 justify-start gap-x-2 rounded-md">
                    <span className="opacity-50 font-sans font-medium">
                      Qty : {products[k].qty}
                    </span>
                    <span className="opacity-50 font-sans font-medium">
                      {products[k].size}
                    </span>
                  </div>
                  <hr className="shadow-sm shadow-[#003d29]" />
                </div>
              );
            })}
          </div>

          <div className="flex flex-col px-8 gap-y-6">
            <div className="flex flex-row justify-between">
              <span className="font-sans text-base font-medium text-[#191825]">
                Subtotal
              </span>
              <span className="font-sans text-base font-medium text-[#191825]">
                ₹{order.amount}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="font-sans text-base font-medium text-[#191825]">
                Shipping
              </span>
              <span className="font-sans text-base font-medium text-[#191825]">
                ₹15
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="font-sans text-base font-medium text-[#191825]">
                Taxes
              </span>
              <span className="font-sans text-base font-medium text-[#191825]">
                ₹0
              </span>
            </div>
            <hr className="shadow-sm shadow-[#003d29]" />
            <div className="pb-12 flex flex-row justify-between">
              <span className="font-sans text-base font-medium text-[#191825]">
                Total
              </span>
              <span className="font-sans text-base font-medium text-[#191825]">
                ₹{order.amount+15}
              </span>
            </div>
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

  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default order;
