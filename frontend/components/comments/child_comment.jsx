import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { addLike, changeLike, removeLike } from "../../util/likes_util";

const ChildComment = (props) => {
  //   const [like, setLike] = useState(false);
  //   const [dislike, setDislike] = useState(false);
  //   const [showReplies, setShowReplies] = useState(false);
  //   const [numberLikes, setNumberLikes] = useState(props.comment.likes);
  //   const [numberDislikes, setNumberDislikes] = useState(props.comment.dislikes);
  //   const [likeId, setLikeId] = useState(props.comment.like_id);

  //   useEffect(() => {
  //     // like_id is only present for users who are logged in and if the comment has a like
  //     // associated with the currentUser
  //     if (!!likeId) {
  //       if (props.comment.liked === true) {
  //         setLike(true);
  //       } else if (props.comment.liked === false) {
  //         setDislike(true);
  //       }
  //     }

  //     setNumberLikes(props.comment.likes);
  //     setNumberDislikes(props.comment.dislikes);
  //   }, []);

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
          {/* <div className="comment-like-system-container">
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
          </div> */}
        </div>
      </div>
      <div>
        {/* <div className="comment-button-container">{deleteBtn}</div> */}
      </div>
    </li>
  );
};

export default withRouter(ChildComment);
