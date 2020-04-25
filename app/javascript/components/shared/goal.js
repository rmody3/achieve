import React from 'react'
import styled from 'styled-components'

const Notice = styled.h2`
  background-color: lightgreen;
  border-radius: 5px;
  padding: 5px;
`

export const ApproveNotice = (props) => {
  if (props.approvedDate != null){
    return <Notice>Approved!</Notice>
  } else {
    return null
  }
}
