import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContextProvaider/AuthContextProvaider";

export const useToken = (email) => {
  const { url } = useContext(AuthContext);
  const [token, setToken] = useState("");
  console.log(email);

  if (email) {
    fetch(`${url}jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.accessToken) {
          localStorage.setItem("access_Token", data?.accessToken);
          setToken(data?.accessToken);
        }
      });
  }

  return [token];
};
