import React from "react";
import ChartistGraph from "react-chartist";
import { useState,Component,useRef,useEffect } from "react";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ControlledSwitches from './switch.js';
import { useDispatch,useSelector } from "react-redux";
import Chart1 from "components/chart1.js";
import Chart2 from "components/chart2.js";
import Chart3 from "components/chart3.js";
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

const Report = () => {
  const addList = useSelector((state)=>(state.addReport));
  const reChart1Power = useSelector((state)=>(state.chart1_power));
  const reChart1Time = useSelector((state)=>(state.chart1_time));
  const [action,setAction] = useState('on');
  const [time,setTime] = useState(["00시","02시","04시","06시","08시","10시","12시","14시","16시","18시","20시","22시","23시"]);
  const [power,setPower] = useState([]);
  const [mpower,setmPower] = useState('0');
  const [wpower,setwPower] = useState('0');
  const [deviceCnt,setDeviceCnt] = useState('0');
  const [Maxpower,setMaxPower] = useState([5]);
  const [weekend,setWeekend] = useState(['일','월','화','수','목','금','토']);
  const [lastPower,setLastPower] = useState([]);
  const [thisPower,setthisPower] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2016-01-01'));
  const [endDate, setEndDate] = useState(new Date('2016-01-01'));
  useEffect(()=>{
    // loadPower();
    // greetData('wPower');
    // greetData('mPower');
    // greetData('device');
    // greetData('wPowerChk1');
    // greetData('wPowerChk2');
  },[])

  useEffect(()=>{
    AddHtml();
  },[addList])

  const loadPower = ()=>{

    console.log('loadPower function')
    if(power.length == 0){

      axios.post('http://127.0.0.1:3001/db',{
        type:'power'
      })
      .then((res)=>{
          
          console.log('성공');
          setTime(res.data.time);
          setPower(res.data.power);
          setMaxPower(res.data.maxVal);
          console.log(time);
          console.log(power);
          console.log(Maxpower);
        
      })
      .catch(()=>{console.log('살패')})
    }
  }

  function greetData(type) {
    axios.post('http://127.0.0.1:3001/total',{
      type:type
    })
    .then((res)=>{
        
        console.log('성공');

        if(type=='mPower'){
          setmPower(res.data.power);
          console.log(mpower);
        }else if(type=='wPower'){
          setwPower(res.data.power);
          console.log(wpower);
        }else if(type=='device'){
          setDeviceCnt(res.data.device);
          console.log(deviceCnt);
        }else if(type=='wPowerChk1'){
          //이번주
          console.log('이번주'+res.data.power);
          setthisPower(res.data.power);
          // console.log('이번주'+thisPower);
        }else if(type=='wPowerChk2'){
          // const wPowe = res.data.power; //지난주
          setLastPower(res.data.power);
          console.log('지난주'+res.data.power);
        }
    })
    .catch(()=>{console.log('살패')})
  }


  const AddHtml=() =>{
    // console.log('addHtml'+addList);
    const arrtext = addList.substr(1).split(',');
    let html = ''
    for(let i =0; i < arrtext.length;i++){
      html+=arrtext[i];
      // console.log('html'+html);
    }
    return(
      <>
        <tbody dangerouslySetInnerHTML={{ __html: html }} ></tbody>
      </>
    );
  }


  const DatePickerComponent = () => {
    const dispatch = useDispatch();
    let refStartd = useRef();
    let refEndd = useRef();
    let DateData ={
      start : startDate,
      end : endDate
    }
    function dateAxios(){
      console.log(DateData.start);
      axios.post('http://127.0.0.1:3001/db',{
        date:DateData,
        type:'power'
      })
      .then((res)=>{
          console.log('성공');
          // let dt = new Date(endDate);
          // dt = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
          
          setTime(res.data.time);
          setPower(res.data.power);
          setMaxPower(res.data.maxVal);
          console.log('리덕스파워'+reChart1Power)
          dispatch({type:'chart1',chart1_power:'23233'});
          console.log(time);
          console.log(power);
          console.log(Maxpower);

          console.log('리덕스파워'+reChart1Power)
        
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
  console.log('111111');
  return (
    <>
      <Container fluid>

        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">총 전력사용량</Card.Title>
                <p className="card-category">24 Hours performance</p>
                <DatePickerComponent/>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels:time,
                      series: [
                        power,
                        // [287, 385, 490, 492, 554, 586, 698, 695],
                        // [67, 152, 143, 240, 287, 335, 435, 437],
                        // [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: Maxpower,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
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
                  Open <i className="fas fa-circle text-danger"></i>
                  Click <i className="fas fa-circle text-warning"></i>
                  Click Second Time
                </div>
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
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">기기별 사용전력량</Card.Title>
                <p className="card-category">24 Hours performance</p>
                <DatePickerComponent/>
              </Card.Header>
              <Card.Body>
                {/* <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels:time,
                      series: [
                        power,
                        [1,2,3,4,1,2,4,4,2,1,2,3,4,3],
                        [2,3,3,4,1,1,2,3,2,1,2,3,4,3]
                        // [67, 152, 143, 240, 287, 335, 435, 437],
                        // [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: Maxpower,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div> */}
                <Chart3/>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  TV <i className="fas fa-circle text-danger"></i>
                  컴퓨터 <i className="fas fa-circle text-warning"></i>
                  냉장고
                </div>
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
                    <Col className="font-icon-list" lg="12" md="12" sm="12" xs="12">
                      <Chart1/>
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
                <Card.Title as="h4">한주 전력비교</Card.Title>
                <p className="card-category">All products including Taxes</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels:weekend,
                      series: [
                       thisPower,
                       lastPower
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
                  이번주 사용 전력량 <i className="fas fa-circle text-danger"></i>
                  지난주 사용 전력량
                </div>
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
                      <AddHtml/>
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
}

export default Report;
