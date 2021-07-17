import React from "react";
import parse from "html-react-parser";
import { Container, Form } from "react-bootstrap";
import "../App.css";

export default function Details() {
  const data1 = localStorage.getItem("productDetails");
  const data = JSON.parse(data1);
  const descData = data.productDescription;
  const desc = parse(descData);

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label className="label">product Name: </Form.Label>{" "}
          {data.productName}
        </Form.Group>
        <Form.Group>
          <Form.Label className="label">product Category : </Form.Label>
          <Form.Text> {data.productCategory}</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label className="label">Product Tag Input : </Form.Label>
          <Form.Text>
            {" "}
            {data.producttagInput.map(list => (
              <p>{list}</p>
            ))}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label className="label">Product Description : </Form.Label>
          <Form.Text> {desc}</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label className="label">Product Size :</Form.Label>
          <Form.Text> {data.productSize}</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label className="label">Product Availabile From : </Form.Label>
          <Form.Text> {data.productAvailabileFrom}</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label className="label">Product Available To :</Form.Label>
          <Form.Text> {data.productAvailabileTo}</Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
}
