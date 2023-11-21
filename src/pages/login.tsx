import React, { useState } from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { LabelInput } from "@/components/label-input";

import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "@/configs/toastOptions";
import "react-toastify/dist/ReactToastify.css";

export function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  type FormEvent = React.FormEvent<HTMLFormElement>;

  const formValidation = () => {
    if (username.trim() === "" || password.trim() === "") {
      toast.error(
        "All fields are required. Please fill them in before proceeding.",
        toastOptions
      );
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formValidation()) return;
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center md:py-20 md:px-14">
      <div className="flex-1 bg-secondary w-full max-w-[600px] max-h-[690px] md:py-14 md:px-16 rounded-lg py-16 px-5">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full p-5 space-y-10"
        >
          <Logo />
          <div className="flex-1 flex flex-col justify-center space-y-5">
            <LabelInput
              type="username"
              label="Username"
              placeholder="Ex: @Chirpify"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <LabelInput
              type="password"
              label="Password"
              placeholder="********"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="text-base h-11" type="submit">
            Login
          </Button>
          <p className="text-center">
            Dont't have an account?{" "}
            <a href="/register" className="text-blue-500 font-medium uppercase">
              register
            </a>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
