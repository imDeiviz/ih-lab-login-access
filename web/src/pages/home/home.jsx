import { useEffect, useState } from "react";
import { profile } from "../../services/api-service";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    profile()
      .then(setUser)
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login");
        }
      });
  }, [navigate]);

  return (
    <div>
      <h1>Home</h1>
      {user ? (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
