import { Conversation, User } from './types';

export const getRecipientFromConversation = (
  conversation?: Conversation,
  user?: User
) => {
  return user?.userId === conversation?.creator.userId
    ? conversation?.recipient
    : conversation?.creator;
};
