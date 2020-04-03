import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faVideo,
  faUser,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const SideBar = props => {
  // useEffect(() => {
  //   console.log("WHAT IS MATCH IN SIDEBAR HERE:  ", props.path === "/upload");
  // }, []);

  let uploadSend;
  if (props.currentUser) {
    uploadSend = "/upload";
  } else {
    uploadSend = "/login";
  }

  let toggleRedHome =
    props.path === "/"
      ? "sidebar-content-item red background"
      : "sidebar-content-item";

  let toggleRedUpload =
    props.path === "/upload"
      ? "sidebar-content-item red background"
      : "sidebar-content-item";

  let uploadImage =
    props.path === "/upload"
      ? "https://twixtertube-dev.s3-us-west-1.amazonaws.com/upload_icon_logo_red.png"
      : "https://cdn.discordapp.com/attachments/695012962036875485/695019729814814779/Untitled.png";

  return (
    <div className="sidebar-container">
      <div className="sidebar-main">
        <Link to="/" className={toggleRedHome}>
          <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
          <span className="sidebar-item-title">Home</span>
        </Link>
        <Link to={uploadSend} className={toggleRedUpload}>
          {/* <FontAwesomeIcon icon={faVideo} className="sidebar-icon" /> */}
          <img src={uploadImage} alt="upload-icon" id="upload-image-icon" />
          <span className="sidebar-item-title">Upload</span>
        </Link>

        <a
          href="https://www.linkedin.com/in/aaron-shapiro1994/"
          className="sidebar-content-item"
          target="_blank"
        >
          <FontAwesomeIcon icon={faLinkedin} className="sidebar-icon" />
          <span className="sidebar-item-title">LinkedIn</span>
        </a>

        <a
          href="https://github.com/ashap94"
          className="sidebar-content-item"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithub} className="sidebar-icon" />
          <span className="sidebar-item-title">GitHub</span>
        </a>

        <a
          href="https://ashap94.github.io/"
          className="sidebar-content-item"
          target="_blank"
        >
          <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
          <span className="sidebar-item-title">Author</span>
        </a>
        {/* Next SideBar item will be your profile page link */}
      </div>
    </div>
  );
};

export default SideBar;
