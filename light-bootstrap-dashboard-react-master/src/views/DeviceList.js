import React from "react";
import axios from "axios";
// 추가
import ControlledSwitches from 'components/DeviceSwitch.js';

// demo.css 60번째줄에 클래스 새로 만들어서 css 내용 추가함

// react-bootstrap components
import {
  Button, // 버튼 활성화
  Card,
  Modal, // 모달 추가, 맨 아래에 코드 추가
  Form, // 폼 추가
  Container,
  Row,
  Col,
} from "react-bootstrap";

import _, { showInfo as Icons_showInfo, setShowInfo as Icons_setShowInfo, setDeviceName,setDeviceUid,setDeviceDate,deviceName } from "./Device.js";
import { useEffect } from 'react'
import { faTemperatureArrowDown, faTemperatureArrowUp, faDroplet, faWind, faLightbulb, faPersonBooth, faPlug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DeviceList() {
  const icon = { '에어컨': faTemperatureArrowDown, '히터': faTemperatureArrowUp, '가습기': faDroplet, '환풍기': faWind, '스마트조명': faLightbulb, '스마트블라인드': faPersonBooth }
  // 추가
  const [showModal, setShowModal] = React.useState(false);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showNameModal, setShowNameModal] = React.useState(false);
  const [deviceData, setDeviceData] = React.useState([]);
  const [deviceSeq, setDeviceSeq] = React.useState();
  const refDeviceName = React.useRef();
  const refDeviceNo = React.useRef();
  const editDeviceName =  React.useRef();
  const handleRename = (event) => {
    event.preventDefault();
  }
    ;
  let data = '';

  useEffect(() => {
    // console.log(icon['에어컨'])
    getDeviceList();
  }, [])
  function getData(e) {
    data = e.target.value;
  }
  function chData() {
    setInputData(data);
  }

  function getDeviceList() {
    let deviceData = {
      type: 'list'
    }
    axios.post('http://127.0.0.1:3001/device', {
      data: deviceData
    })
      .then((res) => {
        if (res.data.result == 'success') {
          // setDeviceData(res.data.row);
          listDevice(res.data.row)
          console.log('가져오기')
        } else {
          console.log('가져오기실패')
        }

      }).catch(() => { console.log('살패') })
  }

  function device_add() {
    let deviceData = {
      name: refDeviceName.current.value,
      no: refDeviceNo.current.value,
      type: 'add'
    }

    axios.post('http://127.0.0.1:3001/device', {
      data: deviceData
    })
      .then((res) => {
        if (res.data.result == 'success') {
          // setDeviceData(res.data.row);
          listDevice(res.data.row)
          alert('저장성공');
        } else {
          alert('저장실패');
        }

      }).catch(() => { console.log('살패') })
  }

  function device_delete() {

    if(!confirm('삭제 하시겠습니까?')){
      return false;
    }
    let deviceData = {
      no: deviceSeq,
      type: 'del'
    }

    axios.post('http://127.0.0.1:3001/device', {
      data: deviceData
    })
      .then((res) => {
        if (res.data.result == 'success') {
          // setDeviceData(res.data.row);
          listDevice(res.data.row)
          alert('삭제성공');
        } else {
          alert('삭제실패');
        }

      }).catch(() => { console.log('살패') })
  }

  function device_edit() {

    if(!confirm('이름 변경 하시겠습니까?')){
      return false;
    }
    let deviceData = {
      no: deviceSeq,
      name: editDeviceName.current.value,
      type: 'edit',
      select:'DEVICE_NAME'
    }

    axios.post('http://127.0.0.1:3001/device', {
      data: deviceData
    })
      .then((res) => {
        if (res.data.result == 'success') {
          // setDeviceData(res.data.row);
          listDevice(res.data.row)
          alert('변경성공');
        } else {
          alert('변경실패');
        }

      }).catch(() => { console.log('살패') })
  }

  function listDevice(data) {
    let device = data.map((val, index) => {
      let dIcon = faPlug
      if (icon[val.DEVICE_NAME]) {
        dIcon = icon[val.DEVICE_NAME]
      }

      return (
        <Col key={index} className="font-icon-list" lg="2" md="3" sm="4" xs="6">
          <div className="myfont-icon-detail h-75">
            <a href='#' onClick={() => {
              setShowModal(true);
              setDeviceUid(val.DEVICE_UID);
              setDeviceName(val.DEVICE_NAME);
              setDeviceDate(val.REG_DATE);
              setDeviceSeq(val.DEVICE_SEQ)
            }} name='nc-align-left-2'>
              <FontAwesomeIcon icon={dIcon} />
              <p>{val.DEVICE_NAME}</p>
            </a>
            <p align="center"><ControlledSwitches state={val.DEVICE_STATUS} uid={val.DEVICE_SEQ}  /></p>
          </div>
        </Col>)
    }

    )
    // console.log(device);
    setDeviceData(device);
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">디바이스</Card.Title>
              </Card.Header>
              <Card.Body className="all-icons">
                <Row>
                  <Col className="font-icon-list" lg="2" md="3" sm="4" xs="6">
                    <div className="font-icon-detail h-75">
                      <a href='#' onClick={() => setShowAddModal(true)} name='nc-simple-add'>
                        <i className="nc-icon nc-simple-add"></i>
                        <p>디바이스 추가</p>
                      </a>
                    </div>
                  </Col>
                  {deviceData}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>




        <Modal        // 여기부터 추가한 모달 내용
          className="modal modal-primary"
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <hr></hr>
          <Modal.Header className="justify-content-center">
            <div className="modal-profile">
              <i className="nc-icon nc-preferences-circle-rotate"></i>
            </div>
          </Modal.Header>
          <Modal.Body className="text-center">
            <h4>디바이스 관리하기</h4>
          </Modal.Body>
          <hr></hr>
          <div className="modal-footer">
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => {
                Icons_setShowInfo({ ...Icons_showInfo, togle: true });

              }}
            >
              &nbsp;&nbsp;&nbsp;상세정보
            </Button>
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowNameModal(true)}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;이름변경
            </Button>
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => {device_delete();setShowModal(false)}}
            >
              디바이스 삭제
            </Button>
          </div>
          <hr />
        </Modal>


        <Modal
          className="modal modal-primary"
          show={showNameModal}
          onHide={() => setShowNameModal(false)}
        >
          <Modal.Body className="text-center">
            <h4>디바이스 이름 변경</h4>
            <Form method="post" action='#' onSubmit={handleRename}>
              <Row>
                <Col className="pr-1 m-3">
                  <Form.Group>
                    {/* <label>디바이스 이름</label> */}
                    <Form.Control
                      placeholder="변경할 이름을 입력해주세요."
                      type="text"
                      onChange={getData}
                      ref={editDeviceName}
                    >
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Button
                className="btn-fill float-right m-1"
                type="submit"
                variant="info"
                onClick={()=>{device_edit();setShowNameModal(false)}}
              >
                저장
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal
          className="modal modal-primary"
          size="lg"
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
        >
          <Modal.Body>
            <Card>
              <Card.Header>
                <Card.Title as="h4">디바이스 추가</Card.Title>
              </Card.Header>
              <Card.Body>

                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>디바이스 이름</label>
                      <Form.Control
                        placeholder="Name"
                        type="text"
                        ref={refDeviceName}
                      >
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="6">
                    <Form.Group>
                      <label>시리얼 넘버</label>
                      <Form.Control
                        placeholder="Serial number"
                        type="text"
                        ref={refDeviceNo}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  className="btn-fill float-right" // pull-right는 이제 쓰이지 않으므로 float-right으로 변경
                  type="button"
                  variant="info"
                  onClick={() => device_add()}
                >
                  디바이스 등록
                </Button>
                <div className="clearfix"></div>

              </Card.Body>
            </Card>
          </Modal.Body>
        </Modal>




      </Container>
    </>
  );
}

export default DeviceList;
