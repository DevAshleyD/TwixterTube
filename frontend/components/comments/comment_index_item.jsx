import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { addLike, changeLike, removeLike } from "../../util/likes_util";
import ChildComment from "./child_comment";

// import { withRouter } from "react-router-dom";

const CommentIndexItem = (props) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [numberLikes, setNumberLikes] = useState(props.comment.likes);
  const [numberDislikes, setNumberDislikes] = useState(props.comment.dislikes);
  const [likeId, setLikeId] = useState(props.comment.like_id);

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

    setNumberLikes(props.comment.likes);
    setNumberDislikes(props.comment.dislikes);
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

  function handleViewReplies() {
    showReplies ? setShowReplies(false) : setShowReplies(true);
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

  return (
    <li className="comment-container-item">
      <div className="comment-styling-container">
        <div className="comment-user-icon-container">
          <p className="comment-user-icon">
            {props.comment.author.slice(0, 1).toUpperCase()}
          </p>
        </div>
        <div className="comment-details-container">
          <p className="comment-username">{props.comment.author}</p>
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
