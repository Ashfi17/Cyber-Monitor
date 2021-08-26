import axios from "axios";
import setAuthorizationToken from "./setAuthorizationToken";

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
  var selectedGrpName = "";
  var selectedGrpDtls = localStorage.getItem("selectedGrpDtls");
  if (selectedGrpDtls) {
    var obj = JSON.parse(selectedGrpDtls);
    selectedGrpName = obj.name;
  }
  const url = `${localUrl}/list/targettype?ag=${selectedGrpName ? selectedGrpName : "aws"}&domain=${"Infra & Platforms"}`;
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
  var selectedGrpName = "";
  var selectedGrpDtls = localStorage.getItem("selectedGrpDtls");
  if (selectedGrpDtls) {
    var obj = JSON.parse(selectedGrpDtls);
    selectedGrpName = obj.name;
  }
  const url = `${localUrl}/count?ag=${selectedGrpName ? selectedGrpName : "aws"}&domain=${"Infra & Platforms"}`;
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
  var selectedGrpName = "";
  var selectedGrpDtls = localStorage.getItem("selectedGrpDtls");
  if (selectedGrpDtls) {
    var obj = JSON.parse(selectedGrpDtls);
    selectedGrpName = obj.name;
  }
  const url = `${localUrl}/count/byapplication?ag=${selectedGrpName ? selectedGrpName : "aws"}&type=${selectedType}&domain=${"Infra & Platforms"}`;
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
  var selectedGrpName = "";
  var selectedGrpDtls = localStorage.getItem("selectedGrpDtls");
  if (selectedGrpDtls) {
    var obj = JSON.parse(selectedGrpDtls);
    selectedGrpName = obj.name;
  }
  const url = `${localUrl}/trend/minmax?ag=${selectedGrpName ? selectedGrpName : "aws"}&type=${selectedType}&domain: ${"Infra & Platforms"}`;
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

export const getTaggableData = (searchKey) => {
  const url = `${localUrl}/list/assets/taggable`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, {
        ag: "aws",
        filter: searchKey,
        from: 0,
        searchtext: "",
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
  const url = `${localUrl}/search/categories?domain=${"Infra & Platforms"}`;
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
        filter: filterObj,
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
  var selectedGrpName = "";
  var selectedGrpDtls = localStorage.getItem("selectedGrpDtls");
  if (selectedGrpDtls) {
    var obj = JSON.parse(selectedGrpDtls);
    selectedGrpName = obj.name;
  }
  const url = `${localUrl}/count/issues?ag=${selectedGrpName ? selectedGrpName : "aws"}`;
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

export const getAssetTagsData = (paramUrl) => {
  const url = `${localUrl}/aws/${paramUrl}/details`;
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

export const getAssetSummaryData = (paramUrl) => {
  const url = `${localUrl}/aws/ec2/${paramUrl}/summary`;
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

export const getAppendToRecentlyViewedAG = (userId) => {
  var selectedGrpName = "";
  var selectedGrpDtls = localStorage.getItem("selectedGrpDtls");
  if (selectedGrpDtls) {
    var obj = JSON.parse(selectedGrpDtls);
    selectedGrpName = obj.name;
  }
  const url = `${localUrl}/appendToRecentlyViewedAG?ag=${selectedGrpName ? selectedGrpName : "aws"}&userId=${userId}`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, {})
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response);
        } else {
          reject({ message: "Error" });
        }
      });
  });
};

export const getAssetGroupDetails = (selectedGrpName) => {
  const url = `${localUrl}/assetgroup?ag=${selectedGrpName ? selectedGrpName : "aws"}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response);
        } else {
          reject({ message: "Error" });
        }
      });
  });
};

export const getAssetGrouplist = () => {
  const url = `${localUrl}/list/assetgroup`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((result) => {
        if (result) {
          resolve(result.data.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response);
        } else {
          reject({ message: "Error" });
        }
      });
  });
};