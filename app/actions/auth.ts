import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export async function signInAction(credentials: { username: string; password: string }) {
  await authClient.signIn.username({
    username: credentials.username,
    password: credentials.password,
  })

  redirect("/dashboard");
}

export async function signOutAction() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        redirect("/")
      }
    }
  });
}

export async function signUpAction(data: { email: string, username: string; password: string }) {
  await authClient.signUp({
    
  })
}