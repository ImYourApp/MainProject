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
  // 버튼 클릭시 /routine 페이지로 가는 함수
  const history = useHistory();
  const handleClick = () => {
    history.push("routine");
  };

  const dispatch = useDispatch();
  // 시도해볼 form 버전 1
  // const refForm = {
  //   Name: useRef(),
  //   StartTime: useRef(),
  //   EndTime: useRef(),
  //   Temperature: useRef(),
  //   Humid: useRef(),
  //   Light: useRef(),
  //   Co2: useRef(),
  //   Devices: {
  //     Aircon: useRef(),
  //     Heater: useRef(),
  //     Humidifier: useRef(),
  //     Ventilator: useRef(),
  //     Illuminator: useRef(),
  //     Blinder: useRef(),
  //   },
  // };

  // 시도해볼 form 버전 2
  // const refName = useRef();
  // const refStartTime = useRef();
  // const refEndTime = useRef();
  // const refTemperature = useRef();
  // const refHumid = useRef();
  // const refLight = useRef();
  // const refCo2 = useRef();

  // const refAircon = useRef();
  // const refHeater = useRef();
  // const refHumidifier = useRef();
  // const refVentilator = useRef();
  // const refIlluminator = useRef();
  // const refBlinder = useRef();

  // form 버전 3
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

  function sendForm() {
    // const currentForm = refForm.current.value;
    // const formData = currentForm;

    axios
      .post("http://localhost:3001/routinecreate", myroutine)
      .then((res) => {
        console.log(res.data.result);
      })
      .catch((res) => {
        console.log(res.data.result);
      });
  }

  function getTimer(val) {
    console.log(val);
    // 이 자리에 setMyroutine(---Time) 넣기
    
  }

  // Get으로 데이터베이스에서 routine 리스트 값을 받아와야 한다.
  // const [routines, setRoutines] = useState([]);
  // const formData = {};

  // onAdd함수에 axios.post로 데이터베이스에 routine을 추가해야 한다.
  // const onAdd = useCallback(() => {
  //   // axios.post
  //   // 리렌더링 안하고 routines를 보여줄 수 있는 방법은 없나?
  // }, [routines]);

  // //명재
  // console.log("3");
  // const refRseq = useRef();
  // const refId = useRef();
  // const refDseq = useRef();
  // const refRname = useRef();
  // const refCstate = useRef();
  // const refTemp = useRef();
  // const refHumid = useRef();
  // const refLight = useRef();
  // const refCo2 = useRef();

  // // const [cseq,setCseq]=useState('');
  // // const [id,setId]=useState('');
  // // const [dseq,setDseq]=useState('');
  // // const [rname,setRname]=useState('');
  // const [airc, setAirc] = useState(false);
  // const [heat, setHeat] = useState(false);
  // const [bli, setBli] = useState(false);
  // const [hum, setHum] = useState(false);
  // const [ven, setVen] = useState(false);
  // const [ilu, setIlu] = useState(false);

  // function sendRegist(e) {
  //   e.preventDefault();
  //   console.log("2");
  //   const cseq = refRseq.current.value;
  //   const id = refId.current.value;
  //   const dseq = refDseq.current.value;
  //   const rname = refRname.current.value;
  //   const cstate = refCstate.current.value;
  //   // console.log(rname, "rname");
  //   // const rstate=refRstate.current.value
  //   // const stime=refStime.current.value
  //   // const etime=refEtime.current.value
  //   const temp = refAirc.current.value;
  //   const humi = refHumid.current.value;
  //   const light = refIllum.current.value;
  //   const co2 = refVenti.current.value;

  //   const userDevice = {
  //     cseq,
  //     id,
  //     dseq,
  //     rname,
  //     cstate,
  //     airc,
  //     heat,
  //     bli,
  //     hum,
  //     ven,
  //     ilu,
  //     sTime,
  //     eTime,
  //   };
  //   console.log(userDevice);

  //   axios
  //     .post("http://localhost:3001/admin/routine", userDevice)
  //     .then((res) => {
  //       console.log(res.data);
  //       if (res.data == "등록성공") {
  //         window.location.href = "/admin/routine";
  //       }
  //     })
  //     .catch((res) => {
  //       console.log(res.data);
  //       if (res.data == "등록실패") {
  //         console.log(userDevice);
  //       }
  //     });
  // }
  // // }

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
                      default="기본 이름"
                      name="Name"
                      defaultValue={myroutine.Name}
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
                        <BasicTimePicker onSubmit={getTimer}
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
                        <BasicTimePicker onSubmit={getTimer}
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
                          defaultValue={myroutine.Temperature}
                          onChange={onChangeInput}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="routineCreate-humid">
                        <Form.Label>습도 루틴</Form.Label>
                        <SliderRange
                          name="Humid"
                          defaultValue={myroutine.Humid}
                          onChange={onChangeInput}
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
                          defaultValue={myroutine.Light}
                          onChange={onChangeInput}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="routineCreate-co2">
                        <Form.Label>CO2 루틴</Form.Label>
                        <SliderRange
                          name="Co2"
                          defaultValue={myroutine.Co2}
                          onChange={onChangeInput}
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
                  <Row>
                    <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-air-baloon"></i>
                        <p>에어컨</p>
                        <Form.Group controlId="routineCreate-devices-airconditioner">
                          <ControlledSwitches
                            name="Airconditioner"
                            defaultValue={myroutine.Devices.Airconditioner}
                            onChange={onChangeInput}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-album-2"></i>
                        <p>히터</p>
                        <Form.Group controlId="routineCreate-devices-heater">
                          <ControlledSwitches
                            name="Heater"
                            defaultValue={myroutine.Devices.Heater}
                            onChange={onChangeInput}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-air-baloon"></i>
                        <p>가습기</p>
                        <Form.Group controlId="routineCreate-devices-humidifier">
                          <ControlledSwitches
                            name="Humidifier"
                            defaultValue={myroutine.Devices.Humidifier}
                            onChange={onChangeInput}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-album-2"></i>
                        <p>환풍기</p>
                        <Form.Group controlId="routineCreate-devices-ventilator">
                          <ControlledSwitches
                            name="Ventilator"
                            defaultValue={myroutine.Devices.Ventilator}
                            onChange={onChangeInput}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-air-baloon"></i>
                        <p>조명</p>
                        <Form.Group controlId="routineCreate-devices-illuminator">
                          <ControlledSwitches
                            name="Illuminator"
                            defaultValue={myroutine.Devices.Illuminator}
                            onChange={onChangeInput}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-album-2"></i>
                        <p>블라인드</p>
                        <Form.Group controlId="routineCreate-devices-blinder">
                          <ControlledSwitches
                            name="Blinder"
                            defaultValue={myroutine.Devices.Blinder}
                            onChange={onChangeInput}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>

      {/* 이 밑은 화면설계서를 위한 임시 테이블이다. */}

      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">루틴 수정</Card.Title>
                <p className="card-category">루틴 이름을 클릭</p>
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
                      <th className="border-0">삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <NavLink to="/admin/routine">루틴명1 </NavLink>
                      </td>
                      <td>오전 9:00</td>
                      <td>에어컨,가습기</td>
                      <td>오후 7:00</td>
                      <td>
                        <ControlledSwitches />
                      </td>
                      <td>
                        <MdDelete
                          padding="1rem"
                          align-items="center"
                          // font-size="1.5rem"
                          color="#fa0202"
                          cursor="pointer"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <NavLink to="/admin/routine">루틴명2 </NavLink>
                      </td>
                      <td>오전 9:00</td>
                      <td>에어컨,가습기</td>
                      <td>오후 7:00</td>
                      <td>
                        <ControlledSwitches />
                      </td>
                      <td>
                        <MdDelete
                          padding="1rem"
                          align-items="center"
                          // font-size="1.5rem"
                          color="#fa0202"
                          cursor="pointer"
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default RoutineCreate;
