import { urlBase as url} from "./constants.js";

export async function UsersAPI(){
    let users=await fetch(url+"/usuarios/");
    if(!users.ok){
        return new Error("Erro de Requisição");
    }
    let userJSON=await users.json();
    return userJSON;
}


export function loginAPI(user,passwd){
    let corpo={
        login:user,
        senha:passwd
    };
    let op={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(corpo)
    };
    return fetch(url+"/usuarios/login",op)
    .then((resposta)=>{
        if(!resposta.ok){
            throw new Error(`${resposta.status}`);
        }
        return resposta.json();
    })
    .then((token)=>{
        return token;
    })
    .catch((e)=>{
        throw e;
    });
}


export async function registerAPI(log,password,name,image){
    let corpo={
        login:log,
        senha:password,
        nome:name,
        img:image
    };
    let op={
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(corpo)
    };
    let requisition= await fetch(url+`/usuarios`,op);
    if(!requisition.ok){
        throw new Error("Erro de cadastro");
    }
    return true;

};