import { Message } from 'react-hook-form';

export type CreateUserParams = {
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

export type Conversation = {
  id: string;
  creator: User;
  recipient: User;
  createdAt: string;
  lastMessageSent: MessageType;
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
  conversation: Conversation;
};

export type GroupMessageType = {
  id: string;
  content: string;
  createdAt: string;
  author: User;
  group: Group;
};

export type FetchMessagePayload = {
  id: string;
  messages: MessageType[];
};

export type FetchGroupMessagePayload = {
  id: string;
  messages: GroupMessageType[];
};

export type MessageEventPayload = {
  message: MessageType;
  conversation: Conversation;
};

export type CreateMessageParams = {
  id:string;
  content: string;
};

export type ConversationMessage = {
  id: string;
  messages: MessageType[];
};

export type GroupMessage = {
  id: string;
  messages: GroupMessageType[];
};

export type DeleteMessageParams = {
  id: string;
  messageId: string;
};

export type DeleteGroupMessageParams = {
  id: string;
  messageId: string;
};

export type DeleteMessageResponse = {
  conversationId: string;
  messageId: string;
};

export type DeleteGroupMessageResponse = {
  groupId: string;
  messageId: string;
};

export type MessagePanelBodyProps = {
  isTyping: boolean;
};

export type EditMessagePayload = {
  id: string;
  messageId: string;
  content: string;
};

export type ConversationType = 'group' | 'private';

export type ConversationTypeData = {
  type: ConversationType;
  label: string;
};

export type Group = {
  id: string;
  title?: string;
  users: User[];
  creator: User;
  messages: GroupMessageType[];
  createdAt: number;
  lastMessageSent: MessageType;
  lastMessageSentAt: Date;
};

export type GroupMessageEventPayload = {
  message: GroupMessageType;
  group: Group;
};

export type CreateGroupParams = {
  users: string[];
  title: string;
};
