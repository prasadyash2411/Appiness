import { loginData } from './constants/userData'

const verify = (username, password) => {
  console.log('chkk', username, password)
  if(loginData.username === username && loginData.password === password){
    return ({
      data: {
      userExists: true,
      message: 'Successfully Logged In',
      token: username,
      username
    },
    error: false
    })
  } else if(loginData.username === username){
    return ({
      data: {
      message: 'Invalid Email or password combination',
      userExists: false,
      token: null
    },
    error: true
    })
  } else{
    return ({
      data: {
      message: 'User Does Not Exist',
      userExists: false,
      token: null
    },
    error: true
    })
  }
}

const requests = {
  post: ({ username, password }) => verify(username, password)
}
const Auth = {
  login: (username, password) => requests.post({ 'username': username, 'password':password }),
};
export default {
  Auth
};
