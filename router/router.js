const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

let conn = mysql.createConnection({
    host:'project-db-stu.ddns.net',
    user:'iamyourapp',
    password:'12345',
    port:'3307',
    database:'iamyourapp'
});

router.get('/',(req,res)=>{

    res.render('main',{})
})

router.post('/total',(req,res)=>{
    const parm = req.body.type;
    if(parm =='wPower'){
        const sql = "SELECT format(sum(POWER_USE),3) as p FROM POWERS where REG_DATE between '2016-01-07' and '2016-01-14 23:59' ";
        conn.query(sql,[],(err,rows)=>{
            if(rows.length > 0){
                res.json({
                    result:'success',
                    power:rows[0].p,
                });               
            }
        })
    }else if(parm =='mPower'){
        const sql = "SELECT format(sum(POWER_USE),3) as p FROM POWERS where REG_DATE between '2016-01-01' and '2016-01-30 23:59' ";
        conn.query(sql,[],(err,rows)=>{
            if(rows.length > 0){
                res.json({
                    result:'success',
                    power:rows[0].p,
                });               
            }
        })
    }else if(parm =='device'){
        const sql = "select count(*) as cnt from DEVICES where device_status = 'ON' ";
        conn.query(sql,[],(err,rows)=>{
            if(rows.length > 0){
                res.json({
                    result:'success',
                    device:rows[0].cnt,
                });               
            }
        })
    }else if(parm =='wPowerChk1'){

        //이번주 전력
        const sql = " SELECT DATE_FORMAT(REG_DATE,'%w') as m, sum(POWER_USE) as p FROM POWERS where REG_DATE between '2016-01-03' and '2016-01-10 23:59'  GROUP BY m;";
        conn.query(sql,[],(err,rows)=>{
            if(rows.length > 0){
                let list = [];
                for(let i =0; i<rows.length;i++){
                    list.push(rows[i].p);
                }
                console.log(list);
                res.json({
                    result:'success',
                    power:list
                });  
                

            }
        })

    }else if(parm =='wPowerChk2'){
        //저번주 전력
        const sql2 = " SELECT DATE_FORMAT(REG_DATE,'%w') as m, sum(POWER_USE) as p FROM POWERS where REG_DATE between '2016-01-11' and '2016-01-17 23:59'  GROUP BY m;";  
        conn.query(sql2,[],(err,rows)=>{
           
            if(rows.length > 0){
                const list = [];
                for(let i =0; i<rows.length;i++){
                    list.push(rows[i].p);
                }
                res.json({
                    result:'success',
                    power:list
                });               
            }
        })
    }
})

router.post('/db',(req,res)=>{
    console.log('router enter'+conn.state);
    const parm = req.body.type;
    let arrdateStr ='';
    let arrdateEnd ='';
    let sql = '';
    console.log(parm);
    if(parm =='power'){

        let datewhere ="where REG_DATE between '2016-01-02' and '2016-01-02 23:59'" ;
        if(req.body.date != undefined){
            console.log(req.body.date.start);
            const strdate = req.body.date.start;
            const enddate = req.body.date.end;
            arrdateStr = String(strdate).split('T');
            arrdateEnd = String(enddate).split('T');
            console.log(arrdateStr[0]);
            datewhere ="where REG_DATE between '"+arrdateStr[0]+"' and '"+arrdateEnd[0]+" 23:59'";
        }
        if(req.body.date != undefined && (arrdateStr[0] != arrdateEnd[0]) ){
            sql = "SELECT DATE_FORMAT(REG_DATE,'%d') as m, sum(POWER_USE) as p FROM POWERS "+datewhere+" GROUP BY m ";
        }else{
            sql = "select REG_DATE,POWER_USE  from POWERS "+datewhere+"";
        }

        console.log(sql);
        conn.query(sql,[],(err,rows)=>{
           if(rows.length > 0){
                let time = [];
                let power = [];
                if(req.body.date != undefined && (arrdateStr[0] != arrdateEnd[0]) ){
                    for(let i =0; i<rows.length;i++){
                            time.push(rows[i].m+'일');
                            power.push(rows[i].p);
                        }
        
                        // const set = new Set(time)
                        console.log(time);
                        console.log(power);
                        console.log(Math.max.apply(null, power));
            
                        res.json({
                            result:'success',
                            time : time,
                            power:power,
                            maxVal : Math.max.apply(null, power),
                            strDate : arrdateStr[0],
                            endDate : arrdateStr[1]
                        });
                }else{
                    for(let i =0; i<rows.length;i++){
                        //    console.log(String(rows[i].REG_DATE));
                            let t = String(rows[i].REG_DATE).split(' ');
                            let h = t[4].split(':');
                            // console.log(h[0]);
                            if((Number(h[0])% 2=== 0 && time.indexOf(h[0]) == -1)|| (Number(h[0])% 23=== 0 &&  Number(h[1]) == 59 && time.indexOf(h[0]) == -1)){
                                // console.log(rows[i].POWER_USE);
                                time.push(h[0]);
                                power.push(rows[i].POWER_USE);
                            }
                            
                        }
                        let retime = [];
                        for(let z =0; z<time.length;z++){
                            retime.push(String(time[z])+ '시');
                        }
                        // const set = new Set(time)
                        console.log(time);
                        console.log(power);
                        console.log(Math.max.apply(null, power));
            
                        res.json({
                            result:'success',
                            time : retime,
                            power:power,
                            maxVal : Math.max.apply(null, power),
                            strDate : arrdateStr[0],
                            endDate : arrdateStr[1]
                        }); 
                }

           }else{
                res.json({
                    result:'faile'
                });      
           }
        })
    }
})


module.exports = router;