import React from "react";
import ControlledSwitches from "../components/Switch.js";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useLocation, NavLink } from "react-router-dom";

function Routine() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">루틴 목록</Card.Title>
                <p className="card-category">수정하려면 루틴 이름을 클릭</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">번호</th>
                      <th className="border-0">루틴이름</th>
                      <th className="border-0">시작조건</th>
                      <th className="border-0">동작</th>
                      <th className="border-0">종료조건</th>
                      <th className="border-0">ON/OFF</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <NavLink to="/admin/Routine">루틴명1 </NavLink>
                      </td>
                      <td>오전 9:00</td>
                      <td>에어컨,가습기</td>
                      <td>오후 7:00</td>
                      <td>
                        <ControlledSwitches />
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <NavLink to="/admin/Routine">루틴명2 </NavLink>
                      </td>
                      <td>오전 9:00</td>
                      <td>에어컨,가습기</td>
                      <td>오후 7:00</td>
                      <td>
                        <ControlledSwitches />
                      </td>
                    </tr>
                  </tbody>
                </Table>
                {/* 버튼 위아래로 여백이 너무 넓은데 이건 나중에 하자. */}
                <Button
                  className="btn-fill pull-right "
                  // type="submit"
                  variant="primary"
                  style={{
                    margin: "1rem",
                  }}
                >
                  루틴 추가
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Routine;
