import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import NavBarContainer from "../nav_bar/nav_bar_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faCamera,
  faCheck,
  faSyncAlt
} from "@fortawesome/free-solid-svg-icons";
import SideBarContainer from "../sidebar/sidebar_container";
import ModalSideBarContainer from "../sidebar/modal_sidebar_container";

class UploadVideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      videoFile: null,
      thumbnailFile: null,
      thumbnailUrl: null,
      videoUploaded: false,
      uploadIconElement: "",
      thumbnailElement: null,
      thumbnailContainerElement: null,
      published: false,
      titleInput: null,
      descriptionInput: null
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVideoFile = this.handleVideoFile.bind(this);
    this.handleThumbnailFile = this.handleThumbnailFile.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    console.log("HERE IS THE TITLE HTML ELEMENT:  ", $("#upload-title"));
    console.log(
      "HERE IS THE DESCRIPTION HTML ELEMENT:  ",
      $("#upload-description")
    );

    this.setState({
      uploadIconElement: document.getElementsByClassName(
        "upload-thumbnail-icon"
      ),
      thumbnailElement: document.getElementById("thumbnail"),
      thumbnailContainerElement: document.getElementsByClassName(
        "custom-file-thumbnail"
      )
      // titleInput: document.getElementById("upload-title"),
      // descriptionInput: document.getElementById("upload-description")
    });
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.target.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video[title]", this.state.title);
    formData.append("video[description]", this.state.description);
    formData.append("video[vid]", this.state.videoFile);
    formData.append("video[thumbnail]", this.state.thumbnailFile);
    this.setState({ published: true });
    // this.state.titleInput.setAttribute;
    $("#upload-title").attr("disabled", true);
    $("#upload-title").css("background-color", "#ebebeb");
    $("#upload-description").attr("disabled", true);
    $("#upload-description").css("background-color", "#ebebeb");
    $("#upload-video").attr("disabled", true);
    $("#upload-thumbnail").attr("disabled", true);

    this.props.action(formData).then(response => {
      this.props.history.push(`/videos/${response.payload.video.id}`);
    });
  }

  handleVideoFile(e) {
    this.setState({ videoFile: e.currentTarget.files[0] });
  }

  handleThumbnailFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = e => {
      this.setState({ thumbnailFile: file, thumbnailUrl: fileReader.result });
    };
    fileReader.onload = e => {
      $("#thumbnail").attr("src", e.target.result);
    };

    this.state.uploadIconElement[0].style.fontSize = 0;
    this.state.thumbnailContainerElement[0].style.background = "black";
    this.state.thumbnailElement.style.display = "inherit";

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  render() {
    if (!this.props.currentUser) {
      this.props.history.replace("/login");
    }

    // if (!!this.state.titleInput && !!this.state.descriptionInput) {
    //   console.log("HERE IS THE TITLE HTML ELEMENT:  ", this.state.titleInput);
    //   console.log(
    //     "HERE IS THE DESCRIPTION HTML ELEMENT:  ",
    //     this.state.descriptionInput
    //   );
    // }

    // if (this.state.uploadIconElement) {
    //   console.log(
    //     "HERE'S WHAT THE UPLOAD ICON ELEMENT LOOKS LIKE SECOND TIME: ",
    //     this.state.uploadIconElement
    //   );
    // }

    // if (this.state.thumbnailElement) {
    //   console.log(
    //     "HERE'S WHAT THE UPLOAD ICON ELEMENT LOOKS LIKE SECOND TIME: "
    //     // this.state.thumbnailElement
    //   );
    // }

    // console.log("HERE'S JQUERY: ", $("#thumbnail"));

    // if (this.state.thumbnailUrl) {
    // }

    // const thumbnailPreview = this.state.thumbnailUrl ? (
    //   <img src={this.state.thumbnailUrl} />
    // ) : (
    //   <FontAwesomeIcon icon={faCamera} className="upload-thumbnail-icon" />
    // );

    const videoPreview = this.state.videoFile ? (
      <FontAwesomeIcon icon={faCheck} className="upload-video-icon-check" />
    ) : (
      <FontAwesomeIcon icon={faVideo} className="upload-video-icon" />
    );

    const publishButton = this.state.published ? (
      <FontAwesomeIcon icon={faSyncAlt} spin className="publish-icon" />
    ) : (
      <button className="publish-button" onClick={this.handleSubmit}>
        {this.props.formType}
      </button>
    );

    const disableFields = this.state.published ? "disabled" : "";

    return (
      <div className="upload-parent-container">
        <NavBarContainer url={this.props.url} />
        <ModalSideBarContainer />

        {/* <div className="upload-form-background"> */}
        <div className="upload-main-container">
          <SideBarContainer />
          <div className="upload-form-parent-container">
            <div className="upload-form-container">
              <h2>{this.props.formTitle}</h2>
              <form onSubmit={this.handleSubmit} className="edit-form">
                <div className="video-form-input-buttons">
                  <label className="custom-file-upload">
                    {/* <FontAwesomeIcon icon={faVideo} className="upload-video-icon"/> */}
                    <input
                      type="file"
                      accept="video/mp4,video/x-m4v,video/*"
                      onChange={this.handleVideoFile}
                      id="upload-video"
                    />
                    {videoPreview}
                  </label>
                  {/* className="custom-file-upload" */}
                  {/* THIS CSS CLASS NAME IS GONNA BE INCLUDED IN LABLES */}
                  <label className="custom-file-thumbnail">
                    {/* <FontAwesomeIcon icon={faCamera} className="upload-thumbnail-icon"/> */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={this.handleThumbnailFile}
                      id="upload-thumbnail"
                    />
                    <div className="upload-thumbnail-icon">
                      <FontAwesomeIcon icon={faCamera} />
                    </div>
                    <img id="thumbnail" src="#" alt="" />
                    {/* {thumbnailPreview} */}
                  </label>
                </div>
                <div className="edit-form-bottom">
                  <input
                    type="text"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.update("title")}
                    id="upload-title"
                  />

                  <textarea
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.update("description")}
                    id="upload-description"
                  />
                </div>

                <div className="edit-form-buttons">
                  {publishButton}
                  {/* <FontAwesomeIcon icon={faSyncAlt} spin /> */}
                  {/* <button
                    className="publish-button"
                    onClick={this.handleSubmit}
                  >
                    {this.props.formType}
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* </div> */}
      </div>
    );
  }
}

export default withRouter(UploadVideoForm);
