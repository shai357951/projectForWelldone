import React, { Component } from "react";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Places from "./Places.js";
import Categories from "./Categories.js";
import "./App.css";

const styles = {
  contanier: {
    backgroundColor: "#eee",
    height: "100%",
    flexDirection: "column",
  },
  contanierMode: {
    display: "flex",
    minHeight: "80%",
    width: "100%",
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 1,
      showHideAddPlace: false,
      showHideAddCategory: false,
      categoriesNames: [],
      focusedCategory: "",
      focusedPlace: "",
      places: [],
      editedPlace: "",
    };
  }

  getMode() {
    if (this.state.mode == 1) {
      return (
        <Places
          savedPlaces={this.state.places}
          activeAddPlace={this.state.showHideAddPlace}
          arrOfCaregories={this.state.categoriesNames}
          savePlace={this.handleCreatPlace}
          focusedPlace={this.state.focusedPlace}
          onFocus={this.handleFocusedPlace}
          editPlace={this.state.editedPlace}
          onEdited={this.handleSavePlace}
        />
      );
    } else {
      return (
        <Categories
          activeAddCategories={this.state.showHideAddCategory}
          saveCategory={this.handleCreatCategory}
          arrOfCaregories={this.state.categoriesNames}
          onFocus={this.handleFocusedCategory}
          focusedCategory={this.state.focusedCategory}
        />
      );
    }
  }
  render() {
    var title = "מקומות";
    if (this.state.mode == 2) {
      title = "קטגוריות";
    }
    return (
      <div style={styles.contanier}>
        <Header
          title={title}
          onDelete={this.handleDelete}
          onAdd={this.handleHeaderAdd}
          onEdited={this.handleEditedPlace}
        />
        <div style={styles.contanierMode}>
          {this.getMode()}
        </div>
        <Footer onClick={this.handleFooterClick} />
      </div>
    );
  }
  handleFooterClick = mode => {
    this.setState({ mode: mode });
  };
  handleFocusedCategory = name => {
    this.setState({ focusedCategory: name });
  };
  handleFocusedPlace = name => {
    this.setState({ focusedPlace: name });
  };
  handleEditedPlace = () => {
    this.setState({ editedPlace: this.state.focusedPlace });
  };
  handleDelete = () => {
    var focusedCategory = this.state.focusedCategory;
    var categoriesNames = this.state.categoriesNames;
    var focusedPlace = this.state.focusedPlace;
    var places = this.state.places;
    var mode = this.state.mode;
    if (mode == 2) {
      var newArr = categoriesNames.filter(x => x != focusedCategory);
      this.setState({ categoriesNames: newArr });
    } else {
      var newArr = places.filter(x => x.name != focusedPlace);
      this.setState({ places: newArr });
    }
  };
  handleHeaderAdd = () => {
    var mode = this.state.mode;
    if (mode == 1) {
      this.setState({ showHideAddPlace: true });
    } else {
      this.setState({ showHideAddCategory: true });
    }
  };
  handleCreatCategory = name => {
    var categoriesNames = this.state.categoriesNames;
    var newArr = categoriesNames.filter(x => x == name);
    if (newArr.length > 0) {
      alert("אתה לא יכול להוסיף שתי קטגוריות באותו השם");
    } else {
      this.setState({
        categoriesNames: this.state.categoriesNames.concat([name]),
      });
    }
  };

  handleSavePlace = (name, address, coords, category) => {
    var places = this.state.places;
    var focusedPlace = this.state.focusedPlace;
    var newArr = Object.assign([], places);
    var placeIndex = places.findIndex(p => p.name === focusedPlace);
    newArr[placeIndex] = {
      name: name,
      address: address,
      coords: coords,
      category: category,
    };
    this.setState({
      places: newArr,
      editedPlace: "",
      focusedPlace: "",
    });
  };
  handleCreatPlace = (name, address, coords, category) => {
    var places = this.state.places;
    if (name == "" || address == "" || coords == "" || category === "") {
      return alert("חסר מידע כדי לייצור מקום חדש");
    }
    var newArr = places.filter(x => x.name == name);
    if (newArr.length > 0) {
      alert("אתה לא יכול להוסיף שני מקומות באותו השם");
    } else {
      this.setState({
        places: this.state.places.concat([
          { name: name, address: address, coords: coords, category: category },
        ]),
      });
    }
  };
}

export default App;
