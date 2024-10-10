import { useState } from "react";
import logo from "./../../assets/images/logo.png";
import { useAuth } from "../../hooks/useAuth";

export default function Login({setIsAuthenticated}: {setIsAuthenticated:(isAuthenticated:boolean)=>void}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading, error } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Empêche le rechargement de la page
    await handleLogin(email, password, setIsAuthenticated);  // Appelle la fonction handleLogin
  };


  return (
    <div className="-translate-x-40 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-20 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo de l'application" className="h-16" />
        </div>
        
        <h1 className="text-center font-semibold text-2xl mb-6">Connectez-vous</h1>
        
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Adresse e-mail</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Entrez votre adresse e-mail"
            />
          </div>
  
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Entrez votre mot de passe"
            />
          </div>
  
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading ? 'Logging in...' : 'Se connecter'}

            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
