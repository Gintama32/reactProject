import React from 'react';
import { useState } from 'react';
import './App.css';

// Define a list of questions and answers
const questions = [
  { question: "The Enlightened One?", answer: "Buddha" },
  { question: "King of Fruits?", answer: "Mango" },
  { question: "70% of our body is?", answer: "water" },
  { question: "The Red Planet?", answer: "Mars" },
  { question: "The fastest land animal?", answer: "Cheetah" },
  { question: "The tallest mountain in the world?", answer: "Everest" },
  { question: "The smallest continent?", answer: "Australia" },
  { question: "The largest mammal?", answer: "Blue Whale" },
  { question: "Inventor of the light bulb?", answer: "Edison" },
  { question: "The largest desert in the world?", answer: "Sahara" },
  { question: "The hardest natural substance?", answer: "Diamond" },
  { question: "The world's largest country by area?", answer: "Russia" },
  { question: "The longest river in the world?", answer: "Nile" },
  { question: "The currency of Japan?", answer: "Yen" },
  { question: "The chemical symbol for water?", answer: "H2O" }
];

export default function App() {
  const [word, setWord] = useState('');
  const [correct, setCorrect] = useState(true);
  const [left, setLeft] = useState('');
  const [chance, setChance] = useState(3);
  const [currentQuestion, setCurrentQuestion] = useState({});

  // Function to handle input changes
  function handleInput(event) {
    setWord(event.target.value);
  }

  // Function to check the answer
  function check() {
    if (word.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setCorrect(true);
      newQuestion(); // Load a new question if the answer is correct
    } else {
      setCorrect(false);
      if (chance <= 1) {
        // No more chances left
        setLeft('Game Over');
      } else {
        // Decrement chances and update the display
        setChance(chance - 1);
        updateLeftDisplay(chance - 1);
      }
    }
  }

  // Function to update the display of remaining chances
  function updateLeftDisplay(newChance) {
    if (newChance === 3) {
      setLeft('');
    } else if (newChance === 2) {
      setLeft('X');
    } else if (newChance === 1) {
      setLeft('XX');
    } else {
      setLeft('XXX');
    }
  }

  // Function to select a random question
  function newQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setWord(''); // Clear the input field
  }

  // Initialize a new question on component mount
  React.useEffect(() => {
    newQuestion();
  }, []);

  return (
    <>
      <h2>Guess the word!</h2>
      <div className="game">
        <h1 className="question">{currentQuestion.question}</h1>
        <input
          type="text"
          placeholder="Guess the word"
          value={word}
          onChange={handleInput}
        />
        <button onClick={check}>Check</button>
        <div className="tries">
          <p>{left}</p>
        </div>
        {!correct && chance > 0 && <p>Try again!</p>}
        {chance <= 0 && <p>{left}</p>}
      </div>
    </>
  );
}
