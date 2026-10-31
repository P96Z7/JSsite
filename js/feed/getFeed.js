import { deletePost, getComments, getInfoPosts,getLikes,sendComment,setLike , UsersAPI} from "../apiFunc.js";
import { cardFeed ,bodyFeed, userName, imgUser, userHidden, logoutBtn} from "../constants.js";
import { getId,getUserInfos as infos, logout, setToken} from "../auth.js";
import { setComments, updateComments } from "./userFuncs/comments.js";
import { checkIfLiked , relacionateIdimg, relacionateIdUser } from "../aux.js";
import { parseISO, formatDistanceToNow } from 'https://esm.sh/date-fns@4'
import { ptBR } from 'https://esm.sh/date-fns@4/locale'

const userId=await getId();
const usersIdList= await UsersAPI();

export function setFeed(){
    bodyFeed.replaceChildren();
    setUserLayout();
    getCardPosts();
}    
async function getCardPosts(){
    let pos;
    try{
       pos= await getInfoPosts();
    }catch(erro){
        return console.log("Erro de servidor :"+ erro);
    }
    pos.reverse();
    for(let post of pos){
        let id=post.id;
        const clone=cardFeed.content.cloneNode(true);
        //variables
        const comentsLocal=clone.querySelector('[data-field="comments-list"]')
        let likesVector=await getLikes(id);
        let likeUnits = clone.querySelector('[data-field="like-units"]');
        const likeButton= clone.querySelector('[data-field="like"]');
        const nameAuthorPost=await relacionateIdUser(post.usuario,usersIdList);
        const imgAuthorPost=await relacionateIdimg(post.usuario,usersIdList);
        let postActions=clone.querySelector('[data-field="post-actions"]');
        const delBtn=clone.querySelector('[data-field="deleteBtn"]');
        const editBtn=clone.querySelector('[data-field="editBtn"]');
        const myComment=clone.querySelector('[data-field="comment-input"]');
        //commit fase
        const commitsList=await getComments(id);
        setComments(commitsList,comentsLocal,id);
        //mostrar botões de editar e excluir caso seja meu post;
        
        const sendCommentForm=clone.querySelector('[data-field="comment-form"]');
        sendCommentForm.addEventListener("submit",async (e)=>{
            e.preventDefault();
            try{
                await sendComment(myComment.value,id);
                await updateComments(id,comentsLocal);
                myComment.value="";
            }catch(erro){
                console.log(e);

            }
        })



        //mostra as opções se o usuario for o dono do post
        if(String(post.usuario)===String(userId)){
            postActions.hidden=false;
        }

        //adiciona img e remove o initials
        if(imgAuthorPost && imgAuthorPost !== "null"){
            let imgAvatar=clone.querySelector('[data-field="post-avatar"]');
            imgAvatar.src=imgAuthorPost;
            imgAvatar.hidden=false;    
            clone.querySelector('[data-field="post-initials"]').remove();
        }
        else{
            clone.querySelector('[data-field="post-initials"]').textContent=`${nameAuthorPost[0]}`;
        }
        clone.querySelector('[data-field="author"]').textContent = "@"+nameAuthorPost;
        
        
        //arruma o tempo de publicação
        post.data = parseISO(post.data);
        post.data = formatDistanceToNow(post.data, {
            addSuffix: true,
            locale: ptBR
        });

        clone.querySelector('[data-field="date"]').textContent = post.data;
        clone.querySelector('[data-field="text"]').textContent=post.texto;
        likeUnits.textContent=likesVector.length;
        if(post.img!=null){
            clone.querySelector('[data-field="post-img"]').src=post.img;
            clone.querySelector('[data-field="post-img"]').hidden=false;
        }
        
        //se ja estiver com o nome na lista , o like tem que ja estar curtido 
        if(checkIfLiked(userId,likesVector)){
            likeButton.classList.add("liked");
            likeButton.querySelector("svg").setAttribute("fill","currentColor");
        }

        delBtn.addEventListener("click",async ()=>{
            await deletePost(id);
            setFeed();
        })

        likeButton.addEventListener("click", async(e)=>{
                await setLike(id);
    
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

function setUserLayout(){
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
        window.location.href = "../index.html";
    });
}

setFeed();
