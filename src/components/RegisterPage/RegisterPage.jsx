import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function RegisterPage() {
  const history = useHistory();

  return (
    <Grid container display="flex" flexDirection="column" alignItems="center">
      <Grid item xs={10}>
        <Box display="flex" flexDirection="column" justifyContent="center" sx={{ mt: 14 }}>
          <RegisterForm />

          <center>
            <Button variant="outlined" color="success"
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                history.push('/login');
              }}
            >
              Login
            </Button>
          </center>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RegisterPage;
