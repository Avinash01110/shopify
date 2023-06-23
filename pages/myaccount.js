import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const myaccount = () => {
  const router = useRouter();

  const [profile, setProfile] = useState({ style: "visible", animation: true });
  const [biling, setBiling] = useState({
    style: "invisible",
    animation: false,
  });
  const [security, setSecurity] = useState({
    style: "invisible",
    animation: false,
  });
  const [settings, setSettings] = useState({
    style: "invisible",
    animation: false,
  });
  const [delete_account, setDelete_account] = useState({
    style: "invisible",
    animation: false,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/home");
    } else {
      fetchUser();
    }
  }, []);

  const fetchPin = async (value) => {
    const pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    const pinjson = await pins.json();
    if (Object.keys(pinjson).includes(value)) {
      setState(pinjson[value][0]);
      setCity(pinjson[value][1]);
    } else {
      setState("");
      setCity("");
    }
  };

  const handleOnChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        fetchPin(e.target.value);
      } else {
        setState("");
        setCity("");
      }
    } else if (e.target.name == "state") {
      setState(e.target.value);
    } else if (e.target.name == "city") {
      setCity(e.target.value);
    } else if (e.target.name == "oldpassword") {
      setOldPassword(e.target.value);
    } else if (e.target.name == "newpassword") {
      setNewPassword(e.target.value);
    } else if (e.target.name == "confirmpassword") {
      setConfirmPassword(e.target.value);
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

  const fetchUser = async () => {
    const data = { token: localStorage.getItem("token") };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getuser`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    let result = await response.json();
    if (result.success) {
      setName(result.user.name);
      setEmail(result.user.email);
      setPhone(result.user.phone);
      setAddress(result.user.address);
      setPincode(result.user.pincode);
      fetchPin(result.user.pincode);
      // setState(result.state)
      // setCity(result.city)
    } else {
    }
  };

  const handleUserSubmit = async () => {
    const data = {
      token: localStorage.getItem("token"),
      name,
      phone,
      address,
      pincode,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/updateuser`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    let result = await response.json();
    if (result.success) {
      toast.success("Details are successfully updated", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error(result.error, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const updatePassword = async () => {
    const data = {
      token: localStorage.getItem("token"),
      oldPassword,
      newPassword,
      confirmPassword,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    let result = await response.json();
    if (result.success) {
      toast.success(result.success, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error(result.error, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const toggle_profile = () => {
    if (profile.style == "invisible") {
      setBiling({ style: "invisible", animation: false });
      setSecurity({ style: "invisible", animation: false });
      setSettings({ style: "invisible", animation: false });
      setDelete_account({ style: "invisible", animation: false });
      setProfile({ style: "visible", animation: true });
    }
  };

  const toggle_biling = () => {
    if (biling.style == "invisible") {
      setProfile({ style: "invisible", animation: false });
      setSecurity({ style: "invisible", animation: false });
      setSettings({ style: "invisible", animation: false });
      setDelete_account({ style: "invisible", animation: false });
      setBiling({ style: "visible", animation: true });
    }
  };

  const toggle_security = () => {
    if (security.style == "invisible") {
      setProfile({ style: "invisible", animation: false });
      setBiling({ style: "invisible", animation: false });
      setSettings({ style: "invisible", animation: false });
      setDelete_account({ style: "invisible", animation: false });
      setSecurity({ style: "visible", animation: true });
    }
  };

  const toggle_settings = () => {
    if (settings.style == "invisible") {
      setProfile({ style: "invisible", animation: false });
      setBiling({ style: "invisible", animation: false });
      setSecurity({ style: "invisible", animation: false });
      setDelete_account({ style: "invisible", animation: false });
      setSettings({ style: "visible", animation: true });
    }
  };

  const toggle_delete_account = () => {
    if (delete_account.style == "invisible") {
      setProfile({ style: "invisible", animation: false });
      setBiling({ style: "invisible", animation: false });
      setSecurity({ style: "invisible", animation: false });
      setSettings({ style: "invisible", animation: false });
      setDelete_account({ style: "visible", animation: true });
    }
  };
  return (
    <div className="pt-[6.25rem] bg-gray-100">
      <div className="flex flex-row w-full h-screen">
        <div className="bg-white h-screen w-60 rounded-r-lg border-2 border-[#003d29] ">
          <div className="flex flex-col justify-center items-center gap-y-4 pt-16">
            <button
              onClick={toggle_profile}
              className="text-base font-sans hover:text-[#003d29] focus:text-[#003d29] font-bold hover:bg-[#EEEEEE] hover:text-lg focus:text-lg focus:bg-[#EEEEEE] rounded-xl px-4 py-2"
            >
              My Profile
            </button>
            <button
              onClick={toggle_biling}
              className="text-base font-sans hover:text-[#003d29] focus:text-[#003d29] font-bold hover:bg-[#EEEEEE] hover:text-lg focus:text-lg focus:bg-[#EEEEEE] rounded-xl px-4 py-2"
            >
              Biling
            </button>
            <button
              onClick={toggle_security}
              className="text-base font-sans hover:text-[#003d29] focus:text-[#003d29] font-bold hover:bg-[#EEEEEE] hover:text-lg focus:text-lg focus:bg-[#EEEEEE] rounded-xl px-4 py-2"
            >
              Security
            </button>
            <button
              onClick={toggle_settings}
              className="text-base font-sans hover:text-[#003d29] focus:text-[#003d29] font-bold hover:bg-[#EEEEEE] hover:text-lg focus:text-lg focus:bg-[#EEEEEE] rounded-xl px-4 py-2"
            >
              Settings
            </button>
            <button
              onClick={toggle_delete_account}
              className="text-base text-red-600 font-sans focus:text-red-600 font-bold hover:bg-[#EEEEEE] hover:text-lg focus:text-lg focus:bg-[#EEEEEE] rounded-xl px-4 py-2"
            >
              Delete account
            </button>
          </div>
        </div>

        <Fade when={profile.animation}>
          <div
            className={`${profile.style} absolute left-72 h-screen w-[64rem] bg-white rounded-b-lg border-2 border-[#003d29] overflow-y-auto`}
          >
            <div className="pt-16 px-8 space-y-6">
              <h1 className="text-xl font-sans text-[#003d29] font-bold">
                My profile
              </h1>

              <div className="border-b border-gray-900/10 pb-12 space-y-6 px-10">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col w-full gap-y-1 col-span-2">
                    <span className="pl-2 font-sans text-base font-medium">
                      Name :
                    </span>
                    <input
                      onChange={handleOnChange}
                      value={name}
                      id="name"
                      name="name"
                      type="name"
                      autoComplete="name"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-y-1">
                    <span className="pl-2 font-sans text-base font-medium">
                      Email :
                    </span>
                    <input
                      onChange={handleOnChange}
                      value={email}
                      disabled
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                    <span className="pl-2 font-sans text-sm font-semibold text-red-600">
                      ( cannot be updated )
                    </span>
                  </div>

                  <div className="flex flex-col w-full gap-y-1">
                    <span className="pl-2 font-sans text-base font-medium">
                      Phone :
                    </span>
                    <input
                      onChange={handleOnChange}
                      value={phone}
                      id="phone"
                      name="phone"
                      type="phone"
                      autoComplete="phone"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12 px-10 space-y-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Address
                </h2>
                <div className="grid grid-cols-4 gap-6">
                  <div className="flex flex-col w-full gap-y-1 col-span-2">
                    <span className="pl-2 font-sans text-base font-medium">
                      Address :
                    </span>
                    <input
                      onChange={handleOnChange}
                      value={address}
                      id="address"
                      name="address"
                      type="address"
                      autoComplete="address"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-y-1 col-span-2">
                    <span className="pl-2 font-sans text-base font-medium">
                      Pincode :
                    </span>
                    <input
                      onChange={handleOnChange}
                      value={pincode}
                      id="pincode"
                      name="pincode"
                      type="pincode"
                      autoComplete="pincode"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-y-1 col-span-2">
                    <span className="pl-2 font-sans text-base font-medium">
                      State :
                    </span>
                    <input
                      onChange={handleOnChange}
                      value={state}
                      id="state"
                      name="state"
                      type="state"
                      autoComplete="state"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-y-1 col-span-2">
                    <span className="pl-2 font-sans text-base font-medium">
                      City :
                    </span>
                    <input
                      onChange={handleOnChange}
                      value={city}
                      id="city"
                      name="city"
                      type="city"
                      autoComplete="city"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end px-10 pb-10">
                <button
                  onClick={handleUserSubmit}
                  className="flex justify-center items-center font-bold text-base bg-[#4942E4] text-white px-4 py-1 rounded-md hover:opacity-75"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Fade>

        <Fade when={biling.animation}>
          <div
            className={`${biling.style} absolute left-72 h-screen w-[64rem] bg-white rounded-b-lg border-2 border-[#003d29] overflow-y-auto`}
          >
            <div className="pt-16 px-8">
              <h1 className="text-xl font-sans text-[#003d29] font-bold">
                Biling
              </h1>
            </div>
          </div>
        </Fade>

        <Fade when={security.animation}>
          <div
            className={`${security.style} absolute left-72 h-screen w-[64rem] bg-white rounded-b-lg border-2 border-[#003d29] overflow-y-auto`}
          >
            <div className="pt-16 px-8 space-y-6">
              <h1 className="text-xl font-sans text-[#003d29] font-bold">
                Security
              </h1>

              <div className="border-b border-gray-900/10 pb-12 px-10 space-y-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Change Password
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  <div className="flex flex-col w-full gap-y-1">
                    <span className="pl-2 font-sans text-base font-medium">
                      Old Password :
                    </span>
                    <input
                      onChange={handleOnChange}
                      minLength={5}
                      value={oldPassword}
                      id="oldpassword"
                      name="oldpassword"
                      type="password"
                      autoComplete="oldpassword"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-y-1">
                    <span className="pl-2 font-sans text-base font-medium">
                      New Password :
                    </span>
                    <input
                      onChange={handleOnChange}
                      minLength={5}
                      value={newPassword}
                      id="newpassword"
                      name="newpassword"
                      type="password"
                      autoComplete="newpassword"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-y-1">
                    <span className="pl-2 font-sans text-base font-medium">
                      Confirm New Password :
                    </span>
                    <input
                      onChange={handleOnChange}
                      minLength={5}
                      value={confirmPassword}
                      id="confirmpassword"
                      name="confirmpassword"
                      type="password"
                      autoComplete="confirmpassword"
                      className="w-full border-2 border-[#003d29] pl-2 py-1 rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end px-10 pb-10">
                <button onClick={updatePassword} className="flex justify-center items-center font-bold text-base bg-[#4942E4] text-white px-4 py-1 rounded-md hover:opacity-75">
                  Save
                </button>
              </div>
            </div>
          </div>
        </Fade>

        <Fade when={settings.animation}>
          <div
            className={`${settings.style} absolute left-72 h-screen w-[64rem] bg-white rounded-b-lg border-2 border-[#003d29] overflow-y-auto`}
          >
            <div className="pt-16 px-8">
              <h1 className="text-xl font-sans text-[#003d29] font-bold">
                Settings
              </h1>
            </div>
          </div>
        </Fade>

        <Fade when={delete_account.animation}>
          <div
            className={`${delete_account.style} absolute left-72 h-screen w-[64rem] bg-white rounded-b-lg border-2 border-[#003d29] overflow-y-auto`}
          >
            <div className="pt-16 px-8">
              <h1 className="text-xl font-sans text-[#003d29] font-bold">
                Delete
              </h1>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default myaccount;
