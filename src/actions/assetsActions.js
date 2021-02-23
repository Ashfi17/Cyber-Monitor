import axios from 'axios';

const baseURL = 'http://pacbot-2030676945.us-east-2.elb.amazonaws.com/api/asset/v1'

const config = {
    headers: {"Authorization" : `Bearer ${'96bbc4f6-f8f1-4cdb-ba10-db9e38e173b4'}`}
}

export const getAssets = () => {
    const url = `${baseURL}/list/assets`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, {ag:"aws",filter:{domain:"Infra & Platforms"},from:0,searchtext:"",size:25}, config)
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
    const url = `${baseURL}/list/targettype?ag=${'aws'}&domain=${'Infra & Platforms'}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url, config)
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
    const url = `${baseURL}/count?ag=${'aws'}&domain=${'Infra & Platforms'}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url, config)
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
    const url = `${baseURL}/count/byapplication?ag=${'aws'}&type=${selectedType}&domain=${'Infra & Platforms'}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url, config)
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

  export const gettaggingByApplication = (selectedType) => {
    const url = `${baseURL}/tagging/taggingByApplication?ag=${'aws'}&type=${selectedType}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url, config)
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
    const url = `${baseURL}/trend/minmax?ag=${'aws'}&type=${selectedType}&domain: ${'Infra & Platforms'}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url, config)
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