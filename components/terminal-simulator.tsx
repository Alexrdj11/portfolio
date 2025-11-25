"use client"

import { hi } from 'date-fns/locale'
import { useState, useEffect, useRef } from 'react'

// ========================================
//  MEMORY GAME
// ========================================

const COLORS = ['RED', 'GREEN', 'BLUE', 'YELLOW', 'PURPLE', 'CYAN']
const GAME_TIME = 10 // seconds

// ========================================
//  TERMINAL !
// ========================================

const TERMINAL_CONFIG = {
  username: "harsha",
  hostname: "jain",
  welcomeMessage: "Welcome! Type 'help' to see available commands.",
  
  // Add your custom commands and responses here
  commands: {
    help: {
      description: "Show available commands",
      execute: () => `Available commands:
  hi          - say hi to me
  hey         - just another version of hi
  help        - Show this help message
  about       - Learn about me
  skills      - View my technical skills
  projects    - See my projects
  contact     - Get contact information
  joke        - Get a random harsha joke
  secret      - Find a hidden message
  clear       - Clear the terminal
  fsociety    - Enter fsociety
  hack        - Hack the mainframe 
  coffee      - Buy me a coffee?`
    },
    hi: {
      description: "say hi to me",
      execute: () => `heyy wassup, its Harsha here!!! type help to know more`
},
    about: {
      description: "Learn about me",
      execute: () => `Hey there! 
I'm Harsha Jain, a Final-Year Engineering student at ATMECE mysore, majoring in Artificial Intelligence & Machine Learning, but lately my focus is towards Java-FullStack development.
I believe computer Science is not just about building systems, but about crafting ideas and into reality through code.
The curiosity that drives me are the endless possibilities of technology and its power to transform lives, learning new technologies and creating innovative things that challenge me to think differently.`
   
},
    hey: {
      description: "just another version of hi",
      execute: () => `heyy wassup buddy, its Harsha here!!! type help to know more`
},
    skills: {
      description: "View technical skills",
      execute: () => ` Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Programming Languages: Java, Python, SQL, HTML, CSS, typeScript
• Frameworks: Spring Boot, JDBC
• Databases/Cloud: MySQL, MongoDB, Firebase
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    },
    
    projects: {
      description: "See projects",
      execute: () => ` Featured Projects:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. XP, track your expenses and manage your budget with XP
2. PGFlow, an automated system to streamline monitoring and managing tenant payments in paying guest accommodations, reducing manual effort and errors.
3. DDoS attack detection using Federated Learning
4. Melanocytic Nevi Diagnosis using Transfer Learning, a web app that uses deep learning models to classify skin lesions with high accuracy.
5. Astroventure - Space Quiz Game, A fun space-themed interactive quiz game i vibe coded in my free time, have fun!!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type 'navigate projects' to see more!`
    },
    
    contact: {
      description: "Get contact info",
      execute: () => ` Let's Connect!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email:    harshahjain4@gmail.com
LinkedIn: linkedin.com/in/harsha-jain-469377253
GitHub:   github.com/Alexrdj11
Twitter:  x.com/Alex64914127
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    },
    
    joke: {
      description: "Get a harsha joke",
      execute: () => {
        const jokes = [
          "Why do programmers prefer dark mode?\nBecause light attracts bugs! hehe",
          "How many programmers does it take to change a light bulb?\nNone, that's a hardware problem! ",
          "Why do Java developers wear glasses?\nBecause they don't C#! ",
          "What's a programmer's favorite hangout?\nThe Foo Bar! ",
          "Why did the programmer quit?\nBecause they didn't get arrays! ",
          "A SQL query walks into a bar, walks up to two tables and asks...\n'Can I JOIN you?' "
        ]
        return jokes[Math.floor(Math.random() * jokes.length)]
      }
    },
    
    secret: {
      description: "???",
      execute: () => `🎮 Did you know you could play a game in this terminal?

Don't tell Harsha... 🤫

Type 'game' to play Memory Challenge!`
    },
    
    game: {
      description: "Play Memory Challenge game",
      execute: () => "START_MEMORY_GAME"
    },
    
    fsociety: {
      description: "Enter fsociety",
      execute: () => `
███████╗███████╗ ██████╗  ██████╗██╗███████╗████████╗██╗   ██╗
██╔════╝██╔════╝██╔═══██╗██╔════╝██║██╔════╝╚══██╔══╝╚██╗ ██╔╝
█████╗  ███████╗██║   ██║██║     ██║█████╗     ██║    ╚████╔╝ 
██╔══╝  ╚════██║██║   ██║██║     ██║██╔══╝     ██║     ╚██╔╝  
██║     ███████║╚██████╔╝╚██████╗██║███████╗   ██║      ██║   
╚═╝     ╚══════╝ ╚═════╝  ╚═════╝╚═╝╚══════╝   ╚═╝      ╚═╝   

Hello, friend.
[✓] Initializing exploit framework...
[✓] Loading attack vectors...
[✓] Bypassing authentication protocols...
[✓] Access granted.

Welcome to fsociety.
"Control is an illusion." - Mr. Robot`
    },

    
    hack: {
      description: "Hack the mainframe",
      execute: () => {
        const steps = [
          " INITIALIZING HACK PROTOCOL...",
          "",
          "[████░░░░░░░░░░░░░░░░] 20% - Scanning network ports...",
          "[███████░░░░░░░░░░░░░] 35% - Found vulnerability in firewall...",
          "[████████████░░░░░░░░] 60% - Injecting malicious payload...",
          "[██████████████████░░] 90% - Establishing backdoor connection...",
          "[████████████████████] 100% - BREACH SUCCESSFUL!",
          "",
          "ACCESS GRANTED",
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "System: MAINFRAME-ALPHA-7",
          "Security Level: MAXIMUM",
          "Status: COMPROMISED",
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "",
          "Just kidding! ",
          "This is just a portfolio site.",
          "No actual hacking here, just some cool ASCII art!",
          "",
          "- Harsha "
        ]
        return steps.join('\n')
      }
    },
    
    coffee: {
      description: "Buy me a coffee",
      execute: () => `Coffee Time!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Thanks for considering! I run on coffee and code.
https://buymeacoffee.com/harsha_jain
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    },
    
    clear: {
      description: "Clear terminal",
      execute: () => "CLEAR_TERMINAL"
    }
  }
}

// ========================================
// Terminal Component (Edit with caution)
// ========================================

interface HistoryLine {
  type: 'command' | 'output' | 'error'
  content: string
  isTyping?: boolean
}

function TypingText({ text, className, onComplete }: { text: string, className: string, onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 5) // Adjust speed here (lower = faster)
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, onComplete])

  return <div className={className}>{displayedText}<span className="animate-pulse">▋</span></div>
}

export function TerminalSimulator() {
  const [history, setHistory] = useState<HistoryLine[]>([
    { type: 'output', content: TERMINAL_CONFIG.welcomeMessage }
  ])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isPlayingGame, setIsPlayingGame] = useState(false)
  const [sequence, setSequence] = useState<string[]>([])
  const [userInput, setUserInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [gamePhase, setGamePhase] = useState<'memorize' | 'input' | 'success' | 'failed'>('memorize')
  const [score, setScore] = useState(0)
  const [isTypingOutput, setIsTypingOutput] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const gameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Memory game logic
  const generateSequence = () => {
    const length = Math.min(3 + Math.floor(score / 2), 6)
    const newSequence = Array.from({ length }, () => COLORS[Math.floor(Math.random() * COLORS.length)])
    return newSequence
  }

  const startNewRound = () => {
    const newSeq = generateSequence()
    setSequence(newSeq)
    setUserInput('')
    setTimeLeft(GAME_TIME)
    setGamePhase('memorize')
    
    setTimeout(() => {
      setGamePhase('input')
      gameInputRef.current?.focus()
    }, 3000)
  }

  const resetGame = () => {
    setScore(0)
    startNewRound()
  }

  useEffect(() => {
    if (!isPlayingGame || gamePhase !== 'input') return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGamePhase('failed')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlayingGame, gamePhase])

  const handleGameInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const userAnswer = userInput.trim().toUpperCase().split(/\s+/)
      const correctAnswer = [...sequence].reverse()
      
      if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
        setScore(prev => prev + 1)
        setGamePhase('success')
        setTimeout(() => startNewRound(), 2000)
      } else {
        setGamePhase('failed')
      }
    }
  }

  const handleGameKeyDown = (e: React.KeyboardEvent) => {
    if (!isPlayingGame) return

    if (e.key === 'Escape' || e.key.toLowerCase() === 'q') {
      setIsPlayingGame(false)
      setHistory(prev => [...prev, { type: 'output', content: `Game Over! Final Score: ${score}` }])
      return
    }

    if (gamePhase === 'failed' && e.key === 'r') {
      resetGame()
      return
    }
  }

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    
    if (!trimmedCmd) return

    setHistory(prev => [...prev, { 
      type: 'command', 
      content: `${TERMINAL_CONFIG.username}@${TERMINAL_CONFIG.hostname}:~$ ${cmd}` 
    }])

    setCommandHistory(prev => [...prev, cmd])
    setHistoryIndex(-1)

    if (trimmedCmd === 'clear') {
      setHistory([])
      return
    }

    if (trimmedCmd === 'game') {
      setIsPlayingGame(true)
      resetGame()
      return
    }

    if (trimmedCmd.startsWith('navigate ')) {
      const page = trimmedCmd.split(' ')[1]
      setHistory(prev => [...prev, { 
        type: 'output', 
        content: `Navigating to /${page}...`,
        isTyping: true
      }])
      setTimeout(() => {
        window.location.href = `/${page}`
      }, 500)
      return
    }

    const command = TERMINAL_CONFIG.commands[trimmedCmd as keyof typeof TERMINAL_CONFIG.commands]
    
    if (command) {
      const output = command.execute()
      if (output === "CLEAR_TERMINAL") {
        setHistory([])
      } else if (output === "START_MEMORY_GAME") {
        setIsPlayingGame(true)
        resetGame()
      } else {
        setIsTypingOutput(true)
        setHistory(prev => [...prev, { type: 'output', content: output, isTyping: true }])
      }
    } else {
      setHistory(prev => [...prev, { 
        type: 'error', 
        content: `Command not found: ${trimmedCmd}\nType 'help' for available commands.`,
        isTyping: true
      }])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex)
          setInput(commandHistory[commandHistory.length - 1 - newIndex])
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  return (
    <div 
      className="w-full h-full bg-black/90 backdrop-blur-sm rounded-2xl border border-green-500/30 shadow-2xl shadow-green-500/20 overflow-hidden font-mono text-sm"
      onClick={() => !isPlayingGame && inputRef.current?.focus()}
      onKeyDown={handleGameKeyDown}
      tabIndex={0}
    >
      {/* Terminal Header */}
      <div className="bg-gray-900 border-b border-green-500/30 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-green-400 text-xs ml-2">
          {isPlayingGame ? '🧠 MEMORY CHALLENGE' : `${TERMINAL_CONFIG.username}@${TERMINAL_CONFIG.hostname} ~ terminal`}
        </span>
      </div>

      {/* Memory Game */}
      {isPlayingGame && (
        <div className="p-6 h-[calc(100%-40px)] flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <div className="text-3xl mb-2">🧠 MEMORY CHALLENGE 🧠</div>
              <div className="text-xl text-green-400 mb-2">Score: {score}</div>
              <div className="text-sm text-gray-400">
                ESC or Q to quit
              </div>
            </div>

            {gamePhase === 'memorize' && (
              <div className="text-center">
                <div className="text-2xl text-yellow-400 mb-6 animate-pulse">
                  MEMORIZE THIS SEQUENCE!
                </div>
                <div className="flex justify-center gap-4 mb-6">
                  {sequence.map((color, i) => (
                    <div
                      key={i}
                      className="px-8 py-4 text-2xl font-bold rounded animate-pulse"
                      style={{
                        backgroundColor: color.toLowerCase(),
                        color: 'white',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                      }}
                    >
                      {color}
                    </div>
                  ))}
                </div>
                <div className="text-xl text-gray-400">
                  Get ready to type it BACKWARD...
                </div>
              </div>
            )}

            {gamePhase === 'input' && (
              <div className="text-center">
                <div className="text-2xl mb-4">
                  ⏱️ Time Left: <span className="text-red-400 font-bold">{timeLeft}s</span>
                </div>
                <div className="text-xl text-cyan-400 mb-4">
                  Type the sequence BACKWARD:
                </div>
                <input
                  ref={gameInputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleGameInput}
                  className="w-full bg-black/50 border-2 border-green-500/50 text-green-400 text-2xl px-4 py-3 text-center uppercase focus:outline-none focus:border-green-400"
                  placeholder="Type colors separated by space..."
                  autoFocus
                />
                <div className="text-sm text-gray-500 mt-2">
                  Example: BLUE RED GREEN
                </div>
              </div>
            )}

            {gamePhase === 'success' && (
              <div className="text-center">
                <div className="text-4xl text-green-400 mb-4 animate-bounce">
                  ✅ CORRECT! 🎉
                </div>
                <div className="text-xl text-white">
                  Great memory! Next round incoming...
                </div>
              </div>
            )}

            {gamePhase === 'failed' && (
              <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse">
                  💥 BOOM! 💥
                </div>
                <pre className="text-red-400 text-sm mb-4">
{`
    ⢀⣀⣀⣀⣀⣀⣀⣀⣀⣀⡀
    ⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇    
    ⢸⠀⠀💥 BOOM! 💥⠀⠀⡇
    ⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇
    ⠈⠉⠉⠉⠉⠉⠉⠉⠉⠉⠁
`}
                </pre>
                <div className="text-xl text-white mb-2">
                  Wrong sequence or time's up!
                </div>
                <div className="text-lg text-gray-400 mb-4">
                  Correct answer: {[...sequence].reverse().join(' ')}
                </div>
                <div className="text-lg text-green-400 mb-2">
                  Final Score: {score}
                </div>
                <div className="text-sm text-gray-400">
                  Press R to play again
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Terminal Content */}
      {!isPlayingGame && (
        <div 
          ref={terminalRef}
          className="p-4 h-[calc(100%-40px)] overflow-y-auto custom-scrollbar"
        >
        {history.map((line, index) => (
          <div key={index} className="mb-1">
            {line.type === 'command' && (
              <div className="text-green-400">{line.content}</div>
            )}
            {line.type === 'output' && line.isTyping && (
              <TypingText 
                text={line.content} 
                className="text-gray-300 whitespace-pre-wrap"
                onComplete={() => setIsTypingOutput(false)}
              />
            )}
            {line.type === 'output' && !line.isTyping && (
              <div className="text-gray-300 whitespace-pre-wrap">{line.content}</div>
            )}
            {line.type === 'error' && line.isTyping && (
              <TypingText 
                text={line.content} 
                className="text-red-400 whitespace-pre-wrap"
                onComplete={() => setIsTypingOutput(false)}
              />
            )}
            {line.type === 'error' && !line.isTyping && (
              <div className="text-red-400 whitespace-pre-wrap">{line.content}</div>
            )}
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-center gap-2 text-green-400">
          <span>{TERMINAL_CONFIG.username}@{TERMINAL_CONFIG.hostname}:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-300 caret-green-400"
            autoFocus
            spellCheck={false}
            disabled={isTypingOutput}
          />
        </div>
      </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.5);
        }
      `}</style>
    </div>
  )
}
