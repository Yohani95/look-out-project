'use client'
import React from "react";
import {Form,Card } from 'react-bootstrap';
function page() {
  return (
    <div className="d-flex justify-content-center align-items-center m-4">
  <Card className="col-lg-10 shadow"> 
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              className="form-control shadow"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="form-control shadow" 
            />
          </Form.Group>
        </Form>
        {/* Aquí colocas el contenido principal de la tarjeta */}
        <p>Este es un ejemplo de contenido en la tarjeta.</p>
        <button type="button" className="btn btn-primary">Botón</button>
      </Card.Body>
    </Card>
  </div>
  );
}

export default page;
