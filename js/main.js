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
    {
      path: "register.html",
      name: "Register"
    }
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

  $(window).scroll(function(){
      if($(this).scrollTop() > 800){
        $("#scrollToTop").fadeIn();
      }
      else{
        $("#scrollToTop").fadeOut();
      }
  });
 

  $(window).scroll(function(){
    if ($(this).scrollTop() > 300) {
      $("#main .padding .container .row .medimg").fadeIn();
      $("#main .padding .container .row .medtext").fadeIn();
      
    }
    else{
      $("#main .padding .container .row .medimg").fadeOut();
      $("#main .padding .container .row .medtext").fadeOut();
    }
    if ($(this).scrollTop() > 650) {
      $("#main .padding .container .row .midtext").fadeIn();
      $("#main .padding .container .row .midimg").fadeIn();
    } else {
      $("#main .padding .container .row .midtext").fadeOut();
      $("#main .padding .container .row .midimg").fadeOut();
    }
    if ($(this).scrollTop() > 1000) {
      $("#fixed").fadeIn(1500);
    } else {
      $("#fixed").fadeOut();
    }
    if ($(this).scrollTop() > 1400) {
      $("#main .padding .container .row .fttext").fadeIn();
      $("#main .padding .container .row .ftimg").fadeIn();
    } else {
      $("#main .padding .container .row .fttext").fadeOut();
      $("#main .padding .container .row .ftimg").fadeOut();
    }

  });

  $("#scrollToTop").click(function(){
    $("html,body").animate({scrollTop: 0}, 1500);
  });

  $('.selector').lightGallery({
    selector: '.upper-picture, .lower-picture'
  });
 


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
  const emailRegex = /^[a-zA-Z][a-zA-Z0-9_\.]+(?=[a-zA-Z0-9\.\_]*)@([a-z]{2,}\.)([a-z]{2,}\.)[a-z]{2,}$/;
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


var gallery = [
  {
    firstUrl : {
      url1:"img/bg-pic4.jpg",
      url2:"img/thumb1.jpg"
    },
    secondUrl : {
      url1:"img/history-pic6.jpg",
      url2:"img/thumb2.jpg"
    }
  },
  {
    firstUrl : {
      url1:"img/history-pic8.jpg",
      url2:"img/thumb3.jpg"
    },
    secondUrl : {
      url1:"img/img1.1.jpg",
      url2:"img/thumb4.jpg"
    }
  },
  {
    firstUrl : {
      url1:"img/img11.jpg",
      url2:"img/thumb5.jpg"
    },
    secondUrl : {
      url1:"img/img8.jpg",
      url2:"img/thumb6.jpg"
    }
  },
  {
    firstUrl : {
      url1:"img/img9.jpg",
      url2:"img/thumb7.jpg"
    },
    secondUrl : {
      url1:"img/img6.jpg",
      url2:"img/thumb8.jpg"
    }
  }


]

var dinamicki = "";
for(svojstva of gallery){
   dinamicki +=`
    <div class="box">
    <div class="selector">
        <div class="upper-picture" data-src="${svojstva.firstUrl.url1}">
            <img src="${svojstva.firstUrl.url2}" alt="gallery image" class="g-image">
        </div>
        <div class="lower-picture" data-src="${svojstva.secondUrl.url1}">
            <img src="${svojstva.secondUrl.url2} alt="gallery image">
        </div>
    </div>
  </div>  `;




}

document.querySelector(".g-container").innerHTML = dinamicki;


