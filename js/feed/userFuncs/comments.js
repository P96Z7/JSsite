import { commentTemplate } from "../../constants.js";
import { relacionateIdUser, relacionateIdimg } from "../../aux.js";
import { getId } from "../../auth.js";
import { UsersAPI ,delComment ,getComments, editComments} from "../../apiFunc.js";

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

        const editBtnComment=comment.querySelector('[data-field="edit-comment"]');
        const editTextComment=comment.querySelector('[data-field="editTextComment"]');

        editBtnComment.addEventListener("click", async (e) => {
            try{
                await exibeEdicao(editTextComment, id, postId, bodyApend);
            }
            catch(erro){
                console.log(erro);
            }
        });
        bodyApend.appendChild(comment);
    }
}

async function exibeEdicao(local, id, idPost, bodyAppend){
    let localChild = local.firstElementChild;
    let text = localChild.textContent;
    localChild.remove();
    
    let form = document.createElement("form");
    let textArea = document.createElement("textarea");
    textArea.innerText = text;
    textArea.required = true;
    textArea.classList.add("comment__input");

    let sendBtn = document.createElement("button");
    sendBtn.type = "submit";
    sendBtn.classList.add("btn");
    sendBtn.innerText = "Atualizar";

    let quebraLinha = document.createElement("br");

    form.append(textArea, quebraLinha, sendBtn);
    local.append(form);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        await editComments(textArea.value, id);
        await updateComments(idPost, bodyAppend);
    });
}