export function checkIfLiked(nome,vector){
    for(let data of vector){
        if(data.usuario == nome){
            return true 
        }
    }
    return false;
    
}


export function relacionateIdUser(id,vector){
    for(let dado of vector){
        if(dado.id == id){
            return dado.nome;
        }
    }
}

export function relacionateIdimg(id,vector){
    for(let dado of vector){
        if(dado.id == id){
            return dado.img;
        }
    }
}