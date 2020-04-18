import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
border: 1px solid black;
border-radius: 8px;
margin: 5px 0px 20px 0px;
height: 40px;
width: 100%
`

const Label = styled.label`
display: flex
flex-direction: column;
`

{/* <Input 
  label='label'
  type='type'
  id='id'
  placeholder='placeholder'
  onChange=onChangeMethod
/> */}

const Input = (props) => {
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
      />
    </Label>
  )
}

export default Input
