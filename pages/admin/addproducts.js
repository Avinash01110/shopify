import Content from "@/components/admin/Content";
import Footer from "@/components/admin/Footer";
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const addproducts = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("furniture");
  const [price, setPrice] = useState();
  const [size, setSize] = useState("L");
  const [color, setColor] = useState("Black");
  const [availableQty, setAvailableQty] = useState();

  const handleOnChange = async (e) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else if (e.target.name == "slug") {
      setSlug(e.target.value);
    } else if (e.target.name == "description") {
      setDescription(e.target.value);
    } else if (e.target.name == "imageurl") {
      setImageUrl(e.target.value);
    } else if (e.target.name == "category") {
      setCategory(e.target.value);
    } else if (e.target.name == "price") {
      setPrice(parseInt(e.target.value));
    } else if (e.target.name == "size") {
      setSize(e.target.value);
    } else if (e.target.name == "color") {
      setColor(e.target.value);
    } else if (e.target.name == "availableqty") {
      setAvailableQty(parseInt(e.target.value));
    }
  };

  const addProducts = async(e)=>{
    e.preventDefault();
    const data = [{title,slug,description,imageUrl,category,price,size,color,availableQty}];
    console.log(data)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/addproducts`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log(result)
      if(result.success){
        toast.success(result.success, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }else{
        toast.error(result.error, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
  }
  return (
    <div className="min-h-screen">
      <style jsx global>
        {`
          Footer {
            display: none;
          }
          #Navbar {
            display: none;
          }
        `}
      </style>
      <Navbar />
      <div className="flex overflow-hidden bg-white">
        <Sidebar />
        <div className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64 pt-16">
          <div className={`h-auto w-[64rem] bg-white`}>
            <div className="pt-16 px-8 space-y-6">
              <h1 className="text-xl font-sans text-[#003d29] font-bold">
                My profile
              </h1>

              <div className="border-b border-gray-900/10 pb-12 space-y-6 px-10">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Product Information
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col w-full gap-y-1 col-span-2">
                    <span className="pl-2 font-sans text-base font-medium">
                      Title :
                    </span>
                    <input
                      onChange={handleOnChange}
                      value={title}
                      id="title"
                      name="title"
                      type="title"
                      autoComplete="title"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-y-1 col-span-2">
                    <span className="pl-2 font-sans text-base font-medium">
                      Slug :
                    </span>
                    <input
                      onChange={handleOnChange}
                      value={slug}
                      id="slug"
                      name="slug"
                      type="slug"
                      autoComplete="slug"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                    <span className="pl-2 font-sans text-sm font-semibold text-red-600">
                      ( It should be unique )
                    </span>
                  </div>

                  <div className="flex flex-col w-full gap-y-1 col-span-2">
                    <span className="pl-2 font-sans text-base font-medium">
                      Description :
                    </span>
                    <textarea
                      onChange={handleOnChange}
                      value={description}
                      id="description"
                      name="description"
                      type="description"
                      autoComplete="description"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-y-1">
                    <span className="pl-2 font-sans text-base font-medium">
                      Image Url :
                    </span>
                    <input
                      onChange={handleOnChange}
                      value={imageUrl}
                      id="imageurl"
                      name="imageurl"
                      type="imageurl"
                      autoComplete="imageurl"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-y-1">
                    <span className="pl-2 font-sans text-base font-medium">
                      Category :
                    </span>
                    <select
                      onChange={handleOnChange}
                      name="category"
                      value={category}
                      id="category"
                      autoComplete="category"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg text-base font-sans font-medium"
                    >
                      <option
                        value="furniture"
                        className="text-base font-sans font-medium"
                      >
                        furniture
                      </option>
                      <option
                        value="handbag"
                        className="text-base font-sans font-medium"
                      >
                        handbag
                      </option>
                      <option
                        value="shoe"
                        className="text-base font-sans font-medium"
                      >
                        shoe
                      </option>
                      <option
                        value="headphone"
                        className="text-base font-sans font-medium"
                      >
                        headphone
                      </option>
                      <option
                        value="laptop"
                        className="text-base font-sans font-medium"
                      >
                        laptop
                      </option>
                      <option
                        value="book"
                        className="text-base font-sans font-medium"
                      >
                        book
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col w-full gap-y-1">
                    <span className="pl-2 font-sans text-base font-medium">
                      Price :
                    </span>
                    <input
                      onChange={handleOnChange}
                      value={price}
                      id="price"
                      name="price"
                      type="number"
                      autoComplete="price"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-y-1">
                    <span className="pl-2 font-sans text-base font-medium">
                      Size :
                    </span>
                    <select
                      value={size}
                      onChange={handleOnChange}
                      name="size"
                      id="size"
                      autoComplete="size"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg text-base font-sans font-medium"
                    >
                      <option
                        value="S"
                        className="text-base font-sans font-medium"
                      >
                        S
                      </option>
                      <option
                        value="M"
                        className="text-base font-sans font-medium"
                      >
                        M
                      </option>
                      <option
                        value="L"
                        className="text-base font-sans font-medium"
                      >
                        L
                      </option>
                      <option
                        value="XL"
                        className="text-base font-sans font-medium"
                      >
                        XL
                      </option>
                      <option
                        value="XXL"
                        className="text-base font-sans font-medium"
                      >
                        XXL
                      </option>
                      <option
                        value="XXXL"
                        className="text-base font-sans font-medium"
                      >
                        XXXL
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col w-full gap-y-1">
                    <span className="pl-2 font-sans text-base font-medium">
                      Color :
                    </span>
                    <select
                      onChange={handleOnChange}
                      value={color}
                      name="color"
                      id="color"
                      autoComplete="color"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg text-base font-sans font-medium"
                    >
                      <option
                        value="Black"
                        className="text-base font-sans font-medium"
                      >
                        Black
                      </option>
                      <option
                        value="Brown"
                        className="text-base font-sans font-medium"
                      >
                        Brown
                      </option>
                      <option
                        value="Blue"
                        className="text-base font-sans font-medium"
                      >
                        Blue
                      </option>
                      <option
                        value="Green"
                        className="text-base font-sans font-medium"
                      >
                        Green
                      </option>
                      <option
                        value="Yellow"
                        className="text-base font-sans font-medium"
                      >
                        Yellow
                      </option>
                      <option
                        value="Red"
                        className="text-base font-sans font-medium"
                      >
                        Red
                      </option>
                      <option
                        value="White"
                        className="text-base font-sans font-medium"
                      >
                        White
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col w-full gap-y-1">
                    <span className="pl-2 font-sans text-base font-medium">
                      Available Qty :
                    </span>
                    <input
                      onChange={handleOnChange}
                      value={availableQty}
                      id="availableqty"
                      name="availableqty"
                      type="number"
                      autoComplete="availableqty"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end px-10 pb-10">
                <button
                  onClick={addProducts}
                  className="flex justify-center items-center font-bold text-base bg-[#4942E4] text-white px-4 py-1 rounded-md hover:opacity-75"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default addproducts;
