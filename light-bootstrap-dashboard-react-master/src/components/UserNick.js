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
  MDBTabsLink,
  MDBBtn,
  MDBInput  
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

function UserNick() {
  return (
    <>
        <div className="NickName" >
            <MDBInput wrapperClass='mb-4' id='BeforeNick' label='기존 닉네임' />
            <MDBInput wrapperClass='mb-4' id='AfterNick' label='변경 닉네임' />
            <div className="d-grid gap-2">
            <MDBBtn>변경</MDBBtn>
            </div>
        </div>
    </>
  );
}

export default UserNick;
