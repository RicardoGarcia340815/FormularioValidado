document.addEventListener("DOMContentLoaded", function(){


});

//Objeto con propiedades que permiten expresiones regulares
const expresiones ={
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, //Letras, Numeros, Guion y Guion bajo,
    nombre: /^[a-zA-ZÁ-ÿ\s]{1,40}$/, //Letras y Espacios, pueden llevar acentos,
    password: /^.{4,12}$/, //4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}/ // 7 a 14 numeros.
}

//Para la validacion de los campos correctamente
const campos = {
    usuario: false,
    password: false,
    correo: false,
    telefono: false
}

const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const validarFormulario = (e) =>{
    // console.log("Se ejecuto la validación"); //comprobación
  switch(e.target.name){
      case "usuario":
        //console.log("usuario");
        validarCampo(expresiones.usuario,e.target, "usuario");
      break;

      case "nombre":
        //console.log("nombre");
        validarCampo(expresiones.usuario,e.target, "nombre");
      break;

      case "password":
        //console.log("password");
        validarCampo(expresiones.password,e.target, "password");
        validarPassword2();
      break;

      case "password2":
        //console.log("password2");
        validarPassword2();
      break;

      case "correo":
        //console.log("correo");
        validarCampo(expresiones.correo,e.target, "correo");
      break;

      case "telefono":
        //console.log("telefono");
        validarCampo(expresiones.telefono,e.target, "telefono");
      break;

    } //Validara cada uno de los camos (name)
}

const validarCampo = (expresion,input,campo)=>{ //Validacion de los input con parametros y evitar la repetición del código
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[campo] = true;
    }else{
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos[campo] = false;
    }
}

const validarPassword2 = () =>{
    const inputPassword1 = document.getElementById("password");
    const inputPassword2 = document.getElementById("password2");

    if(inputPassword1.value !== inputPassword2.value){
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__password2 i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__password2 i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos["password"] = false;
    }else{
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__password2 i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__password2 i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos["password"] = true;
    }
}

inputs.forEach((input) =>{
    input.addEventListener("keyup", validarFormulario);//Cuando levante la tecla quiero que me valide el formulario
    input.addEventListener("blur", validarFormulario);//Cuando demos un click a fuera tambien valide
});


formulario.addEventListener("submit", (e) => {
    e.preventDefault();
//Comprobar que todos los campos se encuentren correctos

    const terminos = document.getElementById("terminos"); //El que tiene el id de terminos

    if(campos.usuario && campos.nombre && campos.password &&
        campos.correo && campos.telefono && terminos.checked){
        formulario.reset();
    
        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
        setTimeout( () =>{
            document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
        },3000);

        document.querySelectorAll(".formulario__grupo-correcto").forEach((icono) =>{
            icono.classList.remove("formulario__grupo-correcto");
        });
    }else{

        document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");

    }


});

