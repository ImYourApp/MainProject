import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
  MDBBreadcrumb,
  MDBBreadcrumbItem 
}
from 'mdb-react-ui-kit';

function Login() {
  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
            Office Care Service <br />
            <span style={{color: 'hsl(218, 81%, 75%)'}}>I'm your App</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
            스마트 오피스 케어 서비스 I'm your App(가제)입니다. 
          </p>

        </MDBCol>

        <MDBCol md='6' className='position-relative'>

          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
            <h4 className='login-info mb-3'>안녕하세요👋</h4>
            <h6 className="font-weight-light mb-5">로그인 후 이용가능합니다.</h6>
            

              <MDBInput wrapperClass='mb-4' label='아이디' id='form3' type='ID'/>
              <MDBInput wrapperClass='mb-5' label='비밀번호' id='form4' type='password'/>
              
              <Link to="/admin/dashboard">
              <MDBBtn className='w-100 mb-4' href='#' size='lg'>로그인</MDBBtn>
              </Link>
              

              <div className="text-center mt-4 font-weight-light">
                    <h6>계정이 없으신가요? &nbsp;<Link to="/join">회원가입</Link></h6>
                </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}


export default Login;