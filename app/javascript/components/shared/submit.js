import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background-color: blue;
  color: white;
  border: 1px solid black;
  border-radius: 8px;
  margin: 20px 0px;
  height: 40px;
  width: 80px;
`

const Submit = (props) => {
  return <Button onClick={props.onClick}>{props.label}</Button>
}

export default Submit