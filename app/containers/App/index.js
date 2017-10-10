import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import Explore from "../../components/Explore";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./style.less";
import "../../css/common.less";

class App extends Component {

  constructor(props) {
    super(props)
  }

  getLogin = (value) => {
    browserHistory.push(value);

  };

  render() {
    const {fetchOfUser, login} = this.props;
    return (
      <ReactCSSTransitionGroup
        component="div"
        transitionName={ 'a' }
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={300}
        style={{height: "100%", width: "100%"}}>

        <div
          key={this.props.location.pathname}
          style={{height: "100%", width: "100%"}}>
          <Explore getLogin={this.getLogin} value={login}/>
          {fetchOfUser ? <p>Loading</p> : null}
          <div style={fetchOfUser ? {'display': 'none'} : {'display': 'block'}}>{this.props.children}</div>
        </div>

      </ReactCSSTransitionGroup>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  fetchOfUser: state.fetchOfUser,
  login: ownProps.params.login ? ownProps.params.login.toLowerCase() : ''
});

export default connect(mapStateToProps, {})(App)
