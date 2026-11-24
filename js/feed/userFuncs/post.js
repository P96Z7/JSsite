import { postForm,imgPost,txtPost } from "../../constants.js";
import { sendPost, editPost } from "../../apiFunc.js";
import { setFeed } from "../getFeed.js"; 

postForm.addEventListener("submit",async (e)=>{
    e.preventDefault();
    try{
        await sendPost(txtPost.value,imgPost.value);
        txtPost.value="";
        imgPost.value="";
        setFeed();

    }
    catch(erro){
        console.error(erro);
    }
});

export function openPostEdition(idPost, postContent){
    const existingEditor = postContent.querySelector("textarea");
    if (existingEditor) {
        existingEditor.focus();
        return;
    }

    const text = postContent.querySelector('[data-field="text"]');
    const img = postContent.querySelector('[data-field="post-img"]');

    let editPostForm = document.createElement("form");
    let textArea = document.createElement("textarea");
    textArea.value = text.textContent;
    textArea.required = true;
    textArea.classList.add("field");

    let imageUrl = document.createElement("input");
    imageUrl.value = img.getAttribute("src") ?? "";
    imageUrl.type = "url";
    imageUrl.classList.add("field-url");

    let button = document.createElement("button");
    button.type = "submit";
    button.classList.add("btn");
    button.innerText = "Enviar";

    let br = document.createElement("br");

    editPostForm.append(textArea, br, imageUrl, button);
    postContent.replaceChildren(editPostForm);
    textArea.focus();

    editPostForm.addEventListener("submit", async(e) => {
        e.preventDefault();
        button.disabled = true;
        try {
            await editPost(textArea.value, imageUrl.value, idPost);
            setFeed();
        } catch (error) {
            console.error(error);
            button.disabled = false;
        }
    })
}
