import { Avatar, Typography, Button, Link } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../Actions/User";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import { loadUser } from "../../Actions/User";

const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();

    // Three states 0->loading , 1->processing , 2->loaded(readyState)
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);
        setAvatar(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (updateError) {
      alert.error(updateError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, alert, error, updateError, message]);

  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography vatiant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <Avatar
          src={avatarPrev}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          className="updateProfileInputs"
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="updateProfileInputs"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={updateLoading} type="submit">
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
