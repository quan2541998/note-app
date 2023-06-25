import React, { useContext } from 'react'
import { Typography, Button } from '@mui/material'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { AuthContext } from '../context/AuthProvider'
import { Navigate } from 'react-router-dom';

import graphQLRequest from '../services/HttpRequest';

const Login = () => {
  const auth = getAuth()
  const { user } = useContext(AuthContext)

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const { user: { uid, displayName } } = await signInWithPopup(auth, provider)

    try {
      const res = await graphQLRequest({
        query: `mutation Register($uid: String!, $name: String!) {
          register(uid: $uid, name: $name) {
            uid
            name
          }
        }`,
        variables: {
          uid: uid,
          name: displayName,
        },
      })
      console.log(res)
    } catch (error) {
      return error
    }

  }
  if (user?.uid && localStorage.getItem('accessToken')) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Typography variant='h5'> welcome to Note App</Typography>
      <Button variant='outlined' onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  )
}

export default Login