import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("User registered:", user);

  
      setEmail("");
      setPassword("");
      setError(null);
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='daisy-hero min-h-screen bg-base-200'>
      <div className='daisy-hero-content flex-col '>
        <div className='text-center'>
          <h1 className='text-5xl font-bold'>Register now!</h1>
          {error && <p className='py-2 text-red-500'>{error}</p>}
        </div>
        <div className='daisy-card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <form className='daisy-card-body' onSubmit={handleRegister}>
            <div className='daisy-form-control'>
              <label className='daisy-label'>
                <span className='daisy-label-text'>Email</span>
              </label>
              <input
                type='email'
                placeholder='Email'
                className='daisy-input daisy-input-bordered'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='daisy-form-control'>
              <label className='daisy-label'>
                <span className='daisy-label-text'>Password</span>
              </label>
              <input
                type='password'
                placeholder='Password'
                className='daisy-input daisy-input-bordered'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <a
              href='/login'
              className='daisy-label-text-alt daisy-link daisy-link-hover'
            >
              Log in
            </a>
            <div className='daisy-form-control mt-6'>
              <button type='submit' className='daisy-btn daisy-btn-primary'>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
