import React from "react";
import { Row, Col, Form } from "react-bootstrap";

export class SearchComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
    };

    this.Change = (event) => {
      this.setState({ text: event.target.value });
      this.props.search(event.target.value);
    };
  }

  render() {
    

    return (
      <Row className="searchBar">
        <Col xs={4} md={4} />
        <Col xs={4} md={4} />
        <Col xs={4} md={4}>
          <Form>
            <Form.Group as={Row} controlId="formPlaintext">
              <Col sm="12">
                <Form.Control
                  onChange={this.Change}
                  value={this.state.text}
                  type="text"
                  placeholder="Search"
                />
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    );
  }
}
