'use strict';

var UserApp = (function() {
  var authToken, apiHost;

  var run = function() {
    authToken = localStorage.getItem('authToken');

<<<<<<< HEAD
    apiHost = 'http://local:3000';
=======
    apiHost = 'http://localhost:3000';
>>>>>>> 29edbe845358ec840900041a16cdd4d2559842c6
    setupAjaxRequests();

    $('#loadPosts').on('click', loadPosts);
    $('#loginForm').on('submit', submitLogin);
    $('#registrationForm').on('submit', submitRegistration);
  };

  var submitRegistration = function(event) {
<<<<<<< HEAD
=======

>>>>>>> 29edbe845358ec840900041a16cdd4d2559842c6
    event.preventDefault();

    $.ajax({
      url: apiHost + '/users',
      type: 'POST',
      data: {user: {username: $('#username').val(), title: $('#title').val(),email: $('#email').val(), password: $('#password').val()}},
    })
<<<<<<< HEAD
    .done(loginSuccess)
    .fail(function(err) {
      console.log(err);
=======
    // .done(loginSuccess)
    .done(function(data) {
      console.log(data);
    })
    .fail(function(error) {
      console.log(error);
>>>>>>> 29edbe845358ec840900041a16cdd4d2559842c6
    });

    return false;
  };

  var loginSuccess = function(userData) {
    localStorage.setItem('authToken', userData.token);
    console.log('logged in!');
    window.location.href = '/';
  };

  var submitLogin = function(event) {
    var $form;
    event.preventDefault();
    $form = $(this);
    $.ajax({
      url: apiHost + '/users/sign_in',
      type: 'POST',
      data: $form.serialize()
    })
    .done(loginSuccess)
    .fail(function(err) {
      console.log(err);
    });

    return false;
  };

  var setupAjaxRequests = function() {
    $.ajaxPrefilter(function ( options ) {
      options.headers = {};
      options.headers['AUTHORIZATION'] = "Token token" + authToken;
    });
  };

  var loadPosts = function() {
    $.ajax({
      url: apiHost + '/posts',
      type: 'GET',
      dataType: 'json',
    })
    .done(displayPosts)
    .fail(acceptFailure);
  };

  var displayPosts = function(posts) {
    console.table(posts);
  };

  var acceptFailure = function(error) {
    if (error.status === 401) {
      console.log('SEND TO LOGIN SCREEN');
      window.location.href = '/sign_in.html';
    }
  };

  return {run: run};
})();

<<<<<<< HEAD
$(document).ready(function( {
=======
$(document).ready(function(){
>>>>>>> 29edbe845358ec840900041a16cdd4d2559842c6
  UserApp.run();
});
