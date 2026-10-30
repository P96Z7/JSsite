import { postForm,imgPost,txtPost} from "../../constants.js";
import { sendPost } from "../../apiFunc.js";
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