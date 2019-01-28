import React from 'react';
import AppBar from 'material-ui/AppBar';

let NavBar = () => {
  return (
    <AppBar
      showMenuIconButton={false}
      style={{background: "darkgray"}}
      title="PixaBay Image Finder"
    />
  )
}

export default NavBar;
