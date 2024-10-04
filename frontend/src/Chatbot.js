import React, { useState } from 'react';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const KEY = process.env.API_KEY;


const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    
   

    async function handleSendMessage() {
        
            // Adicionar a mensagem do usuário ao histórico
            setMessages([...messages, { from: 'user', text: inputMessage }]);

            // Enviar mensagem para a API do Gemini
            const genAI = new GoogleGenerativeAI(`${KEY}`);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = inputMessage;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const botResponse = response.text();
            console.log(botResponse);
            setMessages(prevMessages => [...prevMessages, { from: 'bot', text: botResponse }]);
        


        setInputMessage('');  // Limpar campo de input
    }


    return (
        <div className="chatbot-container">
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.from}`}>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
        </div>
    );
};

export default Chatbot;
