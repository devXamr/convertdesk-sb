
import React from "react";



export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {




  return (
      <main>




          <div>
              {children}
          </div>


      </main>
  );
}
