import axios from 'axios';

const localUrl = '/asset/v1'

// const config = {
//     headers: {"Authorization" : `Bearer ${'4dd5fb38-addd-488c-9d26-506793d010af'}`}
// }

export const getAssets = () => {
    const url = `${localUrl}/list/assets`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, {ag:"aws",filter:{domain:"Infra & Platforms"},from:0,searchtext:"",size:25} )
        .then((result) => {
          if (result) {
            //   console.log(result.data.data.response, 'result.data.data.response')
            resolve(result.data.data.response);
          }
        })
        .catch((error) => { 
          reject({ message: 'Error' });
        });
    });
  };

  export const getTargetType = () => {
    const url = `${localUrl}/list/targettype?ag=${'aws'}&domain=${'Infra & Platforms'}`;
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

  export const getCount = () => {
    const url = `${localUrl}/count?ag=${'aws'}&domain=${'Infra & Platforms'}`;
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

  export const getCountByApplication = (selectedType) => {
    const url = `${localUrl}/count/byapplication?ag=${'aws'}&type=${selectedType}&domain=${'Infra & Platforms'}`;
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

  export const getMaxMin = (selectedType) => {
    const url = `${localUrl}/trend/minmax?ag=${'aws'}&type=${selectedType}&domain: ${'Infra & Platforms'}`;
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