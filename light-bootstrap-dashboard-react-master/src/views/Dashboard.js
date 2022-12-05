import React from "react";
import ChartistGraph from "react-chartist";
import { useState, Component, useRef, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ControlledSwitches from '../components/Switch.js';
import { useDispatch,useSelector } from "react-redux";
import Chart1 from "components/chart1.js";
import Chart2 from "components/chart2.js";
import Chart3 from "components/chart3.js";
import Chart4 from "components/chart4.js";

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
  Form,
  OverlayTrigger,
  Tooltip,
  Dropdown,
  ButtonGroup,
  ToggleButton,
  Pick,
  Alert,
} from "react-bootstrap";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore.js";
import { forEachChild } from "typescript";

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Dashboard = () => {
  const addList = useSelector((state)=>(state.addReport));
  const dispatch = useDispatch();
  const [power,setPower] = useState([]);
  const [mpower,setmPower] = useState('0');
  const [wpower,setwPower] = useState('0');
  const [deviceCnt,setDeviceCnt] = useState('0');
  const [startDate, setStartDate] = useState(new Date('2016-02-01'));
  const [endDate, setEndDate] = useState(new Date('2016-02-01'));
  useEffect(()=>{

    loadPower();
    greetData("wPower");
    greetData("mPower");
    greetData("device");
    greetData("wPowerChk1");
    greetData("wPowerChk2");
  }, []);

  useEffect(() => {
    AddHtml();
  },[addList])

  useEffect(()=>{
    greetData('wPowerChk1');
    greetData('wPowerChk2');
  },[endDate])

  const loadPower = ()=>{

    console.log('loadPower function')
    if(power.length == 0){

      axios.post('http://127.0.0.1:3001/db',{
        type:'power'
      })
      .then((res)=>{
          
          console.log('성공');
          dispatch({type:'chart3',chart3_power:res.data.power,chart3_time:res.data.time});
        
      })
      .catch(()=>{console.log('살패')})
    }
  };

  function greetData(type) {

    let d1 = new Date(endDate);
    let d2 = new Date(startDate);

    console.log((d1.getDate() - d2.getDate())  +'빼기날자');
    let DateData ={
      start : startDate,
      end : endDate,
      diDay : d1.getDate() - d2.getDate()
    }
    axios.post('http://127.0.0.1:3001/total',{
      type:type,
      date:DateData
    })
    .then((res)=>{
        
        console.log('성공');

        if (type == "mPower") {
          setmPower(res.data.power);
          console.log(mpower);
        } else if (type == "wPower") {
          setwPower(res.data.power);
          console.log(wpower);
        } else if (type == "device") {
          setDeviceCnt(res.data.device);
          console.log(deviceCnt);
        } else if (type == "wPowerChk1") {
          //이번주
          console.log('이번주'+res.data.power);
          dispatch({type:'chart1',chart1_1power:res.data.power,chart1_1label:res.data.label});
          // setthisPower(res.data.power);
          // console.log('이번주'+thisPower);
        } else if (type == "wPowerChk2") {
          // const wPowe = res.data.power; //지난주
          // setLastPower(res.data.power);
          dispatch({type:'chart1',chart1_2power:res.data.power,chart1_2label:res.data.label,chart1_diDay:res.data.did});
          console.log('지난주'+res.data.power);
        }
        
    })
    .catch(()=>{console.log('살패')})
  }



  const AddHtml=() =>{
    // console.log('addHtml'+addList);
    const arrtext = addList.substr(1).split(",");
    let html = "";
    for (let i = 0; i < arrtext.length; i++) {
      html += arrtext[i];
      // console.log('html'+html);
    }
    return (
      <>
        <tbody dangerouslySetInnerHTML={{ __html: html }}></tbody>
      </>
    );
  };

  const DatePickerComponent = () => {
    let refStartd = useRef();
    let refEndd = useRef();
    let DateData ={
      start : startDate,
      end : endDate
    }

    function dateAxios(){
      axios.post('http://127.0.0.1:3001/db',{
        date:DateData,
        type:'power'
      })
      .then((res)=>{
          console.log('성공');
          dispatch({type:'chart3',chart3_power:res.data.power,chart3_time:res.data.time});
      })
      .catch(()=>{console.log('살패')})
    }

    return (
      <>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            name='strDate'
            ref={refStartd}
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            name='endDate'
            ref={refEndd}
            dateFormat="yyyy-MM-dd"
          />
          <Button
            className="btn-fill pull-right"
            type="button"
            variant="info"
            style={{
              lineHeight:1.2
            }}
            onClick={()=>dateAxios()}
          >
            조회
          </Button>
      </>
    );
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">이달 총 사용전력량</p>
                      <Card.Title as="h5">{mpower} kw</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <Button
                    className="border-0 p-1"
                    onClick={() => greetData("mPower")}
                  >
                    <i className="fas fa-redo mr-1"></i>
                    Update Now
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">주간 총사용전력량</p>
                      <Card.Title as="h5">{wpower} kw</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <Button
                    className="border-0 p-1"
                    onClick={() => greetData("wPower")}
                  >
                    <i className="fas fa-redo mr-1"></i>
                    Update Now
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">전달대비 전력사용</p>
                      <Card.Title as="h5">+6% 사용</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <Button className="border-0 p-1">
                    <i className="fas fa-redo mr-1"></i>
                    Update Now
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-preferences-circle-rotate text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">사용중인 디아비스</p>
                      <Card.Title as="h5">{deviceCnt}대 가동중</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <Button className="border-0 p-1 line-he">
                    <i className="fas fa-redo mr-1"></i>
                    Update Now
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">총 전력사용량</Card.Title>
                <p className="card-category">24 Hours performance</p>
                <DatePickerComponent />
              </Card.Header>
              <Card.Body>
                <Chart3/>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">디바이스 전력사용 통계</Card.Title>
                  <p className="card-category">Last Campaign Performance</p>
                </Card.Header>
                <Card.Body>
                  <Chart2/>
                </Card.Body>
              </Card>
            </Col>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">디바이스 관리</Card.Title>
                  <p className="card-category">Last Campaign Performance</p>
                </Card.Header>
                <Card.Body className="all-icons">
                  <Row>
                    <Col className="font-icon-list" lg="3" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-air-baloon"></i>
                        <p>에어컨</p>
                        <ControlledSwitches />
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="3" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-album-2"></i>
                        <p>히터</p>
                        <ControlledSwitches />
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="3" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-air-baloon"></i>
                        <p>가습기</p>
                        <ControlledSwitches />
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="3" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-album-2"></i>
                        <p>환풍기</p>
                        <ControlledSwitches />
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="3" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-air-baloon"></i>
                        <p>조명</p>
                        <ControlledSwitches />
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="3" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-album-2"></i>
                        <p>블라인드</p>
                        <ControlledSwitches />
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="3" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-air-baloon"></i>
                        <p>블라인드2</p>
                        <ControlledSwitches />
                      </div>
                    </Col>
                    <Col className="font-icon-list" lg="3" md="3" sm="4" xs="6">
                      <div className="device_list">
                        <i className="nc-icon nc-album-2"></i>
                        <p>스마트플러그</p>
                        <ControlledSwitches />
                      </div>
                    </Col>
                  </Row>

                </Card.Body>
              </Card>
            </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">전력량 사용 과거 비교 통계</Card.Title>
                <p className="card-category">All products including Taxes</p>
              </Card.Header>
              <Card.Body>
                <Chart1/>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">최신 주요 리포트</Card.Title>
                <p className="card-category">Backend development</p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <AddHtml />
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
