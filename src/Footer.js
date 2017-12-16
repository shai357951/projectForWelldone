import React, { Component } from "react";

const styles = {
  container: {
    backgroundColor: "rgba(153,153,153,1)",
    display: "flex",
    height: 70,
    justifyContent: "space-around",
    alignItems: "center",
  },
  navigationText: {
    color: "#fff",
    fontWeight: 100,
  },
};

function Footer(props) {
  var handleClick = props.onClick;
  return (
    <div style={styles.container}>
      <a style={styles.navigationText} href="#" onClick={() => handleClick(1)}>
        מיקומים
      </a>
      <a style={styles.navigationText} href="#" onClick={() => handleClick(2)}>
        קטגוריות
      </a>
    </div>
  );
}

export default Footer;
