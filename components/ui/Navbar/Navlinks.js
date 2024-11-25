"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBagShopping,
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/stores/useAuthStore";
import useServices from "@/services/useServices";
import CartShop from "../Cart/CartShop";
import useCartStore from "@/app/stores/useCartStore";
import useLocalCart from "@/app/stores/useLocalCart";

export default function Navlinks() {
  const [isHiddenUser, setIsHiddenUser] = useState(true);
  // const [isHiddenCartOrder, setIsHiddenCartOrder] = useState(true); // Mặc định true
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const { userInfo, setUserInfo } = useAuthStore();
  const { isShowCart, setIsShowCart } = useCartStore();
  const [isHiddenCartOrder, setIsHiddenCartOrder] = useState(true);
  const { productsInCart } = useLocalCart();
  const { logoutAccount, getUserInfo } = useServices();

  const isActiveTab = (tab) => tab === activeTab;

  const router = useRouter();

  useEffect(() => {
    productsInCart.length > 0
      ? setIsHiddenCartOrder(false)
      : setIsHiddenCartOrder(true);
  }, [productsInCart]);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const res = await getUserInfo();
        setUserInfo(res);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
    const token = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("token="))
      ?.split("=")[1];
    if (token) {
      fetchUserInfo();
    }

  }, []);
 
  useEffect(() => {
    setIsLoggedIn(userInfo ? true : false);
  }, [userInfo]);

  function clickUserBtn() {
    setIsHiddenUser(!isHiddenUser);
  }

  function clickShowCart() {
    setIsShowCart(true);
  }

  async function clickLogout() {
    await logoutAccount();
    alert("Logout success!");
    document.cookie = `token=; path=/; max-age=3600`;
    setUserInfo(null);
    setIsLoggedIn(false);
    setIsHiddenUser(true);
    router.push("/login");
  }

  function clickLogin() {
    router.push("/login");
  }

  return (
    <>
      <ul className="flex flex-row justify-between gap-10">
        <li>
          <Link
            href={"/"}
            className={`hover:bg-transparent hover:border-b-2 text-white text-lg ${
              isActiveTab("home") ? "border-b-2" : ""
            }`}
            onClick={() => setActiveTab("home")}
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            href={"/products"}
            className={`hover:bg-transparent hover:border-b-2 text-white text-lg ${
              isActiveTab("products") ? "border-b-2" : ""
            }`}
            onClick={() => setActiveTab("products")}
          >
            PRODUCTS
          </Link>
        </li>
        <li>
          <Link
            href={"/orders"}
            className={`hover:bg-transparent hover:border-b-2 text-white text-lg ${
              isActiveTab("orders") ? "border-b-2" : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            ORDERS
          </Link>
        </li>
      </ul>
      <div className="flex flex-row justify-end">
        <button type="button" className="p-2" onClick={clickUserBtn}>
          <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} />
        </button>
        <div className="relative">
          <button type="button" className="p-2" onClick={clickShowCart}>
            <FontAwesomeIcon
              icon={faBagShopping}
              style={{ color: "#ffffff" }}
            />
          </button>
          <div
            className={`absolute bottom-1/2 right-0 w-4 h-4 rounded-full bg-gray-200 justify-center items-center text-xs ${
              isHiddenCartOrder ? "hidden" : "flex"
            }`}
          >
            {productsInCart.length}
          </div>
        </div>
      </div>
      <div
        className={`w-[200px] bg-white absolute top-3/4 right-0 shadow-xl border rounded-md ${
          isHiddenUser ? "hidden" : "flex"
        }`}
      >
        <div className="w-full flex-col gap-3 p-2">
          {isLoggedIn ? (
            <>
              <div className="font-[500]">{userInfo.email}</div>
              <div
                className="flex flex-row gap-3 w-full hover:bg-gray-100 p-2"
                role="button"
                onClick={clickLogout}
              >
                <button type="button">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
                <span className="font-[500]">Logout</span>
              </div>
            </>
          ) : (
            <div
              className="flex flex-row gap-3 w-full hover:bg-gray-100 p-2"
              role="button"
              onClick={clickLogin}
            >
              <button type="button">
                <FontAwesomeIcon icon={faRightToBracket} />
              </button>
              <span className="font-[500]">Login</span>
            </div>
          )}
        </div>
      </div>
      {isShowCart ? <CartShop /> : null}
    </>
  );
}
