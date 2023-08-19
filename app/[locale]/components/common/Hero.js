"use client"
import React from 'react'
import { useSession } from "next-auth/react";
import { Hero_content } from '../Hero_content';
import Login from '../Auth/Login';
function Hero() {
    const { data: session } = useSession();
  return (
    <main>
      {session ? <Hero_content /> : <Login />}
    </main>
  )
}

export default Hero