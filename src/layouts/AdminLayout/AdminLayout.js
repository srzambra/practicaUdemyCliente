import React from "react";
import "./AdminLayout.scss";
import { Icon } from "../../assets";
import { AdminMenu, Logout } from "../../components/Admin/AdminLayout";

export function AdminLayout(props) {
  const { children } = props; // children seria el contenido que tiene la pagina

  return (
    <div className="admin-layout">
      <div className="admin-layout__left">
        <Icon.LogoCentral className="logo" />
        <AdminMenu />
      </div>
      <div className="admin-layout__right">
        <div className="admin-layout__right-header">
          <Logout />
        </div>
        <div className="admin-layout__right-content">{children}</div>
      </div>
    </div>
  );
}
