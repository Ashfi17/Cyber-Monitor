import axios from 'axios';

// const baseURL = 'http://pacbot-2030676945.us-east-2.elb.amazonaws.com/api/auth'



export const loginDetails = (values) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`auth/user/login`, values)
        .then((result) => {
          if (result) {
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }