let pomodoro = 0;
let pomodoroHecho = 0;
let descripPomo = "...";
let log = "";
let log2 = ""; //variables log mal nombradas
let setIntervalStatus;
//variables de la fecha y hora

let tiempoRest = 0;
/*
document.write(' '+hourPomo.getHours() + ':' + hourPomo.getMinutes()+ ':' + hourPomo.getSeconds());        
document.write(datePomo.getDate() + "/" + (datePomo.getMonth() +1) + "/" + datePomo.getFullYear());
*/

//Create Cookies
//SaveCookie("Wife","Kylie")
function SaveCookie(nombre, valor, fecha) {
  document.cookie = nombre + "=" + valor + ";expires=" + fecha;
}

//Ver Cookies creadas
function alertCookie() {
  alert(document.cookie); // visualizar: nombre=oeschger;comida favorita=tripa
}

//Reading Cookies

let trozos = document.cookie.split("; ");
valorCookie = "";
function GetCookie(NombreCookie) {
 // trozos = cookie.split(';');
  valorCookie = '';
  trozos.forEach(function (cancion) {
      nuevoSplit = cancion.split('=');
      if (nuevoSplit[0] == NombreCookie) {
          valorCookie = nuevoSplit[1]
      } else { }
  });
  return valorCookie;
}

//Creador de Lista
function capturarDatos() {
  function datosInfo(pomoInfo, timeInfoHours, timeInfoDate, pomodorosInfo) {
    //Constructor de Objetos
    //cuando alguien inicie el objeto e indique la info, se va a transformar en el objeto que definamos
    this.pomoInfo = pomoInfo;
    this.timeInfoHours = timeInfoHours;
    this.timeInfoDate = timeInfoDate;
    this.pomodorosInfo = pomodorosInfo;
  }

  pomoInfoCapture = document.getElementById("TareasArealizar").value;
  timeInfoCapture = timePomoHora;
  dateInfoCapture = timePomoFecha;
  pomodorosInfo = pomodoroHecho;

  totalInfo = new datosInfo(
    pomoInfoCapture,
    timeInfoCapture,
    dateInfoCapture,
    pomodorosInfo
  );

  agregar();
}

//busco en la base de datos el index1, el valor de pomoInfo
//baseDatos[1].pomoInfo
//

//agregamos al Array
var baseDatos = [];
function agregar() {
  //vamos a pasarle a la base de datos el objeto que capturamos arriba
  baseDatos.push(totalInfo);
  console.log(baseDatos);
}

function inicioT() {
  let datePomo = new Date();
  let hourPomo = new Date();
  timePomoHora =
    hourPomo.getHours() +
    ":" +
    hourPomo.getMinutes() +
    ":" +
    hourPomo.getSeconds();
  timePomoFecha =
    datePomo.getDate() +
    ":" +
    datePomo.getMonth() +
    ":" +
    datePomo.getFullYear();
  console.log(timePomoFecha);
  pomodoro = document.getElementById("tiempoG").value;
  descripPomo = document.getElementById("TareasArealizar").value;
  log2 = `Has terminado de: ${descripPomo}`;

  IniciarSetInterval();

  setTimeout(function () {
    console.log("Time to Eat");
    pomodoroHecho = pomodoroHecho + 1;

    log += log2 + "\n";

    capturarDatos();

    document.getElementById(
      "pomodorosHechosCantidad"
    ).innerHTML = pomodoroHecho;
    document.getElementById("TareasHechas").innerHTML = log;

    //leyendo las cookies

    DetenerSetInterval();
  }, 1000 * pomodoro);
}

function IniciarSetInterval() {
  setIntervalStatus = setInterval(function () {
    tiempoRest = pomodoro;
    if (tiempoRest > 0) {
      tiempoRest = pomodoro--;
      document.getElementById("tiempoM").innerHTML = pomodoro;
      //  console.log(tiempoRest);
    } else {
    }
  }, 1000);
}

function DetenerSetInterval() {
  clearInterval(setIntervalStatus);
}
