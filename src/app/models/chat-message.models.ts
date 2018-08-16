export class ChatMessage{
    public $key?: string;

    constructor(
    public email?:string, //store user's email
    public userName?:string, // store user's name
    public message?:string, // store message
    public timeSent?: Date | number //time the message has been sent
    ) {}
}