import { formReg, loginReg as l,nameReg as n,passwdReg as p,imageReg as i } from "../constants.js";
import { registerAPI, UsersAPI } from "../apiFunc.js";

async function _register(nome,login,senha,img) {
    let check=0;
    let users= await UsersAPI();
    for(let user of users){
        if(user.login == login){
            document.querySelector("#LogErr")?.remove();
            document.querySelector("#sucessReg")?.remove();
            let erro_type=document.createElement("h2");
            erro_type.innerText="LOGIN JA CADASTRADO";
            erro_type.id="LogErr";
            formReg.appendChild(erro_type);
            check++;
        }
    }
    if(!check){
        try{
            let register = await registerAPI(login,senha,nome,img);
            document.querySelector("#LogErr")?.remove();
            document.querySelector("#sucessReg")?.remove();
            let sucessfull=document.createElement("h2");
            sucessfull.innerText="Sucesfull register";
            sucessfull.id="sucessReg";
            formReg.appendChild(sucessfull);
        }
        catch(erro){
            document.querySelector("#LogErr")?.remove();
            document.querySelector("#sucessReg")?.remove();            
            let erro_type=document.createElement("h2");
            erro_type.innerText=erro;
            erro_type.id="LogErr";
            formReg.appendChild(erro_type);
        };
    }


    
};


formReg.addEventListener("submit",(e)=>{
    e.preventDefault();
    _register(n.value,l.value,p.value,i.value);
})



