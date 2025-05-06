export interface Messages {
    id: number
    senderId: number
    senderUsername: string
    senderPhotoUrl: string
    recipientId: number
    recipientUsername: string
    recipientPhotoUrl: any
    content: string
    messageSent?: Date
    dateRead: Date
  }
  
  export class MessageParams {
    pageNumber=1;
    pageSize=5;
    username?:string;
    container:string='Unread'
    }