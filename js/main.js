$(document).ready(function(){
    
});

console.log("ready");


var form = document.querySelector('form');
 form.addEventListener('submit', function(e) {
     e.preventDefault();
     proveraEmail(this.email.value);
     proveraPassword(this.password.value);
   });
function proveraEmail(email){
    var regEmail = /^[a-zA-Z][a-zA-Z0-9_\.]+(?=[a-zA-Z0-9\.\_]*)@([a-z]{2,}\.)[a-z]{2,}$/;
    
    if (regEmail.test(email)) {

        document.querySelector('.greska1').innerHTML='dobro je';
    }
    else{
    
        document.querySelector('.greska1').innerHTML= "nije dobro";
    }
    
}





function proveraPassword(passw){
    var regPassword = /^[A-Za-z0-9]{5,}$/;
    
    if (regPassword.test(passw)) {
        
        document.querySelector('.greska2').innerHTML='dobro je';
    }
    else{
    
        document.querySelector('.greska2').innerHTML="nije dobro";
    }
    
}

















