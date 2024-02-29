import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
// This import and the one below it need to be high up, otherwise entire app crashes
import { createTheme, ThemeProvider } from "@mui/material/styles"; 
import CssBaseline from "@mui/material/CssBaseline";
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Dashboard from '../Dashboard/Dashboard';
import CalendarPage from '../CalendarPage/CalendarPage';
import PracticeEntries from '../PracticeEntries/PracticeEntries';
import NewPracticePlan from '../NewPracticePlan/NewPracticePlan';
import ReviewPlan from '../ReviewPlan/ReviewPlan';
import EditPlan from '../EditPlan/EditPlan';
import ReflectionForm from '../ReflectionForm/ReflectionForm';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  const themeOption = {
    palette: {
      mode: 'light',
      primary: {
        main: '#2680A6',
      },
      secondary: {
        main: '#4c26a6',
      },
      success: {
        main: '#26a68c',
      },
      background: {
        default: '#ffffff',
        paper: '#f7f7f7',
      },
    },
  };

  const theme = createTheme(themeOption);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
            <Redirect exact from="/" to="/dashboard/pieces" />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/dashboard */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/dashboard/pieces"
            >
              <Dashboard />
            </ProtectedRoute>

            <ProtectedRoute exact path="/dashboard/calendar">
              <CalendarPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/:id/practice_entries">
              <PracticeEntries />
            </ProtectedRoute>

            <ProtectedRoute exact path="/:id/practice_entries/new_plan">
              <NewPracticePlan />
            </ProtectedRoute>

            <ProtectedRoute exact path="/:id/practice_entries/review_plan/:plan_id">
              <ReviewPlan />
            </ProtectedRoute>

            <ProtectedRoute exact path="/:id/practice_entries/review_plan/:plan_id/edit">
              <EditPlan />
            </ProtectedRoute>

            <ProtectedRoute exact path="/:id/practice_entries/write_reflection/:plan_id">
              <ReflectionForm />
            </ProtectedRoute>

            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /dashboard
                <Redirect to="/dashboard/pieces" />
                :
                // Otherwise, show the login page
                <LoginPage />
              }
            </Route>

            <Route
              exact
              path="/registration"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/dashboard/pieces" />
                :
                // Otherwise, show the registration page
                <RegisterPage />
              }
            </Route>

            <Route
              exact
              path="/dashboard/pieces"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /dashboard page
                <Redirect to="/dashboard/pieces" />
                :
                // Otherwise, show the Landing page
                <LandingPage />
              }
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
