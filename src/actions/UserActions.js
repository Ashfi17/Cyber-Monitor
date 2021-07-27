import axios from "axios";
import setAuthorizationToken from "./setAuthorizationToken";

const localUrl = "/admin/";
const localAuthUser = localStorage.getItem("currentUserLoginDetails");
var parsedAuthUser = JSON.parse(localAuthUser);
setAuthorizationToken(parsedAuthUser);

export const changePassword = (values) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`auth/user/password/change`, values)
      .then((result) => {
        if (result) {
          resolve(result);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
