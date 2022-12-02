const express =require("express");
const DBrouter = express.Router();
const mysql = require('mysql2')

const conn = require("../config/DBConfig.js")

// 회원가입

DBrouter.post("/join", (req,res) => {
    let USER_ID = req.body.id;
    let USER_PW = req.body.pw;
    let USER_NAME = req.body.name;
    let USER_NICK = req.body.nick;
    let USER_HP = req.body.hp;

    console.log(USER_ID, USER_PW);

    let sql = "insert into USERS(USER_ID, USER_PW, USER_NAME, USER_NICK, USER_HP) values(?, ?, ?, ?, ?)";

    conn.query(sql, [USER_ID, USER_PW, USER_NAME, USER_NICK, USER_HP], (err, row) => {
        if(!err){
            console.log("입력성공 : " + row);
            res.send("가입성공")
        } else {
            res.send("가입실패")
            console.log("입력실패 : " + err);
        }
    })
});

// 로그인

DBrouter.post("/login", (req, res) => {
    let USER_ID = req.body.id;
    let USER_PW = req.body.pw;
    console.log(USER_ID, USER_PW);

    let sql = "select * from USERS where USER_ID = ? and USER_PW = ?";

    conn.query(sql, [USER_ID, USER_PW], (err, row) => {
        if(err) {
            console.log("검색실패 : " + err);
        } 
        // 로그인 성공
        else if (row.length > 0 ) {
            res.json({
                result: "로그인성공"
            })
        } 
        // 로그인 실패
        else if (row. length == 0) {
            res.json({
                result: "로그인실패"
            })
        }
    })
});

// 유저 정보 수정
DBrouter.post('/user', (res, req)=>{
    let id = 
})

module.exports = DBrouter;