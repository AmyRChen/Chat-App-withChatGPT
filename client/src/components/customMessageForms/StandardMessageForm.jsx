import React, { useState } from "react";
import MessageFormUI from "./MessageFormUI";

function StandardMessageForm({ props, activeChat }) {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const handleChange = (e) => setMessage(e.target.value);

  //includes attachment, sender's username, text and active chat ID.
  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    //Base on documentation of Chat Engine
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };
    props.onSubmit(form);
    setMessage("");
    setAttachment("");
  };

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default StandardMessageForm;
