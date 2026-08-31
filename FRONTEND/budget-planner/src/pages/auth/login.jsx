import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layout/authLayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/input';
import { validateEmail } from '../../helpers/help';
import axiosInstance from '../../helpers/axiosinstance';
import { API_PATHS } from '../../helpers/APIpaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState ("");
  const [error, setError] = useState (null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {  
      setError("Te rugam sa introduci o adresa de e-mail valida.");
      return;
    }

    if (!password) {    
      setError("Te rugam sa introduci parola.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password, 
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Eroare la autentificare. Te rugam sa incerci din nou.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full rounded-lg p-10 flex flex-col items-center justify-center"> 
        <h3 className="text-3xl font-bold mb-6">Bine ai revenit!</h3>
        <p className="text-2xs text-slate-600 mt-[5px] mb-8">
          Introdu datele de logare pentru a-ti accesa contul
          </p>

          <form onSubmit ={handleLogin}>
            <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder="popescu@example.com"
            type="text"
            />

             <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder="Introdu parola ta"
            type="password"
            />

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn-login">
                  INTRA IN CONT
            </button>

            <p className="text-sm text-slate-600 mt-4">
              Nu ai un cont?{" "}
              <span className="text-orange-500 cursor-pointer underline" onClick={() => navigate("/signup")}>
                Inregistreaza-te acum!
              </span>
            </p>

          </form>
    
        </div>
      </AuthLayout>

    
  );
};

export default Login;