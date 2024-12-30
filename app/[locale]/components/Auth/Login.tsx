'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import Image from 'next/image';
import LOGO from '@/public/images/logo.svg'; // Asegúrate de tener el logo de KPAZ
import LanguageDropdown from '../header/LanguageDropdown';

function Login({ translations }) {
  const [usu_nombre, setEmail] = useState('');
  const [usu_contraseña, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
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
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      {/* Logo con fondo degradado */}
      <div className="mb-6 p-4 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
        <Image src={LOGO} alt="KPAZ Logo" width={100} height={100} />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            {translations.Common.signIn}
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            {translations.Common.signInDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <Label htmlFor="usu_nombre">{translations.Common.userName}</Label>
              <Input
                id="usu_nombre"
                type="text"
                placeholder={translations.Common.enterUserName}
                value={usu_nombre}
                onChange={handleEmailChange}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="usu_contraseña">
                {translations.Common.password}
              </Label>
              <Input
                id="usu_contraseña"
                type="password"
                placeholder={translations.Common.enterPassword}
                value={usu_contraseña}
                onChange={handlePasswordChange}
                required
              />
            </div>

            {/* Forgot Password Link */}
            {/* <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                {translations.Common.forgotPassword}
              </a>
            </div> */}

            {/* Error Message */}
            {error && (
              <div className="text-sm text-center text-red-600">{error}</div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#2F4BCE] text-white hover:bg-blue-700"
            >
              {isProcessing ? (
                <>
                  <span className="loader mr-2"></span>
                  {translations.Common.loading}
                </>
              ) : (
                translations.Common.submit
              )}
            </Button>
          </form>
          {/* <div className="flex items-center space-x-4">
            <LanguageDropdown t={translations} />
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
