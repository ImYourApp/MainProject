// 예를 App.js 라고 생각하자.
import { useState, useRef, useCallback } from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  NavLink,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import axios from "axios";
import ControlledSwitches from "../components/Switch.js";
import { MdDelete } from "react-icons/md";
// react-bootstrap components

import Routine from "./Routine.js";
// import BasicTimePicker from "components/time.js";
import SliderRange from "components/slider.js";
import SliderTemp from "components/sliderTemp.js";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import TimePicker from "react-time-picker";
import BasicTimePicker from "../components/time.js";

function RoutineCreate() {
  const icon = {
    에어컨: faTemperatureArrowDown,
    히터: faTemperatureArrowUp,
    가습기: faDroplet,
    환풍기: faWind,
    스마트조명: faLightbulb,
    스마트블라인드: faPersonBooth,
  };
  const [deviceData, setDeviceData] = useState([]);
  // 버튼 클릭시 /routine 페이지로 가는 함수
  const history = useHistory();
  const handleClick = () => {
    history.push("routine");
  };

  const dispatch = useDispatch();

  const [myroutine, setMyroutine] = useState({
    Name: null,
    Room: null,
    StartTime: null,
    EndTime: null,
    Temperature: null,
    Humid: null,
    Light: null,
    Co2: null,
    Devices: {
      Airconditioner: null,
      Heater: null,
      Humidifier: null,
      Ventilator: null,
      Illuminator: null,
      Blinder: null,
    },
  });

  function onChangeInput(e) {
    const { name, value } = e.target;
    setMyroutine({ ...myroutine, [name]: value });
    console.log(name, value);
  }

  function getStartTimer(val) {
    setMyroutine({ ...myroutine, StartTime: val.$H + ":" + val.$M });
  }

  function getEndTimer(val) {
    setMyroutine({ ...myroutine, EndTime: val.$H + ":" + val.$M });
  }

  function getTempSlider(val) {
    setMyroutine({ ...myroutine, Temperature: val });
    console.log(val);
  }

  function getHumidSlider(val) {
    setMyroutine({ ...myroutine, Humid: val });
    console.log(val);
  }

  function getLightSlider(val) {
    setMyroutine({ ...myroutine, Light: val });
    console.log(val);
  }

  function getCo2Slider(val) {
    setMyroutine({ ...myroutine, Co2: val });
    console.log(val);
  }

  function sendForm() {
    axios
      .post("http://localhost:3001/routinecreate", myroutine)
      .then((res) => {
        console.log(res.data.result);
      })
      .catch((res) => {
        console.log(res.data.result);
      });
  }

  useEffect(() => {
    // console.log(icon['에어컨'])
    getDeviceList();
  }, []);

  function getDeviceList() {
    let deviceData = {
      type: "list",
    };
    axios
      .post("http://127.0.0.1:3001/device", {
        data: deviceData,
      })
      .then((res) => {
        if (res.data.result == "success") {
          // setDeviceData(res.data.row);
          listDevice(res.data.row);
          console.log("가져오기");
        } else {
          console.log("가져오기실패");
        }
      })
      .catch(() => {
        console.log("살패");
      });
  }

  function listDevice(data) {
    let device = data.map((val, index) => {
      let dIcon = faPlug;
      if (icon[val.DEVICE_NAME]) {
        dIcon = icon[val.DEVICE_NAME];
      }

      return (
        <Col key={index} className="font-icon-list" lg="6" md="3" sm="4" xs="6">
          <div className="device_list">
            <a
              href="#"
              onClick={() => {
                // setShowModal(true);
                // setDeviceUid(val.DEVICE_UID);
                // setDeviceName(val.DEVICE_NAME);
                // setDeviceDate(val.REG_DATE);
                // setDeviceSeq(val.DEVICE_SEQ)
              }}
              name="nc-align-left-2"
            >
              <FontAwesomeIcon icon={dIcon} />
              <p>{val.DEVICE_NAME}</p>
            </a>
            <p align="center">
              <ControlledSwitches />
            </p>
          </div>
        </Col>
      );
    });
    // console.log(device);
    setDeviceData(device);
  }

  return (
    <>
      <Container id="routine-form-container" fluid>
        <Form id="routine-create-form">
          <Row>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">루틴 생성</Card.Title>
                  <Form.Group controlId="routineCreate-name">
                    <Form.Label>루틴 명칭</Form.Label>
                    <Form.Control
                      defaultValue="기본 이름"
                      name="Name"
                      Value={myroutine.Name}
                      onChange={onChangeInput}
                      // value={routine.name}
                    />
                  </Form.Group>
                </Card.Header>
                <Card.Body
                  style={{
                    paddingBottom: 15,
                  }}
                >
                  <Row>
                    <Col md="4">
                      <Form.Group controlId="routineCreate-startTime">
                        <Form.Label>루틴시작 시간</Form.Label>
                        {/* 화면 좁게 했을 때 이 라벨 옆에 BasicTimePicker 안 오게 css 수정해야 한다. */}
                        <BasicTimePicker
                          name="StartTime"
                          getTimer={getStartTimer}
                          // name="StartTime"
                          // defaultValue={myroutine.StartTime}
                          // onChange={(e) => {
                          //   onChangeInput(e.target);
                          // }}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="" md="4">
                      <Form.Group controlId="routineCreate-endTime">
                        <Form.Label>루틴종료 시간</Form.Label>{" "}
                        {/* 화면 좁게 했을 때 이 라벨 옆에 BasicTimePicker 안 오게 css 수정해야 한다. */}
                        <BasicTimePicker
                          name="EndTime"
                          getTimer={getEndTimer}
                          // name="EndTime"
                          // defaultValue={myroutine.EndTime}
                          // onChange={(e) => {
                          //   onChangeInput(e.target);
                          // }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="routineCreate-temperature">
                        <Form.Label>온도 루틴</Form.Label>
                        <SliderTemp
                          name="Temperature"
                          // Value={myroutine.Temperature}
                          getSlider={getTempSlider}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="routineCreate-humid">
                        <Form.Label>습도 루틴</Form.Label>
                        <SliderRange
                          name="Humid"
                          // defaultValue={myroutine.Humid}
                          getSlider={getHumidSlider}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="routineCreate-light">
                        <Form.Label>조도 루틴</Form.Label>
                        <SliderRange
                          name="Light"
                          // defaultValue={myroutine.Light}
                          getSlider={getLightSlider}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="routineCreate-co2">
                        <Form.Label>CO2 루틴</Form.Label>
                        <SliderRange
                          name="Co2"
                          // defaultValue={myroutine.Co2}
                          getSlider={getCo2Slider}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right mt-4"
                    // type="submit"
                    variant="primary"
                    onClick={() => {
                      handleClick();
                      sendForm();
                    }}
                  >
                    루틴 저장
                  </Button>
                  <div className="clearfix"></div>
                </Card.Body>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <Card.Body className="all-icons">
                  <Row>{deviceData}</Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
export default RoutineCreate;
