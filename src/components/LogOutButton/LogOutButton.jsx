import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Button from "@mui/material/Button";

function LogOutButton(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/dashboard/pieces");
  }
  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={logOut}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
