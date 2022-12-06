import React from "react";
import { Link } from "react-router-dom";
import ChartistGraph from "react-chartist";

import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

import _, {showInfo as Icons_showInfo, setShowInfo as Icons_setShowInfo} from "./Device.js";

function DeviceInfo() {
  return(
    <>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h3">디바이스 상세 정보</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md='6' className="p-4">
                <div className="typography-line">
                  <h4>
                    <span>이름 :</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;디바이스 1
                  </h4>
                </div>
                <div className="typography-line">
                  <h4>
                    <span>시리얼 넘버 :</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;123-45678-90
                  </h4>
                </div>
                <div className="typography-line">
                  <h4>
                    <span>등록한 날짜 :</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2022-12-05
                  </h4>
                </div>

                <div className="clearfix"></div>
              </Col>
              <Col md="6">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">전력 사용량 그래프</Card.Title>
                    <p className="card-category">디바이스의 날짜별 전력 사용량을 표시</p>
                  </Card.Header>
                  <Card.Body>
                    <div className="ct-chart" id="chartActivity">
                      <ChartistGraph
                        data={{
                          labels: [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "Mai",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                          ],
                          series: [
                            [
                              542,
                              443,
                              320,
                              780,
                              553,
                              453,
                              326,
                              434,
                              568,
                              610,
                              756,
                              895,
                            ],
                            [
                              412,
                              243,
                              280,
                              580,
                              453,
                              353,
                              300,
                              364,
                              368,
                              410,
                              636,
                              695,
                            ],
                          ],
                        }}
                        type="Bar"
                        options={{
                          seriesBarDistance: 10,
                          axisX: {
                            showGrid: false,
                          },
                          height: "245px",
                        }}
                        responsiveOptions={[
                          [
                            "screen and (max-width: 640px)",
                            {
                              seriesBarDistance: 5,
                              axisX: {
                                labelInterpolationFnc: function (value) {
                                  return value[0];
                                },
                              },
                            },
                          ],
                        ]}
                      />
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className="legend">
                      <i className="fas fa-circle text-info"></i>
                      디바이스 1 <i className="fas fa-circle text-danger"></i>
                      디바이스 2
                    </div>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-check"></i>
                      Data information certified
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Button
              className="btn-fill float-right" // pull-right는 이제 쓰이지 않으므로 float-right으로 변경
              type="submit"
              variant="info"
              onClick={() => Icons_setShowInfo({...Icons_showInfo, togle: false})}
            >
              뒤로가기
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    </>
  )
}

export default DeviceInfo;