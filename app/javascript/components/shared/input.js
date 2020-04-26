import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  border: 1px solid black;
  border-radius: 8px;
  margin: 5px 0px 20px 0px;
  height: 40px;
  width: 100%
`

export const Label = styled.label`
  display: flex
  flex-direction: column;
  font-weight: bold;
`

export const Select = styled.select`
  margin: 5px 0px 20px 0px;
`
const StlyedTextarea = styled.textarea`
  border: 1px solid black;
  border-radius: 8px;
  margin: 5px 0px 20px 0px;
  height: 40px;
  width: 100%;
  font-size: 16px;
`


{/* <Input 
  label='label'
  type='type'
  id='id'
  placeholder='placeholder'
  onChange=onChangeMethod
/> */}

export const Input = (props) => {
  return (
    <Label>
      <div>
        {props.label}
      </div>
      <StyledInput 
        type= {props.type}
        id= {props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        defaultValue={props.defaultValue || undefined}
        disabled={props.disabled || false}
      />
    </Label>
  )
}

export const Button = styled.button`
  background-color: #FFAC39;
  color: white;
  border-radius: 8px;
  margin: 20px 0px;
  height: 40px;
  min-width: 100px;
  box-sizing: border-box;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  &:active {
    border: 3px solid lightblue;
  }

  &:focus {
    outline: none;  
    background: white;
    color: #51454F;
  }

  &:disabled {
    opacity: 0.3;
  }
`

export const Textarea = (props) => {
  return (
    <Label>
      <div>
        {props.label}
      </div>
      <StlyedTextarea 
        id= {props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        defaultValue={props.defaultValue || undefined}
        disabled={props.disabled || false}
      />
    </Label>
  )
}