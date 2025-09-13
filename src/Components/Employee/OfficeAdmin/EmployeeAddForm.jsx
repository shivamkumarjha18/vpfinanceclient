import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const EmployeeAddForm = () => {
  return (
    <Form className="p-4 border rounded bg-light">
      <Row>
        <Col md={6}>
          <Form.Group controlId="department">
            <Form.Label>Choose Department</Form.Label>
            <Form.Select name="emp_type">
              <option>--Choose Department--</option>
              <option value="cre">CRE</option>
              <option value="oe">OE</option>
              <option value="emp">Telemarketer</option>
              <option value="freelancer">Telecaller</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="designation">
            <Form.Label>Designation</Form.Label>
            <Form.Control type="text" name="designation" />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter ..." />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="mobile">
            <Form.Label>Personal Mobile</Form.Label>
            <Form.Control type="number" name="mobile" placeholder="Enter ..." />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="o_mobile">
            <Form.Label>Official Mobile</Form.Label>
            <Form.Control type="number" name="o_mobile" placeholder="Enter ..." />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="email">
            <Form.Label>Personal Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter ..." />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="curr_addr">
            <Form.Label>Current Address</Form.Label>
            <Form.Control type="text" name="curr_addr" />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="per_addr">
            <Form.Label>Permanant Address</Form.Label>
            <Form.Control type="text" name="per_addr" placeholder="Enter ..." />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="doj">
            <Form.Label>Date of joining</Form.Label>
            <Form.Control type="text" name="doj" />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="soj">
            <Form.Label>Salary on joining</Form.Label>
            <Form.Control type="text" name="soj" placeholder="Enter ..." />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="l_gard">
            <Form.Label>Local Guardians Relation</Form.Label>
            <Form.Control type="text" name="l_gard" />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="gard_name">
            <Form.Label>Guardian Name</Form.Label>
            <Form.Control type="text" name="gard_name" />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="gard_mob">
            <Form.Label>Emergency Number</Form.Label>
            <Form.Control type="text" name="gard_mob" placeholder="Enter ..." />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="bank_name">
            <Form.Label>Bank Name & Branch</Form.Label>
            <Form.Control type="text" name="bank_name" />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="ifsc_code">
            <Form.Label>IFSC Code</Form.Label>
            <Form.Control type="text" name="ifsc_code" />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="acc_number">
            <Form.Label>Account Number</Form.Label>
            <Form.Control type="text" name="acc_number" placeholder="Enter ..." />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="username">
            <Form.Label>Official Email</Form.Label>
            <Form.Control type="text" name="username" />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="password">
            <Form.Label>Password For login</Form.Label>
            <Form.Control type="text" name="password" placeholder="Enter ..." />
          </Form.Group>
        </Col>

        <Col md={12} className="text-end mt-3">
          <Button type="submit" style={{backgroundColor:"#2B3A4A"}} >Submit</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default EmployeeAddForm;
