import { connect } from "react-redux";
import CommentIndex2 from "./comments_index_2";
import * as CommentActions from "../../actions/comments_actions";

const msp = (state, ownProps) => {
  let comments = Object.values(state.entities.comments);
  let currentUser = state.entities.users[state.session.currentUser];

  let videoId = state.entities.videoShow.video.id;
  return {
    comments,
    currentUser,
    videoId,
  };
};

const mdp = (dispatch) => {
  return {
    addComment: (commentData) =>
      dispatch(CommentActions.addComment(commentData)),
    editComment: (commentData) =>
      dispatch(CommentActions.editComment(commentData)),
    deleteComment: (commentId) =>
      dispatch(CommentActions.deleteComment(commentId)),
    deleteChildComment: (commentId) =>
      dispatch(CommentActions.deleteChildComment(commentId)),
  };
};

export default connect(msp, mdp)(CommentIndex2);
