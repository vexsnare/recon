import { combineReducers } from 'redux';
import ReportProgressReducer from './ReportProgressReducer';
import InputProgressReducer from './InputProgressReducer';
import SummaryReducer from './SummaryReducer';
import OutputProgressReducer from './OutputProgressReducer';
import ProductivityProgressReducer from './ProductivityProgressReducer';

export default combineReducers({
  report: ReportProgressReducer,
  input: InputProgressReducer,
  output: OutputProgressReducer,
  productivity: ProductivityProgressReducer,
  summary: SummaryReducer
});
