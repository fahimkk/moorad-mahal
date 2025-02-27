"use client";

import { ApplicationRoleType } from "@/lib/constant";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface WithAuthProps {
  children: ReactNode;
  allowedRoles: ApplicationRoleType[];
}

export default function WithAuth({ children, allowedRoles }: WithAuthProps) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // TODO: Handle accessing /login from browser after user loggedIn
    if (!user) {
      router.replace("/login"); // Redirect to login if not authenticated
    } else if (!allowedRoles.some(r => user.roles?.includes(r))) {
      router.replace("/403"); // Redirect if role is not allowed
    }
  }, [user, router, allowedRoles]);

  if (!user || !allowedRoles.some(r => user.roles?.includes(r))) {
    return null; // Prevent rendering protected content
  }

  return <>{children}</>;
}
