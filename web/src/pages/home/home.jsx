import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile, logout } from "../../services/api-service";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        await profile();
        setIsLoggedIn(true);
    } catch (error) {
      console.error("Error checking session:", error);

        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  return (
    <div className="d-flex vh-100">
      <div className="container text-center align-self-center">
        <h1 className="my-5">Bienvenido a Ironhack</h1>
        <div className="d-flex justify-content-center mt-4">          
          {isLoggedIn ? (
            <>
              <button className="btn btn-danger mx-2" onClick={handleLogout}>
                Cerrar sesión
              </button>
              <button className="btn btn-info mx-2" onClick={() => navigate("/profile")}>
                Perfil
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-primary mx-2" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="btn btn-secondary mx-2" onClick={() => navigate("/signup")}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
