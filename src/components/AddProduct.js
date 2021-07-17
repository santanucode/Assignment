import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Dropdown,
  DropdownButton
} from "react-bootstrap";
import "../App.css";
import { useHistory } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { InputTags } from "react-bootstrap-tagsinput";

export default function AddProduct() {
  const [productDetails, setProductDetails] = useState({
    productName: "",
    productCategory: "",
    producttagInput: [],
    productDescription: [],
    productAvailabileFrom: "",
    productAvailableTo: "",
    productSize: ""
  });

  // On Change Input
  const productInputHandler = e => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  // OnSubmit Click & put Local Storage
  let history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("productDetails", JSON.stringify(productDetails));
    history.push("/product");
  };

  // OnClick Clear Button
  const handleClear = () => {
    setProductDetails({
      ...productDetails,
      productName: "",
      productCategory: "",
      producttagInput: [],
      productDescription: [],
      productAvailabileFrom: "",
      productAvailableTo: "",
      productSize: ""
    });
    alert("Oops you have clear the product");
  };

  // Description Part

  const sizeLimit = 500;
  const [length, setLength] = React.useState(0);
  const handleInit = (evt, editor) => {
    setLength(editor.getContent({ format: "text" }).length);
  };
  const handleUpdate = (value, editor) => {
    const length = editor.getContent({ format: "text" }).length;
    if (length <= sizeLimit) {
      setProductDetails({ ...productDetails, productDescription: value });
      setLength(length);
    }
  };
  const [repeatedvalue, setRepeatedvalue] = useState([]);
  const [repeatedvalueCounts, setRepeatedvalueCounts] = useState([]);
  const handleBeforeAddUndo = (evt, editor) => {
    const length = editor.getContent({ format: "text" }).length;
    if (length > sizeLimit) {
      evt.preventDefault();
    }
  };
  function findRepeat() {
    const str = productDetails.productDescription;
    var counts = {},
      mc;
    var words = [];
    var wordsCount = [];
    str.match(/\w+/g).forEach(function(w) {
      counts[w] = (counts[w] || 0) + 1;
    });
    for (var w in counts) {
      if (!(counts[w] < mc)) {
        wordsCount.push(counts[w]);
        words.push(w);
      }
    }
    setRepeatedvalue(words);
    setRepeatedvalueCounts(wordsCount);
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name Please"
                name="productName"
                onChange={productInputHandler}
                value={productDetails.productName}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <DropdownButton
                id="dropdown-basic-button"
                title="Select Category"
                name="productCategory"
                onSelect={value =>
                  setProductDetails({
                    ...productDetails,
                    productCategory: value
                  })
                }
              >
                <Dropdown.Item eventKey="men">Men</Dropdown.Item>
                <Dropdown.Item eventKey="women">Women</Dropdown.Item>
              </DropdownButton>
              <Form.Control
                value={productDetails.productCategory}
                style={{ marginLeft: 10 }}
                required
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Product Tagging Input</Form.Label>
              <div>
                <div>
                  <InputTags
                    values={productDetails.producttagInput}
                    onTags={value =>
                      setProductDetails({
                        ...productDetails,
                        producttagInput: value.values
                      })
                    }
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    data-testid="button-clearAll"
                    onClick={() => {
                      setProductDetails({
                        ...productDetails,
                        producttagInput: []
                      });
                    }}
                  >
                    Delete all
                  </button>
                </div>
              </div>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description :</Form.Label>
              <Editor
                value={productDetails.productDescription}
                onInit={handleInit}
                onEditorChange={handleUpdate}
                onBeforeAddUndo={handleBeforeAddUndo}
                onBlur={findRepeat}
              />
              <p>Remaining: {sizeLimit - length}</p>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  {repeatedvalue.map(list => (
                    <p>{list}:</p>
                  ))}
                </div>

                <div>
                  {repeatedvalueCounts.map(list => (
                    <p>{list}</p>
                  ))}
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <DropdownButton
                id="dropdown-basic-button"
                title="Choose Size"
                name="productCategory"
                onSelect={value =>
                  setProductDetails({ ...productDetails, productSize: value })
                }
              >
                <Dropdown.Item eventKey="S">S</Dropdown.Item>
                <Dropdown.Item eventKey="M">L</Dropdown.Item>
                <Dropdown.Item eventKey="L">xl</Dropdown.Item>
              </DropdownButton>
              <Form.Control
                value={productDetails.productSize}
                required
                disabled
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <label for="start">Start date:</label>

              <Form.Control
                type="date"
                id="productAvailabileFrom"
                name="productAvailabileFrom"
                min="2021-07-01"
                max="2023-10-01"
                value={productDetails.productAvailabileFrom}
                onChange={productInputHandler}
              />
              <Form.Label for="end">End date:</Form.Label>

              <Form.Control
                type="date"
                id="productAvailabileTo"
                name="productAvailabileTo"
                value={productDetails.productAvailabileTo}
                min="2021-07-01"
                max="2023-10-01"
                onChange={productInputHandler}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>{" "}
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>{" "}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
