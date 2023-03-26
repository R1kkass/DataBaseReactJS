import React, { useState,FC } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface IModal{
    children?: any,
    nameButton?: string,
    nameButton2?: string,
    click?:any,
    sh?:boolean
}

const MyModal:FC<IModal>=({children, nameButton,nameButton2, click,sh}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {nameButton}
      </Button>

      <Modal className="modal-lg "  show={sh ? sh : show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Информация</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{overflow: 'hidden'}}>{children}</Modal.Body>

      </Modal>
    </>
  );
}

export default MyModal