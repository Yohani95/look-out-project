'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Login({ translations }) {
  const [usu_nombre, setEmail] = useState('');
  const [usu_contraseña, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true); // Activar el spinner y bloquear el botón
    const result = await signIn('credentials', {
      usu_contraseña,
      usu_nombre,
      redirect: false,
      callbackUrl: '/',
    });
    setIsProcessing(false);
    if (result.error) {
      setError(translations.Common.InvalidCredentials);
    } else {
      router.push('/'); // Redirige a la página principal si la autenticación es exitosa
    }
  };

  return (
    <div className="d-flex mt-4 justify-content-center align-items-center">
      <div className="card col-lg-4 shadow">
        <div className="container mt-4 mb-4">
          <h4 className="text-center">{translations.Common.signIn}</h4>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                {translations.Common.userName}
              </label>
              <input
                type="text"
                className="form-control"
                id="usu_nombre"
                aria-describedby="emailHelp"
                onChange={handleEmailChange}
                value={usu_nombre}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="usu_contraseña" className="form-label">
                {translations.Common.password}
              </label>
              <input
                type="password"
                className="form-control"
                name="usu_contraseña"
                id="usu_contraseña"
                onChange={handlePasswordChange}
                value={usu_contraseña}
                required
              />
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary w-100 mt-3"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {translations.Common.loading}
                </>
              ) : (
                translations.Common.submit
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
