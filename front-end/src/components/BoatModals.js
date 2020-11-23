import {Card} from "react-bootstrap";
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const BoatModals = (props) => {
    console.log(props)
    return (
        <Modal show={props.open} onHide={props.handleBoats}>
            <Modal.Header closeButton>
                <Modal.Title>{props.boatName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={props.boatImg} style={{objectFit: 'cover', width: '100%'}}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={props.redirectBoat}>
                    Rent boat
                </Button>
                <Button variant="secondary" onClick={props.handleBoats}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}