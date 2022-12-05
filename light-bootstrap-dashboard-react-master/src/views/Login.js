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
  MDBIcon,
  MDBBreadcrumb,
  MDBBreadcrumbItem
}
  from 'mdb-react-ui-kit';
import axios from 'axios';
import { useRef } from 'react';
import { Link } from 'react-router-dom';


function Login() {
  const refId = useRef();
  const refPw = useRef();

  function sendLogin() {
    const userData = {
      id: refId.current.value,
      pw: refPw.current.value
    };
    console.log(userData)
    if (refId.current.value == '') {
      alert('아이디를 입력해주세요.');
    } else if (refPw.current.value == '') {
      alert('비밀번호를 입력해주세요.');
    }
    axios.post('http://localhost:3001/login', userData)
      .then((res) => {
        console.log(res.data.result)
        if (res.data.result == "로그인성공") {
          console.log('aa')

          window.location.href = '/admin/dashboard';
        } else if (res.data.result == "로그인실패") {
          console.log('aaa')
        }
      })
      .catch((res) => {
        console.log(res.data.result)

      })
  }

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
        })
    }
  }
    return (
      <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

        <MDBRow>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Office Care Service <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>I'm your App</span>
          </h1>

          <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            스마트 오피스 케어 서비스 I'm your App(가제)입니다.
          </p>

            <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
              스마트 오피스 솔루션 CUBE Office 입니다.
            </p>

          </MDBCol>

          <MDBCol md='6' className='position-relative'>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
                <h4 className='login-info mb-3'>안녕하세요:wave:</h4>
                <h6 className="font-weight-light mb-5">로그인 후 이용가능합니다.</h6>


                <MDBInput wrapperClass='mb-4' label='아이디' id='form3' type='ID' inputRef={refId} />
                <MDBInput wrapperClass='mb-5' label='비밀번호' id='form4' type='password' inputRef={refPw} />
                <MDBBtn className='w-100 mb-4' onClick={sendLogin} size='lg'>로그인</MDBBtn>


                <div className="text-center mt-4 font-weight-light">
                  <h6>계정이 없으신가요? &nbsp;<Link to="/join">회원가입</Link></h6>
                </div>
            </MDBCardBody>
          </MDBCard>
                {logError ? <h6 Class='mb-3' style={{color:"red"}}>&nbsp;아이디 또는 비밀번호를 잘못 입력했습니다.</h6> : <br></br>}
                <MDBBtn className='w-100 mb-4' onClick={sendLogin} size='lg'>로그인</MDBBtn>

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