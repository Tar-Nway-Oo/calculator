import React from 'react'
import "../index.css";
import { ACTIONS } from '../App';

export default function OperatorButtons({operator, dispatch}) {
  return (
    <button className='btn operator' onClick={() => {
      dispatch(
        {
          type: ACTIONS.CHOOSE_OPERATOR,
          payload: {operator}
        }
      )
    }}>{operator}</button>
  )
}
