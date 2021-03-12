import axios from 'axios';

const localUrl = '/admin/policy'

export const getPolicyList = () => {
    const url = `${localUrl}/list?page=${0}&size=${500}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url )
        .then((result) => {
          if (result) {
            resolve(result.data.data);
          }
        })
        .catch((error) => {
          reject({ message: 'Error' });
        });
    });
  };