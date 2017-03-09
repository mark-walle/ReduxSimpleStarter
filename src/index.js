// Javascript modules require access to external references.
// Therefore we need to explicitly access React inside here.
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDv7swsFI7arvkIRPi9i_pw9RlrqpVtOnk';

// // Create a new component. This component should produce
// // some HTML
// const App = () => {   // const is like var but saying that App will never change.
// 	return (
// 		<div>
// 			<SearchBar />
// 		</div>
// 	); //this is JSX, a subset of javascript that looks like html. 
// }

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('surfboards');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		const videoSearch= _.debounce((term) => {this.videoSearch(term) }, 300);

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} />
			</div>
		);
	}
}

// Take this component's generated HTML and put it 
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
// This creates an instance of component App
// second argument is the target DOM node