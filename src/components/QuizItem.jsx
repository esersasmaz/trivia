import React, {useState} from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";


const Outer = styled.div`
.outer {
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .question-card {
    text-align: center;
    width: 550px;
    margin-top: 120px;
    padding: 15px;
    background-color: #1abc9c;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    @media (max-width: 768px) {
      width: 90%;
      margin-top: 60px;
    }
    @media (max-width: 414px) {
      width: 90%;
      margin-top: 30px;
    }
  }
  .choice-card {
    text-align: center;
    width: 550px;
    margin-top: 40px;
    padding: 15px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    cursor: pointer;
    @media (max-width: 768px) {
      width: 90%;
    }
    &:hover {
      background-color: #ecf0f1;
    }
  }
  & > .choice-card ~ .choice-card {
    margin-top: 20px;
  }
  .joker-button {
    padding: 10px 30px;
    margin-top: 30px;
    margin-bottom: 40px;
    border-radius: 5px;
    background-color:#ecf0f1;
    border-color: #ecf0f1;
  }
  }
`;

const QuizItem = props => {
  const { context, value } = props;
  const { dispatch } = context;
  const [answers, setAnswers] = useState();
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();

  let _answers;
  let correctAnswer;

  const shuffle=(array) =>{
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const answerGenerator = () => {
      let incorrectAnswers = context.state.data[context.state.questionNo - 1].incorrect_answers;
      correctAnswer = context.state.data[context.state.questionNo - 1].correct_answer;
      console.log('Help: Correct Answer ----> ',correctAnswer)
      const allOptions=[...incorrectAnswers,correctAnswer]
      const allShuffleOptions = shuffle(allOptions)
      _answers = [...allShuffleOptions];
  };
  if (!refresh) {
    answerGenerator();
  }

  const answerHandler = (choice) => {
    correctAnswer = context.state.data[context.state.questionNo - 1].correct_answer;
    dispatch({type: "countDown", countDown: false});
    if (choice === correctAnswer) {
      if (context.state.questionNo === 10) {
        history.push("/final");
      }
      value.value = "correct";
    } else {
      value.value = "incorrect";
    }
  };

  const useJoker = () => {
    while (true) {
      let answerIndex = _answers.indexOf(correctAnswer);
      let random = Math.floor(Math.random() * 4);
      if (answerIndex !== random) {
        _answers.splice(random, 1);
        break;
      }
    }
    while (true) {
      let answerIndex = _answers.indexOf(correctAnswer);
      let random = Math.floor(Math.random() * 3);
      if (answerIndex !== random) {
        _answers.splice(random, 1);
        break;
      }
    }
    setRefresh(true);
    setAnswers(_answers);
    context.state.isJokerUsed = true;
  };
  return (
    <Outer>
      <div className="outer">
        <div className="question-card">
          <p><strong>Question:</strong> {context.state.data[context.state.questionNo - 1].question}</p>
        </div>
        {!refresh && _answers.map(choice => {
          return (
          <div key={choice} onClick={() => answerHandler(choice)} className="choice-card">{choice}</div>
        )})}
        {refresh && answers.map(choice => (
          <div key={choice} onClick={() => answerHandler(choice)} className="choice-card">{choice}</div>
        ))}
        {!context.state.isJokerUsed && _answers.length !== 2 && (<button className="joker-button" onClick={useJoker}>50% Joker</button>)}
      </div>
    </Outer>
  )
};

export default QuizItem;