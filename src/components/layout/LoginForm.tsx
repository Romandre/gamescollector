"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Components
import { Button, Input, SectionTitle } from "../design";

// Context
import { useAuthContext } from "@/context";

// Styles
import { css } from "../../../styled-system/css";

// Icons
import { MdErrorOutline } from "react-icons/md";

interface LoginForm {
  username: string;
  email: string;
  password: string;
}

export function LoginForm({
  login,
  signup,
}: {
  login: (formData: FormData) => Promise<{
    success: boolean;
    message: string;
  }>;
  signup: (formData: FormData) => Promise<{
    success: boolean;
    message: string;
  }>;
}) {
  const router = useRouter();
  const { linkBeforeLogin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [activeForm, setActiveForm] = useState<"login" | "signup">("login");
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const isLoginForm = activeForm === "login";

  const inputClass = `search ${css({ w: "full", h: `50px`, px: 2 })}`;

  console.log(loading);

  const handleLogin = async (formData: FormData) => {
    setLoading(true);
    try {
      const result = await login(formData);

      if (result.success) {
        router.push(linkBeforeLogin);
      } else {
        setMessage(result.message || "Login failed.");
      }
    } catch (error) {
      setMessage("An error occurred during login.");
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (formData: FormData) => {
    setLoading(true);
    try {
      const result = await signup(formData);

      if (result.success) {
        router.push(linkBeforeLogin);
      } else {
        setMessage(result.message || "Account creation failed.");
      }
    } catch (error) {
      setMessage("An error occurred during account creation.");
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={css({
        maxW: "500px",
        mt: 20,
        mx: "auto",
        p: 8,
        borderRadius: 10,
      })}
    >
      <SectionTitle>{isLoginForm ? "Login" : "Sign up"}</SectionTitle>
      <form
        action={isLoginForm ? handleLogin : handleSignup}
        className={css({
          display: "flex",
          mt: 5,
          flexDirection: "column",
          gap: 5,
        })}
      >
        <Input
          value={loginForm.email}
          label="email"
          name="email"
          placeholder="Enter email"
          className={inputClass}
          onChange={(val) => {
            setLoginForm({ ...loginForm, email: val });
          }}
          required={true}
        />
        <Input
          value={loginForm.password}
          label="password"
          name="password"
          placeholder="Enter password"
          className={inputClass}
          onChange={(val) => {
            setLoginForm({ ...loginForm, password: val });
          }}
          required={true}
        />
        <input id="link" name="link" type="hidden" value={linkBeforeLogin} />
        <div
          className={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          })}
        >
          <span
            className={css({ color: "{colors.primary}", fontWeight: 500 })}
            onClick={() => setActiveForm(isLoginForm ? "signup" : "login")}
          >
            {isLoginForm
              ? "I don't have an account"
              : "I already have an account"}
          </span>
          {loading ? (
            <span className="loader"></span>
          ) : (
            <Button type="submit" className={css({ w: "160px" })}>
              {isLoginForm ? "Let me in" : "Create account"}
            </Button>
          )}
        </div>
        {!!message && (
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              gap: 2,
            })}
          >
            <MdErrorOutline size={24} />
            <span>{message}</span>
          </div>
        )}
        {/* <button formAction={login}></button>
        <button formAction={signup}>Sign up</button> */}
      </form>
    </div>
  );
}
