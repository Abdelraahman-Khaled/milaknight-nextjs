"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/ui/Footer";


export default function BlogLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
