import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="d-flex vh-100">
      <div className="container text-center align-self-center">
        <h1 className="my-5">Bienvenido a Ironhack</h1>
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-primary mx-2" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn btn-secondary mx-2" onClick={() => navigate("/signup")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
