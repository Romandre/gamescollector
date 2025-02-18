"use server";
import { revalidatePath } from "next/cache";
import { supabaseClient } from "@/utils/supabase/server";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/utils/credentialsValidation";

export async function login(formData: FormData) {
  const supabase = await supabaseClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (!data.email || !data.password) {
    return { success: false, message: "Email and password are required." };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Login successful" };
}

export async function signup(formData: FormData) {
  const supabase = await supabaseClient();
  const username = formData.get("username") as string;

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: { username },
    },
  };

  if (!validateUsername(username)) {
    return {
      success: false,
      message:
        "Username can be minimum 5 and up to 18 characters long and must not include special characters.",
    };
  }

  if (!validateEmail(data.email)) {
    return { success: false, message: "Please, enter correct email" };
  }

  if (data.password.length < 8) {
    return {
      success: false,
      message: "Password should contain at least 8 characters",
    };
  }

  if (!validatePassword(data.password)) {
    return {
      success: false,
      message: "Password contains unsupported characters: < or >",
    };
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Account created successfuly" };
}
