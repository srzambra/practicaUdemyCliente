import { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
/*import {
  UserForm,
  ListUsers,
} from "../../../components/Admin/Users/UserForm/UserForm";
*/
import { BasicModal } from "../../../components/Shared/BasicModal";
import { UserForm, ListUsers } from "../../../components/Admin/Users";
import "./Users.scss";

export function Users() {
  const [showModal, setShowModal] = useState(false);
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  /*con este onOpenClose se abre y se cierra el modal, 
  (prevState) => !prevState devuelveme el estado actual y me seteas lo contratio de lo que teiene */
  const panes = [
    // esto semantic lo tiene asi estructurado
    {
      menuItem: "Usarios activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={true} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Usarios inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={false} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <>
      <div className="users-page">
        <Button className="users-page__add" primary onClick={onOpenCloseModal}>
          Nuevo usuario
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear nuevo usuario"
      >
        <UserForm close={onOpenCloseModal} />
      </BasicModal>
    </>
  );
}
