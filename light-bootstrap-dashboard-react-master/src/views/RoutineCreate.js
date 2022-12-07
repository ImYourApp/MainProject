// 예를 App.js 라고 생각하자.
import { useState, useRef, useCallback } from "react";
import ControlledSwitches from "../components/Switch.js";
import Routine from "./Routine.js";
import { MdDelete } from "react-icons/md";
// react-bootstrap components
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

import BasicTimePicker from "components/time.js";
import SliderRange from "components/slider.js";
import SliderTemp from "components/sliderTemp.js";
import axios from "axios";
import { Link } from "react-router-dom";

function RoutineCreate() {
  // RoutineList 위한 props 설정 부분
  // useState 등을 이용해 저장된 루틴 목록을 띄워보려 했으나 아직 미완성이다.
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
  const [sTime, setStime] = useState("");
  const [eTime, setEtime] = useState("");
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
  const onAdd = useCallback(() => {
    // const routineCreate = {
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
    //   },
    // };
    setRoutines(routines.concat(routineCreate));
  }, [routines]);

  //명재
  console.log("3");
  const refRseq = useRef();
  const refId = useRef();
  const refDseq = useRef();
  const refRname = useRef();
  const refCstate = useRef();
  const refTemp = useRef();
  const refHumid = useRef();
  const refLight = useRef();
  const refCo2 = useRef();

  // const [cseq,setCseq]=useState('');
  // const [id,setId]=useState('');
  // const [dseq,setDseq]=useState('');
  // const [rname,setRname]=useState('');
  const [airc, setAirc] = useState(false);
  const [heat, setHeat] = useState(false);
  const [bli, setBli] = useState(false);
  const [hum, setHum] = useState(false);
  const [ven, setVen] = useState(false);
  const [ilu, setIlu] = useState(false);

  function sendRegist(e) {
    e.preventDefault();
    console.log("2");
    const cseq = refRseq.current.value;
    const id = refId.current.value;
    const dseq = refDseq.current.value;
    const rname = refRname.current.value;
    const cstate = refCstate.current.value;
    // console.log(rname, "rname");
    // const rstate=refRstate.current.value
    // const stime=refStime.current.value
    // const etime=refEtime.current.value
    const temp = refAirc.current.value;
    const humi = refHumid.current.value;
    const light = refIllum.current.value;
    const co2 = refVenti.current.value;

    const userDevice = {
      cseq,
      id,
      dseq,
      rname,
      cstate,
      airc,
      heat,
      bli,
      hum,
      ven,
      ilu,
      sTime,
      eTime,
    };
    console.log(userDevice);

    axios
      .post("http://localhost:3001/admin/routine", userDevice)
      .then((res) => {
        console.log(res.data);
        if (res.data == "등록성공") {
          window.location.href = "/admin/routine";
        }
      })
      .catch((res) => {
        console.log(res.data);
        if (res.data == "등록실패") {
          console.log(userDevice);
        }
      });
  }
  // }

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
                      placeholder="루틴 순번"
                      type="hidden"
                      ref={refRseq}
                    ></Form.Control>
                    <Form.Control
                      placeholder="회원아이디"
                      type="hidden"
                      ref={refId}
                    ></Form.Control>
                    <Form.Control
                      placeholder="디바이스 순번"
                      type="hidden"
                      ref={refDseq}
                    ></Form.Control>
                    <Form.Control
                      placeholder="루틴 상태값"
                      type="hidden"
                      ref={refCstate}
                    ></Form.Control>

                    <Form.Control
                      type="text"
                      defaultValue="기본 루틴"
                      placeholder="루틴 명칭"
                      value={routine.name}
                      ref={refRname}
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
                        <BasicTimePicker
                          sTime={sTime}
                          setStime={setStime} // 얘를 어떻게 Form 전달하는지 모르겠다.
                          // ref={refStime}
                          // id="startTime"
                          // name="startTime"
                          // valueAs="id"
                          // value={refStime.current.value}
                          onChange={(e) => {
                            // console.log(e.target.value);
                            console.log("aweraewreawr");
                            setStime(e.target.value);
                            let sTime = e.$H + ":" + e.$m;
                            console.log(sTime);
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="et" md="4">
                      <Form.Group controlId="routineCreate-endTime">
                        <Form.Label>루틴종료 시간</Form.Label>{" "}
                        {/* 화면 좁게 했을 때 이 라벨 옆에 BasicTimePicker 안 오게 css 수정해야 한다. */}
                        <BasicTimePicker
                          sTime={eTime}
                          setStime={setEtime}
                          onChange={(e) => {
                            setEtime(e.target.value);
                            let eTime = e.$H + ":" + e.$m;
                            console.log(eTime);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group
                        controlId="routineCreate-temperature"
                        ref={refTemp}
                      >
                        <Form.Label>온도 루틴</Form.Label>
                        <SliderTemp />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group
                        controlId="routineCreate-humid"
                        ref={refHumid}
                      >
                        <Form.Label>습도 루틴</Form.Label>
                        <SliderRange />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group
                        controlId="routineCreate-light"
                        ref={refLight}
                      >
                        <Form.Label>조도 루틴</Form.Label>
                        <SliderRange />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="routineCreate-co2" ref={refCo2}>
                        <Form.Label>CO2 루틴</Form.Label>
                        <SliderRange />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right mt-4"
                    type="submit"
                    variant="primary"
                    onClick={sendRegist}
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
                        <Form.Group
                          controlId="routineCreate-devices-airconditioner"
                          onClick={() => {
                            setAirc(!airc);
                          }}
                        >
                          <ControlledSwitches />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-album-2"></i>
                        <p>히터</p>
                        <Form.Group
                          controlId="routineCreate-devices-heater"
                          onClick={() => {
                            setHeat(!heat);
                          }}
                        >
                          <ControlledSwitches />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-air-baloon"></i>
                        <p>가습기</p>
                        <Form.Group
                          controlId="routineCreate-devices-humidifier"
                          onClick={() => {
                            setHum(!hum);
                          }}
                        >
                          <ControlledSwitches />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-album-2"></i>
                        <p>환풍기</p>
                        <Form.Group
                          controlId="routineCreate-devices-ventilator"
                          onClick={() => {
                            setVen(!ven);
                          }}
                        >
                          <ControlledSwitches />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-air-baloon"></i>
                        <p>조명</p>
                        <Form.Group
                          controlId="routineCreate-devices-illuminator"
                          onClick={() => {
                            setIlu(!ilu);
                          }}
                        >
                          <ControlledSwitches />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="6" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-album-2"></i>
                        <p>블라인드</p>
                        <Form.Group
                          controlId="routineCreate-devices-blinder"
                          onClick={() => {
                            setBli(!bli);
                          }}
                        >
                          <ControlledSwitches />
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
        <Routine />
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
