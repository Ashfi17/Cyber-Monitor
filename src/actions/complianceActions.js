import axios from 'axios';

export const getCompliance = () => {
    return new Promise((resolve, reject) => {
       const url = `/overallcompliance?ag=${'aws'}&domain=${'Infra & Platforms'}`;
      axios
        .get(url)
        .then((result) => {
          if (result) {
            resolve(result);
          }
        })
        .catch((error) => {
          reject({ message: 'Error' });
        });
    });
  };

//   export const postCompliance = () => {
//     return new Promise((resolve, reject) => {
//       axios
//         .post("/trend/compliance")
//         .then((result) => {
//           if (result) {
//             resolve(result);
//           }
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   };