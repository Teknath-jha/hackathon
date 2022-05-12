import React from "react";
import "./NotFound.css";
import { Typography, Link } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

const NotFound = () => {
  return (
    <div className="notFound">
      <div className="notFoundContainer">
        <ErrorOutline />
        <Typography variant="h2" style={{ padding: "2vmax" }}>
          Page Not Found
        </Typography>
        <Link href="/">
          <Typography variant="h5">Go to Home</Typography>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
