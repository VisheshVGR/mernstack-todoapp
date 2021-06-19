import React from "react"
import { Form, Button, Col } from 'react-bootstrap'

const InputForm = (props) => {
  return (
    <>
      <Form onSubmit={props.handleSubmit}>
        <Form.Row className="align-items-center my-5 mx-3">
          <Col>
            <Form.Label htmlFor="inlineFormInput" srOnly>
              Item
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              placeholder="Enter item"
              value={props.inputValue}
              onChange={(e) => { props.setInputValue(e.target.value) }}
              autoComplete="off"
              autoFocus={true}
              required
              disabled={props.loading}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" disabled={props.loading} className="mb-2">+</Button>
          </Col>
        </Form.Row>
      </Form>
    </>
  )
}

export default InputForm