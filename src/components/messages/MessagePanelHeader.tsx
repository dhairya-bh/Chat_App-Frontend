import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { selectConversationById } from '../../store/conversationSlice';
import { selectGroupById } from '../../store/groupSlice';
import { selectType } from '../../store/selectedSlice';
import { AuthContext } from '../../utils/context/AuthContext';
import { MessagePanelHeaderStyle } from '../../utils/styles';
import { PersonAdd } from 'akar-icons';

export const MessagePanelHeader = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const type = useSelector(selectType);
  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, id!)
  );
  const group = useSelector((state: RootState) =>
    selectGroupById(state, id!)
  );
  const displayName =
    user?.userId === conversation?.creator.userId
      ? `${conversation?.recipient.firstName} ${conversation?.recipient.lastName}`
      : `${conversation?.creator.firstName} ${conversation?.creator.lastName}`;
  const groupName = group?.title || 'Group';
  const headerTitle = type === 'group' ? groupName : displayName;

  return (
    <MessagePanelHeaderStyle>
      <div>
        <span>{headerTitle}</span>
      </div>
      {type === 'group' && <PersonAdd size={25} />}
    </MessagePanelHeaderStyle>
  );
};
