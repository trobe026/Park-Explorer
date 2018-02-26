facebookAuth();
$(window).on('load', function() {
  createLoginWindow();

});
// var $login2 = $(
//   [
//     "<div id='mymodal' class='modal'>",
//     "<div class='modal-content'>",
//     "</div>",
//     "</div>"
//   ].join("")
// );
function createLoginWindow() {
  var $login = $('<div>');
  $login.addClass('modal');
  $login.attr('id', 'mymodal');
  $("#login").html($login);

  $('#mymodal').append("<div class='modal-content'></div>");

  console.log($login);

  var $loginbtn = $("<fb:login-button>");

  $loginbtn.attr({
    "id": "lg-btn",
    "class": "login-button",
    "data-size": "large",
    "data-width": "400px",
    "scope": "public_profile,email",
    "onlogin": "checkLoginState();",
    "data-button-type": "continue_with",
    "data-show-faces": "false",
    "data-auto-logout-link": "true",
    "data-use-continue-as": "false",
    "data-use-login-as": "true"
  });
$(".modal-content").append($loginbtn);
var loginbtn = document.getElementById("lg-btn");
console.log(loginbtn);

  checkLoginState();
}

// checkLoginState();
//
// console.log($login);
// console.log($loginbtn);

// $('div#mymodal').append($loginbtn);
// $('#login').append($login);

// var login = document.getElementById('login');
// var logout = document.getElementById('logout');
//
// $('#login-button2').on('click', function() {
//   console.log('test');
//   checkLoginState();
// });




  $(".close").click(function() {
    modal.style.display = "none";
  });



// function checkLoginState() {
//     FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
//   });
// }
function checkLoginState() {
  var modal = document.getElementById('mymodal');
  var loginbtn = document.getElementById("lg-btn");
  console.log(modal);
  modal.style.display = "block";
  // var logoutBtn = document.getElementById('login-button2');
  FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    console.log(response)
    console.log('Logged in.');
    console.log(response.authResponse)
    testAPI();
    // logoutBtn.style.display = "block";
    modal.style.display = "none";
    $(loginbtn).attr("data-size","small");
    console.log(loginbtn);
    $("#logout").append(loginbtn);
    $('#status').show();
  }
  else {
    // FB.login();
    $('.modal-content').append(loginbtn);
    // createLoginWindow();
    console.log('Logged out.');

    // logoutBtn.style.display = "block";
    modal.style.display = "block";
    $('#status').hide();
    // checkLoginState();

  }
  });
}

function facebookAuth() {
  window.fbAsyncInit = function() {
    // modal.style.display = "block";
    FB.init({
      appId      : '{170436580253748}',
      cookie     : true,
      xfbml      : true,
      version    : '{v2.12}'
    });

    FB.AppEvents.logPageView();
      // Listen to the auth.login which will be called when the user logs in
    // using the Login button
    FB.Event.subscribe('auth.login', function(response) {
      console.log(response);
      // We want to reload the page now so PHP can read the cookie that the
      // Javascript SDK sat. But we don't want to use
      // window.location.reload() because if this is in a canvas there was a
      // post made to this page and a reload will trigger a message to the
      // user asking if they want to send data again.
      window.location = window.location;

    });

    FB.Canvas.setAutoGrow();

    // FB.getLoginStatus(function(response) {
    //   statusChangeCallback(response);
    // });

  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=170436580253748&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));



}
function testAPI() {
console.log('Welcome!  Fetching your information.... ');
FB.api('/me', function(response) {
  console.log('Successful login for: ' + response.name);
  console.log(response)
  document.getElementById('status').innerHTML = 'Welcome ' + response.name + '!';
  var newUser = {
    full_name: response.name,
    fb_id: response.id
  }
  console.log(newUser);
  $.post('/api/newUser', newUser)
  .then(function(data) {
    console.log(data);
  });
  });
  }
