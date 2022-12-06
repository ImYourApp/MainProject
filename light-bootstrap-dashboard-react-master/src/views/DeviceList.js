import React from "react";

// 추가
import { Link } from "react-router-dom";
import ControlledSwitches from 'components/Switch.js';

// 이 2개는 스위치용으로 만들었다가 이제 안 쓰는데 혹시 몰라서 넣어둠
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

// demo.css 60번째줄에 클래스 새로 만들어서 css 내용 추가함
// Index.js 윗줄에 추가한 내용 있음

// a태그로 눌러서 모달 창 띄울 때 get 방식으로 쿼리 가져오기...?

// react-bootstrap components
import {
  Badge,
  Button, // 버튼 활성화
  Card,
  Modal, // 모달 추가, 맨 아래에 코드 추가
  Form, // 폼 추가
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import _, {showInfo as Icons_showInfo, setShowInfo as Icons_setShowInfo} from "./Device.js";



// var showInfo1 = {togle: false};
// var setShowInfo1;
function DeviceList() {
    
  // 추가
  const [showModal, setShowModal] = React.useState(false);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showNameModal, setShowNameModal] = React.useState(false);
  // [showInfo1, setShowInfo1] = React.useState({togle: false});
  const [inputData, setInputData] = React.useState('디바이스 1');

  const handleRename = (event) => {
    event.preventDefault();
  }
  ;
  let data = '';

  function getData(e) {
    data = e.target.value;
  }
  function chData() {
    setInputData(data);
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
                    <div className="myfont-icon-detail h-75">
                      <a href='#' onClick={() => setShowModal(true)} name='nc-align-left-2'>
                        <i className="nc-icon nc-align-left-2"></i>
                        <p>{inputData}</p>
                      </a>
                      <p align="center"><ControlledSwitches /></p>
                    </div>
                  </Col>
                  <Col className="font-icon-list" lg="2" md="3" sm="4" xs="6">
                    <div className="font-icon-detail h-75">
                      <a href='#' onClick={() => setShowAddModal(true)} name='nc-simple-add'>
                        <i className="nc-icon nc-simple-add"></i>
                        <p>디바이스 추가</p>
                      </a>
                    </div>
                  </Col>
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
              onClick={() => {Icons_setShowInfo({...Icons_showInfo, togle: true});

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
              onClick={() => setShowModal(false)}
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
                          >
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      className="btn-fill float-right m-1"
                      type="submit"
                      variant="info"
                      onClick={chData}
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
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>디바이스 이름</label>
                        <Form.Control
                          placeholder="Name"
                          type="text"
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
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill float-right" // pull-right는 이제 쓰이지 않으므로 float-right으로 변경
                    type="submit"
                    variant="info"
                  >
                    디바이스 등록
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
        </Modal>

        

        
      </Container>
    </>
  );
}

export default DeviceList;
// export {showInfo1};
