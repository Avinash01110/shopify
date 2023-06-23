import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import { Flip } from "react-toastify";

export default function App({ Component, pageProps }) {
  const [Cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState();

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      localStorage.clear();
    }
    let token = localStorage.getItem("token");

    if (token) {
      setUser({ value: token });
    }

    
    setKey(Math.random());
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  }, [router.query]);

  const saveCart = (newcart) => {
    localStorage.setItem("cart", JSON.stringify(newcart));
    let subT = 0;
    let keys = Object.keys(newcart);
    for (let i = 0; i < keys.length; i++) {
      subT += newcart[keys[i]].price * newcart[keys[i]].qty;
    }
    setSubTotal(subT);
  };

  const addToCart = (itemcode, name, qty, price, size, color) => {
    let newcart = Cart;
    if (itemcode in Cart) {
      newcart[itemcode].qty = Cart[itemcode].qty + qty;
    } else {
      newcart[itemcode] = { name, qty: 1, price, size, color };
    }
    setCart(newcart);
    saveCart(newcart);
    toast.success("Product has added to cart.");
  };

  const removeFromCart = (itemcode, name, qty, price, size, color) => {
    let newcart = JSON.parse(JSON.stringify(Cart));
    if (itemcode in Cart) {
      newcart[itemcode].qty = Cart[itemcode].qty - qty;
    }
    if (newcart[itemcode].qty <= 0) {
      delete newcart[itemcode];
    }
    setCart(newcart);
    saveCart(newcart);
    toast.success("Product has removed from cart.");
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
    toast.success("Cart is now cleared.");
  };

  const buyNow = (itemcode, name, qty, price, size, color) => {
    saveCart({});
    let newcart = {};
    newcart[itemcode] = { name, qty: 1, price, size, color };
    setCart(newcart);
    saveCart(newcart);
    router.push("/checkout");
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setKey(Math.random());
    setUser({ value: null });
    router.push("/home");
  };

  return (
    <div className="bg-white text-black h-screen">
      <LoadingBar
        color="#4942E4"
        progress={progress}
        waitingTime={1000}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer
        position="bottom-center"
        transition={Flip}
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {key && (
        <Navbar
          key={key}
          logOut={logOut}
          user={user}
          Cart={Cart}
          subTotal={subTotal}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      )}
      <Component
        Email={email}
        Cart={Cart}
        buyNow={buyNow}
        subTotal={subTotal}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        {...pageProps}
      />
      <Footer
        Cart={Cart}
        subTotal={subTotal}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </div>
  );
}
