"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ProgressBar() {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [pathname]);

    return (
        <div
            className={`fixed top-0 left-0 w-full h-1 bg-black transition-all duration-300 ${
                loading ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
        />
    );
}
