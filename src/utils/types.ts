export type CreateUserDetails = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  };
  
  export type UserCredentialsParams = {
    email: string;
    password: string;
  };
  
  export type User = {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  
  export type ConversationType = {
    id: string;
    creator: User;
    recipient: User;
    createdAt: string;
    lastMessageSent : MessageType;
  };
  
  export type CreateConversationParams = {
    email: string;
    message: string;
  };
  
  export type MessageType = {
    id: string;
    content: string;
    createdAt: string;
    author: User;
    conversation: ConversationType;
  };
  
  export type FetchMessagePayload = {
    id: string;
    messages: MessageType[];
  };
  
  export type MessageEventPayload = {
    message: MessageType;
    conversation: ConversationType;
  };
  
  export type CreateMessageParams = {
    content: string;
  };
  
  export type ConversationMessage = {
    id: string;
    messages: MessageType[];
  };

  export type DeleteMessageParams = {
    conversationId: string;
    messageId: string;
  };

  export type DeleteMessageResponse = {
    conversationId: string;
    messageId: string;
  };

  export type MessagePanelBodyProps = {
    isTyping: boolean;
  };

  export type EditMessagePayload = {
    conversationId: string ;
    messageId: string;
    content: string;
  };