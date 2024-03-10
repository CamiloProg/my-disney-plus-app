import React, { useContext, useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../../firebaseConfig";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      login({
        uid: user.uid,
        email: user.email,
      });

      setEmail("");
      setPassword("");
      setError(null);

      // No es necesario el setTimeout para navegar, ya que el estado se actualiza
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='daisy-hero min-h-screen bg-base-200'>
      <div className='daisy-hero-content flex-col justify-center w-[70%]'>
        <div className='text-center '>
          <h1 className='text-5xl font-bold'>Login now!</h1>
        </div>
        <div className='daisy-card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <form className='daisy-card-body' onSubmit={handleLogin}>
            <div className='daisy-form-control'>
              <label className='daisy-label'>
                <span className='daisy-label-text'>Email</span>
              </label>
              <input
                type='email'
                placeholder='email'
                className='daisy-input daisy-input-bordered'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='daisy-form-control'>
              <label className='daisy-label'>
                <span className='daisy-label-text'>Password</span>
              </label>
              <input
                type='password'
                placeholder='password'
                className='daisy-input daisy-input-bordered'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className='daisy-label'>
                <a
                  href='#'
                  className='daisy-label-text-alt daisy-link daisy-link-hover'
                >
                  Forgot password?
                </a>
                <a
                  href='/register'
                  className='daisy-label-text-alt daisy-link daisy-link-hover'
                >
                  Register
                </a>
              </label>
            </div>
            {error && <div className='text-red-500'>{error}</div>}
            <div className='daisy-form-control mt-6'>
              <button type='submit' className='daisy-btn daisy-btn-primary'>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
