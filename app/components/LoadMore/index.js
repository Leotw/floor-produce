/**
 * Created by tiwenleo on 17/10/7.
 */
import React, { Component } from "react";

const LoadMore = ({fetch, callback}) => {
  setTimeout(()=> {
    let loadMoreWrapper = document.getElementById('loadMoreWrapper');
    window.addEventListener('scroll', function() {
      if (fetch) {
        return false;
      }
      let top = loadMoreWrapper.getBoundingClientRect().top;
      let windowHeight = window.screen.height;
      if (top && top < windowHeight) {
        callback();
      }
    }, false);
  }, 500);
  return (
    <div id="loadMoreWrapper" className="LoadMore">
      {fetch ? <p>正在加载</p> : <p>加载更多</p>}
    </div>
  )
};
export default LoadMore;
