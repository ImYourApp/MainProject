import React from 'react';
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
import axios from 'axios';
import { useRef } from 'react';
import { Link } from 'react-router-dom';


function Join() {
  const refId = useRef();
  const refPw = useRef();
  const refName = useRef();
  const refNick = useRef();
  const refHp = useRef();

  function sendJoin() {
    const userData = {
      id: refId.current.value,
      pw: refPw.current.value,
      name: refName.current.value,
      nick: refNick.current.value,
      hp: refHp.current.value
    };
    if (refId.current.value == '') {
      alert('아이디를 입력해주세요.');
    } else if (refPw.current.value == '') {
      alert('비밀번호를 입력해주세요.');
    } else if (refName.current.value == '') {
      alert('이름을 입력해주세요.');
    } else if (refNick.current.value == '') {
      alert('닉네임을 입력해주세요.');
    } else if (refHp.current.value == '') {
      alert('전화번호를 입력해주세요.');
    } else {
      axios.post('http://localhost:3001/join', userData)
        .then((res) => {
          console.log(res.data)
          if (res.data == "가입성공") {
            window.location.href = '/login';
          }
        })
        .catch((res) => {
          console.log(res.data)
          if (res.data == "가입실패") {

          }
        })
    }
  }

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Office Care Service <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>I'm your App</span>
          </h1>

          <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            스마트 오피스 케어 서비스 I'm your App(가제)입니다.
          </p>

        </MDBCol>

        <MDBCol md='6' className='position-relative'>

          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <h4 className='login-info mb-5'>회원가입</h4>

              <MDBInput wrapperClass='mb-2' label='아이디' lab id='form1' type='ID' inputRef={refId} name='id' />
              <h6 Class='mb-3'>&nbsp;ID를 입력하세요</h6>

              <MDBInput wrapperClass='mb-2' label='비밀번호' id='form2' type='password' inputRef={refPw} name='pw' />
              <h6 Class='mb-3'>&nbsp;비밀번호를 입력하세요 </h6>

              <MDBInput wrapperClass='mb-2' label='이름' id='form3' type='name' inputRef={refName} name='name' />
              <h6 Class='mb-3'>&nbsp;이름이 무엇입니까</h6>

              <MDBInput wrapperClass='mb-2' label='닉네임' id='form4' type='nickname' inputRef={refNick} name='nick' />
              <h6 Class='mb-3'>&nbsp;닉네임을 설정해주세요</h6>

              <MDBInput wrapperClass='mb-2' label='휴대폰번호' id='form5' type='hp' inputRef={refHp} name='hp' />
              <h6 Class='mb-5'>&nbsp;전화번호 뭐에요? </h6>


              <MDBBtn onClick={sendJoin} className='w-100 mb-4' size='lg'>회원가입</MDBBtn>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>

  );
}

export default Join;