import axios from "axios";
import setAuthorizationToken from "./setAuthorizationToken";

const localUrl = "/compliance/notification/v1";
const complianceUrl = "/compliance/v2";
const sendIssueMailUrl = "/notifications";
const localAuthUser = localStorage.getItem("currentUserLoginDetails");
var parsedAuthUser = JSON.parse(localAuthUser);
setAuthorizationToken(parsedAuthUser);
// const config = {
//     headers: {"Authorization" : `Bearer ${'4dd5fb38-addd-488c-9d26-506793d010af'}`}
// }

export const getAllNotificationsCount = () => {
  var selectedGrpName = "";
  var selectedGrpDtls = localStorage.getItem("selectedGrpDtls");
  if (selectedGrpDtls) {
    var obj = JSON.parse(selectedGrpDtls);
    selectedGrpName = obj.name;
  }
  const url = `${localUrl}/trend/issues/count?ag=${selectedGrpName ? selectedGrpName : "aws"
    }`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const fetchAllNotifications = () => {
  var selectedGrpName = "";
  var selectedGrpDtls = localStorage.getItem("selectedGrpDtls");
  if (selectedGrpDtls) {
    var obj = JSON.parse(selectedGrpDtls);
    selectedGrpName = obj.name;
  }
  const url = `${localUrl}/trend/issues?ag=${selectedGrpName ? selectedGrpName : "aws"
    }`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const sendUserException = (getobj) => {
  var selectedGrpName = "";
  var selectedGrpDtls = localStorage.getItem("selectedGrpDtls");
  if (selectedGrpDtls) {
    var obj = JSON.parse(selectedGrpDtls);
    selectedGrpName = obj.name;
  }
  const url = `${complianceUrl}/issue/add-exception`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, getobj)
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const sendEmailForIssue = (getobj) => {
  var selectedGrpName = "";
  var selectedGrpDtls = localStorage.getItem("selectedGrpDtls");
  if (selectedGrpDtls) {
    var obj = JSON.parse(selectedGrpDtls);
    selectedGrpName = obj.name;
  }
  const url = `${sendIssueMailUrl}/send-mail-with-template`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, getobj)
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
