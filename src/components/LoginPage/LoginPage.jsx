import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Button from "@mui/material/Button"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function LoginPage() {
  const history = useHistory();

  return (
    <Grid container display="flex" flexDirection="column" alignItems="center">
      <Grid item xs={10}>
        <Box display="flex" flexDirection="column" justifyContent="center" sx={{ mt: 14 }}>
          <LoginForm />

          <center>
            <Button variant="outlined" color="success"
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                history.push('/registration');
              }}
            >
              Register
            </Button>
          </center>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
