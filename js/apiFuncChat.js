const urlChat="https://ifsp.trojahn.uk/chat/";

export async function getMessages(){
    let mensagens=await fetch(urlChat+"/mensagem");
    if(!mensagens.ok){
        throw new Error("Erro de requisição de mensagens");
    }
    let mensagensJSON= await mensagens.json();
    return mensagensJSON;
};

export async function sendMessage(message) {
    let sendMess= await fetch(urlChat+"/mensagem",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({texto:message})});
    if(!sendMess.ok){
        throw new Error("Erro de envio de msg");
    }
    return true;   
}

export async function updateMessage(message,id){
    let updateMess=await fetch(urlChat+`/messagem/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({texto:message}),
    })
    if(!updateMess.ok){
        throw new Error("Erro de update!");
    }
    return true;
}

export async function deleteMess(id) {
    let deleteMess=await fetch(urlChat+`/mensagem/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
    });

    if(!deleteMess.ok){
        throw new Error("Erro de remoção de mensagem");
    }
    return true;

    
}