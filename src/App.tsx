import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import Home from "./components/Home/Home.tsx";
import Profile from "./components/Profile/Profile.tsx";
import Program from "./components/Program/Program.tsx";
import Login from "./components/Login/Login.tsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.tsx";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  const hideNavbarPaths: string[] = ["/login"];

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated"); // Supprimer l'état d'authentification
    setIsAuthenticated(false); // Mettre à jour l'état d'authentification
  };

  if (loading) {
    return <main></main>; // Affiche un message de chargement
  }

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && (
        <header>
          <Navbar handleLogout={handleLogout}></Navbar>
        </header>
      )}
      <main className="lg:ml-[23.25rem] px-3 sm:px-8 py-20 flex justify-center">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/program"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Program />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          ></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
