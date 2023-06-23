import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";

// Color green : #003d29
// color grey : #EEEEEE
// color blue : #4942E4
// color black : #0c0e0d

const orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState({});

  const funct = () => {};
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/myorders`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: localStorage.getItem("token") }),
        }
      );

      const result = await response.json();

      setOrders(result.orders);
    };
    if (!localStorage.getItem("token")) {
      router.push("/home");
    } else {
      fetchOrders();
    }
  }, []);

  return (
    <div className="px-36 pt-36 bg-white">
      <div className="flex flex-col gap-y-16">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-4xl font-sans text-[#0c0e0d] font-semibold">
            Order history
          </h1>
          <h3 className="font-sans text-base font-medium opacity-50 text-black">
            Check the status of recent orders, manage returns, and discover
            similar products.
          </h3>
        </div>

        {Object.keys(orders).map((k) => {
          let date = new Date(orders[k].createdAt);
          let options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          return (
            <div
              key={orders[k]._id}
              className="bg-gray-100 px-6 py-4 h-auto w-full rounded-xl space-y-4 shadow-[#003d29] shadow-lg border-2 border-[#003d29]"
            >
              <div className="flex flex-row gap-x-16">
                <div className="flex flex-col gap-y-1">
                  <span className="text-base font-sans font-medium text-[#003d29]">
                    Order number
                  </span>
                  <span className="font-sans text-base font-medium opacity-50 text-black">
                    #{orders[k].orderId}
                  </span>
                </div>
                <div className="flex flex-col gap-y-1">
                  <span className="text-base font-sans font-medium text-[#003d29]">
                    Date placed
                  </span>
                  <script></script>
                  <span className="font-sans text-base font-medium opacity-50 text-black">
                    {date.toLocaleDateString("en-IN", options)}
                  </span>
                </div>
                <div className="flex flex-col gap-y-1">
                  <span className="text-base font-sans font-medium text-[#003d29]">
                    Total amount
                  </span>
                  <span className="font-sans text-base font-medium opacity-50 text-black">
                    ₹{orders[k].amount}
                  </span>
                </div>
              </div>
              <hr className="bg-[#003d29] h-1" />

              {/* {Object.keys(orders[k].products).map((items)=>{return <div key={orders[k]._id+1}>{(orders[k].products)[items].name}</div>})} */}

              {Object.keys(orders[k].products).map((items, number) => {
                return (
                  <div
                    key={orders[k]._id + number}
                    className="flex flex-col gap-y-6"
                  >
                    <div className="flex flex-row gap-x-6 w-full">
                      <div className="flex flex-row justify-between w-full gap-x-60">
                        <span className="text-base text-justify font-sans font-medium text-[#003d29]">
                          {number + 1}. {orders[k].products[items].name}
                        </span>
                        <span className="text-base font-sans font-semibold">
                          ₹{orders[k].products[items].price}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-x-8">
                      <button className="flex justify-center items-center font-bold text-base bg-[#4942E4] text-white px-4 py-1 rounded-md">
                        View product
                      </button>
                      <button className="flex justify-center items-center font-bold text-base bg-[#4942E4] text-white px-4 py-1 rounded-md">
                        Buy again
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default orders;
