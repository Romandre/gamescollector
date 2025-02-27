"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

// Components
import { Button, CircleLoader, Input, SectionTitle } from "../design";

// Context
import { useCommonContext } from "@/context";

// Styles
import { css } from "../../../styled-system/css";

// Icons
import { MdErrorOutline } from "react-icons/md";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

interface LoginForm {
  username?: string;
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
  const [isPending, startTransition] = useTransition();
  const { linkBeforeLogin } = useCommonContext();
  const [activeForm, setActiveForm] = useState<"login" | "signup">("login");
  const [isFormChanging, setIsFormChanging] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isLoginForm = activeForm === "login";
  const inputClass = css({ w: "full", h: `50px`, px: 2 });

  const eyeIconClass = css({
    position: "absolute",
    h: "full",
    top: 0,
    right: 2,
    color: "#989898",
    fontSize: 22,
    cursor: "pointer",
  });

  const handleLogin = (formData: FormData) => {
    setMessage("");
    startTransition(async () => {
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
      }
    });
  };

  const handleSignup = (formData: FormData) => {
    setMessage("");
    startTransition(async () => {
      try {
        const result = await signup(formData);

        if (result.success) {
          router.push(linkBeforeLogin);
        } else {
          setMessage(result.message || "Account creation failed.");
        }
      } catch (error) {
        setMessage("An error occurred during account creation.");
        console.error("Signup Error:", error);
      }
    });
  };

  const handleFormChange = () => {
    setMessage("");
    setIsFormChanging(true);
    setTimeout(() => {
      setActiveForm(isLoginForm ? "signup" : "login");
      setIsFormChanging(false);
    }, 300);
  };

  return (
    <div
      className={css({
        maxW: "500px",
        mt: 20,
        mx: "auto",
        p: { base: 4, sm: 8 },
        borderRadius: 10,
        opacity: isFormChanging ? 0 : 1,
        transition: "opacity 0.4s",
        animation: "fade-in 0.6s",
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
        {!isLoginForm && (
          <Input
            value={loginForm.username || ""}
            label="username"
            name="username"
            placeholder="Enter username"
            className={inputClass}
            onChange={(val) => {
              setMessage("");
              setLoginForm({ ...loginForm, username: val });
            }}
            required={true}
          />
        )}
        <Input
          value={loginForm.email}
          label="email"
          name="email"
          placeholder="Enter email"
          className={inputClass}
          onChange={(val) => {
            setMessage("");
            setLoginForm({ ...loginForm, email: val });
          }}
          required={true}
        />
        <div className={css({ position: "relative", w: "full", h: "full" })}>
          <Input
            value={loginForm.password}
            label="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className={inputClass}
            onChange={(val) => {
              setMessage("");
              setLoginForm({ ...loginForm, password: val });
            }}
            required={true}
          />
          {showPassword ? (
            <VscEye
              className={eyeIconClass}
              onClick={() => {
                setShowPassword(false);
              }}
            />
          ) : (
            <VscEyeClosed
              className={eyeIconClass}
              onClick={() => {
                setShowPassword(true);
              }}
            />
          )}
        </div>
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
            className={css({
              color: "{colors.primary}",
              fontWeight: 500,
              cursor: "pointer",
            })}
            onClick={handleFormChange}
          >
            {isLoginForm
              ? "I don't have an account"
              : "I already have an account"}
          </span>
          {isPending ? (
            <CircleLoader className={css({ w: "160px" })} />
          ) : (
            <Button
              type="submit"
              className={css({
                w: { base: "140px", sm: "160px" },
                flexShrink: 0,
              })}
            >
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
              animation: "fade-in 0.4s",
            })}
          >
            <MdErrorOutline size={24} className={css({ flexShrink: 0 })} />
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  );
}
