import {formLogin, userLogin, passwdLogin, registerLog } from "../constants.js";
import { loginAPI } from "../apiFunc.js";
export let userToken="";


async function login(user,passwd){
    try{
        const usuario= await loginAPI(user,passwd);
        console.log(usuario);
        sessionStorage.setItem("token",usuario.token)
        // Redireciona para outra página
        //window.location.href = "./pages/feed.html";
    }
    catch(erro){
        document.querySelector("#LogErr")?.remove();
        let erro_type=document.createElement("h2");
        erro_type.innerText=erro;
        erro_type.id="LogErr";
        formLogin.appendChild(erro_type);

    }    
}

formLogin.addEventListener("submit",(e)=>{
    e.preventDefault();
    login(userLogin.value,passwdLogin.value);
    
});

registerLog.addEventListener("click", (e)=>{
    window.location.href = "./pages/register.html";
    
});


