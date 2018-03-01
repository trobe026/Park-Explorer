facebookAuth();
$(window).on('load', function() {
  createLoginWindow();
});

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

function checkLoginState() {
  var modal = document.getElementById('mymodal');
  var loginbtn = document.getElementById("lg-btn");
  console.log(modal);
  modal.style.display = "block";
  FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    console.log(response)
    console.log('Logged in.');
    console.log(response.authResponse)
    testAPI();
    modal.style.display = "none";
    $(loginbtn).attr("data-size","small");
    console.log(loginbtn);
    $("#logout").append(loginbtn);
    $('#status').show();
  }
  else {
    $('.modal-content').append(loginbtn);
    console.log('Logged out.');
    modal.style.display = "block";
    $('#status').hide();
    }
  });
}

function facebookAuth() {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{170436580253748}',
      cookie     : true,
      xfbml      : true,
      version    : '{v2.12}'
    });
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




