import axios, { AxiosRequestConfig } from "axios";
import {
  ConversationType,
  CreateConversationParams,
  CreateMessageParams,
  CreateUserDetails,
  DeleteMessageParams,
  DeleteMessageResponse,
  EditMessagePayload,
  FetchMessagePayload,
  MessageType,
  User,
  UserCredentialsParams,
} from "./types";

const API_URL = process.env.REACT_APP_BACKEND_URL;
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: CreateUserDetails) =>
  axios.post(`${API_URL}/auth/register`, data, config);

export const postLoginUser = (data: UserCredentialsParams) =>
  axios.post(`${API_URL}/auth/login`, data, config);

export const getAuthUser = () =>
  axios.get<User>(`${API_URL}/auth/status`, config);

export const getConversations = () =>
  axios.get<ConversationType[]>(`${API_URL}/conversations`, config);

export const getConversationMessages = (conversationId: string) =>
  axios.get<FetchMessagePayload>(
    `${API_URL}/conversations/${conversationId}/messages`,
    config
  );

export const postNewMessage = (
  conversationId: string,
  data: CreateMessageParams
) =>
  axios.post(
    `${API_URL}/conversations/${conversationId}/messages`,
    data,
    config
  );
export const postNewConversation = (data: CreateConversationParams) =>
  axios.post(`${API_URL}/conversations`, data, config);

export const deleteMessage = ({
  conversationId,
  messageId,
}: DeleteMessageParams) =>
  axios.delete<DeleteMessageResponse>(
    `${API_URL}/conversations/${conversationId}/messages/${messageId}`,
    config
  );

  export const editMessage = ({
    content,
    conversationId,
    messageId,
  }: EditMessagePayload) =>
    axios.patch<MessageType>(
      `${API_URL}/conversations/${conversationId}/messages/${messageId}`,
      { content },
      config
    );