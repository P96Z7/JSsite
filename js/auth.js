export function setToken(token) {
    sessionStorage.setItem("token", token);
}

export function getToken() {
    return sessionStorage.getItem("token");
}

export function logout() {
    sessionStorage.removeItem("token");
}

export function setUser(user) {
    sessionStorage.setItem("nome", user.nome);
    sessionStorage.setItem("img", user.img);
}

export function getUserInfos(){
    let dados=[sessionStorage.getItem("nome"),sessionStorage.getItem("img")];
    return dados;
    
}