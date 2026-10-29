export function setToken(token) {
    sessionStorage.setItem("token", token);
}

export function getToken() {
    return sessionStorage.getItem("token");
}

export function logout() {
    sessionStorage.removeItem("token");
}

export function getId(){
    return sessionStorage.getItem("id");
}

export function setUser(user) {
    sessionStorage.setItem("nome", user.nome);
    sessionStorage.setItem("img", user.img);
    sessionStorage.setItem("id",user.id);
}

export function getUserInfos(){
    let dados=[sessionStorage.getItem("nome"),sessionStorage.getItem("img")];
    return dados;
    
}