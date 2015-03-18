/*global $:true */
/*global Handlebars:true */
'use strict';

var authToken;

var UserApp = (function() {
  var apiHost;

  var run = function() {
    authToken = localStorage.getItem('authToken');
    // apiHost = 'http://localhost:3000';
    apiHost = 'https://project-management-api.herokuapp.com';
    setupAjaxRequests();

    $('#sign-in-form').on('submit', submitLogin);
    $('#sign-up-form').on('submit', submitRegistration);
    $('#signout').on('click', signOut);
  };

  var submitRegistration = function(event) {
    event.preventDefault();
    $.ajax({
      url: apiHost + '/users',
      type: 'POST',
      data: {user: {username: $('#username').val(), title: $('#title').val(),email: $('#email').val(), password: $('#password').val()}},
    })
    .done(function(results){
      loginSuccess(results);
      console.log(results);
    })
    .fail(function(err) {
      console.log(err);
    });

    return false;
  };

  var loginSuccess = function(userData) {
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('currentUser', userData.id);
    // console.log('logged in!');
    $.ajax({
      url: App.url + '/users/' + userData.id,
      type: 'GET'
    }).done(function(response){
      var template = Handlebars.compile($('#userTemplate').html());
      $('#container').html(template({
        user: response
      }));
      $( 'button#avatar-change' ).click(function () {
        console.log('i am clicking on the button');
        if ( $( "div#sign-in-form-slide" ).is( ":hidden" ) ) {
          $( "div#avatar-form" ).slideDown( "slow" );
          App.getAmazonKey();
        } else {
          $( "div#sign-in-form-slide" ).hide();
        }
      });
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace(response);
    });
    // i think what you're trying to do here is make a GET request to your api for the user's information
    window.location.href = '/#/users/' + userData.id;
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
      options.headers['AUTHORIZATION'] = "Token token=" + localStorage.authToken;
    });
  };

  var acceptFailure = function(error) {
    if (error.status === 401) {
      console.log('SEND TO LOGIN SCREEN');
      window.location.href = '/';
    }
  };

  var signOut = function(event){
    event.preventDefault();
    localStorage.removeItem('authToken');
    authToken = undefined;
    console.log('User has been signed out');
    location.reload();
    window.location.href = '/';
  };

  return {run: run};
})();

var SignUp = function(){
  $( 'button#sign-up' ).click(function () {
    if ( $( 'div#form-slide' ).is( ':hidden' ) ) {
      $( 'div#form-slide' ).slideDown( 'slow' );
    } else {
      $( 'div#form-slide' ).hide();
    }
  });
};

var SignIn = function(){
$( 'button#sign-in' ).click(function () {
    if ( $( "div#sign-in-form-slide" ).is( ":hidden" ) ) {
      $( "div#sign-in-form-slide" ).slideDown( "slow" );
    } else {
      $( "div#sign-in-form-slide" ).hide();
    }
  });
};

$(document).ready(function() {
  console.log('allo from the sign in js!');
  UserApp.run();
  $( "div#form-slide" ).hide();
  $( "div#sign-in-form-slide").hide();
  SignUp();
  SignIn();
});
