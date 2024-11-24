"use client";

import useServices from "@/services/useServices";
import LoginClient from "./login-client-component";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/stores/useAuthStore";


export default function LoginPage() {
  const { loginAccount } = useServices();
  const {userInfo, setUserInfo} = useAuthStore();
  const router = useRouter();
  async function handleLogin(body) {
    try {
      const res = await loginAccount(body);
      alert("Login success!");
      document.cookie = `token=${res.data.token}; path=/; max-age=3600`; 
      setUserInfo(res.data.user);
      router.push("/");
    } catch { 
      alert("Login failed");
    }
  }
  return (
    <>
      <LoginClient onLogin={handleLogin} />
    </>
  );
}
