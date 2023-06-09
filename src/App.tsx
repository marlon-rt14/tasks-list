import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import "rsuite/dist/rsuite.min.css";
import { useAuthStore } from "./store/AuthStore";
import { decodeToken } from "react-jwt";
import { IUserLogged } from "./interfaces/IUser";
import { useUserLogged } from "./hooks/useUserLogged";

function App() {
  const { saveUserLogged } = useUserLogged();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = decodeToken<IUserLogged>(token);
        if (decoded) await saveUserLogged(decoded.email);
      }
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <div
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1>Loading...</h1>
      </div>
    );

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
