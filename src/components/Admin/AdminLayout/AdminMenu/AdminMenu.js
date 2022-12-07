import { Menu, Icon } from "semantic-ui-react";
import "./AdminMenu.scss";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../hooks";

export function AdminMenu() {
  // esto son de semantic estas propiedades fluis vertical icon text
  const { pathname } = useLocation(); // pathname es una propiedad de useLocation es
  const {
    user: { role },
  } = useAuth(); // en el useAuth me trae los datos y lo que voy a destructurar es role

  const isAdmin = role === "admin"; // si isAdmin es verdadero entonces puedo ver ciertos menu en caso contratio no

  const isCurrentPath = (path) => {
    // funcion para ver si esta activo el campo(si pincho que se quede ahi la barra de color )
    if (path === pathname) return true; // si el path que llega en el menu es igual al pathname que esta en la barra entonces retorna true en caso contrario false
    return false;
  };

  return (
    <Menu fluid vertical icon text className="admin-menu">
      {isAdmin && (
        <>
          <Menu.Item
            as={Link}
            to="/admin/users"
            active={isCurrentPath("/admin/users")}
          >
            <Icon name="user outline" />
            Usuario
          </Menu.Item>

          <Menu.Item
            as={Link}
            to="/admin/menu"
            active={isCurrentPath("/admin/menu")}
          >
            <Icon name="bars" />
            Menu
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin/courses"
            active={isCurrentPath("/admin/courses")}
          >
            <Icon name="computer" />
            Cursos
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin/newsletter"
            active={isCurrentPath("/admin/newsletter")}
          >
            <Icon name="mail" />
            Newsletter
          </Menu.Item>
        </>
      )}
      <Menu.Item
        as={Link}
        to="/admin/blog"
        active={isCurrentPath("/admin/blog")}
      >
        <Icon name="comment alternate outline" />
        Blog
      </Menu.Item>
    </Menu>
  );
}
