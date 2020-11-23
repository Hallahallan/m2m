import {Card, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import React, {useState} from "react";
import {boats} from "../data";
import Container from "react-bootstrap/Container";
import {BoatModals} from "./BoatModals";
import {MyBoat} from "./MyBoat";

export const BoatView = () => {
    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(false);
    const [showBoat, setShowBoat] = useState(false);
    const [boatName, setBoatName] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleBoats = () => setShowBoat(!showBoat);
    // const redirectBoat = ({boatation}) => {
    //     <Route exact path="/myboat" component={MyBoat}/>
    //     this.props.history.push('/myboat');
    // }
    const handleSubmit = () => {
        boats.push(
            {
                name: boatName,
                status: true,
                img: `boat${Math.floor(Math.random() * 15) + 1}.jpg`
            }
        );
        handleClose();
    };

    return (
        <Container>
            {/*<BoatModals open={showBoat} handleBoats={handleBoats} boatName={boats[index].name} boatImg={boats[index].img}/>*/}
            <h1 className="mx-auto">Boats</h1>

            <Row className="mb-3 mx-auto">
                {boats.map((p, index) => (
                    <Card className="m-2" key={index} style={{width: '12rem'}} onClick={ () => {setIndex(index); handleBoats()} }>
                        <Card.Img src={p.img} variant="top" className="border-bottom border-light" style={{objectFit: 'cover', height: '200px'}}/>
                        <Card.Body>
                            <Card.Title>{p.name}</Card.Title>
                        </Card.Body>
                        <Card.Footer variant="bottom" style={{objectFit: 'cover'}}>
                            <Card.Text
                                className={p.status ? 'text-success' : 'text-danger'}>{p.status ? 'Available' : 'Not available'}</Card.Text>
                        </Card.Footer>
                    </Card>
                ))}

                {/*LEGG TIL DETTE UNDER ADMIN ELLERNOE SÅ MAN KAN LEGGE TIL NYE BÅTER*/}

                {/*<React.Fragment>*/}
                {/*    <Button variant="light" className="m-2" style={{width: '12rem', height: 'auto', minHeight: '18rem'}}*/}
                {/*            onClick={handleShow}>*/}
                {/*        <h1>+</h1>*/}
                {/*    </Button>*/}
                {/*    <Modal show={show} onHide={handleClose}>*/}
                {/*        <Modal.Header closeButton>*/}
                {/*            <Modal.Title>Create new Project</Modal.Title>*/}
                {/*        </Modal.Header>*/}
                {/*        <Modal.Body>*/}
                {/*            <Form>*/}
                {/*                <Form.Group controlId="form">*/}
                {/*                    <Form.Label>Project</Form.Label>*/}
                {/*                    <Form.Control type="text" value={boatName}*/}
                {/*                                  onChange={(event => setBoatName(event.target.value))}*/}
                {/*                                  placeholder="Enter name of project"/>*/}
                {/*                </Form.Group>*/}
                {/*                <Form.Group controlId="e">*/}
                {/*                    <Form.Label>Employees</Form.Label>*/}
                {/*                    <Form.Control as="select" value={employeeName}*/}
                {/*                                  onChange={(event => setEmployeeName(event.target.value))}>*/}
                {/*                        {EmployeeList(employees)}*/}
                {/*                    </Form.Control>*/}
                {/*                </Form.Group>*/}
                {/*            </Form>*/}

                {/*        </Modal.Body>*/}
                {/*        <Modal.Footer>*/}
                {/*            <Button variant="secondary" onClick={handleClose}>*/}
                {/*                Cancel*/}
                {/*            </Button>*/}
                {/*            <Button variant="primary" onClick={handleSubmit}>*/}
                {/*                Add Project*/}
                {/*            </Button>*/}
                {/*        </Modal.Footer>*/}
                {/*    </Modal>*/}
                {/*</React.Fragment>*/}

            </Row>
        </Container>
    )
}