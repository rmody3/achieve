import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 95%;
  border-right: 2px solid grey;
  min-width: 120px;
  padding: 20px;
  align-items: center;
  text-align: center;
`

const Button = styled.button`
  height: 100px;
  width: 100px;
  border: 2px solid black;
  border-radius: 8px
`

const NavBar = (props) => {
  return (
    <Container>
      <div>
        <h1>Achieve</h1>
        <p>Welcome</p>
        <p>{props.user.email}</p>
      </div>
      <Link to="/dashboard"><Button>Dashboard</Button></Link> 
      <Link to="/classes"><Button>Classes</Button></Link> 
      <Link to="/rewards"><Button>Rewards</Button></Link>
      <Button>Logout</Button>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.bootstrap.user
  }
}
export default connect(mapStateToProps)(NavBar)