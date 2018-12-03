$(document).ready(function() {
  const navbarElements = [
    {
      path: "index.html",
      name: "Home"
    },
    {
      path: "gallery.html",
      name: "Gallery"
    },
    {
      path: "about.html",
      name: "About"
    },
    {
      path: "history.html",
      name: "History"
    },
    {
      path: "login.html",
      name: "Login"
    },
  ];
  renderNavbar(
    navbarElements,
    document.querySelector(".nav.navbar-nav.navbar-right")
  );

  var form = document.getElementById("login-form");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const validator = new Validator();
      validator.validateEmail(
        this.email.value,
        "Your email is not valid",
        ".error-email"
      );
      validator.validatePassword(
        this.password.value,
        "Your password must contain... ",
        "error-password"
      );

      if (validator.hasErrors()) {
        validator.render();
        return;
      }

      $(".alert.alert-success").removeClass("none");
      setTimeout(function() {}, 5000);
    });
  }
});


function renderNavbar(elements, navbar) {
  if (navbar === null) {
    return;
  }
  navbar.innerHTML = elements.map(function(item) {
    return `<li><a href="${item.path}">${item.name}</a></li>`;
  });
}

function Validator() {
  this.errors = [];
}

Validator.prototype._validate = function(regex, value) {
  return regex.test(value) === true;
};

Validator.prototype.validateEmail = function(value, message, element) {
  const emailRegex = /^[a-zA-Z][a-zA-Z0-9_\.]+(?=[a-zA-Z0-9\.\_]*)@([a-z]{2,}\.)[a-z]{2,}$/;
  if (!this._validate(emailRegex, value)) {
    this._pushError(message, element);
    return false;
  }
  return true;
};

Validator.prototype.validatePassword = function(value, message, element) {
  const passwordRegex = /^[A-Za-z0-9]{5,}$/;
  if (!this._validate(passwordRegex, value)) {
    this._pushError(message, element);
    return false;
  }
  return true;
};

Validator.prototype.validatePasswordConfirm = function(
  password,
  passwordConfirm,
  message,
  element
) {
  const match = password === passwordConfirm;

  if (!match) {
    this._pushError(message, element);
    return false;
  }
  return match;
};

Validator.prototype.validateName = function(value, message, element) {
  const nameRegex = /[A-Z][a-z]{2,50}/g;
  if(!nameRegex.test(value)) {
    this._pushError(message, element);
    return false;
  }
  return true;
};

Validator.prototype.hasErrors = function() {
  return this.errors.length !== 0;
};

Validator.prototype.getErrors = function() {
  return this.errors;
};

Validator.prototype._pushError = function(message, element) {
  if (typeof element !== "string") {
    throw new Error("element is not a string");
  }
  const el = $(element);

  this.errors.push({
    message: message,
    output: el
  });
};

Validator.prototype.render = function() {
  if (!this.hasErrors()) return;
  $.each(this.getErrors(), function(index, error) {
    error.output.html(error.message);
    error.output.fadeIn(300).removeClass("none");
  });
};
