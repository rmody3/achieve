import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background-color: blue;
  color: white;
  border: 1px solid black;
  border-radius: 8px;
  margin: 20px 0px;
  height: 40px;
  min-width: 100px;
  box-sizing: border-box;

  &:active {
    border: 3px solid lightblue;
  }

  &:focus {
    outline: none;  
    background: white;
    color: black;
  }

  &:disabled {
    opacity: 0.3;
  }
`

const Submit = (props) => {
  return (
    <Button 
      className={props.className} 
      onClick={props.onClick}
      disabled={props.disabled || false}
    >
      {props.label}
    </Button>
  )
 
}

export default Submit