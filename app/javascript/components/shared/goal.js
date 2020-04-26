import React from 'react'
import styled from 'styled-components'

const Notice = styled.h2`
  background-color: lightgreen;
  border-radius: 5px;
  padding: 5px;
`
export const Goal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50%;
  min-hieght: 100px;
  margin: 20px;
  align-self: flex-start; 
  border-radius: 8px;
  word-wrap: break-word;
  text-align: center;
  justify-content: space-evenly;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 10px;
  background-color: white;
`

export const ApproveNotice = (props) => {
  if (props.approvedDate != null){
    return <Notice>Approved!</Notice>
  } else {
    return null
  }
}
