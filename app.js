
 const express = require('express');
 const app = express();
 const Port = 3000;

 const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM10', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
// Read the port data
port.on("open", () => {
  console.log('serial port open');
});

/*
var moduleName;
var splitData=[];
var finalValueA=[];
var finalValueB=[];
var rssi;

parser.on('data', data =>{
  console.log('got word from arduino:', data);
  
  if(data[0]=='A'){ moduleName='A'}
  else if(data[0]=='B'){moduleName = 'B'}
 
  if(data[0]=='+'){
     splitData = data.split(",");
    // console.log(">>>>>>>>>>>>>>", data1);
    // console.log(">>>>>>>>>>>>>>", data1[0]);
     
     if(splitData[0]=='+INQ:DCA2:66:44055C'){
        rssi = splitData[2];
       console.log("this is rssi", rssi)
     } 
  }
  else if(data[2]== 'd'){

    if(moduleName=='A'){
        finalValueA.push(rssi);
        console.log("this is final value of A", finalValueA,);
    }
    //console.log("this is rssi value",rssi)
    else if(moduleName=='B'){
        finalValueB.push(rssi);
        console.log("this is final value of B", finalValueB,);
    }   
  }
} */




/******** Calculate the x,y coodination ***********/
var a = 5;
var b =8;
var c = 10;

var z = 2*a*c;
var cosA = ((a*a)+(c*c)-(b*b))/z;

var A = Math.acos(cosA);
var sinA = Math.sin(A);
//console.log("this is A", A);

var x = a * cosA;
var y = a * sinA;

if(A<0 || A>1){console.log("This is not in the area")}
else{
    console.log("this is a x",x); // Menna me x,y values deka fe ekata yawala graph ekak plot karagannai one
    console.log("this is a y",y);
}


 app.listen(Port, function () {
    console.log('Example app listening on port http://0.0.0.0:' + Port + '!');
  });