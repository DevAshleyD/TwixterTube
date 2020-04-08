import React from "react";
import NavBarContainer from "../nav_bar/nav_bar_container";
import VideoIndexItem from "./video_index_item";
import { withRouter } from "react-router-dom";
import SideBarContainer from "../sidebar/sidebar_container";
import ModalSideBarContainer from "../sidebar/modal_sidebar_container";

class VideosIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      // windowListener: false,
    };
    this.windowListener = false;
    // this.firstVidRef = React.createRef();
    this.videoListRef = React.createRef();
    this.handleLoad = this.handleLoad.bind(this);
    this.load = false;
    this.usedFunctionWithLoad = false;
    this.windowResiszeListener = this.windowResiszeListener.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.props.fetchVideos();

    this.setState({
      loaded: true,
    });
  }

  componentDidUpdate() {
    if (this.load === true && this.usedFunctionWithLoad === false) {
      this.handleLoad();
      this.usedFunctionWithLoad = true;
    }
  }

  handleLoad() {
    let width = this.videoListRef.current.children[0].offsetWidth;
    let height = this.videoListRef.current.children[0].offsetHeight;

    let children = Object.values(this.videoListRef.current.children);

    for (let i = 1; i < children.length; i++) {
      let child = children[i];
      if (child.offsetWidth !== width || child.offsetHeight !== height) {
        child.style.maxWidth = width + "px";
        child.style.maxHeight = height + "px";
      }
    }
  }

  windowResiszeListener() {
    window.addEventListener("resize", () => {
      // console.log("HERE IS THE FIRST VIDEO:    ", this.firstVidRef);
      // console.log("HERE IS THE VIDEO LIST REF:    ", this.videoListRef);
      // console.log(
      //   "HERE IS CHILDREN CHILD:    ",
      //   this.videoListRef.current.children[8]
      // );
      // console.log(
      //   "WHAT IS THE TYPE OF THE CHILDREN:    ",
      //   typeof Object.values(this.videoListRef.current.children)
      // );

      this.handleLoad();

      // this.videoListRef.current.children[8].style.maxWidth = width + "px";
      // this.videoListRef.current.children[8].style.maxHeight = height + "px";

      // let style = {
      //   width: width + "px",
      //   height: height + "px",
      // };
    });

    // this.videoListRef.current.addEventListener("load", () => {
    //   let width = this.videoListRef.current.children[0].offsetWidth;
    //   let height = this.videoListRef.current.children[0].offsetHeight;

    //   let children = Object.values(this.videoListRef.current.children);

    //   for (let i = 1; i < children.length; i++) {
    //     let child = children[i];
    //     if (child.offsetWidth !== width || child.offsetHeight !== height) {
    //       child.style.maxWidth = width + "px";
    //       child.style.maxHeight = height + "px";
    //     }
    //   }
    // });
    if (this.windowListener === false) {
      this.windowListener = true;
    }
  }

  render() {
    let videos = this.props.videos.map((video, idx) => {
      // if (idx === 0 && !!video) {
      //   return (
      //     <VideoIndexItem
      //       video={video}
      //       key={video.id}
      //       uploaders={this.props.uploaders}
      //       // ref={this.firstVidRef}
      //     />
      //   );
      // }
      return (
        <VideoIndexItem
          video={video}
          key={video.id}
          uploaders={this.props.uploaders}
        />
      );
    });

    if (videos.length !== 0 && this.windowListener === false) {
      this.windowResiszeListener();
      this.load = true;
    }

    videos.sort(() => Math.random() - 0.5);

    return (
      <div>
        <NavBarContainer url={this.props.url} />
        {/* <h1>React is Working</h1> */}
        <div className="video-index-container-background">
          <div className="video-index-container-main">
            <SideBarContainer path={this.props.match.path} />
            <ModalSideBarContainer />
            <div className="video-index-main-content">
              <div className="video-index-main-recommended-inner">
                <div className="video-index-recommended-header">
                  <h1>Recommended</h1>
                </div>
                <div className="video-index-container">
                  <ul
                    className="video-index-container-items"
                    ref={this.videoListRef}
                  >
                    {videos}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(VideosIndex);
