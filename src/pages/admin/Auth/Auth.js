import "./Auth.scss";
import { Icon } from "../../../assets";
import { Tab } from "semantic-ui-react";
import React, { useState } from "react";
import { RegisterForm, LoginForm } from "../../../components/Admin/Auth";

export function Auth() {
  const [activeIndex, setActiveIndex] = useState(0);

  const openLogin = () => setActiveIndex(0);

  const panes = [
    // esta en la configuracion de semantic
    {
      menuItem: "Entrar",
      render: () => (
        <Tab.Pane>
          <LoginForm />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Nuevo usuario",
      render: () => (
        <Tab.Pane>
          <RegisterForm openLogin={openLogin} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <div className="auth">
      <Icon.LogoCentral className="logo" />
      <Tab
        panes={panes}
        className="auth__forms"
        activeIndex={activeIndex}
        onTabChange={(_, data) => setActiveIndex(data.activeIndex)}
      />
    </div>
  );
}
