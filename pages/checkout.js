import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AiOutlineCloseCircle,
  AiFillLeftCircle,
  AiFillRightCircle,
} from "react-icons/ai";
import { BsFillHandbagFill } from "react-icons/bs";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Flip} from 'react-toastify';

const checkout = ({Email, Cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {

    const email = async () => {
      if (localStorage.getItem("token")) {
        const token = {token:localStorage.getItem("token")};
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/email`,
          {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(token),
          }
        );

        let result = await response.json();
        setEmail(result);
      }
    };
    email();
  }, [])
  

  const handleOnChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        const pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        const pinjson = await pins.json();
        if (Object.keys(pinjson).includes(e.target.value)) {
          setState(pinjson[e.target.value][0]);
          setCity(pinjson[e.target.value][1]);
        } else {
          setState("");
          setCity("");
        }
      } else {
        setState("");
        setCity("");
      }
    } else if (e.target.name == "state") {
      setState(e.target.value);
    } else if (e.target.name == "city") {
      setCity(e.target.value);
    }
    setTimeout(() => {
    if (
      name.length &&
      email.length &&
      address.length &&
      phone.length &&
      pincode.length
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    }, 100);
  };

  const initiatePayment = async () => {
    let orderId = Math.floor(Math.random() * Date.now());
    let status = "paid";
    const data = {
      status,
      Cart,
      subTotal,
      orderId,
      email: email,
      name,
      address,
      state,
      city,
      pincode,
      phone,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    let txnToken = Math.floor(Math.random() * Date.now());
    let result = await response.json();
    console.log(result.success)
    // console.log(result.order_id);

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: orderId /* update order id */,
        token: txnToken /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: subTotal /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          // console.log("notifyMerchant handler function called");
          // console.log("eventName => ", eventName);
          // console.log("data => ", data);
        },
      },
    };

    // initialze configuration using init method
    if (result.success) {
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          // console.log("error => ", error);
        });
      setTimeout(() => {
        router.push("/order?id=" + result.order_id+"&clearcart=1");
      }, 2000);
    } else if (result.error) {
      // console.log(result.error);
      toast.error(result.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        if(result.cart_error){
          clearCart();
        }
    }
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        crossorigin="anonymous"
      ></Script>
      <div className="flex flex-col gap-y-6 bg-white pt-32 px-60">
        {/* <ToastContainer
          position="top-center"
          transition={Flip}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        /> */}
        <h1 className="font-medium text-2xl">Checkout page</h1>
        <h4 className="font-medium text-base">Delivery details :</h4>
        <div className="flex flex-row gap-x-6">
          <div className="flex flex-col w-full gap-y-1">
            <span className="pl-2">Name :</span>
            <input
              onChange={handleOnChange}
              value={name}
              id="name"
              name="name"
              type="name"
              autoComplete="name"
              className="w-full border-2 border-[#003d29] pl-2 py-2 rounded-lg"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <span className="pl-2">Email :</span>
            <input
              onChange={handleOnChange}
              value={email}
              disabled
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="w-full border-2 border-[#003d29] pl-2 py-2 rounded-lg"
              placeholder="Email"
            />
          </div>
        </div>

        <div className="flex flex-col w-full gap-y-1">
          <span className="pl-2">Address :</span>
          <input
            onChange={handleOnChange}
            value={address}
            id="address"
            name="address"
            type="address"
            autoComplete="address"
            className="w-full border-2 border-[#003d29] pl-2 py-2 rounded-lg"
            placeholder="Address"
          />
        </div>

        <div className="flex flex-row gap-x-6">
          <div className="flex flex-col w-full gap-y-1">
            <span className="pl-2">Phone :</span>
            <input
              onChange={handleOnChange}
              value={phone}
              id="phone"
              name="phone"
              type="phone"
              autoComplete="phone"
              className="w-full border-2 border-[#003d29] pl-2 py-2 rounded-lg"
              placeholder="Phone"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <span className="pl-2">Pincode :</span>
            <input
              onChange={handleOnChange}
              value={pincode}
              id="pincode"
              name="pincode"
              type="pincode"
              autoComplete="pincode"
              className="w-full border-2 border-[#003d29] pl-2 py-2 rounded-lg"
              placeholder="Pincode"
            />
          </div>
        </div>

        <div className="flex flex-row gap-x-6">
          <div className="flex flex-col w-full gap-y-1">
            <span className="pl-2">State :</span>
            <input
              onChange={handleOnChange}
              value={state}
              id="state"
              name="state"
              type="state"
              autoComplete="state"
              className="w-full border-2 border-[#003d29] pl-2 py-2 rounded-lg"
              placeholder="State"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <span className="pl-2">City :</span>
            <input
              onChange={handleOnChange}
              value={city}
              id="city"
              name="city"
              type="city"
              autoComplete="city"
              className="w-full border-2 border-[#003d29] pl-2 py-2 rounded-lg"
              placeholder="City"
            />
          </div>
        </div>

        <h4 className="font-medium text-base">Review cart items :</h4>

        <div
          className={`text-base font-medium rounded-lg bg-gray-100 h-auto w-full px-4 pt-4 space-y-7 overflow-auto`}
        >
          {Object.keys(Cart).length == 0 && (
            <div className="font-base text-start">Add few items in cart</div>
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
                      onClick={() => {
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
              <button
                disabled={disabled}
                onClick={initiatePayment}
                className="disabled:opacity-60 flex flex-row gap-x-4 justify-center items-center h-12 text-xl bg-[#4942E4] text-white rounded-lg px-6 py-4"
              >
                <BsFillHandbagFill />
                Pay ₹{subTotal}
              </button>

              <button
                onClick={clearCart}
                disabled={Object.keys(Cart).length == 0}
                className="disabled:opacity-60 flex justify-center items-center h-12 text-xl bg-[#4942E4] text-white rounded-lg px-6 py-4"
              >
                Clear cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default checkout;
