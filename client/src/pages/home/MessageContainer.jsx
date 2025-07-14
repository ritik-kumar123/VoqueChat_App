import { useEffect } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import SendMessage from "./SendMessage";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ recieverId: selectedUser?._id }));
    }
  }, [selectedUser]);

  return (
    <>
      {!selectedUser ? (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] px-4">
          <div className="  borderrounded-xl p-10 max-w-md w-full text-center ">
            <div className="text-5xl mb-4">💬</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Welcome to <span className="text-[#7480FF]">VoqueChat</span>
            </h2>
            <p className="text-white/80 text-base md:text-lg">
              Select a user from the sidebar to start chatting.
            </p>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full flex flex-col bg-[#111]">
          {/* Header with selected user info */}
          <div className="p-3 border-b border-white/10">
            <User userDetails={selectedUser} />
          </div>

          {/* Messages list */}
          <div className="h-full overflow-y-auto p-3 space-y-2">
            {messages?.map((messageDetails) => (
              <Message
                key={messageDetails?._id}
                messageDetails={messageDetails}
              />
            ))}
          </div>

          {/* Send message input */}
          <SendMessage />
        </div>
      )}
    </>
  );
};

export default MessageContainer;
