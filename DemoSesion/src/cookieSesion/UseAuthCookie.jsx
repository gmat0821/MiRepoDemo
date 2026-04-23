import { useState, useEffect } from "react";
import { setCookie, getCookie, deleteCookie } from "./cookie"; 

export function UseAuthCookie() { // Nombre exacto que pediste
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = getCookie("token");
    if (saved) setToken(saved);
  }, []);

  const login = () => {
    const fakeToken = "123abc_EXITO";
    setCookie("token", fakeToken, 1);
    setToken(fakeToken);
  };

  const logout = () => {
    deleteCookie("token");
    setToken(null);
  };

  return { token, login, logout };
}