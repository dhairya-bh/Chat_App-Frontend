import { ConversationType, User } from './types';

export const getRecipientFromConversation = (
  conversation?: ConversationType,
  user?: User
) => {
  return user?.userId === conversation?.creator.userId
    ? conversation?.recipient
    : conversation?.creator;
};