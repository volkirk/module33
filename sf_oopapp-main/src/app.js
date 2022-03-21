import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import { User } from "./models/User";
import { generateTestUser } from "./utils";
import { State } from "./state";
import { authUser } from "./services/auth";
import { stringify } from "uuid";


export const appState = new State();

var globalList = ['task uno', 'task duo', 'task tree', 'task quatro'];
var listToDo = [];
var listDoing = [];
var listDone = [];


const loginForm = document.querySelector("#app-login-form");

generateTestUser(User);

function mainWorkF() {
  const globalDiv = document.querySelector('#globalDiv');
  const todoDiv = document.querySelector('#todoDiv');
  const todoB = document.querySelector('#todoB');
  const doingB = document.querySelector("#doingB");
  const doneB = document.querySelector('#doneB');
  const cleanB = document.querySelector('#cleanB');
  const doingDiv = document.querySelector('#doingDiv');
  doingB.addEventListener('click', listenerF.bind(doingB));
  doneB.addEventListener('click', listenerF.bind(doneB));
  todoB.addEventListener('click', listenerF.bind(todoB));
  cleanB.addEventListener('click', clearF);
  perform(globalList, globalDiv);
  //perform(listToDo, todoDiv);
  //perform(globalList, todoDiv);


}


function listenerF(listener) {
  console.log('listenerF start');
  var butt = listener.path[0].id;

  buttswitch(butt);

};



function buttswitch(butt) {

  console.log(typeof (butt));
  if (typeof (butt) == 'object') {
    console.log('type is OBJECT!');
    butt = butt.path[0].id;
  }
  const button = document.querySelector(`#${butt}`);

  switch (butt) {
    case 'todoB':
      var divF = todoDiv;
      var list = listToDo;
      var prevlist = globalList;
      break;
    case 'doingB':
      var divF = doingDiv;
      var list = listDoing;
      var prevlist = globalList;
      break;
    case 'doneB':
      var divF = doneDiv;
      var list = listDone;
      var prevlist = globalList;
      break;
    default:
      var divF = todoDiv;
      var list = listToDo;
      var prevlist = globalList;
      break;

  }
  list = [];

  if (button.textContent == '+ ADD') {
    makeSelect(prevlist, divF.id);
    button.textContent = 'Confirm';
  }
  else {
    button.textContent = '+ ADD';
    var foundSelect = document.querySelector('select');
    listChanges(list, prevlist);
    perform(list, divF);
    if (foundSelect != null) {
      divF.removeChild(foundSelect);
    }

  }
}

function perform(list, divF) {
  console.log('performF');
  if (divF.firstChild.next == 'div')
    console.log('CHILDREN');

  else
    console.log('NO KIDS ');

  for (var i = 0; list.length > i; i++) {
    var divEl = document.createElement('div');
    divF.appendChild(divEl);
    divEl.innerHTML = list[i];
  }
  console.log('END PERFORM FUNC');
}
function clearF() {
  console.log('CLEAN F STARTED TO WORK');
  listDoing = [];
  listToDo = [];
  listDone = [];
  todoDiv.textContent = '';
  doingDiv.textContent = '';
  doneDiv.textContent = '';
  globalList = ['task uno', 'task duo', 'task tree', 'task quatro'];
  console.log('CLEAN F DID WORK');
}


function makeSelect(list, divId) {

  var listcopy = [];
  listcopy = list.concat();
  var divF = document.querySelector(`#${divId}`);
  var selectEl = document.createElement('select');

  var divFlastChild = divF.lastChild;
  divF.append(selectEl);
  var i = 0;
  while (listcopy.length > 0) {
    var option = document.createElement('option');
    var option = selectEl.appendChild(option);
    option.innerHTML = listcopy[0];
    i++;
    listcopy.shift();
    if (i == 6) break;
  }
  console.log('makeSelect End');
}


function listChanges(list, prevlist) {
  console.log('listChangesF');
  var selectEl = document.querySelector('select');
  var sIndex = selectEl.selectedIndex;
  var res = prevlist.splice(sIndex, 1);
  list.push(res);
  console.log('end listChangeF');
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");

  let fieldHTMLContent = authUser(login, password)
    ? taskFieldTemplate
    : noAccessTemplate;

  document.querySelector("#content").innerHTML = fieldHTMLContent;
  mainWorkF();
});