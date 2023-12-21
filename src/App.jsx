import React, { useReducer } from 'react'
import NumberButtons from './Components/NumberButtons';
import OperatorButtons from './Components/OperatorButtons';
import "./index.css";

export const ACTIONS = {
  ADD_NUMBER : "add-number",
  CHOOSE_OPERATOR: "choose-operator",
  EVALUATE: "evaluate",
  DELETE: "delete",
  CLEAR_ALL: "clear-all"
};

function reducer(state, {type, payload}) {
  switch (type) {

    case ACTIONS.ADD_NUMBER:
      if (state.currentOperand === "0" && payload.digit === "0") return state;
      if(payload.digit === "." && (state.currentOperand)?.includes(".")) return state;
      if (state.isEvaluated) return {...state, currentOperand: payload.digit, isEvaluated: false};
      return {...state, currentOperand: `${state.currentOperand || ""}${payload.digit}`};
    
    case ACTIONS.CHOOSE_OPERATOR:
      if (state.previousOperand == null && state.currentOperand == null) return state;
      if (state.previousOperand == null) return {...state, previousOperand: state.currentOperand, currentOperand: null, operator: payload.operator};
      if (state.currentOperand == null) return {...state, operator: payload.operator};
      return {...state, previousOperand: evaluate(state), currentOperand: null, operator: payload.operator};

    case ACTIONS.EVALUATE:
      if (state.previousOperand == null || state.currentOperand == null || state.operator == null) return state;
      return {...state, previousOperand: null, currentOperand: evaluate(state), operator: null, isEvaluated: true};

    case ACTIONS.DELETE:
      if (state.isEvaluated) return {...state, currentOperand: null, isEvaluated: false};
      if (state.currentOperand?.length === 1) return {...state, currentOperand: null};
      if (state.currentOperand == null && state.previousOperand == null) return state;
      if (state.currentOperand == null) return {...state, previousOperand: null, currentOperand: state.previousOperand, operator: null};
      return {...state, currentOperand: state.currentOperand.slice(0, -1)};

 
    case ACTIONS.CLEAR_ALL:
      return {};

  }
}

function evaluate({previousOperand, currentOperand, operator}) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return "";
  let evaluation;
      switch (operator) {
        case "+":
          evaluation = prev + curr;
          break;
        case "-":
          evaluation = prev - curr;
          break;
        case "*":
          evaluation = prev * curr;
          break;
        case "/":
          evaluation = prev / curr;
          break;
          default: 
           evaluation = "";
      }
    return evaluation.toString();
}


export default function App() {

  const [{previousOperand, currentOperand, operator}, dispatch] = useReducer(reducer, {});

  return(
    <div className='container'>
      <div className="output">
         <p>{previousOperand} {operator}</p>
         <p id='current'>{currentOperand}</p>
      </div>
      <div className="btn-group">
      <button className="btn span-2" onClick={() => {dispatch({type: ACTIONS.CLEAR_ALL})}}>AC</button>
      <button className="btn" onClick={() => {dispatch({type: ACTIONS.DELETE})}}>DEL</button>
      <OperatorButtons operator="/" dispatch={dispatch} />
      <NumberButtons digit="7" dispatch={dispatch} />
      <NumberButtons digit="8" dispatch={dispatch} />
      <NumberButtons digit="9" dispatch={dispatch} />
      <OperatorButtons operator="*" dispatch={dispatch} />
      <NumberButtons digit="4" dispatch={dispatch} />
      <NumberButtons digit="5" dispatch={dispatch} />
      <NumberButtons digit="6" dispatch={dispatch} />
      <OperatorButtons operator="-" dispatch={dispatch} />
      <NumberButtons digit="1" dispatch={dispatch} />
      <NumberButtons digit="2" dispatch={dispatch} />
      <NumberButtons digit="3" dispatch={dispatch} />
      <OperatorButtons operator="+" dispatch={dispatch} />
      <NumberButtons digit="0" dispatch={dispatch} />
      <NumberButtons digit="." dispatch={dispatch} />
      <button id="equal-btn" className="btn span-2" onClick={() => {dispatch({type: ACTIONS.EVALUATE})}}>=</button>
      </div>
    </div>
  )
}