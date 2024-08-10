import React, { useEffect } from 'react';
import '../style/chatIcon.css';

const Chatbot = () => {
  useEffect(() => {
    // Load Dialogflow Messenger script
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="Zack Bot"
      agent-id="197f5887-8b10-424b-bdd1-7ef9f4c2a9a4"
      language-code="en"
      chat-icon ="https://cdn-icons-png.flaticon.com/512/6014/6014401.png"
    ></df-messenger>
  );
};

export default Chatbot;