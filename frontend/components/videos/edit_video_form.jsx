import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import NavBarContainer from "../nav_bar/nav_bar_container";
import SideBarContainer from "../sidebar/sidebar_container";
import ModalSideBarContainer from "../sidebar/modal_sidebar_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

class EditVideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      title: "",
      description: "",
      id: "",
      thumbnailFile: null,
      thumbnailUrl: null,
      processed: false,
    };
    // processed portion of state will dictate if edit and delete
    // buttons will disappear and show fontawesome icon
    // spinning instead to avoid user making additional
    // ajax calls which would lead to additional http requests
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteVideo = this.handleDeleteVideo.bind(this);
    this.handleThumbnailUpload = this.handleThumbnailUpload.bind(this);
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.target.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("id", this.props.video.id);
    // formData.append("video[id]", this.props.video.id);
    formData.append("video[title]", this.state.title);
    formData.append("video[description]", this.state.description);
    if (!!this.state.thumbnailFile) {
      formData.append("video[thumbnail]", this.state.thumbnailFile);
    }
    let payload = {
      formData,
      videoId: this.props.video.id,
    };
    this.setState({
      processed: true,
    });
    $("#edit-form-input-title").attr("disabled", true);
    $("#edit-form-input-title").css("background-color", "#ebebeb");
    $("#edit-form-input-description").attr("disabled", true);
    $("#edit-form-input-description").css("background-color", "#ebebeb");
    $("#video-form-thumbnail-upload").attr("disabled", true);

    // let videoEditPayload = {
    //   title: this.state.title,
    //   description: this.state.description,
    //   id: this.props.match.params.videoId,
    // };
    this.props
      .action(payload)
      .then(() => this.props.history.push(`/videos/${this.props.video.id}`));
  }

  handleThumbnailUpload(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ thumbnailFile: file, thumbnailUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleDeleteVideo(e) {
    e.preventDefault();
    this.setState({ processed: true });
    $("#edit-form-input-title").attr("disabled", true);
    $("#edit-form-input-title").css("background-color", "#ebebeb");
    $("#edit-form-input-description").attr("disabled", true);
    $("#edit-form-input-description").css("background-color", "#ebebeb");
    $("#video-form-thumbnail-upload").attr("disabled", true);
    this.props
      .deleteVideo(this.state.id)
      .then(() => this.props.history.push("/"));
  }

  handleThumbnailClick() {
    document.getElementById("video-form-thumbnail-upload").click();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchVideo(this.props.match.params.videoId).then((response) => {
      this.setState({
        loaded: true,
        id: this.props.match.params.videoId,
        title: this.props.video.title,
        description: this.props.video.description,
        thumbnailUrl: this.props.video.thumbnailUrl,
      });
    });
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }

    if (this.props.currentUser.id !== this.props.video.uploader_id) {
      this.props.history.push("/");
    }
    // if (!this.props.currentUser) {
    //     this.props.history.replace('/login');
    // }

    // if processed is true, render spin icon, otherwise
    // render default set of tools
    const editTools = this.state.processed ? (
      <FontAwesomeIcon icon={faSyncAlt} spin className="edit-spin-icon" />
    ) : (
      <div className="edit-form-buttons">
        <button className="next-button" onClick={this.handleSubmit}>
          {this.props.formType}
        </button>
        <button className="delete-button" onClick={this.handleDeleteVideo}>
          Delete Video
        </button>
      </div>
    );

    return (
      <div className="edit-parent-container">
        <NavBarContainer url={this.props.url} />
        <ModalSideBarContainer />

        <div className="upload-form-background">
          <div className="edit-container">
            <SideBarContainer />
            <div className="edit-main-container">
              <div className="edit-space-recommended"></div>
              <div className="video-form-parent-container">
                <div className="video-form-container">
                  <h2>{this.props.formTitle}</h2>
                  <form onSubmit={this.handleSubmit} className="edit-form">
                    <div className="edit-form-bottom">
                      <input
                        id="video-form-thumbnail-upload"
                        type="file"
                        accept="image/*"
                        onChange={this.handleThumbnailUpload}
                      />
                      <label className="video-thumbnail-edit-container">
                        <button
                          type="button"
                          className="edit-form-thumbnail-button"
                          onClick={this.handleThumbnailClick.bind(this)}
                        >
                          Change Thumbnail
                        </button>
                        <img
                          src={this.state.thumbnailUrl}
                          alt={this.props.video.title + " thumbnail"}
                          className="edit-thumbnail"
                        />
                      </label>

                      <input
                        id="edit-form-input-title"
                        type="text"
                        placeholder="Title"
                        value={this.state.title}
                        onChange={this.update("title")}
                      />

                      <textarea
                        id="edit-form-input-description"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.update("description")}
                      />
                      {editTools}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditVideoForm);
