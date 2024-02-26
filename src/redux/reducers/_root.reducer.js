import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import pieces from "./pieces.reducer";
import plans from "./plans.reducer";
import selectedPlan from "./selectedPlan.reducer";
import referenceRecordings from "./referenceRecordings.reducer";
import selectedReferenceRecording from "./selectedReferenceRecording.reducer";
import selectedPracticeRecording from './selectedPracticeRecording.reducer';
import latestPracticeRecording from './latestPracticeRecording.reducer';
import calendarEvents from './calendarEvents.reducer';
import selectedEvent from './selectedEvent.reducer';
import selectedPiece from './selectedPiece.reducer';
import selectedReflection from './selectedReflection.reducer';
import newPlanProblems from './newPlanProblems.reducer';
import calendarDateInfo from './calendarDateInfo.reducer';
import dayView from './dayView.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  pieces,
  selectedPiece,
  plans,
  selectedPlan,
  selectedReflection,
  referenceRecordings,
  selectedReferenceRecording,
  selectedPracticeRecording,
  latestPracticeRecording,
  calendarEvents,
  selectedEvent,
  newPlanProblems,
  calendarDateInfo,
  dayView
});

export default rootReducer;
