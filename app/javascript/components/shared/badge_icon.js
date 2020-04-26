import React from 'react'
import styled from 'styled-components'

import FirstGoalCreated from '@images/badges/first_goal_created.svg'
import FirstGoalApproved from '@images/badges/first_goal_approved.svg'
import ThirdGoalCreated from '@images/badges/third_goal_created.svg'
import ThirdGoalApproved from '@images/badges/third_goal_approved.svg'
import Ambitious from '@images/badges/ambitious.svg'


const Image = styled.img`
  height: 50px;
  width: 50px;
`

const BadgeIcon = (props) => {
  return <Image src={determineImage(props.file)} title={props.description} />
}

const determineImage = (file) => {
  switch (file) {
    case 'first_goal_created': return FirstGoalCreated
    case 'first_goal_approved': return FirstGoalApproved
    case 'third_goal_created': return ThirdGoalCreated
    case 'third_goal_approved': return ThirdGoalApproved
    case 'ambitious': return Ambitious
  }
}

export default BadgeIcon