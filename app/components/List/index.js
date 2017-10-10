/**
 * Created by tiwenleo on 17/10/6.
 */
import React, { Component } from "react";
const List = ({items}) => {
  items = items || [];
  return (
    <div className="List">
      {items.map((e)=> {
        return <div key={e.id}>
          <a href={e.html_url}>{e.name}</a>by
          <a href={e.owner.html_url}>{e.owner.login}</a>
          <p>{e.description}</p>
        </div>
      })}
    </div>);
};
export default List;
