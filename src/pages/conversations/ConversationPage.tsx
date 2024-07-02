import { Outlet } from "react-router";
import { ConversationPanel } from "../../components/conversations/ConversationPanel";
import { ConversationSidebar } from "../../components/conversations/ConversationSidebar";
import { Page } from "../../utils/styles";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ConversationType, MessageEventPayload } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { addConversation, fetchConversationsThunk, updateConversation } from "../../store/conversationSlice";
import { SocketContext } from "../../utils/context/SocketContext";
import { addMessage, deleteMessage } from "../../store/messageSlice";

export const ConversationPage = () => {
    const {id} = useParams();
    const [conversations,setConversations] = useState<ConversationType[]>([])
    const dispatch = useDispatch<AppDispatch>();

    const socket = useContext(SocketContext);

    const conversationsState = useSelector(
      (state: RootState) => state.conversation.conversations
    );

    useEffect(() => {
      dispatch(fetchConversationsThunk());
    }, []);

    useEffect(() => {
      socket.on('onMessage', (payload: MessageEventPayload) => {
        console.log('Message Received');
        const { conversation, message } = payload;
        dispatch(addMessage(payload));
        dispatch(updateConversation(conversation));
      });
      socket.on('onConversation', (payload: ConversationType) => {
        console.log('Received onConversation Event');
        dispatch(addConversation(payload));
      });
      socket.on('onMessageDelete', (payload) => {
        console.log('Message Deleted');
        dispatch(deleteMessage(payload));
      });
      return () => {
        socket.off('onMessage');
        socket.off('onConversation');
        socket.off('onMessageDelete');
      };
    }, [id]);
    
  return (
    <Page>
      <ConversationSidebar conversations={conversations}/>
      {!id && <ConversationPanel />}
      <Outlet/>
    </Page>
  );
};