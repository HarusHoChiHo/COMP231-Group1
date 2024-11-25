"use client"

import {ReactNode} from "react";
import {AuthProvider} from "@/app/AuthContext";

export function Providers({children}: {children: ReactNode}) {
    return (
      <AuthProvider>
          {children}
      </AuthProvider>
    );
}