
import React from 'react';

import './TrackList.css';

import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    if (this.props.tracks) {
      const trackList = this.props.tracks.map(track => {
        return <Track 
        key={track.id} 
        track={track} 
        onAdd={this.props.onAdd} 
        onRemove={this.props.onRemove} 
        isRemoval={this.props.isRemoval} /> 
    })
  
  return ( 
    <div className="TrackList" track={this.props.playlistTracks}>
    { trackList }
     </div>
   )
  }
 }
}

export default TrackList;