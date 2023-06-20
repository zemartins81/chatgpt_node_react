import {useState} from "react";

import './styles/App.css';
import './styles/reset.css';

import {makeRequest} from "./api/api";
import {SideMenu} from "./components/SideMenu/SideMenu";
import {ChatMessage} from "./components/ChatMessage/ChatMessage";
function App() {

    const [input, setInput] = useState('');
    const [chatLog, setChatLog] = useState([{
        user: 'gpt',
        message: "Como posso ajudar?"
    }]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let result;
        try {
            const data = await makeRequest({prompt: input});
            result = data.split('\n').map(line => <p>{line}</p>);
        } catch (error) {
            console.log(error);
        }

        setChatLog([
            ...chatLog,
            {
                user: 'me',
                message: `${input}`
            },
            {
                user: 'gpt',
                message: result
            }
        ])

        setInput("")
    }

    return (
        <div className="App">
            <SideMenu/>
            <section className="chatbox">
                <div className="chat-log">
                    {chatLog.map((message, index) => (
                        <ChatMessage key={index} message={message}/>
                    ))}
                </div>
                <div className="chat-footer">
                <div className="chat-input-holder">
                    <form onSubmit={handleSubmit}>
                        <input
                            rows='1'
                            className='chat-input-textarea'
                            value={input}
                            onChange={e => setInput(e.target.value)}
                        />
                    </form>
                </div>
                </div>
            </section>
        </div>
    );
}





export default App;
