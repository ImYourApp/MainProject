const express = require('express');
const mysql = require('mysql2');
const path = require('path'); // 경로처리 모듈
const app = express();
const router = require('./router/DBrouter')
const cors =require('cors')  // 외부에 있는 정보들 요청할 때 사용 하는 모듈
const bodyParser = require('body-parser');


app.get('/', (req,res)=>{
    res.send("환영합니다.")
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);
app.use(express.json);
app.listen(3001, function () {
    console.log('listening on 3001')
});