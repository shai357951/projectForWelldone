import React, { Component } from "react";

const styles = {
  container: {
    backgroundColor: "#29333d",
    height: "80px",
  },
  title: {
    fontSize: "18px",
    paddingTop: 10,
    justifyContent: "center",
    display: "flex",
    flex: 1,
    color: "#cbc9aa",
  },
  containerButton: {
    paddingTop: 15,
    display: "flex",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    color: "#cbc9aa",
  },
};

function Header(props) {
  var onAdd = props.onAdd;
  var onDelete = props.onDelete;
  var onEdited = props.onEdited;
  var title = props.title;
  var creatCategory = props.creatCategory;
  return (
    <div style={styles.container}>
      <div style={styles.title}>
        {title}
      </div>
      <div style={styles.containerButton}>
        <div>
          <button onClick={onAdd}>צור</button>
        </div>
        <div>
          <button onClick={onDelete}>מחק</button>
        </div>
        <div>
          <button onClick={onEdited}>ערוך</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
