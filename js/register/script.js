import { formReg, loginReg as l,nameReg as n,passwdReg as p,imgReg as i , previewImg, previewMsg} from "../constants.js";
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


    
}

formReg.addEventListener("submit",(e)=>{
    e.preventDefault();
    _register(n.value,l.value,p.value,i.value);
});

//img 
i.addEventListener("input", () => {
    const url = i.value.trim();

    if (!url) {
        previewImg.removeAttribute("src");
        previewImg.style.display = "none";
        previewMsg.innerText = "Insira uma URL para visualizar a imagem.";
        return;
    }

    previewImg.style.display = "none";
    previewMsg.innerText = "Carregando imagem...";

    previewImg.src = url;
});

previewImg.addEventListener("load", () => {
    previewImg.style.display = "block";
    previewMsg.innerText = "";
});

previewImg.addEventListener("error", () => {
    previewImg.style.display = "none";
    previewMsg.innerText = "Não foi possível carregar a imagem.";
});



