import axios from 'axios';
import setAuthorizationToken from './setAuthorizationToken';

const localUrl = '/compliance/v1';
const localAuthUser = localStorage.getItem("currentUserLoginDetails");
var parsedAuthUser = JSON.parse(localAuthUser);
setAuthorizationToken(parsedAuthUser);
// const config = {
//     headers: {"Authorization" : `Bearer ${'4dd5fb38-addd-488c-9d26-506793d010af'}`}
// }

export const getDistributionIssues = () => {
  const url = `${localUrl}/issues/distribution?ag=${'aws'}&domain=${'Infra & Platforms'}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
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

export const getCompliance = () => {
  const url = `${localUrl}/overallcompliance?ag=${'aws'}&domain=${'Infra & Platforms'}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
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
  const url = `${localUrl}/trend/compliance`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, { ag: "aws", from: "2020-11-30", filters: { domain: "Infra & Platforms" } })
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
  const url = `${localUrl}/tagging?ag=${'aws'}&domain=${'Infra & Platforms'}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
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
  const url = `${localUrl}/issues`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, { ag: "aws", filter: { domain: "Infra & Platforms", include_exempt: "yes" }, from: 0, searchtext: "", size: 25 })
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
  const url = `${localUrl}/noncompliancepolicy`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, { ag: "aws", filter: { domain: "Infra & Platforms" }, from: 0, searchtext: "", size: 10 })
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
  const url = `${localUrl}/cloud/notifications?global=${false}`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, { ag: "aws", filter: { eventtypecategory: "" }, from: 0, searchtext: "", size: 25 })
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
  const url = `${localUrl}/cloud/notifications/summary?ag=${'aws'}&global=${true}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
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
  const url = `${localUrl}/recommendations?ag=${'aws'}&domine=${'Infra & Platforms'}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
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
  const url = `${localUrl}/noncompliancepolicy`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, { ag: "aws", searchtext: searchKey && searchKey !== '' ? searchKey : '', filter: { domain: "Infra & Platforms" }, from: 0, size: 10 })
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
  const url = `${localUrl}/policydescription?ruleId=${ruleId}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
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
  const url = `${localUrl}/policyevaluations/aws/${details._entitytype}/${details._resourceid}?from=0&size=10`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
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

export const gettaggingByApplication = (getTargetType) => {
  const url = `${localUrl}/tagging/taggingByApplication?ag=${'aws'}&targettype=${getTargetType}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
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

export const postFiltersApi = (getTargetType) => {
  const url = `${localUrl}/filters?filterId=8&domain=Infra%20%26%20Platforms`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
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

export const getComplianceTagging = () => {
  const url = `${localUrl}/tagging?ag=${'aws'}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
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

export const getComplianceTrend = (getParams) => {
  const url = `${localUrl}/trend/compliancebyrule`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, { ag: "aws", filter: { domain: "Infra & Platforms" }, from: "2021-04-07"/* getParams.fromDate */, ruleid: getParams.ruleId })
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

export const policySummaryData = (getParams) => {
  const url = `${localUrl}/noncompliancepolicy`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, { ag: "aws", filter: { domain: "Infra & Platforms", "ruleId.keyword": getParams.ruleId }, from: 0, searchtext: "", size: 0 })
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

export const listOfViolationsData = (getParams) => {
  const url = `${localUrl}/issues`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, { ag: "aws", filter: { domain: "Infra & Platforms", "ruleId.keyword": getParams.ruleId }, from: 0, searchtext: "", size: 10 })
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

export const getAllIssueAuditLog = (getParams) => {
  const url = `${localUrl}/issueauditlog`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, { filter: { domain: "Infra & Platforms" }, from: 0, searchtext: "", size: 10, issueId: getParams.IssueId, targetType: getParams.entitytype })
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

export const getResourcedetails = (getResourceId) => {
  const url = `${localUrl}/resourcedetails?ag=${'aws'}&resourceId=${getResourceId}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
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

export const getPolicyViolationReason = (getTargetIssId) => {
  const url = `${localUrl}/policyViolationReason?ag=${'aws'}&issueId=${getTargetIssId}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
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