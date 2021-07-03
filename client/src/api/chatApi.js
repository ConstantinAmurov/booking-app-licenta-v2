let subscribers = []

let ws = null;

const closeHandler = () =>{
    console.log("Close WS")
    setTimeout(()=>{
        createChannel();
    },3000);
}

const messageHandler = (e) =>{
    const parsedMessages = JSON.parse(e.data)
        subscribers.forEach(s => {
            if(s)
                s(parsedMessages)
        })
}

const createChannel =() =>{
    ws?.removeEventListener('close',closeHandler);
    ws?.close();
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    ws.addEventListener('close',closeHandler);
    ws.addEventListener('message',messageHandler);


}

export const chatApi = {
    start(){
        createChannel();
    },
    stop(){
        subscribers = [];
        ws.removeEventListener('close',closeHandler);
        ws.removeEventListener('message',messageHandler);
    },
    subscribe(callBack){

        subscribers.push(callBack)
    },
    unsubscribe(callBack){
        subscribers = subscribers.filter(s => s!== callBack);
    },
    sendMessage(message){
        
        ws?.send(message)
    },
}