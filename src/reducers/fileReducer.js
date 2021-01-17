import { types } from "../types/fileTypes";

export default function fileReducer(state = {}, action) {
  const payload = action.payload;
  switch (action.type) {
    case types.NEW_FILE:
      return {
        files: [...state.files, newFile(state.files)],
      };
    case types.DELETE_FILE:
      console.log(payload);
      return {
        files: deleteFiles(state.files, payload.ids),
      };
    case types.ADD_VALUE:
      return {
        files: addValue(state.files),
      };
    case types.RANDOMIZE_VALUE:
      return {
        files: randomValue(state.files),
      };
    case types.CALCULATE_INTEREST:
      return {
        files: calculateInterest(state.files),
      };
    default:
      return state;
  }
}

//Create a new file with random value and interest
const newFile = (existingFiles) => {
  const num = getNextUntitledFileNumber(existingFiles);
  let lastId = existingFiles[existingFiles.length - 1].id;
  return {
    id: lastId + 1,
    file: `Loan ${num > 0 ? num : ""}`,
    value: Math.floor(Math.random() * 100),
    time: Math.floor(Math.random() * 100),
    rate: (Math.floor(Math.random() * 1) + 100) / 100,
    monthly: 12,
    
  };
};

//create new loans starting with "New_Loan" and ending with a number increment by 1.
const getNextUntitledFileNumber = (existingFiles) => {
  const untitledNumberMapper = (f) => {
    const num = f.file.split(".")[0].match(/\d+/g);
    return num && num.length > 0 ? parseInt(num) : 0;
  };

  return (
    existingFiles
      .filter((f) => f.file.startsWith("Loan "))
      .map(untitledNumberMapper)
      .reduce((n1, n2) => Math.max(n1, n2), -1) + 1
  );
};

//delete selected files by id
const deleteFiles = function (existingFiles, ids) {
  return existingFiles.filter((f) => !ids.includes(f.id));
};

//add one value to all files with an even id number
const addValue = (existingFiles) =>
  existingFiles.map(function (file) {
    if (file.id % 2 === 0) {
      return {
        ...file,
        value: file.value + 1,
      };
    } else {
      return {
        ...file,
      };
    }
  });

const randomValue = (existingFiles) =>
  existingFiles.map(function (file) {
    return {
      ...file,
      value: Math.floor(Math.random() * 100),
    };
  });

  //calcultae compound interst rate using time, rate, monthly/quarterly, and principal amount
const calculateInterest = (existingFiles) => existingFiles.map(function(file) {
    return {
        ...file,
        interest: file.value * (Math.pow((1 + ( file.rate / file.monthly)), (file.monthly * file.time))) - file.value,
    }
})

/*

Collateral Coverage Ratio = Discounted Collateral Value / Total Loan Amount

*/
