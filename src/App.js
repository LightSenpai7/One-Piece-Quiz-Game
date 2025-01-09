import './App.css';
import React, { useState, useEffect, useCallback } from 'react';

export default function App() {
	const questions = [
		{
			questionText: 'What is the name of Luffy\'s signature attack?',
			answerOptions: [
				{ answerText: 'Gomu Gomu no Pistol', isCorrect: true },
				{ answerText: 'Red Hawk', isCorrect: false },
				{ answerText: 'Bazooka', isCorrect: false },
				{ answerText: 'Gatling Gun', isCorrect: false },
			],
		},
		{
			questionText: 'Who gave Luffy his straw hat?',
			answerOptions: [
				{ answerText: 'Gol D. Roger', isCorrect: false },
				{ answerText: 'Shanks', isCorrect: true },
				{ answerText: 'Ace', isCorrect: false },
				{ answerText: 'Dragon', isCorrect: false },
			],
		},
		{
			questionText: 'What is the name of Nami\'s weapon?',
			answerOptions: [
				{ answerText: 'Weather Stick', isCorrect: false },
				{ answerText: 'Thunder Rod', isCorrect: false },
				{ answerText: 'Clima-Tact', isCorrect: true },
				{ answerText: 'Storm Staff', isCorrect: false },
			],
		},
		{
			questionText: 'What is the name of Sanji\'s dream?',
			answerOptions: [
				{ answerText: 'To become the Pirate King', isCorrect: false },
				{ answerText: 'To find the All Blue', isCorrect: true },
				{ answerText: 'To be the best swordsman', isCorrect: false },
				{ answerText: 'To draw a map of the world', isCorrect: false },
			],
		},
		{
			questionText: 'What is the highest bounty ever shown in One Piece?',
			answerOptions: [
				{ answerText: '5.6 Billion Berries (Dragon)', isCorrect: false },
				{ answerText: '5.046 Billion Berries (Luffy)', isCorrect: false },
				{ answerText: '8.1 Billion Berries (Roger)', isCorrect: false },
				{ answerText: '5.564 Billion Berries (Buggy)', isCorrect: true },
			],
		},
		{
			questionText: 'What was the first Devil Fruit shown in the series?',
			answerOptions: [
				{ answerText: 'Gomu Gomu no Mi', isCorrect: true },
				{ answerText: 'Bara Bara no Mi', isCorrect: false },
				{ answerText: 'Mera Mera no Mi', isCorrect: false },
				{ answerText: 'Hito Hito no Mi', isCorrect: false },
			],
		},
		{
			questionText: 'What is the name of Zoro\'s most powerful sword?',
			answerOptions: [
				{ answerText: 'Wado Ichimonji', isCorrect: false },
				{ answerText: 'Shusui', isCorrect: false },
				{ answerText: 'Enma', isCorrect: true },
				{ answerText: 'Sandai Kitetsu', isCorrect: false },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [fadeIn, setFadeIn] = useState(true);
	const [timer, setTimer] = useState(30);
	const [isTimerRunning, setIsTimerRunning] = useState(true);

	const handleTimeUp = useCallback(() => {
		if (!showScore) {
			const nextQuestion = currentQuestion + 1;
			setSelectedAnswer(null);
			setTimer(30);
			
			if (nextQuestion < questions.length) {
				setCurrentQuestion(nextQuestion);
			} else {
				setShowScore(true);
				setIsTimerRunning(false);
			}
		}
	}, [currentQuestion, showScore, questions.length]);

	useEffect(() => {
		if (isTimerRunning && timer > 0) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(interval);
		} else if (timer === 0) {
			handleTimeUp();
		}
	}, [timer, isTimerRunning, handleTimeUp]);

	const handleAnswerOptionClick = (isCorrect, index) => {
		setSelectedAnswer(index);
		setIsTimerRunning(false);
		
		setTimeout(() => {
			if (isCorrect) {
				setScore(score + 1);
			}

			const nextQuestion = currentQuestion + 1;
			setSelectedAnswer(null);
			setTimer(30);
			setFadeIn(false);
			
			setTimeout(() => {
				if (nextQuestion < questions.length) {
					setCurrentQuestion(nextQuestion);
					setIsTimerRunning(true);
					setFadeIn(true);
				} else {
					setShowScore(true);
				}
			}, 300);
		}, 1000);
	};

	const restartQuiz = () => {
		setCurrentQuestion(0);
		setShowScore(false);
		setScore(0);
		setSelectedAnswer(null);
		setTimer(30);
		setIsTimerRunning(true);
		setFadeIn(true);
	};

	const getScoreMessage = () => {
		const percentage = (score / questions.length) * 100;
		if (percentage === 100) return "Perfect! You're a true One Piece expert!";
		if (percentage >= 80) return "Great job! You know your One Piece well!";
		if (percentage >= 60) return "Not bad! Keep watching One Piece!";
		if (percentage >= 40) return "You might need to rewatch some episodes!";
		return "Time to start your One Piece journey!";
	};

	return (
		<div className='app'>
			<h1 className='title'>One Piece Quiz</h1>
			{showScore ? (
				<div className='score-section'>
					<div className='score-content'>
						<h2>Quiz Complete!</h2>
						<p className='score-text'>You scored {score} out of {questions.length}</p>
						<p className='score-message'>{getScoreMessage()}</p>
						<button className='restart-button' onClick={restartQuiz}>Play Again</button>
					</div>
				</div>
			) : (
				<>
					<div className={`question-section ${fadeIn ? 'fade-in' : 'fade-out'}`}>
						<div className='question-header'>
							<div className='question-count'>
								<span>Question {currentQuestion + 1}</span>/{questions.length}
							</div>
							<div className='timer'>
								Time left: {timer}s
							</div>
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption, index) => (
							<button
								key={index}
								className={`answer-button ${
									selectedAnswer === index
										? answerOption.isCorrect
											? 'correct'
											: 'incorrect'
										: ''
								}`}
								onClick={() => handleAnswerOptionClick(answerOption.isCorrect, index)}
								disabled={selectedAnswer !== null}
							>
								{answerOption.answerText}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}