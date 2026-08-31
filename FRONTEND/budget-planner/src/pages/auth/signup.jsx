import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layout/authLayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/input';
import { validateEmail } from '../../helpers/help';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import upload from '../../helpers/uploadImage';
import axiosInstance from '../../helpers/axiosinstance';
import { API_PATHS } from '../../helpers/APIpaths';
import { UserContext } from '../../context/userContext';

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState ("");
  const [error, setError] = useState (null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName) return setError("Te rugam sa introduci numele tau.");
    if (!validateEmail(email)) return setError("Te rugam sa introduci o adresa de e-mail valida.");
    if (!password) return setError("Te rugam sa introduci o parola.");

    setError("");

    try {
        let finalProfileImageUrl = ""; 
        
        if (profilePic) {
            const imgUploadRes = await upload(profilePic);
            finalProfileImageUrl = imgUploadRes.imageUrl || "";
        }

        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
            fullName,
            email,
            password,
            profileImageUrl: finalProfileImageUrl, 
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
            setError("Eroare la inregistrare. Te rugam sa incerci din nou.");
        }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full rounded-lg p-10 flex flex-col items-center justify-center"> 
        <h3 className="text-3xl font-bold mb-6">Creeaza un cont nou</h3>
        <p className="text-2xs text-slate-600 mt-[5px] mb-8">
          Completeaza formularul de mai jos pentru a te inregistra
          </p>

          <form onSubmit ={handleSignup}>
             
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />


            <Input
            value={fullName}
            onChange={({target}) => setFullName(target.value)}
            label="Nume complet"
            placeholder="Popescu Ion"
            type="text"
            />

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
            placeholder="Introdu o parola"
            type="password"
            />

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn-login">
                  INREGISTREAZA-TE
            </button>

            <p className="text-sm text-slate-600 mt-4">
              Ai deja un cont?{" "}
              <span className="text-orange-500 cursor-pointer underline" onClick={() => navigate("/login")}>
                Conecteaza-te acum!
              </span>
            </p>

          </form>
    
        </div>
      </AuthLayout>

    
  );
};

export default Signup;

