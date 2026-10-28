import { getInfoPosts,getLikes,setLike} from "../apiFunc.js";
import { cardFeed ,bodyFeed, userName, imgUser, userHidden, logoutBtn} from "../constants.js";
import { getToken,getUserInfos as infos, logout, setToken} from "../auth.js";
import { checkIfLiked } from "../aux.js";
import { parseISO, formatDistanceToNow } from 'https://esm.sh/date-fns@4'
import { ptBR } from 'https://esm.sh/date-fns@4/locale'

async function setFeed(){
    let pos;
    try{
       pos= await getInfoPosts();
    }catch(erro){
        return console.log(erro);
    }
    userLayout();
    for(let post of pos){
        let id=post.id;
        const clone=cardFeed.content.cloneNode(true);
        clone.querySelector('[data-field="initials"]').src = post.img;
        clone.querySelector('[data-field="author"]').textContent = post.usuario;
        post.data = parseISO(post.data);
        post.data = formatDistanceToNow(post.data, {
            addSuffix: true,
            locale: ptBR
        });
        clone.querySelector('[data-field="date"]').textContent = post.data;
        clone.querySelector('[data-field="text"]').textContent = post.texto;
        let likesVector=await getLikes(id);
        let likeUnits = clone.querySelector('[data-field="like-units"]');
        likeUnits.textContent=likesVector.length;
        let likeButton= clone.querySelector('[data-field="like"]');
        //se ja estiver com o nome na lista , o like tem que ja estar curtido
        if(checkIfLiked(id,likesVector)){
            likeButton.classList.add("liked");
            likeButton.querySelector("svg").setAttribute("fill","currentColor");
        }
        likeButton.addEventListener("click", async(e)=>{
                await setLike(id, getToken());

                //seleciona o svg e se a classe liked ñ tiver add, adiciona
                const svg=likeButton.querySelector("svg");
                const liked = likeButton.classList.toggle("liked");
                
                // não da pra fazer likeUnits++
                const currentLikes=Number(likeUnits.textContent);
                likeUnits.textContent=liked?currentLikes+1:currentLikes-1;

                //svg(modelar o botão bonitim),se a classe estiver ativada , muda o atributo fill(resp pela cor) para none, ou currentcolor[liked é uma classe em css] 
                svg.setAttribute("fill", liked ? "currentColor" : "none");

        });        
        bodyFeed.appendChild(clone);
    }    
}

function userLayout(){
    let datas= infos();
    if(datas[1]!=""){
        imgUser.removeAttribute('hidden');
        imgUser.src=datas[1];
        userHidden.remove();

    }
    else{
        userHidden.innerText=datas[0][0]+datas[0][1];
    }
    userName.innerText='@'+datas[0];
    logoutBtn.addEventListener("click",()=>{
        logout();
        window.location.href = "../../index.html";
    })
}

setFeed();
