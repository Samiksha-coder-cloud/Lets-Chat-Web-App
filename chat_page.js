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
var room_name = localStorage.getItem("roomName");

function send() {
      console.log(room_name);
      var msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like:0
      });

      document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
     firebase_message_id = childKey;
     message_data = childData;
//Start code
  console.log(firebase_message_id);
  console.log(message_data);
  name1 = message_data['name'];
  likes = message_data['like'];
  message = message_data['message'];
  name_tag = "<h4>"+name1+" <img class='user_tick' id='tick_Img' src='pink_tick.png'></h4>";
  message_tag = "<h4 class='message_h4'>"+message+"</h4>"
  like_button = "<button class='btn btn-info' id='"+firebase_message_id+"' value="+likes+" onclick='likes_btn(this.id)'>";
  span_tag = "<span class='glyphicon glyphicon-thumbs-up'> Likes: "+likes+"</span></button><hr>"
  row = name_tag + message_tag + like_button + span_tag;
  document.getElementById("output").innerHTML += row;
//End code
  } });  }); }
getData();

function likes_btn(id) {
  console.log("Like Button is clicked " + id);
  current_likes = document.getElementById(id).value;
  updated_likes = Number(current_likes)+1;
  console.log("Updated Likes= "+updated_likes);
  firebase.database().ref(room_name).child(id).update({
        like: updated_likes
  });
}

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location="index.html"
}