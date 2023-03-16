"use client";

import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex items-center justify-center gap-y-8">
      <button onClick={() => signIn()}>Sign In With Google</button>
      <button onClick={() => signIn()}>Sign In With Github</button>
    </div>
  );
};

export default Login;
