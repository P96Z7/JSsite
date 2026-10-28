import { getInfoPosts } from "../apiFunc.js";
import { cardFeed ,bodyFeed} from "../constants.js";
 

async function setFeed(){
    let pos;
    try{
       pos= await getInfoPosts();
    }catch(erro){
        return console.log(erro);
    }
    for(let post of pos){
        const clone=cardFeed.content.cloneNode(true);
        clone.querySelector('[data-field="initials"]').src = post.img;
        clone.querySelector('[data-field="author"]').textContent = post.usuario;
        clone.querySelector('[data-field="date"]').textContent = post.data;
        clone.querySelector('[data-field="text"]').textContent = post.texto;
        bodyFeed.appendChild(clone);
    }    
}

setFeed();