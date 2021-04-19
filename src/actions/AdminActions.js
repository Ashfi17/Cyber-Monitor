import axios from "axios";

const localUrl = "/admin/";

export const getPolicyList = () => {
  const url = `${localUrl}policy/list?page=${0}&size=${500}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        reject({ message: "Error" });
      });
  });
};

export const getTargetTypes = () => {
  const url = `${localUrl}target-types/list?page=${0}&size=${500}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        reject({ message: "Error" });
      });
  });
};

export const createTargetType = (values) => {
  const url = `${localUrl}target-types/create`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, values)
      .then((result) => {
        if (result) {
          console.log(result.data, "werwskjwokjj");
          // resolve(result.data.data);
        }
      })
      .catch((error) => {
        reject({ message: "Error" });
      });
  });
};

export const getAdminDomains = () => {
  const url = `${localUrl}domains/list-details?page=${0}&size=${500}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        reject({ message: "Error" });
      });
  });
};

export const createDomain = (values) => {
  const url = `${localUrl}domains/create`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, values)
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        reject({ message: "Error" });
      });
  });
};

// ===========
export const createRole = (values) => {
  const url = `${localUrl}roles/create`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, values)
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        reject({ message: "Error" });
      });
  });
};
export const editRole = (values) => {
  const url = `${localUrl}roles/update`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, values)
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        reject({ message: "Error" });
      });
  });
};

export const getRoleDataList = () => {
  const url = `${localUrl}roles/list?page=${0}&size=${25}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        reject({ message: "Error" });
      });
  });
};

export const getRoleDetailsFromId = (id) => {
  const url = `${localUrl}roles/details-by-id?roleId=${id}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        reject({ message: "Error" });
      });
  });
};
