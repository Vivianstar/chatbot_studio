import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { XCircle } from "lucide-react";

const questions = [
  {
    question:
      "What is one of the challenges in moving an ML project from a standalone notebook to a production-grade data pipeline?",
    options: [
      "Choosing the right programming language",
      "Updating data over time",
      "Selecting the best hardware",
      "Designing the user interface",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Which of the following is NOT mentioned as a challenge in moving ML projects to production?",
    options: [
      "How to save, share and re-use ML features in the organization",
      "How to ensure a new model version respects quality standards",
      "Model governance",
      "How to design the most accurate ML algorithm",
    ],
    correctAnswer: 3,
  },
  {
    question: "What is MLOps?",
    options: [
      "A specific machine learning algorithm",
      "A set of standards, tools, processes and methodology to optimize ML projects",
      "A type of database for storing machine learning models",
      "A programming language for machine learning",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Which of the following teams is NOT mentioned as typically involved in ML projects?",
    options: [
      "Data Engineers",
      "Data Scientists",
      "ML Engineers",
      "UI/UX Designers",
    ],
    correctAnswer: 3,
  },
  {
    question: "What is one of the main goals of MLOps?",
    options: [
      "To create the most complex ML models possible",
      "To optimize time, efficiency and quality while ensuring governance in ML projects",
      "To replace human data scientists with automated systems",
      "To focus solely on model accuracy at the expense of all other factors",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "According to the text, what is Databricks uniquely positioned to solve?",
    options: [
      "Creating the most advanced ML algorithms",
      "Providing the cheapest cloud storage solutions",
      "Bringing Data Engineers, Data Scientists and ML Engineers together in a unique platform",
      "Developing new programming languages for ML",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "Which of the following is NOT mentioned as a step in the MLOps process walkthrough?",
    options: [
      "Preparing features",
      "Training a model for deployment",
      "Registering the model for its use to be governed",
      "Designing the user interface for the model",
    ],
    correctAnswer: 3,
  },
  {
    question:
      "What is the end result of the MLOps process described in the text?",
    options: [
      "A research paper on ML algorithms",
      "A model used to power a dashboard for downstream business stakeholders",
      "A new programming language for ML",
      "A hardware system for ML computations",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "What does the text suggest about the impact of silos between different teams involved in ML projects?",
    options: [
      "They speed up the project development",
      "They have no impact on the project",
      "They slow down projects and prevent them from being deployed in production",
      "They improve the quality of the final model",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "According to the text, what is one way the trained ML model can be used in the MLOps process?",
    options: [
      "As a replacement for human decision making",
      "As a pySpark UDF (User Defined Function)",
      "As a way to generate training data",
      "As a method to design new ML algorithms",
    ],
    correctAnswer: 1,
  },
];

const QuizDashboard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <Card className={`w-full max-w-4xl bg-purple-800 bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-2xl 
                        transition-all duration-500 ease-out ${fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        <CardHeader className="text-5xl font-bold text-center py-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
          Quiz Master
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto p-8">
          {!quizComplete ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-blue-200">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <div className="w-64 h-3 bg-purple-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ease-out"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-2xl font-semibold text-white mb-6">
                {questions[currentQuestion].question}
              </p>
              <RadioGroup
                value={selectedAnswer !== null ? selectedAnswer.toString() : null}
                onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                className="space-y-4"
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-200
                                ${showFeedback && index === questions[currentQuestion].correctAnswer
                                  ? "bg-green-600"
                                  : selectedAnswer === index
                                    ? "bg-blue-600"
                                    : "bg-purple-700 hover:bg-purple-600"}`}
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`q${currentQuestion}-o${index}`}
                      className="border-white"
                      disabled={showFeedback}
                    />
                    <Label
                      htmlFor={`q${currentQuestion}-o${index}`}
                      className="flex-grow cursor-pointer text-lg text-white"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Quiz Complete!
              </h3>
              <p className="text-2xl mb-6 text-white">
                Your score:{" "}
                <span className="font-bold text-green-400">{score}</span> out of{" "}
                {questions.length}
              </p>
            </div>
          )}
          {showFeedback && selectedAnswer !== questions[currentQuestion].correctAnswer && (
            <Alert className="mt-6 p-4 bg-red-900 border-red-500 border-2 rounded-xl">
              <AlertDescription className="flex items-center text-lg font-bold">
                <XCircle className="mr-2 text-red-500 h-6 w-6" />
                <span className="text-red-400">Incorrect. Try again!</span>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="bg-purple-900 p-6 border-t border-purple-700 rounded-b-3xl">
          {!quizComplete ? (
            showFeedback ? (
              <Button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                           text-white text-xl py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                           text-white text-xl py-3 rounded-xl transition-all duration-200 transform hover:scale-105 
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </Button>
            )
          ) : (
            <Button
              onClick={restartQuiz}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 
                         text-white text-xl py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              Restart Quiz
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizDashboard;
