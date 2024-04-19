import { useSelector } from "react-redux"
import React from "react"
import { redirect } from "next/navigation";

interface ProtectedProps {
    children: React.ReactNode
}

export default function AdminProtected({ children }: ProtectedProps) {
    const { user } = useSelector((state: any) => state.auth);

    const isAdmin = user?.role === "admin"

    return isAdmin ? children : redirect("/")
}