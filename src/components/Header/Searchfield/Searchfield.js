import { Component } from "react";

class Searchfield extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      equalText: []
    };
  }

  getQuertyData() {
    fetch("/dbImitation/films.json")
      .then(res => {
        return res.json();
      })
      .then(res => {
        let current = res.films.reduce((acc, film) => {
          let { inputText } = this.state,
            { name } = film;

          if (
            name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1 &&
            inputText
          ) {
            acc.push(name);
          }

          return acc;
        }, []);

        this.setState({ equalText: current });
      });
  }

  inputHandler = (e) => {
    this.setState({ inputText: e.target.value });
    this.getQuertyData();
  };

  showEqualText = () => {
    let { equalText } = this.state;

    return equalText.map(item => (
      <div onClick={this.equalTextHandler}>{item}</div>
    ));
  };

  equalTextHandler = e => {
    this.setState({ inputText: e.target.textContent, equalText: [] });
  };

  render() {
    return (
      <div className={this.props.className}>
        <label htmlFor="search-field">Search</label>
        <div>
          <input
            type="text"
            id="search-field"
            onChange={this.inputHandler}
            value={this.state.inputText}
          />
          {this.state.equalText.length > 0 && (
            <div>
              <div className="equal-text">{this.showEqualText()}</div>
            </div>
          )}
        </div>
        <button>Search</button>
      </div>
    );
  }
}

export default Searchfield;
