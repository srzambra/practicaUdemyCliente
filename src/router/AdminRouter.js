import React from "react";
import { Route, Routes } from "react-router-dom";
import { Auth, Users, Blog, Courses, Menu, Newsletter } from "../pages/admin";
import { AdminLayout } from "../layouts";
import { useAuth } from "../hooks";

export function AdminRouter() {
  const { user } = useAuth();

  ///admin/* cuando vaya a cualquier otro lugar que tenga *
  // admin/* todo lo que tenga admin por delante va aqui

  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };
  return (
    <Routes>
      {!user ? (
        <Route path="/admin/*" element={<Auth />} />
      ) : (
        <>
          {["/Admin", "/admin/blog"].map((path) => (
            <Route
              key={path}
              path={path}
              element={loadLayout(AdminLayout, Blog)}
            />
          ))}

          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
          <Route
            path="/admin/courses"
            element={loadLayout(AdminLayout, Courses)}
          />
          <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)} />
          <Route
            path="/admin/newsletter"
            element={loadLayout(AdminLayout, Newsletter)}
          />
        </>
      )}
    </Routes>
  );
}
