"use client"

import {ReactNode} from "react";
import {AuthProvider} from "@/app/AuthContext";
import { NextUIProvider } from "@nextui-org/react";
import {useRouter} from "next/navigation";

export function Providers({children}: {
    children: ReactNode
}) {
    const router = useRouter();
    return (
        <NextUIProvider navigate={router.push}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </NextUIProvider>
    );
}