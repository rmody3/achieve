import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import httpClient from '@utils/http_client'

import {Header, Title} from '@components/shared/header'
import {Input} from '@components/shared/input'
import Submit from '@components/shared/submit'


const NewClassroom = (props) => {
  const [name, setName] = useState()

  const handleSave = (e) => {
    e.preventDefault()

    let body = {
      name: name
    }

    httpClient.post('/api/classrooms', body)
    .then(response => {
      props.history.push('/classrooms')
      console.log(response)
    }).catch(response => {
      console.log(response)
    })
  }  

  return (
    <>
      <Header>
        <Title>Add an new Classroom</Title>
      </Header>
      <Input
        label="Class Name"
        type="text"
        id="classname"
        placeholder="math 101"
        onChange={e => setName(e.target.value)}
      />

      <Submit
        label='Save'
        onClick={handleSave}
      />
    </>
  )
}

export default withRouter(NewClassroom)