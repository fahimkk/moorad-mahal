"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/store/useAuthStore";
import React from "react";
import { useRouter } from "next/navigation";

interface GetUserPayload {
  email?: string
  mobile?: number
  password: string
}

const fetchUserData = async (params: GetUserPayload) => {
    try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(params),
          headers: { "Content-Type": "application/json" },
        });
        return await res.json();
      } catch (error) {
        console.error("Fetch user data error:", error);
        return { error: "Failed to connect to the server" };
      }
}


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter()
    const { setUser, setToken } = useAuthStore()

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const mobileRaw = formData.get("mobile");
        const mobile = mobileRaw ? Number(mobileRaw) : undefined;
        const password = formData.get("password") as string;
        const data = await fetchUserData({email, mobile, password})
        if (data.error) {
            alert(`Login failed: ${data.error}`);
            return;
        }
        if (data.token) {
            setUser(data.user); 
            setToken(data.token); 
            localStorage.setItem("token", data.token);
            router.replace("/");
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
            <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
                Enter your email / mobile below to login to your account
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="mobile">Mobile</Label>
                    <Input
                    id="mobile"
                    name="mobile"
                    type="number"
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                        Forgot your password?
                    </a>
                    </div>
                    <Input 
                        id="password"
                        name="password"
                        type="password"
                        required
                    />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
                </div>
            </form>
            </CardContent>
        </Card>
        </div>
    )
}
