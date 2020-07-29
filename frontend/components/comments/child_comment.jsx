import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { addLike, changeLike, removeLike } from "../../util/likes_util";

const ChildComment = (props) => {
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
  }, []);

  function handleCommentLike() {
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
    props.deleteChildComment(props.comment.id);
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
          </div>
        </div>
      </div>
      <div>
        <div className="comment-button-container">{deleteBtn}</div>
      </div>
    </li>
  );
};

export default withRouter(ChildComment);
