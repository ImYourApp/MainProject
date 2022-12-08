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
import axios from "axios";
import BasicTimePicker from "components/time.js";
import SliderRange from "components/slider.js";
import SliderTemp from "components/sliderTemp.js";
import {
  faTemperatureArrowDown,
  faTemperatureArrowUp,
  faDroplet,
  faWind,
  faLightbulb,
  faPersonBooth,
  faPlug,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
function Routine() {
  // RoutineList 위한 props 설정 부분
  // useState 등을 이용해 저장된 루틴 목록을 띄워보려 했으나 아직 미완성이다.
  const icon = {
    에어컨: faTemperatureArrowDown,
    히터: faTemperatureArrowUp,
    가습기: faDroplet,
    환풍기: faWind,
    스마트조명: faLightbulb,
    스마트블라인드: faPersonBooth,
  };

  const [routines, setRoutines] = useState([
    // {
    //   name: "",
    //   startTime: "",
    //   endTime: "",
    //   temperature: "",
    //   humid: "",
    //   light: "",
    //   co2: "",
    //   devices: {
    //     airconditioner: false,
    //     heater: false,
    //     humidifier: false,
    //     ventilator: false,
    //     illuminator: false,
    //     blinder: false,
    //   },
    // },
  ]);
  const [deviceData, setDeviceData] = React.useState([]);
  const [routine, setRoutine] = useState({});
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setRoutine({
      ...routine,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(1);

  // 루틴 추가
  // const onAdd = useCallback(() => {
  //   const routineCreate = {
  //     name: "",
  //     startTime: "",
  //     endTime: "",
  //     temperature: "",
  //     humid: "",
  //     light: "",
  //     co2: "",
  //     devices: {
  //       airconditioner: false,
  //       heater: false,
  //       humidifier: false,
  //       ventilator: false,
  //       illuminator: false,
  //       blinder: false,
  //     },
  //   };
  //   setRoutines(routines.concat(routineCreate));
  // }, [routines]);
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
                      type="text"
                      defaultValue="기본 루틴"
                      placeholder="루틴 명칭"
                      value={routine.name}
                      onChange={(e) =>
                        setField("routineCreate-name", e.target.value)
                      }
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
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
                        <Form.Label>루틴시작 시간</Form.Label>{" "}
                        {/* 화면 좁게 했을 때 이 라벨 옆에 BasicTimePicker 안 오게 css 수정해야 한다. */}
                        <BasicTimePicker // 얘를 어떻게 Form 전달하는지 모르겠다.
                        // id="startTime"
                        // name="startTime"
                        // valueAs="id"
                        // value={routine.startTime}
                        // onChange={(e) => {
                        //   console.log(e.target.value);
                        //   setField("routineCreate-startTime", e.target.value);
                        // }}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="" md="4">
                      <Form.Group controlId="routineCreate-endTime">
                        <Form.Label>루틴종료 시간</Form.Label>{" "}
                        {/* 화면 좁게 했을 때 이 라벨 옆에 BasicTimePicker 안 오게 css 수정해야 한다. */}
                        <BasicTimePicker />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="routineCreate-temperature">
                        <Form.Label>온도 루틴</Form.Label>
                        <SliderTemp />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="routineCreate-humid">
                        <Form.Label>습도 루틴</Form.Label>
                        <SliderRange />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="routineCreate-light">
                        <Form.Label>조도 루틴</Form.Label>
                        <SliderRange />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="routineCreate-co2">
                        <Form.Label>CO2 루틴</Form.Label>
                        <SliderRange />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right mt-4"
                    // type="submit"
                    variant="primary"
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
        <RoutineList />
      </Container>

      {/* 이 밑은 화면설계서를 위한 임시 테이블이다. */}
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
