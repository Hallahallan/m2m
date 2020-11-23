import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import {MyMapComponent} from './MyMap';

export const MyBoat = () => {
    return (
        <Container>
            <h1>Here is your boat</h1>
            <MyMapComponent isMarkerShown lat={59.910015} lng={10.731262} />
        </Container>
    );
}