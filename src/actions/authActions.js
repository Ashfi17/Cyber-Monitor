import axios from 'axios';
import setAuthorizationToken from './setAuthorizationToken';

// axios.defaults.headers.common = {'Authorization': `Bearer ${parsedAuthUser.access_token}`}

// const baseURL = 'http://pacbot-2030676945.us-east-2.elb.amazonaws.com/api/auth'



export const loginDetails = (values) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`auth/user/login`, values)
        .then((result) => {
          if (result) {
            resolve(result);
            console.log(result)
            localStorage.setItem(
              "currentUserLoginDetails",
              JSON.stringify(result.data)
            );
            setAuthorizationToken(result.data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }