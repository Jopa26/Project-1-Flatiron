import React from 'react';
import './App.css';

import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../linkS/Spotify';


class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      searchResults: [{name: 'name1', artist: 'artist1', album: 'album1', id: 1}, {name: 'name2', artist: 'artist2', album: 'album2', id: 2},{name: 'name3', artist: 'artist3', album: 'album3', id: 3}]
    }
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  };

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    } else {
      tracks.push(track);
      this.setState({ playlistTracks: tracks })
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }


  render(){
    return (
      <div>
  <h1>Ha<span className="highlight">bibi</span>Beat</h1>
  <div className="App">
    <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
       <SearchResults searchResults={this.state.searchResults} 
                      onAdd={this.addTrack} />
       <Playlist playlistName={this.state.playlistName} 
                    playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylist} />
    </div>
  </div>
</div>
    );
  }


}

export default App;
