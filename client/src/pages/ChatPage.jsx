import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const ChatPage = () => {
  const { currentUser } = useAuth()
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const suggestions = [
    {
      title: 'Policy Information',
      items: [
        'Show my active policies',
        'When is my next premium due?',
        'What is my policy coverage?',
        'Download policy document',
      ],
    },
    {
      title: 'Claims',
      items: [
        'How to file a claim?',
        'Track my claim status',
        'Required documents for claim',
        'Claim settlement process',
      ],
    },
    {
      title: 'Support',
      items: [
        'Update my contact details',
        'Change nominee details',
        'Premium payment options',
        'Contact customer service',
      ],
    },
  ]

  const quickReplies = [
    'Compare Policies',
    'Renew Policy',
    'File a Claim',
    'Coverage Questions',
    'Premium Details',
    'Cancel Policy',
  ]

  useEffect(() => {
    setTimeout(() => {
      const initialMessages = [
        {
          id: 1,
          sender: 'assistant',
          text: `Hello ${currentUser?.name}, I'm your SmartLife AI assistant. How can I help you today?`,
          timestamp: new Date(),
        },
      ]
      setMessages(initialMessages)
    }, 1000)

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentUser])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatResponse = (responseText) => {
    if (!responseText) return '';
    const lines = responseText.split('\n').map(line => line.trim());
    const formattedLines = [];

    lines.forEach(line => {
      if (!line) return;
      if (line.startsWith('*')) {
        const cleanedLine = line.slice(1).trim();
        const keyValueMatch = cleanedLine.match(/^(.+?):\s*(.+)$/);

        if (keyValueMatch) {
          const key = keyValueMatch[1].trim();
          const value = keyValueMatch[2].trim();
          formattedLines.push(`<strong>${key}:</strong> ${value}`);
        } else {
          formattedLines.push(cleanedLine);
        }
      } else {
        formattedLines.push(line);
      }
    });

    return formattedLines.join('<br/><br/>');
  };

  const handleSendMessage = async (userMessage = inputValue) => {
    if (!userMessage.trim()) return;

    setInputValue('');
    setShowSuggestions(false);

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userMessage,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 6000); 

    try {
      const apiKey = 'zut_T3od_edjaomE2rOzYbWgR-0cfotUD6itpXjfaQ';
      const response = await fetch('https://api.vectara.io/v2/query', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ0NGE4NTA5LTM3MTUtNGUyYy1hNjZm...`,
        },
        body: JSON.stringify({
          query: userMessage,
          search: {
            corpora: [{
              corpus_key: apiKey,
              metadata_filter: '',
              lexical_interpolation: 0.005,
              custom_dimensions: {}
            }],
            offset: 0,
            limit: 25,
            context_configuration: {
              sentences_before: 2,
              sentences_after: 2,
              start_tag: '%START_SNIPPET%',
              end_tag: '%END_SNIPPET%'
            },
            reranker: { type: 'mmr', diversity_bias: 0 }
          },
          generation: {
            generation_preset_name: 'mockingbird-1.0-2024-07-16',
            max_used_search_results: 5,
            response_language: 'eng',
            enable_factual_consistency_score: true
          },
          save_history: true
        })
      });

      const data = await response.json();
      const summary = data.summary || 'Sorry, no relevant answer found.';
      const formattedResponse = formatResponse(summary);

      const botMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: formattedResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching bot reply:', error);
      const botMessage = {
        id: Date.now() + 2,
        sender: 'assistant',
        text: 'Oops! Something went wrong. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false); // Stop typing indicator
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-7.5rem)]">
      <div className="m-2">
        <h1 className="text-2xl font-bold text-white">Virtual Assistant</h1>
        <p className="text-gray-400">
          Your 24/7 AI assistant for all insurance queries
        </p>
      </div>

      <div className="flex flex-col flex-1 bg-dark-800 rounded-xl overflow-hidden border border-dark-700">
        {/* Chat header */}
        <div className="bg-dark-700 p-4 border-b border-dark-600">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary-500/20 flex items-center justify-center mr-3">
              <svg
                className="h-6 w-6 text-primary-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L9.5 14.5m3.75-11.729V3.104c0-.251.021-.499.061-.745M13.25 3.104c.251.023.501.05.75.082m-1.5-.082a24.301 24.301 0 00-4.5 0m0 0c.251.023.501.05.75.082M4.75 3.104c-.251.023-.501.05-.75.082m.75-.082c.251.023.501.05.75.082M2.25 8.184v5.715a2.25 2.25 0 001.591 2.153m0 0c.483.106.986.106 1.468 0M3.841 16.052A3.75 3.75 0 012.25 13.5v-5.25a2.25 2.25 0 01.09-.543m3.751 8.048a3.75 3.75 0 103.712.016M3.841 16.052A3.75 3.75 0 017.5 12.75v-8.5a2.25 2.25 0 012.25-2.25h5.5a2.25 2.25 0 012.25 2.25v8.5a3.75 3.75 0 103.712.016m0 0a3.75 3.75 0 01-7.5 0v-8.5a2.25 2.25 0 00-2.25-2.25h-5.5a2.25 2.25 0 00-2.25 2.25v8.5a3.75 3.75 0 01-3.751 3.75"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-medium text-white">SmartLife Assistant</h2>
              <p className="text-xs text-gray-400">AI-powered | Always online</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {/* Welcome suggestions */}
          {showSuggestions && messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            >
              {suggestions.map((category, idx) => (
                <div
                  key={category.title}
                  className="bg-dark-700 rounded-lg p-4 border border-dark-600"
                >
                  <h3 className="text-white font-medium mb-3">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <button
                          onClick={() => handleSendMessage(item)}
                          className="text-sm text-gray-300 hover:text-white hover:bg-dark-600 w-full text-left px-3 py-2 rounded-lg transition-colors"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                  {message.sender === 'assistant' && (
                  <div className="h-8 w-8 rounded-full bg-primary-500/20 flex items-center justify-center mr-2 mt-1">
                    <svg
                      className="h-5 w-5 text-primary-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L9.5 14.5m3.75-11.729V3.104c0-.251.021-.499.061-.745M13.25 3.104c.251.023.501.05.75.082m-1.5-.082a24.301 24.301 0 00-4.5 0m0 0c.251.023.501.05.75.082M4.75 3.104c-.251.023-.501.05-.75.082m.75-.082c.251.023.501.05.75.082M2.25 8.184v5.715a2.25 2.25 0 001.591 2.153m0 0c.483.106.986.106 1.468 0M3.841 16.052A3.75 3.75 0 012.25 13.5v-5.25a2.25 2.25 0 01.09-.543m3.751 8.048a3.75 3.75 0 103.712.016M3.841 16.052A3.75 3.75 0 017.5 12.75v-8.5a2.25 2.25 0 012.25-2.25h5.5a2.25 2.25 0 012.25 2.25v8.5a3.75 3.75 0 103.712.016m0 0a3.75 3.75 0 01-7.5 0v-8.5a2.25 2.25 0 00-2.25-2.25h-5.5a2.25 2.25 0 00-2.25 2.25v8.5a3.75 3.75 0 01-3.751 3.75"
                      />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-xs sm:max-w-md rounded-lg px-4 py-2 ${message.sender === 'user' ? 'bg-primary-500 text-white' : 'bg-dark-700 text-gray-200'}`}
                >
                  {message.sender === 'assistant' ? (
                    <p dangerouslySetInnerHTML={{ __html: message.text }} />
                  ) : (
                    <p>{message.text}</p>
                  )}
                  <div
                    className={`text-xs mt-1 ${message.sender === 'user'
                        ? 'text-primary-200'
                        : 'text-gray-400'
                      }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>

                {message.sender === 'user' && (
                  <div className="h-8 w-8 rounded-full overflow-hidden ml-2 mt-1">
                    <img
                      src={currentUser?.profilePicture}
                      alt="User"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex mb-4 justify-start"
              >
                <div className="h-8 w-8 rounded-full bg-primary-500/20 flex items-center justify-center mr-2">
                  <svg
                    className="h-5 w-5 text-primary-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L9.5 14.5m3.75-11.729V3.104c0-.251.021-.499.061-.745M13.25 3.104c.251.023.501.05.75.082m-1.5-.082a24.301 24.301 0 00-4.5 0m0 0c.251.023.501.05.75.082M4.75 3.104c-.251.023-.501.05-.75.082m.75-.082c.251.023.501.05.75.082M2.25 8.184v5.715a2.25 2.25 0 001.591 2.153m0 0c.483.106.986.106 1.468 0M3.841 16.052A3.75 3.75 0 012.25 13.5v-5.25a2.25 2.25 0 01.09-.543m3.751 8.048a3.75 3.75 0 103.712.016M3.841 16.052A3.75 3.75 0 017.5 12.75v-8.5a2.25 2.25 0 012.25-2.25h5.5a2.25 2.25 0 012.25 2.25v8.5a3.75 3.75 0 103.712.016m0 0a3.75 3.75 0 01-7.5 0v-8.5a2.25 2.25 0 00-2.25-2.25h-5.5a2.25 2.25 0 00-2.25 2.25v8.5a3.75 3.75 0 01-3.751 3.75"
                    />
                  </svg>
                </div>
                <div className="bg-dark-700 rounded-lg px-4 py-2 text-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>

        {/* Quick replies */}
        {messages.length > 0 && (
          <div className="px-4 py-3 border-t border-dark-600 bg-dark-800 overflow-x-auto flex space-x-2 no-scrollbar">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSendMessage(reply)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-dark-700 hover:bg-dark-600 text-sm text-gray-300 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="px-4 py-3 border-t border-dark-600 bg-dark-700">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex items-center space-x-2"
          >
            <button
              type="button"
              className="text-gray-400 hover:text-gray-300"
              title="Attach files"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>

            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-dark-600 border border-dark-500 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={`rounded-full p-2 ${inputValue.trim() && !isTyping
                  ? 'bg-primary-500 hover:bg-primary-600 text-white'
                  : 'bg-dark-600 text-gray-500 cursor-not-allowed'
                }`}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatPage;