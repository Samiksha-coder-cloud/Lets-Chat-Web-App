var firebaseConfig = {
  apiKey: "AIzaSyCLioTNicgAviQh4TBKWfqk6MhX5cC1eWY",
  authDomain: "lets-chat-web-app-d9b64.firebaseapp.com",
  databaseURL: "https://lets-chat-web-app-d9b64-default-rtdb.firebaseio.com",
  projectId: "lets-chat-web-app-d9b64",
  storageBucket: "lets-chat-web-app-d9b64.appspot.com",
  messagingSenderId: "788431113935",
  appId: "1:788431113935:web:be458e207d1a80e8e9f1ba",
  measurementId: "G-24MNF0RB3F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var user_name = localStorage.getItem("userName");
document.getElementById("user_name").innerHTML = "Welcome " + user_name;

function add_room() {
  var room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
        Purpose: "Adding Room Name"
  });
  localStorage.setItem("roomName", room_name);
  window.location = "chat_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
  Room_names = childKey;
  //Start code
  console.log(Room_names);
  var row = "<div class='room_name' id='"+Room_names+"' onclick='redirect_room(this.id)'>"+Room_names+"</div> <hr>";
  document.getElementById("output").innerHTML += row;
  //End code
  });});}
getData();

function redirect_room(name) {
  console.log(name);
  localStorage.setItem("roomName",name);
} 

function logout() {
  localStorage.removeItem("roomName");
  localStorage.removeItem("userName");
  window.location = "index.html";
}