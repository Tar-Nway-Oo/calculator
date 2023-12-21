import React from 'react'
import "../index.css";
import { ACTIONS } from '../App';

export default function NumberButtons({digit, dispatch}) {
  return (
    <button className='btn' onClick={() => {
      dispatch(
        {
          type: ACTIONS.ADD_NUMBER, 
          payload: {digit}
        }
        )
    }}>{digit}</button>
  )
}
