const app = require("express")();
const exphbs = require('express-handlebars');
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const path = require("path");
const http = require('http').Server(app);

const httpPort = 3000;
const io = require('socket.io')(http);

// init middlewares
app.engine('hbs', exphbs({
  layoutsDir: path.join(__dirname, "view"),
  extname: '.hbs'
}));
app.set("views", path.join(__dirname, "view"));
app.set('view engine', 'hbs');

const port = new SerialPort("COM10", { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "\n" }));

// http routes
app.get('/', (req, res) => {
  res.render('main');
});
  
// socket io listeners
io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(httpPort, function () {
  console.log("Example app listening on port http://0.0.0.0:" + httpPort + "!");
});

// Read the port data
port.on("open", () => {
  console.log("serial port open");
});

/*
// test script
parser.on('data', (data) => {
  console.log('data :', data);
  io.emit('arduino-data', { data });
}); */



var moduleName;
var splitData=[];
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
      // console.log("this is rssi", rssi)
     } 
  }
  else if(data[2]== 'd'){

    if(moduleName=='A'){
        var finalValueA=[];
        finalValueA.push(rssi);
        console.log("this is final value of A", finalValueA,);
    }
    //console.log("this is rssi value",rssi)
    else if(moduleName=='B'){
        var finalValueB = [];
        finalValueB.push(rssi);
        console.log("this is final value of B", finalValueB,);
    }   
  }

  var a = 5;
  var b = 8;
  var c = 10;
  
  var z = 2 * a * c;
  var cosA = (a * a + c * c - b * b) / z;
  
  var A = Math.acos(cosA);
  var sinA = Math.sin(A);
  //console.log("this is A", A);
  
  var state;
  var x = a * cosA;
  var y = a * sinA;
  
  if (A < 0 || A > 1) {
    state = "this is not in the area";
    console.log(state);
  } else {
    state = "the coordinates are";
   // console.log("this is a x", x); // Menna me x,y values deka fe ekata yawala graph ekak plot karagannai one
   // console.log("this is a y", y);
  }
 io.emit('arduino-data', { state,x, y});
}) 




