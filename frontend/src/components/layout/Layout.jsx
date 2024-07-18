import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet,HelmetProvider } from "react-helmet-async";
import  { Toaster } from 'react-hot-toast';


function Layout({
  children,
  title = "PCREX:COMPUTER HARDWARE",
  description = "computer hardware online",
  keywords = "computer hardware",
  author = "Taslim",
}) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
        </Helmet>

      </HelmetProvider>
      <Header />

      <main style={{ minHeight: "80vh" }}>
      
        {children} 
        <Toaster />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
