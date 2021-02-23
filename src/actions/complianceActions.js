import axios from 'axios';

const baseURL = 'http://pacbot-2030676945.us-east-2.elb.amazonaws.com/api/compliance/v1'

const config = {
    headers: {"Authorization" : `Bearer ${'96bbc4f6-f8f1-4cdb-ba10-db9e38e173b4'}`}
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

  export const nonCompliancePolicy = () => {
    const url = `${baseURL}/noncompliancepolicy`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, {ag: "aws", filter: {domain: "Infra & Platforms"}, from: 0, searchtext: "", size: 10}, config)
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

  export const cloudNotifications = () => {
    const url = `${baseURL}/cloud/notifications?global=${false}`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, {ag: "aws", filter: {eventtypecategory: ""}, from: 0, searchtext: "", size: 25}, config)
        .then((result) => {
          if (result) {
            console.log(result, 'result')
            resolve(result.data.data.response);
          }
        })
        .catch((error) => { 
          console.log(error.response, 'errorMessage')
          reject({ message: 'Error' });
        });
    });
  };

  export const notificationSummary = () => {
    const url = `${baseURL}/cloud/notifications/summary?ag=${'aws'}&global=${true}`;
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

export const getRecommendations = () => {
  const url = `${baseURL}/recommendations?ag=${'aws'}&domine=${'Infra & Platforms'}`;
return new Promise((resolve, reject) => {
  axios
    .get(url, config)
    .then((result) => {
      if (result) {
        // console.log(result.data.data, 'result.data.data')
        resolve(result.data.data.response);
      }
    })
    .catch((error) => {
      reject({ message: 'Error' });
    });
});
}

export const policyknowledgeApi = (searchKey) => {
  const url = `${baseURL}/noncompliancepolicy`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, {ag:"aws",searchtext:searchKey && searchKey !== '' ? searchKey : '',filter:{domain:"Infra & Platforms"},from:0,size:10}, config)
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => { 
        console.log(error.response, 'errorMessage')
        reject({ message: 'Error' });
      });
  });
}

export const policyKnowledgeDescription = (ruleId) => {
  const url = `${baseURL}/policydescription?ruleId=${ruleId}`;
return new Promise((resolve, reject) => {
  axios
    .get(url, config)
    .then((result) => {
      if (result) {
        // console.log(result.data.data.response, 'result.data.data')
        resolve(result.data.data.response);
      }
    })
    .catch((error) => {
      reject({ message: 'Error' });
    });
});
}

export const getAssociatedPolicies = (details) => {
  const url = `${baseURL}/policyevaluations/aws/${details._entitytype}/${details._resourceid}?from=0&size=10`;
  return new Promise((resolve, reject) => {
    axios
      .get(url, config)
      .then((result) => {
        if (result) {
          // console.log(result, 'result.data.data')
          resolve(result.data.data.response);
        }
      })
      .catch((error) => {
        reject({ message: 'Error' });
      });
  });
}