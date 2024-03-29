import React, { useEffect, useState } from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { LabelInput } from "@/components/label-input";

import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "@/configs/toastOptions";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch } from "@/redux/hooks";
import { authThunk } from "@/redux/auth/slice";

export function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  type FormEvent = React.FormEvent<HTMLFormElement>;

  const dispatch = useAppDispatch();

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
    dispatch(authThunk({ username, password }));
  };

  useEffect(() => {
    const registrationSuccess = localStorage.getItem("regSuccess");

    if (registrationSuccess === "true") {
      toast.success("User successfully registered.", toastOptions);
      localStorage.removeItem("regSuccess");
    }
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center md:py-20 md:px-14">
      <div className="bg-secondary w-full sm:max-w-[600px] sm:max-h-[690px] rounded-lg sm:py-16 px-10 flex flex-1 items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:h-full p-5 flex-1"
        >
          <Logo
            withText
            className="flex items-center justify-center text-4xl gap-5"
            size={96}
          />
          <div className="flex-1 flex flex-col justify-around py-10">
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
          <div className="w-full flex flex-col gap-3">
            <Button className="text-base h-12" type="submit">
              Login
            </Button>
            <p className="text-center">
              Dont't have an account?{" "}
              <a href="/register" className="text-logo font-medium uppercase">
                register
              </a>
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
