import React,{FC, useRef, useState} from "react";
import { Button, Modal } from "react-bootstrap";
import API from "../../API/postApi";
import MyModal from "../MyModal/MyModal";
import "./ModalPost.css"

interface IModalPost{
    post?: any,
    callback: ()=>void,
}

const ModalPost:FC<IModalPost> = ({post, callback})=>{

    const Api = new API()

    const selectRef = useRef<any>('')
    const [show,setShow]=useState<boolean>()

    const edit = ()=>{
        Api.edit(selectRef?.current?.value, post?.id)
        callback()
        setShow(false)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
     
    return(
        <>
    <Button variant="primary" onClick={handleShow}>
        Просмотр
    </Button>

      <Modal className="modal-lg "  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Информация</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalPost" style={{overflow: 'hidden'}}>
        <div>№: {post?.id}</div>
        <div>Логин: {post?.email}</div>
        <div>Дата создания: {post?.data}</div>
        <div>Категория: {post?.category}</div>
        <div>{post?.category=="Поездка" ? "Путь в: " : "Описание: "}{post?.text}</div>
        {post?.time=="undefined undefined" || post?.time=="" ? "" : <div><p>Дата поездки: {post?.time}</p></div>}
        <div>Статус</div>
        <select ref = {selectRef} placeholder="">
                <option value={post?.status} selected disabled>{post?.status}</option>
                <option value="Принята в работу">Принята в работу</option>
                <option value="Выполнена">Выполнена</option>
                <option value="Отменена">Отменена</option>
        </select>
        <br/>
        <Button onClick = {edit}>Сохранить</Button>
        </Modal.Body>

      </Modal>
        </>
    )
}

export default ModalPost