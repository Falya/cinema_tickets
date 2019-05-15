import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Searchfield extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            equalText: []
        }

        this.innputHandler = this.innputHandler.bind(this);
        this.getQuertyData = this.getQuertyData.bind(this);
        this.equalTextHandler = this.equalTextHandler.bind(this);
    }

    getQuertyData() {
        fetch('/dbImitation/films.json')
            .then(res => {
                return res.json();
            })
            .then(res => {
                let current = res.films.reduce((acc, film) => {
                    let { inputText } = this.state,
                        { name } = film.name;
                    if (film.name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1 && inputText) {
                        acc.push(film.name);
                    }
                    return acc;
                }, []);
                this.setState({ equalText: current });
            });
    }

    innputHandler(e) {
        this.setState({ inputText: e.target.value });
        this.getQuertyData();
    }

    showEqualText() {
        let {equalText} = this.state;
        let items;
        if(equalText.length > 0) {
            items = equalText.map(item => (<div onClick={this.equalTextHandler}>{item}</div>));
        }
        return items;
    }

    equalTextHandler(e) {
        this.setState({inputText: e.target.textContent, equalText: []});
    }

    render() {

        return (
            <div className={this.props.className}>
                <label htmlFor="searchfield">Поиск</label>
                <div>
                    <input type="text" id='searchfield' onChange={this.innputHandler} value={this.state.inputText} />
                    {this.state.equalText.length > 0 && <div>
                        <div className="equal-text">
                            {this.showEqualText()}
                        </div>
                    </div>}
                </div>
                <button>Search</button>
            </div>
        );
    }
}


export default Searchfield;
