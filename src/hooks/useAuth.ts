import { useState } from 'react';
import { login } from '../api/authAPI';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const handleLogin = async (email: string, password: string, setIsAuthenticated:(setIsAuthenticated:boolean)=>void) => {
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem('userId', data.user_id);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userFirstName', data.prenom);
      localStorage.setItem('userName', data.nom);
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true)
      navigate("/")
      // Enregistrer le token, rediriger l'utilisateur, etc.
    } catch (err) {
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

//   const handleRegister = async (email: string, password: string) => {
//     setLoading(true);
//     try {
//       const data = await register(email, password);
//       // Rediriger vers la page de login, etc.
//     } catch (err) {
//       setError('Une erreur est survenue');
//     } finally {
//       setLoading(false);
//     }
//   };

  return { handleLogin, loading, error };
};
