let resultSearch = document.getElementById("result");
let formularioValue = document.getElementById("formulario");
let texto = document.getElementById("txtbox");
let buttonSortDate = document.getElementById("SortDatebutton");

let paperButtonOn = document.getElementById("PaperButton");
let paperButtonOff = document.getElementById("ListFilesButton");

let ToPaperButton = document.getElementById("EraseFileB");
let ToDocumentButton = document.getElementById("RecoverFileB");

let SaveButton = document.getElementById("SaveFileB");
let InputNameFile = document.getElementById("InputNewName");

let NewIDSave = 0;
let fileLoadedID = "";

let arr = [];
let NewArraySort = [];

class Node {
  constructor(data, name, id, paper, date, next, prev) {
    this.data = data;
    this.name = name;
    this.id = id;
    this.paper = paper;
    this.date = date;
    this.next = next;
    this.prev = prev;
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  //agregamos a la cabeza
  addToHead(data) {
    const newNode = new Node(data, this.head, null);
    if (this.head) {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  //agregamos a la cabeza
  /////////New
  addToHeadNew(data, name, id, paper, date) {
    const newNode = new Node(data, name, id, paper, date, this.head, null);
    if (this.head) {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  //agregamos a la cola

  addToTail(data) {
    const newNode = new Node(data, null, this.tail);
    if (this.tail) {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  //agregamos a la cola
  //////////New
  addToTailNew(data, name, id, paper, date) {
    const newNode = new Node(data, name, id, paper, date, this.tail);

    if (this.tail) {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    this.size++;
    return "Nuevo archivo guardado";
  }

  //agregamos al index
  insertAt(data, index) {
    if (index < 0 || index > this.size) {
      return null;
    }

    const newNode = new Node(data, null, null);
    let current = this.head;
    let previous;

    if (index === 0) {
      newNode.next = current;
      current.prev = newNode;
      this.head = newNode;
    } else {
      for (let i = 0; i < index; i++) {
        previous = current;
        current = current.next;
      }
      newNode.next = current;
      newNode.prev = previous;
      current.prev = newNode;
      previous.next = newNode;
    }
    this.size++;
  }

  //Remover desde la cabeza

  removeFromHead() {
    if (!this.head) {
      return null;
    }

    const valueToReturn = this.head.data;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this.size--;
    return valueToReturn;
  }

  removeFromTail() {
    if (!this.tail) {
      return null;
    }

    const valueToReturn = this.tail.data;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.size--;
    return valueToReturn;
  }
  //remover por los parametros
  removeData(data) {
    let current = this.head;
    let previous = null;
    while (current !== null) {
      if (current.data === data) {
        if (!previous) {
          return this.removeFromHead();
        } else if (!current.next) {
          return this.removeFromTail();
        } else {
          previous.next = current.next;
          current.next.prev = previous;
        }
        this.size--;
        return current.data;
      }
      previous = current;
      current = current.next;
    }
    return null;
  }

  print() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.data + "<->";
      current = current.next;
    }
    return (result += " X ");
  }

  printList() {
    let current = this.head;
    let result = "";
    while (current) {
      result = "<li>" + current.data + "</li>";
      resultSearch.innerHTML += result;
      current = current.next;
    }
    return;
  }

  //PrintListNEW
  ////////////////
  printListNew() {
    let current = this.head;
    let result = "";
    for (let n = 0; n < this.size; n++) {
      result = "<li>" + current.data + "</li>";
      resultSearch.innerHTML += result;
      current = current.next;
    }
    return;
  }

  /////////Find function
  ////NEW
  FindListName(nameN) {
    let current = this.head;
    let result = "";
    for (let n = 0; n < this.size; n++) {
      if (nameN == current.name) {
        result = "<li>" + current.data + "</li>";
      }
      current = current.next;
    }
    return result;
  }

  /////////Find function
  ////NEW
  FindListID(idd) {
    let current = this.head;
    let result = "";
    for (let n = 0; n < this.size; n++) {
      if (idd == current.id) {
        texto.innerHTML = `
        
        ${current.data}
        </div>
              
    
              `;
      }
      current = current.next;
    }
    return result;
  }

  NewListID() {
    let current = this.head;
    let result = 0;
    for (let n = 0; n < this.size; n++) {
      NewIDSave = current.id + 1;
      result = current.id;

      current = current.next;

      if (NewIDSave == result) {
        n = 0;
      }
    }
    return NewIDSave;
  }

  PaperOnListID(idd, where) {
    let current = this.head;
    let result = "";
    for (let n = 0; n < this.size; n++) {
      if (where == "ToPaper") {
        if (idd == current.id) {
          current.paper = 1;
        }
        current = current.next;
      } else if (where == "ToList") {
        if (idd == current.id) {
          current.paper = 0;
        } else {
          resultSearch.innerHTML = ` `;
        }
        current = current.next;
      }
    }

    return "El archivo fue enviado";
  }

  ////////Filter function
  ////NEW

  FilterListNew(wordToFind) {
    let current = this.head;
    let currentData = current.data;
    let result = "";

    for (let n = 0; n < this.size; n++) {
      currentData = current.data;
      if (currentData.indexOf(wordToFind) !== -1) {
        //result += '<li>'+current.name+'</li>';
        result += `<li id=${current.id}>${current.name}</li>`;
        resultSearch.innerHTML = result;
      } 
      current = current.next;
    }
    if (resultSearch.innerHTML == "") {
      
        resultSearch.innerHTML = ` `;
      
    }
    return result;
  }

  ////////ShowFiles function
  ////NEW

  ShowFilesNew(typeFiles) {
    let current = this.head;
    let currentStatus = current.paper;
    let result = "";
    for (let n = 0; n < this.size; n++) {
      currentStatus = current.paper;
      if (typeFiles == "Documents") {
        if (currentStatus == 0) {
          result += `<li id=${current.id}>${current.name}</li>`;
          resultSearch.innerHTML = result;
        }
      } else if (typeFiles == "Papers") {
        if (currentStatus == 1) {
          result += `<li id=${current.id}>${current.name}</li>`;
          resultSearch.innerHTML = result;
        }
      }

      current = current.next;
    }
    if (result == "") {
      resultSearch.innerHTML = ` `;
    }
    return result;
  }

  reversePrint() {
    let current = this.tail;
    let result = "";

    while (current) {
      result += current.data + "<->";
      current = current.prev;
    }
    return (result += "X");
  }

  getsize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  DoubleLinkedToArray() {
    arr.length = 0;
    let current = this.head;
    let result = "";
    for (let n = 0; n < this.size; n++) {
      arr.push({
        name: current.name,
        date: current.date,
        id: current.id,
      });
      current = current.next;
    }

    return result;
  }

  SortListNew() {
    let result = '';
    for (let n = 0; n < this.size; n++) {
      result += `<li id=${arr[n].id}>${arr[n].name}</li>`;
      resultSearch.innerHTML = result;
    }
  }
}

function init(x) {
  if (x=="h") {document.getElementById('txtbox').style.display='none';document.getElementById('text').style.display='block';}
  if (x=="s") {document.getElementById('txtbox').style.display='block';document.getElementById('text').style.display='none';}
  document.getElementById('text').value=document.getElementById('txtbox').innerHTML;
  if (x!="h" || x!="s") document.execCommand(x,false,null);
  document.getElementById('txtbox').focus();
  }

function quickSortM(array) {
  //si la longitud del arreglo es menor a 1 se devuelve una lista vacia.
  if (array.length < 1) {
    return [];
  }

  let left = [];
  let right = [];
  let pivot = array[0];

  contar(1);
  function contar(i) {
    if (i < array.length) {
      if (array[i].date > pivot.date) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }

      contar(i + 1);
    }
  }
  
   return [].concat(quickSortM(left), pivot, quickSortM(right));
}

function Sort_Bubble() {
  let resultBubble = [];
  let aux;

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j].date > arr[i].date) {
        aux = arr[j];
        arr[j] = arr[i];
        
        arr[i] = aux;
      }
    }
  }

  for (let i = 0; i < arr.length; i++) {
    resultBubble.push({
      name: arr[i].name,
      date: arr[i].date,
      id: arr[i].id
    });
  }
  return resultBubble;
}


let ElementsClick = new Array();
resultSearch.onclick = captureClick;

function captureClick(e) {
  let SrcClick;
  if (e == null) {
    SrcClick = event.srcElement;
  } else {
    SrcClick = e.target;
  }
  ElementsClick.push(SrcClick);

  fileLoadedID = SrcClick.id;

  console.log(fileLoadedID);
  console.log(doubleLinkedList.FindListID(fileLoadedID));
}

const doubleLinkedList = new DoubleLinkedList();


doubleLinkedList.addToTailNew(
  "Esto es un dato",
  "nombre del archivo 1",
  1,
  0,
  "2011-7-20 22:45:34"
);
doubleLinkedList.addToTailNew(
  "Esto es un dato que habla de cosas de archivo 2",
  "nombre del archivo 2",
  2,
  1,
  "2014-7-20 22:45:34"
);

doubleLinkedList.addToTailNew(
  "Esto es un dato que habla de cosas diferentes del archivo 3",
  "nombre del archivo 3",
  3,
  0,
  "2016-7-20 22:45:34"
);
doubleLinkedList.addToTailNew(
  "Esto es un dato44 y es realmente gordo",
  "nombre del archivo 4",
  4,
  1,
  "2017-7-20 22:45:34"
);
doubleLinkedList.addToTailNew(
  "Esto es un dato5 que habla de los cuatro",
  "nombre del archivo 4",
  5,
  0,
  "2019-7-20 22:45:34"
);
doubleLinkedList.addToHeadNew(
  "Esto es un dato5 que habla de las jirafas",
  "nombre del archivo 5",
  6,
  0,
  "2020-7-20 22:45:34"
);
//console.log(doubleLinkedList.removeFromTail());

doubleLinkedList.printListNew();

doubleLinkedList.FindListName("nombre del archivo 4");

doubleLinkedList.FilterListNew("");

formularioValue.addEventListener("keyup", function () {
  console.log(doubleLinkedList.FilterListNew(formularioValue.value));
});

paperButtonOn.addEventListener("click", function () {
  console.log(doubleLinkedList.ShowFilesNew("Papers"));
  paperButtonOn.style.outline = "auto";
  paperButtonOff.style.outline = "none";
});
paperButtonOff.addEventListener("click", function () {
  console.log(doubleLinkedList.ShowFilesNew("Documents"));
  paperButtonOff.style.outline = "auto";
  paperButtonOn.style.outline = "none";
});

ToPaperButton.addEventListener("click", function () {
  console.log(doubleLinkedList.PaperOnListID(fileLoadedID, "ToPaper"));
  console.log(doubleLinkedList.ShowFilesNew("Papers"));
});

ToDocumentButton.addEventListener("click", function () {
  console.log(doubleLinkedList.PaperOnListID(fileLoadedID, "ToList"));
  console.log(doubleLinkedList.ShowFilesNew("Documents"));
});

SaveButton.addEventListener("click", function () {
  console.log(doubleLinkedList.NewListID());
  let dateN = new Date();
  let newDate =
    dateN.getFullYear() +
    "-" +
    dateN.getMonth() +
    "-" +
    dateN.getDate() +
    " " +
    dateN.getHours() +
    ":" +
    dateN.getMinutes() +
    ":" +
    dateN.getSeconds();

    let NameFile = 'Nuevo archivo';
    if (InputNameFile.value !== '') {
      NameFile = InputNameFile.value;
    }
  console.log(
    doubleLinkedList.addToTailNew(
      texto.innerHTML,
      NameFile,
      NewIDSave,
      0,
      newDate
    )
  );

  console.log(newDate);
  console.log(doubleLinkedList.ShowFilesNew("Documents"));
});

buttonSortDate.addEventListener("click", function () {
  
  console.log(doubleLinkedList.DoubleLinkedToArray());
  Sort_Bubble();
  console.log(doubleLinkedList.SortListNew());

});
