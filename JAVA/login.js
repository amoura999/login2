// Shared Elements
var list = JSON.parse(localStorage.getItem("Credentials")) || [];

// Elements for sign-up
var signupname = document.getElementById("signupname");
var signupemail = document.getElementById("signupemail");
var signuppassword = document.getElementById("signuppassword");
var signupbtn = document.getElementById("signupbtn");
var nameError = document.getElementById("nameError");
var emailError = document.getElementById("emailError");
var passwordError = document.getElementById("passwordError");
var successfulmsg = document.getElementById("successfulmsg");
var emailExistError = document.getElementById("emailExistError");

// Elements for login
var loginemail = document.getElementById("loginemail");
var loginpassword = document.getElementById("loginpassword");
var loginbtn = document.getElementById("loginbtn");
var emptylogin = document.getElementById("emptylogin");
var Invalidlogin = document.getElementById("Invalidlogin");

// Validation Functions
function validateSignup() {
  var namevalidation = /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/;
  var emailvalidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  var passwordvalidation =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  var name = signupname.value.trim();
  var email = signupemail.value.trim();
  var pass = signuppassword.value.trim();

  let isValid = true;

  // Name validation
  if (!namevalidation.test(name)) {
    nameError.classList.remove("d-none");
    isValid = false;
  } else {
    nameError.classList.add("d-none");
  }

  // Email validation
  if (!emailvalidation.test(email)) {
    emailError.classList.remove("d-none");
    isValid = false;
  } else {
    emailError.classList.add("d-none");
  }

  // Password validation
  if (!passwordvalidation.test(pass)) {
    passwordError.classList.remove("d-none");
    isValid = false;
  } else {
    passwordError.classList.add("d-none");
  }

  return isValid;
}

function checkIfEmailExists(email) {
  return list.some((user) => user.upemail === email);
}

function handleSignup() {
  var email = signupemail.value.trim();

  if (checkIfEmailExists(email)) {
    emailExistError.classList.remove("d-none");
    return;
  }

  emailExistError.classList.add("d-none");

  if (!validateSignup()) return;

  // Save credentials
  var data = {
    upname: signupname.value.trim(),
    upemail: email,
    uppassword: signuppassword.value.trim(),
  };

  list.push(data);
  localStorage.setItem("Credentials", JSON.stringify(list));

  localStorage.setItem("CurrentUser", JSON.stringify(data));

  successfulmsg.classList.remove("d-none");
  clearSignupForm();

  setTimeout(() => {
    window.location.href = "./Pages/home.html";
  }, 1000);
}

function clearSignupForm() {
  signupname.value = "";
  signupemail.value = "";
  signuppassword.value = "";
}

function validateLogin() {
  var email = loginemail.value.trim();
  var password = loginpassword.value.trim();

  if (!email || !password) {
    emptylogin.classList.remove("d-none");
    return false;
  }

  var user = list.find(
    (user) => user.upemail === email && user.uppassword === password
  );

  if (user) {
    localStorage.setItem("CurrentUser", JSON.stringify(user));

    window.location.href = "./Pages/home.html";
    return true;
  } else {
    Invalidlogin.classList.remove("d-none");
    return false;
  }
}

function toggleForm(form) {
  if (form === "signup") {
    document.getElementById("login-form").classList.remove("active");
    document.getElementById("signup-form").classList.add("active");
  } else {
    document.getElementById("signup-form").classList.remove("active");
    document.getElementById("login-form").classList.add("active");
  }
}

if (signupbtn) {
  signupbtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleSignup();
  });
}

if (loginbtn) {
  loginbtn.addEventListener("click", (e) => {
    e.preventDefault();
    validateLogin();
  });
}

if (document.body.contains(document.getElementById("welcome-message"))) {
  var currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
  var usernameElement = document.getElementById("username");
  var logoutButton = document.getElementById("logout-btn");

  if (currentUser && currentUser.upname) {
    usernameElement.textContent = currentUser.upname;
  } else {
    window.location.href = "../LogIn.html";
  }

  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("CurrentUser");
    window.location.href = "../LogIn.html";
  });
}
