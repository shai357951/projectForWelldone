import React, { Component } from "react";
const styles = {
  contanier: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  warrperAddPlacese: {
    margin: 10,
    disabled: "flex",
    flexDirection: "row",
  },
  contanierAddPlacesesTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  warrperAddPlacesesTitleInputs: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  warrperInput: {
    //בשביל כל אינפוט
  },
  decidesChronology: {
    marginLeft: "35px",
    marginTop: "35px",
  },
  savedPlacses: {
    marginLeft: "35px",
  },
  savedPlacse: {
    margin: 10,
  },
};

class AddPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInputName: "",
      valueInputAddress: "",
      valueInputCoords: "",
      valueInputCategory: "",
    };
    if (props.placeData) {
      this.state = {
        valueInputName: props.placeData.name,
        valueInputAddress: props.placeData.address,
        valueInputCoords: props.placeData.coords,
        valueInputCategory: props.placeData.category,
      };
    }
  }

  getSavedPlaces() {
    var savedPlaces = this.props.savedPlaces || [];
    var arrOfCaregories = this.props.arrOfCaregories;
    var onFocus = this.props.onFocus;
    var editPlace = this.props.editPlace;
    var focusedPlace = this.props.focusedPlace;
    var placeData = this.props.placeData;
    var isFocused = focusedPlace == placeData.name;
    var style = Object.assign({}, styles.savedPlacse, {
      color: isFocused ? "blue" : "black",
    });
    if (editPlace && isFocused) {
      return (
        <div style={styles.warrperAddPlacesesTitleInputs}>
          <div onClick={() => onFocus(placeData.name)} style={style}>
            {placeData.name}
          </div>
          <div>
            <button onClick={this.hendleSave}>
              ערוך מיקום
            </button>
          </div>
          <div>
            <input
              value={this.state.valueInputName}
              onChange={this.hendleChangeName}
              placeholder="שם"
            />
          </div>
          <div>
            <input
              onChange={this.hendleChangeAddress}
              value={this.state.valueInputAddress}
              placeholder="כתובת"
            />
          </div>
          <div>
            <input
              onChange={this.hendleChangeCoords}
              value={this.state.valueInputCoords}
              placeholder="קוארדינטות"
            />
          </div>
          <div>
            <ContainCategories
              onChange={this.hendleChangeCategory}
              disabledSelected={true}
              upOption="קטגרויות"
              gettingCategories={arrOfCaregories}
              value={this.state.valueInputCategory}
            />
          </div>
        </div>
      );
    } else if (isFocused) {
      return (
        <div>
          <div onClick={() => onFocus(placeData.name)} style={style}>
            {placeData.name}
          </div>
          <div style={styles.savedPlacses}>
            כתובת{"-" + placeData.address}
          </div>
          <div style={styles.savedPlacses}>
            קוארדינטות {"-" + placeData.coords}
          </div>
          <div style={styles.savedPlacses}>
            קטגרויות{"-" + placeData.category}
          </div>
        </div>
      );
    }
    return (
      <div onClick={() => onFocus(placeData.name)} style={style}>
        {placeData.name}
      </div>
    );
  }

  render() {
    var mode = this.props.mode;
    if (!mode) {
      var show = this.props.show;
      var arrOfCaregories = this.props.arrOfCaregories;
      if (show) {
        return (
          <div style={styles.warrperAddPlacese}>
            <div style={styles.contanierAddPlacesesTitle}>
              הוסף מיקום
            </div>
            <div style={styles.warrperAddPlacesesTitleInputs}>
              <button onClick={this.hendleSave}>
                הוסף מיקום
              </button>
              <div style={styles.warrperInput}>
                <input onChange={this.hendleChangeName} placeholder="שם" />
              </div>
              <div style={styles.warrperInput}>
                <input
                  onChange={this.hendleChangeAddress}
                  placeholder="כתובת"
                />
              </div>
              <div style={styles.warrperInput}>
                <input
                  onChange={this.hendleChangeCoords}
                  placeholder="קואורדינטות"
                />
              </div>
              <div style={styles.warrperInput}>
                <ContainCategories
                  onChange={this.hendleChangeCategory}
                  disabledSelected={true}
                  upOption={"קטגוריות"}
                  gettingCategories={arrOfCaregories}
                />
              </div>
            </div>
          </div>
        );
      }
      return null;
    }
    return this.getSavedPlaces();
  }

  hendleChangeName = ev => {
    this.setState({ valueInputName: ev.target.value });
  };
  hendleChangeAddress = ev => {
    this.setState({ valueInputAddress: ev.target.value });
  };
  hendleChangeCoords = ev => {
    this.setState({ valueInputCoords: ev.target.value });
  };
  hendleChangeCategory = ev => {
    this.setState({ valueInputCategory: ev.target.value });
  };
  hendleSave = () => {
    var name = this.state.valueInputName;
    var address = this.state.valueInputAddress;
    var coords = this.state.valueInputCoords;
    var category = this.state.valueInputCategory;
    this.props.onSave(name, address, coords, category);
  };
}

function ContainCategories(props) {
  var onChange = props.onChange;
  var gettingCategories = props.gettingCategories || [];
  var upOption = props.upOption;
  var disabledSelected = props.disabledSelected;
  var value = props.value;
  var options = gettingCategories.map(x => <option>{x}</option>);

  return (
    <select value={value} onChange={onChange}>
      <option value="" disabled={disabledSelected} selected>{upOption}</option>
      {options}
    </select>
  );
}
function SavedPlaces(props) {
  var savePlace = props.onSave;
  var arrOfCaregories = props.arrOfCaregories;
  var savedPlaces = props.savedPlaces || [];
  var onFocus = props.onFocus;
  var editPlace = props.editPlace;
  var focusedPlace = props.focusedPlace;
  var places = savedPlaces.map(x => {
    return (
      <AddPlace
        mode={true}
        onSave={savePlace}
        arrOfCaregories={arrOfCaregories}
        placeData={x}
        onFocus={onFocus}
        editPlace={editPlace}
        focusedPlace={focusedPlace}
      />
    );
  });

  return (
    <div>
      {places}
    </div>
  );
}
function Places(props) {
  var activeAddPlace = props.activeAddPlace;
  var arrOfCaregories = props.arrOfCaregories;
  var savePlace = props.savePlace;
  var savedPlaces = props.savedPlaces;
  var focusedPlace = props.focusedPlace;
  var onFocus = props.onFocus;
  var editPlace = props.editPlace;
  var onEdited = props.onEdited;
  return (
    <div style={styles.contanier}>
      <AddPlace
        show={activeAddPlace}
        onSave={savePlace}
        arrOfCaregories={arrOfCaregories}
      />
      <div style={styles.decidesChronology}>
        <ContainCategories
          upOption={"הכל"}
          // disabledSelected={false}
          gettingCategories={arrOfCaregories}
        />
        <SavedPlaces
          onFocus={onFocus}
          focusedPlace={focusedPlace}
          savedPlaces={savedPlaces}
          editPlace={editPlace}
          arrOfCaregories={arrOfCaregories}
          onSave={onEdited}
        />
      </div>

    </div>
  );
}

export default Places;
