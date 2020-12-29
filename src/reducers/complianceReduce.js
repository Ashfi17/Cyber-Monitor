const initialState = {
    complianceData: []
}

const compData = (state, action) => {
    let complianceDataClone = Object.assign({}, state.complianceData);
    complianceDataClone = action.data;
    return { ...state, complianceData: complianceDataClone };
  };

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'COMPALINCE':
        return compData(state, action);
    }
}