import React from 'react'
import Content from "@/components/admin/Content";
import Footer from "@/components/admin/Footer";
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";

const imageuploader = () => {
  return (
    <div className="min-h-screen">
       <style jsx global>
        {`
          Footer {
            display: none;
          }
          #Navbar {
            display: none;
            
          }
        `}
      </style>
    <Navbar />
    <div className="flex overflow-hidden bg-white pt-16">
      <Sidebar />
      <div className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64 pt-16">
          <span>image</span>
        <Footer />
      </div>
    </div>
  </div>
  )
}

export default imageuploader