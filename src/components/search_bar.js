import React, { Component } from 'react'; //because we're using jsx

// const SearchBar = () => {
// 	return <input />;
// };

// refactoring from functional based to class based component
class SearchBar extends Component {
	constructor(props){
		super(props);

		this.state = { term: '' };
	}

	render() {
		return (
			<div className="search-bar">
				<input
					value = {this.state.term}
					onChange={event => this.onInputChange(event.target.value)} />
			</div>
		);
	}

	// set the state with the term
	// call the callback that we got from app
	onInputChange(term) {
		this.setState({term});
		this.props.onSearchTermChange(term);
	}
}

export default SearchBar;