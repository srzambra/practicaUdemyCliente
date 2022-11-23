import React from "react";

export function AdminLayout(props) {
  const { children } = props; // children seria el contenido que tiene la pagina

  return (
    <div>
      <h2>Se esta usando el adminLayout</h2>
      {children}
    </div>
  );
}
