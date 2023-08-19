"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Login() {
  const [usu_nombre, setEmail] = useState("");
  const [usu_contraseña, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      const result = await signIn("credentials", {
        usu_contraseña,
        usu_nombre,
        redirect: false,
        callbackUrl :'/'
      });
      console.log(result);
      if (result.error) {
        setError("Invalid Credentials");
      } else {
        router.push("/"); // Redirige a la página principal si la autenticación es exitosa
      }

  };

  return (
    <div className="container mt-4">
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="usu_contraseña"
            aria-describedby="emailHelp"
            onChange={handleEmailChange}
            value={usu_nombre}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="usu_contraseña" className="form-label">
            Password
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
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
