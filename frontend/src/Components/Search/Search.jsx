import React, { useState } from "react";
import "./Search.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import User from "../User/User";

const Search = () => {
  const [name, setName] = useState();

  const { users, loading } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
     dispatch(getAllUsers(name));
  };

  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography vatiant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Search
        </Button>

        <div className="searchResults">
          {users &&
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
