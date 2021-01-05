import axios from 'axios';

const baseURL = 'http://pacbot-646880259.us-east-2.elb.amazonaws.com/api/compliance/v1'

const config = {
    headers: {"Authorization" : `Bearer ${'8eb0796e-b35d-4b81-88b3-9ec7ca3b02c6'}`}
}

export const getCompliance = () => {
    const url = `${baseURL}/overallcompliance?ag=${'aws'}&domain=${'Infra & Platforms'}`;
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

  export const getOverallCompliance = () => {
    // const token = '955589a2-dd91-4dec-a8e6-07383c41c8f9'
    const url = `${baseURL}/trend/compliance`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, {ag: "aws", from: "2020-11-30", filters: {domain: "Infra & Platforms"}}, config)
        .then((result) => {
          if (result) {
            resolve(result.data.data.response);
          }
        })
        .catch((error) => { 
          reject({ message: 'Error' });
        });
    });
  };

  export const getTaggings = () => {
      const url = `${baseURL}/tagging?ag=${'aws'}&domain=${'Infra & Platforms'}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url, config)
        .then((result) => {
          if (result) {
            resolve(result.data.data.output);
          }
        })
        .catch((error) => {
          reject({ message: 'Error' });
        });
    });
  }

  export const complianceIssues = () => {
    const url = `${baseURL}/issues`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, {ag: "aws", filter: {domain: "Infra & Platforms", include_exempt: "yes"}, from: 0, searchtext: "", size: 25}, config)
        .then((result) => {
          if (result) {
            resolve(result.data.data.response);
          }
        })
        .catch((error) => { 
          reject({ message: 'Error' });
        });
    });
  };
