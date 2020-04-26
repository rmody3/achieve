import React from 'react'
import styled from 'styled-components'

import {Button} from '@components/shared/input'

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