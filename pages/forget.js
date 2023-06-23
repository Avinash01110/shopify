import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const forget = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/home");
    }
  }, []);

  const handleOnChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "newpassword") {
      setNewPassword(e.target.value);
    } else if (e.target.name == "confirmpassword") {
      setConfirmPassword(e.target.value);
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const data = { email, sendmail: true };
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let result = await response.json();
    let token = JSON.stringify(result.token);
    console.log(token);
    if (result.success) {
      toast.success("Email has been sent to you", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        router.push("/forget?t=" + result.token);
      }, 2000);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    const data = { newPassword, confirmPassword, sendmail: false };
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    if (result.success) {
      toast.success("Password has been changed successfully", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router.push("/home");
    }
  };
  return (
    <div>
      <div className="flex min-h-screen bg-white flex-col justify-center px-6 pt-48 pb-16 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-12 w-auto rounded-full border-2 border-[#003d29]"
            src="/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Password
          </h2>
        </div>

        {!router.query.t && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleOnChange}
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md pl-2 border-2 border-[#003d29] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#003d29] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={sendEmail}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        )}

        {router.query.t && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    minLength={5}
                    onChange={handleOnChange}
                    value={newPassword}
                    id="newpassword"
                    name="newpassword"
                    type="password"
                    autoComplete="newpassword"
                    required
                    className="block w-full rounded-md pl-2 border-2 border-[#003d29] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#003d29] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm New Password
                </label>
                <div className="mt-2 space-y-1">
                  <input
                    minLength={5}
                    onChange={handleOnChange}
                    value={confirmPassword}
                    id="confirmnewpassword"
                    name="confirmpassword"
                    type="password"
                    autoComplete="confirmnewpassword"
                    required
                    className="block w-full rounded-md pl-2 border-2 border-[#003d29] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#003d29] sm:text-sm sm:leading-6"
                  />
                  {newPassword != confirmPassword && confirmPassword && (
                    <span className="text-red-500 font-sans font-semibold text-sm">
                      Does Not Match With New Password
                    </span>
                  )}
                  {newPassword == confirmPassword && confirmPassword && (
                    <AiFillCheckCircle className="text-[#003d29] text-xl" />
                  )}
                </div>
              </div>

              <div>
                <button
                  onClick={resetPassword}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default forget;
