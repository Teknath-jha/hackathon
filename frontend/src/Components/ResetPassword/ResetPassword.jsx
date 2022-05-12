import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import { Typography, Button, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Actions/User";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, newPassword));
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
  }, [dispatch, error, alert, message]);

  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography vatiant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          className="updatePasswordInputs"
          type="password"
          placeholder="New Password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Link href="/forgot/password">
          <Typography>Request Another Token!</Typography>
        </Link>
        <Typography>Or</Typography>
        <Link href="/">
          <Typography>Login</Typography>
        </Link>
        <Button disabled={loading} type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
