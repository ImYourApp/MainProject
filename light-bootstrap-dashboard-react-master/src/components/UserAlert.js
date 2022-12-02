import React, { useState } from "react";
import { 
  MDBBadge, 
  MDBListGroup, 
  MDBListGroupItem,
  MDBCol,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink
 } from 'mdb-react-ui-kit';

// react-bootstrap components
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

import ControlledSwitches from "./Switch";

function UserAlert() {
     
  return (
    <>
<MDBListGroup style={{ minWidth: '11rem' }} light>
      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          {/* <img
            src='https://mdbootstrap.com/img/new/avatars/8.jpg'
            alt=''
            style={{ width: '45px', height: '45px' }}
            className='rounded-circle'
          /> */}
          <div className='ms-3'>
            <p className='fw-bold mb-1'>메시지 알림</p>
          </div>
        </div>
        <ControlledSwitches />
      </MDBListGroupItem>
    </MDBListGroup>
    </>
  );
}

export default UserAlert;