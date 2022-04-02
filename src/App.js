import './App.css';
import React, { useState } from 'react';

export default function App() {
	const questions = [
		{
			questionText: '1. Chopper saved the crew from a/an?',
			answerOptions: [
				{ answerText: 'Enemy', isCorrect: false },
				{ answerText: 'Infection', isCorrect: false },
				{ answerText: 'Gigantic octopus', isCorrect: true },
				{ answerText: 'I dont know', isCorrect: false },
			],
		},
		{
			questionText: 'How many episodes of One Piece are there?',
			answerOptions: [
				{ answerText: '1013', isCorrect: true },
				{ answerText: '950', isCorrect: false },
				{ answerText: '1014', isCorrect: false },
				{ answerText: '1020', isCorrect: false },
			],
		},
		{
			questionText: 'Who idealizes Roger?',
			answerOptions: [
				{ answerText: 'Monkey D. Luffy', isCorrect: true },
				{ answerText: 'Shanks', isCorrect: false },
				{ answerText: 'Brook', isCorrect: false },
				{ answerText: 'Nico Robin', isCorrect: false },
			],
		},
		{
			questionText: 'Roronoa Zoro is known as:',
			answerOptions: [
				{ answerText: 'The best swordsman', isCorrect: true },
				{ answerText: 'The best swordsman', isCorrect: true },
				{ answerText: 'The best swordsman', isCorrect: true },
				{ answerText: 'The best swordsman', isCorrect: true },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}