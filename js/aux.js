export function checkIfLiked(id,vector){
    for(let data of vector){
        if(data.id == id){
            return true 
        }
    }
    return false;
    
}