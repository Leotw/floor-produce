/**
 * Created by tiwenleo on 17/10/6.
 */
import React, { Component, PropTypes } from "react";
import { userRequest, starredRepoRequest } from "./action";
import List from "../../components/List";
import LoadMore from "../../components/LoadMore";
import { connect } from "react-redux";

class UserPage extends Component {
  constructor(props) {
    super(props);
    //console.log(111);
  }

  componentDidMount() {
    console.log(1111);
    const {userRequest, login, starredRepoRequest, fetchOfUser, fetchOfRepo} = this.props;
    if (fetchOfUser || fetchOfRepo) {
      return false;
    }
    userRequest(login);
    starredRepoRequest(login);
  }

  componentWllMount() {
    // const {userRequest, login, starredRepoRequest, fetchOfUser, fetchOfRepo} = this.props;
    // if (fetchOfUser || fetchOfRepo) {
    //   return false;
    // }
    // userRequest(login);
    // starredRepoRequest(login);
  }

  loadMoreStarredRepo = () => {
    const {login, starredRepoRequest} = this.props;
    starredRepoRequest(login);
  };

  render() {
    const {users, starredRepo, errorMessageOfUsers, fetchOfUser, fetchOfRepo} = this.props;

    let name = users.name ? `(${users.name})` : '';
    return (
      <div className="UserPage">
        <img src={users.avatar_url} alt="avatar" width="100"/>
        {fetchOfUser ? <p>loading...</p> : <p>{users.login}{name}</p>}
        {errorMessageOfUsers}
        <List items={starredRepo.repos}/>
        <LoadMore
          fetch={fetchOfRepo}
          callback={this.loadMoreStarredRepo}/>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const login = ownProps.params.login.toLowerCase();
  const {users, starredRepo, errorMessageOfUsers, fetchOfUser, fetchOfRepo} = state;
  return {
    login,
    users,
    starredRepo,
    errorMessageOfUsers,
    fetchOfUser,
    fetchOfRepo
  }
};

export default connect(
  mapStateToProps,
  {userRequest, starredRepoRequest}
)(UserPage);
