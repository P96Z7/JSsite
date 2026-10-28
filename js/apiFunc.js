import { urlBase as url} from "./constants.js";


// ---> login
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


/// ----> register

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

/// --->Feed



export async function getInfoPosts(){
    let posts= await fetch(url+"/posts/");
    if(!posts.ok){
        throw new Error("Erro de requisição de posts");
    }
    let postsJSON = await posts.json();
    return postsJSON;
}


export async function checkUserLogin(token){
    let op = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    let user = await fetch(url+"/usuarios/check", op);
    if(!user.ok){
        throw new Error("Erro na checagem do usuário");
    }
    let userJSON = await user.json();
    return userJSON;
}

//---> Like

export async function getLikes(id){
    let allLikes= await fetch(url+`/posts/${id}/likes`);
    if(!allLikes.ok){
        throw new Error("Erro de requisição");
    }
    let likesJSON=allLikes.json();
    return likesJSON;
}

export async function setLike(id,userToken) {
    let allLikes= await fetch(url+`/posts/${id}/likes`,{
        method:"POST",
        headers:{
            "Authorization":`Bearer ${userToken}`,
            "Content-Type":"application/json"
        }
    });
    if(!allLikes.ok){
        throw new Error("Erro de ação[LIKE]");
    }
    return true;
}