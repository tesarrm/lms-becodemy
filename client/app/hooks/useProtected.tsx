import { redirect } from "next/navigation";
import userAuth from "./userAuth";
import React from "react"


interface ProtectedProps {
    children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
    const isAuthenticated = userAuth()

    return isAuthenticated ? children : redirect("/");
}