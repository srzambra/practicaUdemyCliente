import React from "react";
import { Modal } from "semantic-ui-react";

export function BasicModal(props) {
  // va a recibir props, va  a recibir show(si va a ser visible el modal o no)
  // va a recibir close para cerrar el modal desde dentro
  //title el titulo del modal
  //size el tamaño del modal, en caso de que el usuario no le de ningun tamaño va a tener un tamaño default
  //children que es el contenido del modal
  //{title && <Modal.Header>{title}</Modal.Header>} si nos llega el title vas a renderizar el modal headers

  const { show, close, title, size, children } = props;

  return (
    <Modal closeIcon open={show} onClose={close} size={size}>
      {title && <Modal.Header>{title}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}

BasicModal.defaultProps = {
  size: "tiny",
};
