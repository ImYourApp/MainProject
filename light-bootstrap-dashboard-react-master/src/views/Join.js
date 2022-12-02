import React, { useRef } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';

function Join () {
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
            <h4 className='login-info mb-5'>회원가입</h4>

              <MDBInput wrapperClass='mb-2' label='아이디' lab id='form1' type='ID' name='id' />
              <h6 Class='mb-3'>&nbsp;아이디 기준</h6> 
              
              <MDBInput wrapperClass='mb-2' label='비밀번호' id='form2' type='password' name='pw'/>
              <h6 Class='mb-3'>&nbsp;비밀번호 기준 </h6> 

              <MDBInput wrapperClass='mb-2' label='이름' id='form3' type='name' name='name'/>
              <h6 Class='mb-3'>&nbsp;</h6> 

              <MDBInput wrapperClass='mb-2' label='닉네임' id='form4' type='nickname' name='nick'/>
              <h6 Class='mb-3'>&nbsp;닉네임 기준</h6> 

              <MDBInput wrapperClass='mb-2' label='휴대폰번호' id='form5' type='hp' name='hp'/>
              <h6 Class='mb-5'>&nbsp;계정이 없으신가요? </h6> 


              <MDBBtn className='w-100 mb-4' href='join' size='lg'>회원가입</MDBBtn>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>
      
    </MDBContainer>

  );
}

export default Join;