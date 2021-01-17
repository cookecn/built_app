import {createStore, applyMiddleware} from 'redux';

import fileReducer from './reducers/fileReducer';
import logger from "./middleware/logger";

const initialState = {
  files: [
    {id: 1, file: 'Loan 1',  value: 350000, time: 5, rate: 0.04, monthly: 12 },
    {id: 2, file: 'Loan 2',  value: 700000, time: 10, rate: 0.06, monthly: 12 },
    {id: 3, file: 'Loan 3',  value: 1000000, time: 7, rate: 0.055, monthly: 12 },
    {id: 4, file: 'Loan 4',  value: 250000, time: 9, rate: 0.015, monthly: 12 },
    {id: 5, file: 'Loan 5',  value: 100000, time: 6, rate: 0.03, monthly: 12 },
    {id: 6, file: 'Loan 6',  value: 165000, time: 3, rate: 0.02, monthly: 12 },
    {id: 7, file: 'Loan 7',  value: 20000000, time: 20, rate: .01, monthly: 12 },
    {id: 8, file: 'Loan 8',  value: 75000, time: 12, rate: 0.045, monthly: 12 },
  ]
};

export default createStore(fileReducer, initialState, applyMiddleware(logger));