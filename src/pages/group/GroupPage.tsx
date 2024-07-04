import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../../components/conversations/ConversationPanel';
import { ConversationSidebar } from '../../components/sidebars/ConversationSidebar';
import { AppDispatch } from '../../store';
import { addGroupMessage, deleteGroupMessage } from '../../store/groupMessageSlice';
import { addGroup, fetchGroupsThunk } from '../../store/groupSlice';
import { updateType } from '../../store/selectedSlice';
import { SocketContext } from '../../utils/context/SocketContext';
import { Group, GroupMessageEventPayload } from '../../utils/types';

export const GroupPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(updateType('group'));
    dispatch(fetchGroupsThunk());
  }, []);

  useEffect(() => {
    socket.on('onGroupMessage', (payload: GroupMessageEventPayload) => {
      const { group, message } = payload;
      dispatch(addGroupMessage(payload));
    });

    socket.on('onGroupCreate', (payload: Group) => {
      dispatch(addGroup(payload));
    });

    socket.on('onGroupMessageDelete',(payload) => {
      dispatch(deleteGroupMessage(payload));
  })

    return () => {
      socket.off('onGroupCreate');
      socket.off('onGroupMessage');
      socket.off('onGroupMessageDelete');
    };
  }, [id]);

  return (
    <>
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </>
  );
};