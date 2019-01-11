import React from 'react'
import UL from '../../elements/UL'
import LI from '../../elements/LI'

const StyledUserList = ({ users }) => (
  <UL>
    {users.map(user => (
      <LI key={user.uid}>
        username: {user.username} email: {user.email} id: {user.uid}
      </LI>
    ))}
  </UL>
)

export default StyledUserList
