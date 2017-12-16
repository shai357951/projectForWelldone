import React, { Component } from "react";
import Footer from "./Footer.js";
import Header from "./Header.js";

const styles = {
  contanier: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  warrperInput: {
    display: "flex",
  },
  warrperAddCategoy: {
    display: "flex",
    justifyContent: "space-around",
    flex: 1,
    marginTop: 15,
  },
  contanierCategories: {
    margin: 15,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  warrperCategory: {
    margin: 10,
  },
  savedCategory: {
    margin: 10,
  },
};
class AddCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: "",
    };
  }

  render() {
    var show = this.props.show;
    var onCreate = this.props.onCreate;
    if (show) {
      return (
        <div style={styles.warrperAddCategoy}>
          <div>
            <button onClick={this.hendleCreate}>
              הוסף קטגוריה
            </button>
          </div>
          <div>
            <input placeholder="name" onChange={this.hendleChange} />
          </div>
        </div>
      );
    }
    return null;
  }

  hendleChange = ev => {
    this.setState({ valueInput: ev.target.value });
  };
  hendleCreate = () => {
    this.props.onCreate(this.state.valueInput);
  };
}

function SavedCategories(props) {
  var gettingCategories = props.gettingCategories || [];
  var onFocus = props.onFocus;
  var focusedCategory = props.focusedCategory;
  var categories = gettingCategories.map(x => {
    var isFocused = focusedCategory == x;
    var style = Object.assign({}, styles.savedCategory, {
      color: isFocused ? "blue" : "black",
    });
    return <div onClick={() => onFocus(x)} style={style}>{x}</div>;
  });

  return (
    <div>
      {categories}
    </div>
  );
}

function Categories(props) {
  var activeAddCategories = props.activeAddCategories;
  var saveCategory = props.saveCategory;
  var arrOfCaregories = props.arrOfCaregories;
  var onFocus = props.onFocus;
  var focusedCategory = props.focusedCategory;
  return (
    <div style={styles.contanier}>
      <div style={styles.warrperInput}>
        <AddCategories show={activeAddCategories} onCreate={saveCategory} />
      </div>
      <div style={styles.contanierCategories}>
        <div>
          רשימת קטגוריות
        </div>
        <div>
          <div style={styles.warrperCategory}>
            <SavedCategories
              style={styles.savedCategory}
              gettingCategories={arrOfCaregories}
              onFocus={onFocus}
              focusedCategory={focusedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
