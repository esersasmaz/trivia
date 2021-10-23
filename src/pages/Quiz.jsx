import React, { useState } from "react";
import {store} from "../store/store";
import Header from "../components/Header";
import QuizItem from "../components/QuizItem";
import CorrectAnswer from "../components/CorrectAnswer";
import WrongAnswer from "../components/WrongAnswer";


const Quiz = () => {
  const [state, setState] = useState({value: "unanswered", points: 0, totalPoints: 0, seconds: 15});

  window.scrollTo(0, 0)
  return (
    <store.Consumer>
      {context => (
        <>
          <Header context={context} showBars={state.value === "unanswered"} state={state}/>
          {state.value === "unanswered" ? <QuizItem context={context} value={state}/> : (
          state.value === "correct" ? <CorrectAnswer context={context} value={state}/> : (
          state.value === "incorrect" ? <WrongAnswer context={context} value={state}/> : true))}
        </>
      )}
    </store.Consumer>
  );
}

export default Quiz;
