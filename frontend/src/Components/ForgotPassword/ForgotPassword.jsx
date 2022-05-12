import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import { Typography, Button } from "@mui/material";
import { forgotPassword } from "../../Actions/User";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error,alert, message]);

  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography vatiant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="forgotPasswordInputs"
        />

        <Button disabled={loading} type="submit">
          Send Token
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
