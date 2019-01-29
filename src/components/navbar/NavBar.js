import React from 'react';
import AppBar from 'material-ui/AppBar';

let NavBar = () => {
  return (
    <AppBar
      showMenuIconButton={false}
      style={{background: "darkgray"}}
      title="PixaBay Media Finder"
    />
  )
}

export default NavBar;
