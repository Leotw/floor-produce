/**
 * Created by tiwenleo on 17/10/6.
 */
import React, { Component } from "react";
const GITHUB_REPO = 'https://github.com/Leotw';
const Explore = ({getLogin, value}) => {
  let input;
  const setLogin = () => {
    getLogin(input.value);
  };
  return (
    <div className="Explore">
      <p>Type a username or repo full name and hit 'Go':</p>
      <input
        defaultValue={value}
        type="text"
        ref={node => {
          input = node
        }}/>
      <button onClick={setLogin}>Go!</button>
      <p>
        Code on <a href={GITHUB_REPO} target="_blank">Github</a>.
      </p>
      <p>
        Move the DevTools with Ctrl+W or hide them with Ctrl+H.
      </p>
    </div>
  );
};
export default Explore;
