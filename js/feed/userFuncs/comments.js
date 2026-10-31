import { commentTemplate } from "../../constants.js";
import { relacionateIdUser, relacionateIdimg } from "../../aux.js";
import { getId } from "../../auth.js";
import { UsersAPI ,delComment ,getComments} from "../../apiFunc.js";

const userId= await getId();
const usersIdList= await UsersAPI();

export async function updateComments(id, container) {
    const updatedComments = await getComments(id);
    await setComments(updatedComments, container, id);
}

export async function setComments(commitsList,bodyApend,postId){
    bodyApend.replaceChildren();
    for(let commit of commitsList){
        console.log(commit)
        const id=commit.id;
        let comment=commentTemplate.content.cloneNode(true);
        comment.querySelector('[data-field="comment-text"]').textContent=commit.texto;
        let authorComment=await relacionateIdUser(commit.usuario,usersIdList);
        let imgAuthorComment=await relacionateIdimg(commit.usuario,usersIdList);
        comment.querySelector('[data-field="comment-author"]').textContent=authorComment;
        
        
        if(imgAuthorComment && imgAuthorComment !== "null"){
            comment.querySelector('[data-field="comment-initials"]').remove();
            let img=comment.querySelector('[data-field="comment-avatar"]');
            img.src=imgAuthorComment;
            img.hidden=false;
        }
        else{
            if(authorComment){
            comment.querySelector('[data-field="comment-initials"]').textContent=`${authorComment[0]}`;
                }
        }
        if(commit.usuario==userId){
            comment.querySelector('[data-field="comment-actions"]').hidden=false;
        }
        
        
        
        const delbtnComment=comment.querySelector('[data-field="delete-comment"]');
        delbtnComment.addEventListener("click",async (e)=>{
            try{
                await delComment(commit.id);

                await updateComments(postId,bodyApend);
            }
            catch(erro){
                console.log(erro);
            }
        })

        bodyApend.appendChild(comment);
    }
}