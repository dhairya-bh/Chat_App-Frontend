import { formatRelative } from 'date-fns';
import {
  MessageItemContainer,
  MessageItemAvatar,
  MessageItemDetails,
  MessageItemHeader,
  MessageItemContent,
} from '../../utils/styles';
import { User, MessageType } from '../../utils/types';
import { EditMessageContainer } from './EditMessageContainer';
import { Dispatch, SetStateAction } from 'react';

type FormattedMessageProps = {
  user?: User;
  message: MessageType;
  selectedEditMessage: MessageType | null;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  key: string;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormattedMessage: React.FC<FormattedMessageProps> = ({
  user,
  message,
  onContextMenu,
  isEditing,
  selectedEditMessage,
  setIsEditing,
  onEditMessageChange,
}) => {
  return (
    <MessageItemContainer onContextMenu={onContextMenu}>
      <MessageItemAvatar />
      <MessageItemDetails>
        <MessageItemHeader>
          <span
            className="authorName"
            style={{
              color: user?.userId === message.author.userId ? '#989898' : '#5E8BFF',
            }}
          >
            {message.author.firstName} {message.author.lastName}
          </span>
          <span className="time">
            {formatRelative(new Date(message.createdAt), new Date())}
          </span>
        </MessageItemHeader>
        {isEditing && message.id === selectedEditMessage?.id ? (
          <MessageItemContent padding="8px 0 0 0">
            <EditMessageContainer
              selectedEditMessage={selectedEditMessage}
              onEditMessageChange={onEditMessageChange}
              setIsEditing={setIsEditing}
            />
          </MessageItemContent>
        ) : (
          <MessageItemContent padding="8px 0 0 0">
            {message.content}
          </MessageItemContent>
        )}
      </MessageItemDetails>
    </MessageItemContainer>
  );
};