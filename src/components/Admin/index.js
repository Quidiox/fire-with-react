import React from 'react'
import { withFirebase } from '../Firebase'
import { withAuthorization } from '../Session'
import * as ROLES from '../../constants/roles'
import H1 from '../../styled-components/elements/H1'
import P from '../../styled-components/elements/P'
import StyledUserList from '../../styled-components/blocks/StyledUserList'

class Admin extends React.Component {
  state = {
    loading: false,
    users: []
  }
  componentDidMount() {
    this.setState({ loading: true })
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val()
      const users = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }))
      this.setState({ users, loading: false })
    })
  }
  componentWillUnmount() {
    this.props.firebase.users().off()
  }
  render() {
    const { users, loading } = this.state
    return (
      <div>
        <H1>Admin</H1>
        <P>Restricted area! Only users with the admin role are authorized.</P>
        {loading && <div>Loading...</div>}
        <StyledUserList users={users} />
      </div>
    )
  }
}

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN)

export default withAuthorization(condition)(withFirebase(Admin))
