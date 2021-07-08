import axios from "axios";
import setAuthorizationToken from './setAuthorizationToken';

const localUrl = "/asset/v1";
const localAuthUser = localStorage.getItem("currentUserLoginDetails");
var parsedAuthUser = JSON.parse(localAuthUser);
setAuthorizationToken(parsedAuthUser);
// const config = {
//     headers: {"Authorization" : `Bearer ${'4dd5fb38-addd-488c-9d26-506793d010af'}`}
// }

export const getAssets = (searchKey, filterObj) => {
  const url = `${localUrl}/list/assets`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, {
        ag: "aws",
        filter: filterObj,
        from: 0,
        searchtext: searchKey,
        size: 500,
      })
      .then((result) => {
        if (result) {
          //   console.log(result.data.data.response, 'result.data.data.response')
          resolve(result.data.data.response);
        }
      })
      .catch((error) => {
        reject({ message: "Error" });
      });
  });
};

export const getTargetType = () => {
  const url = `${localUrl}/list/targettype?ag=${"aws"}&domain=${"Infra & Platforms"}`;
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

export const getCount = () => {
  const url = `${localUrl}/count?ag=${"aws"}&domain=${"Infra & Platforms"}`;
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

export const getCountByApplication = (selectedType) => {
  const url = `${localUrl}/count/byapplication?ag=${"aws"}&type=${selectedType}&domain=${"Infra & Platforms"}`;
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

export const getMaxMin = (selectedType) => {
  const url = `${localUrl}/trend/minmax?ag=${"aws"}&type=${selectedType}&domain: ${"Infra & Platforms"}`;
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

export const getTaggableData = (searchtext, searchKey) => {
  const url = `${localUrl}/list/assets/taggable`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, {
        ag: "aws",
        filter: searchKey,
        from: 0,
        searchtext: searchtext,
        size: 25,
      })
      .then((result) => {
        if (result) {
          //   console.log(result.data.data.response, 'result.data.data.response')
          resolve(result.data.data.response);
        }
      })
      .catch((error) => {
        reject({ message: "Error" });
      });
  });
};

export const getCategoriesForOmni = () => {
  const url = `${localUrl}/search/categories?domain=${"Infra \& Platforms"}`;
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

export const getAllAssetDataWithFilter = (searchtext, filterObj) => {
  const url = `${localUrl}/search`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, {
        ag: "aws",
        domain: "Infra & Platforms",
        doNotReturnFilter: false,
        from: 0,
        searchText: searchtext,
        size: 50,
        includeAllAssets: false,
        filter: filterObj
      })
      .then((result) => {
        if (result) {
          //   console.log(result.data.data.response, 'result.data.data.response')
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        reject({ message: "Error" });
      });
  });
};

export const getAssetByClasChartData = () => {
  const url = `${localUrl}/count/issues?ag=aws`;
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