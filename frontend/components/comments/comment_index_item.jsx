import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faCaretDown,
  faCaretUp,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { addLike, changeLike, removeLike } from "../../util/likes_util";
import ChildComment from "./child_comment";

// import { withRouter } from "react-router-dom";

const CommentIndexItem = (props) => {
  // like attributes
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [numberLikes, setNumberLikes] = useState(props.comment.likes);
  const [numberDislikes, setNumberDislikes] = useState(props.comment.dislikes);
  const [likeId, setLikeId] = useState(props.comment.like_id);
  // form attributes
  const [body, setBody] = useState("");
  const [buttonHide, setButtonHide] = useState(true);
  const [submitActive, setSubmitActive] = useState(false);

  // like system handling functions and logical based
  // rendtition of likes

  // console.log("HERE'S A NEW COMMENT, THIS THE COMMENT:  ", props.comment);
  // console.log(
  //   "HERES THE NUMBER COMMENT COMPONENT LIKE AND DISLIKE:  ",
  //   numberLikes,
  //   numberDislikes
  // );

  useEffect(() => {
    // like_id is only present for users who are logged in and if the comment has a like
    // associated with the currentUser
    if (!!likeId) {
      if (props.comment.liked === true) {
        setLike(true);
      } else if (props.comment.liked === false) {
        setDislike(true);
      }
    }

    // based on testing, only new comments made on same
    // component, numbers are for some reason always
    // undefined
    if (numberLikes === undefined) {
      setNumberLikes(0);
      setNumberDislikes(0);
    } else {
      setNumberLikes(props.comment.likes);
      setNumberDislikes(props.comment.dislikes);
    }

    // console.log(
    //   "HERES THE NUMBER COMMENT COMPONENT LIKE AND DISLIKE INSIDE useEffect:  ",
    //   props.comment,
    //   numberLikes,
    //   numberDislikes
    // );
  }, []);

  function handleCommentLike() {
    // console.log("HERE IS likeID WHEN CLICKING HANDLE LIKE FUCNTION:  ", likeId);
    if (!props.currentUser) {
      props.history.push("/login");
    } else {
      if (!!likeId) {
        if (props.comment.liked === false) {
          changeLike({
            id: likeId,
            liked: true,
            likeable_id: props.comment.id,
            likeable_type: "Comment",
          })
            // .then(() => props.fetchVideo(props.comment.video_id))
            .then(() => {
              setLike(true);
              setDislike(false);
              setNumberLikes(numberLikes + 1);
              setNumberDislikes(numberDislikes - 1);
            });
        } else {
          removeLike(likeId)
            // .then(() => props.fetchVideo(props.comment.video_id))
            .then(() => {
              setLike(false);
              setDislike(false);
              setNumberLikes(numberLikes - 1);
              setLikeId(null);
            });
        }
      } else {
        addLike({
          liked: true,
          likeable_id: props.comment.id,
          likeable_type: "Comment",
        })
          // .then(() => props.fetchVideo(props.comment.video_id))
          .then((likeData) => {
            setLike(true);
            setDislike(false);
            setNumberLikes(numberLikes + 1);
            setLikeId(likeData.id);
          });
      }
    }
  }

  function handleCommentDislike() {
    // console.log("HERE IS likeID WHEN CLICKING HANDLE LIKE FUCNTION:  ", likeId);
    if (!props.currentUser) {
      props.history.push("/login");
    } else {
      if (!!likeId) {
        if (props.comment.liked === true) {
          changeLike({
            id: likeId,
            liked: false,
            likeable_id: props.comment.id,
            likeable_type: "Comment",
          })
            // .then(() => props.fetchVideo(props.comment.video_id))
            .then(() => {
              setLike(false);
              setDislike(true);
              setNumberLikes(numberLikes - 1);
              setNumberDislikes(numberDislikes + 1);
            });
        } else {
          removeLike(likeId).then(() => {
            setLike(false);
            setDislike(false);
            setNumberDislikes(numberDislikes - 1);
            setLikeId(null);
          });
        }
      } else {
        addLike({
          liked: false,
          likeable_id: props.comment.id,
          likeable_type: "Comment",
        }).then((likeData) => {
          setLike(false);
          setDislike(true);
          setNumberDislikes(numberDislikes + 1);
          setLikeId(likeData.id);
        });
      }
    }
  }

  function handleDelete() {
    props.deleteComment(props.comment.id);
  }

  useEffect(() => {
    props.fetchVideo(props.comment.video_id);
  }, [like, dislike, likeId]);

  let deleteBtn;
  if (props.currentUser) {
    if (props.currentUser.id == props.comment.user_id) {
      deleteBtn = (
        <button className="comment-delete-button" onClick={handleDelete}>
          Delete
        </button>
      );
    }
  }

  let thumbLikeColor = "";
  let thumbDislikeColor = "";
  if (props.currentUser && likeId) {
    if (like) {
      thumbLikeColor = "thumb-colored";
      thumbDislikeColor = "";
    } else {
      thumbLikeColor = "";
      thumbDislikeColor = "thumb-colored";
    }
  }

  // child comments ul and rendering section

  function handleViewReplies() {
    showReplies ? setShowReplies(false) : setShowReplies(true);
  }

  let childCommentsArray = props.comment.child_comments
    ? Object.values(props.comment.child_comments)
    : [];

  let showRepliesText = showReplies
    ? "Hide " + childCommentsArray.length + " replies"
    : "View " + childCommentsArray.length + " replies";

  let showRepliesRendererButton =
    childCommentsArray.length > 0 ? (
      showReplies ? (
        <button
          className="show-replies-text-container"
          onClick={handleViewReplies}
        >
          <FontAwesomeIcon icon={faCaretUp} id="caret-icon" />
          <p>{showRepliesText}</p>
        </button>
      ) : (
        <button
          className="show-replies-text-container"
          onClick={handleViewReplies}
        >
          <FontAwesomeIcon icon={faCaretDown} id="caret-icon" />
          <p>{showRepliesText}</p>
        </button>
      )
    ) : null; // should be button with different text

  let childCommentsVisibilityCSS = showReplies
    ? "child-comment-list"
    : "child-comment-list hidden";

  let childComments = childCommentsArray.map((childComment, idx) => {
    return (
      <ChildComment
        comment={childComment}
        currentUser={props.currentUser}
        key={`comment-${idx}`}
        fetchVideo={props.fetchVideo}
        deleteChildComment={props.deleteChildComment}
      />
    );
  });

  // form section

  function toggleBtns() {
    if (buttonHide) {
      //   this.setState({ buttonHide: !this.state.buttonHide });
      setButtonHide(!buttonHide);
    }
  }

  function handleInput(e) {
    // this.setState({ body: e.currentTarget.value, submitActive: true });
    setBody(e.target.value);
    setSubmitActive(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props
      .addComment({
        body: body,
        video_id: props.comment.video_id,
        parent_id: props.comment.id,
      })
      .then(() => {
        setBody("");
        setButtonHide(true);
      });
    // setState({ body: "", buttonHide: true });
  }

  function handleCancel() {
    // this.setState({ body: "", buttonHide: true });
    setBody("");
    setButtonHide(true);
  }

  let currentUserIcon;
  let commentFormInput;
  if (props.currentUser) {
    currentUserIcon = (
      <p className="current-user-icon">
        {props.currentUser.username.slice(0, 1).toUpperCase()}
      </p>
    );
    commentFormInput = (
      <input
        type="text"
        value={body}
        placeholder="Add a public reply..."
        onChange={handleInput}
        onFocus={toggleBtns}
        onBlur={toggleBtns}
        className="signed-in"
      />
    );
  } else {
    currentUserIcon = (
      <FontAwesomeIcon icon={faUserCircle} className="comment-user-circle" />
    );
    commentFormInput = (
      <input
        type="text"
        value={body}
        placeholder="Please sign in to post a public comment"
        onChange={handleInput}
        onFocus={toggleBtns}
        onBlur={toggleBtns}
        // onClick={loggedOutUserClick}
        className="signed-out"
        disabled
      />
    );
  }

  let buttonClass;
  if (buttonHide) {
    buttonClass = "hidden";
  } else {
    buttonClass = "";
  }

  let active;
  if (submitActive && body !== "") {
    active = "comment-submit-btn-active";
    setTimeout(() => {
      document.getElementById("parent-comment-disable").disabled = false;
    }, 1);
  } else {
    active = "comment-submit-btn";
    setTimeout(() => {
      document.getElementById("parent-comment-disable").disabled = true;
    }, 1);
  }

  let formActive = buttonHide
    ? "comments-form-styling-container hidden"
    : "comments-form-styling-container";

  return (
    <li className="comment-container-item">
      <div className="comment-styling-container">
        <div className="comment-user-icon-container">
        <Link to={props.comment.user_id ? `/user/${props.comment.user_id}` : `/`} style={{ textDecoration: "none", color: "white" }}>
          <p className="comment-user-icon">
            {props.comment.author.slice(0, 1).toUpperCase()}
          </p>
        </Link>
        </div>
        <div className="comment-details-container">
          <Link to={props.comment.user_id ? `/user/${props.comment.user_id}` : `/`} style={{ textDecoration: "none", color: "black" }}>
            <p className="comment-username">{props.comment.author}</p>
          </Link>
          <p className="comment-body">{props.comment.body}</p>
          <div className="comment-like-system-container">
            <div
              className={`comment-like-thumb-container ${thumbLikeColor}`}
              onClick={handleCommentLike}
            >
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="comment-thumb-icon"
              />
              <strong>{numberLikes}</strong>
            </div>
            <div
              className={`comment-dislike-thumb-container ${thumbDislikeColor}`}
              onClick={handleCommentDislike}
            >
              <FontAwesomeIcon
                icon={faThumbsDown}
                className="comment-thumb-icon"
              />
              <strong>{numberDislikes}</strong>
            </div>
            <button className="reply-button" onClick={toggleBtns}>
              REPLY
            </button>
            {/* HERE IS WHERE BUTTON TO RENDER FORM GOES */}

            {/* HERE IS ACTUAL FORM */}
          </div>
          <div className={formActive}>
            <div className="video-show-comments-form">
              <form onSubmit={handleSubmit}>
                <span className="comment-form-input-container">
                  {commentFormInput}
                </span>
              </form>

              <div className={`comment-form-buttons ${buttonClass}`}>
                <button className="comment-cancel-btn" onClick={handleCancel}>
                  CANCEL
                </button>
                <button
                  id="parent-comment-disable"
                  className={active}
                  onClick={handleSubmit}
                >
                  COMMENT
                </button>
              </div>
            </div>
          </div>

          {/* HERE IS WHERE A SHOW REPLIES KIND OF SECTION SHOULD GO */}
          {showRepliesRendererButton}
          {/* SHOULD HAVE SHOW REPLIES ATTRIBUTE IN STATE TO TOGGLE */}
          {/* DISPLAY PROPERTIES OF SHOWING UL UNDERNEATH COMMENT DETAILS */}
          {/* THIS IS WHERE THE UL LIST SHOULD GO */}
          <ul className={childCommentsVisibilityCSS}>{childComments}</ul>
        </div>
      </div>
      <div>
        <div className="comment-button-container">{deleteBtn}</div>
      </div>
    </li>
  );
};

export default withRouter(CommentIndexItem);

/*
css styling

.reply-button:active {
  background-color: rgb(220, 220, 220);
}

.reply-button {
  border: none;
  background-color: rgb(249, 249, 249);
  font-size: 13px;
  color: #606060;
  font-weight: bolder;
  padding: 6px 16px 10px;
}
*/
