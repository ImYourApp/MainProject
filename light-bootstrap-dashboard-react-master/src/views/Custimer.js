import React from "react";
import ControlledSwitches from "../components/Switch.js";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import BasicTimePicker from "components/time.js";
import SliderRange from "components/slider.js";
import SliderTemp from "components/sliderTemp.js";

function Custimer() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">루틴 수정</Card.Title>
                <Form.Group>
                  <label>루틴 명칭</label>
                  <Form.Control
                    defaultValue="기본 커스텀"
                    placeholder="커스텀 명칭"
                    type="text"
                  ></Form.Control>
                </Form.Group>
              </Card.Header>
              <Card.Body
                style={{
                  paddingBottom: 15,
                }}
              >
                <Form>
                  <Row>
                    <Col md="4">
                      <Form.Group>
                        <label>루틴시작 시간</label>
                      </Form.Group>
                      <BasicTimePicker />
                    </Col>
                    <Col className="" md="4">
                      <Form.Group>
                        <label>루틴종료 시간</label>
                      </Form.Group>
                      <BasicTimePicker />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>온도 루틴</label>
                      <SliderTemp />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>습도 루틴</label>
                      <SliderRange />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>조도 루틴</label>
                      <SliderRange />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>CO2 루틴</label>
                      <SliderRange />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right mt-3"
                    type="submit"
                    variant="info"
                  >
                    커스텀 저장
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <Card.Body className="all-icons">
                <Row>
                  <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                    <div className="device_list">
                      <i className="nc-icon nc-air-baloon"></i>
                      <p>에어컨</p>
                      <ControlledSwitches />
                    </div>
                  </Col>
                  <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                    <div className="device_list">
                      <i className="nc-icon nc-album-2"></i>
                      <p>히터</p>
                      <ControlledSwitches />
                    </div>
                  </Col>
                  <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                    <div className="device_list">
                      <i className="nc-icon nc-air-baloon"></i>
                      <p>가습기</p>
                      <ControlledSwitches />
                    </div>
                  </Col>
                  <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                    <div className="device_list">
                      <i className="nc-icon nc-album-2"></i>
                      <p>환풍기</p>
                      <ControlledSwitches />
                    </div>
                  </Col>
                  <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                    <div className="device_list">
                      <i className="nc-icon nc-air-baloon"></i>
                      <p>조명</p>
                      <ControlledSwitches />
                    </div>
                  </Col>
                  <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                    <div className="device_list">
                      <i className="nc-icon nc-album-2"></i>
                      <p>블라인드</p>
                      <ControlledSwitches />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Custimer;
