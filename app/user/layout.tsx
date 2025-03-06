"use client"

import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <ProgressBar
                height="4px"
                color="#fffd00"
                options={{ showSpinner: true }}
                shallowRouting={false}
            />
            {children}
        </>
    )
}