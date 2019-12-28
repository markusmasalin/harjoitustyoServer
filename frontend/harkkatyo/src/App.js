import React from 'react';
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import TableOfContents from './Components/tableOfContent'
import Home from './Components/home'
import About from './Components/about'


const App = () => {
  const padding = { padding: 5 }

  return (
    <div>
    <Router>
      <h1>Psykologia 1 </h1>
      <div>
        <Link style={padding} to="/">Aloitus</Link>
        <Link style={padding} to="/contents">Sisältö</Link>
        <Link style={padding} to="/about">Kurssiohjeet</Link>

      </div>
      <Route exact path="/" render={() => <Home />} />
          <Route path="/contents" render={() => <TableOfContents />} />
          <Route path="/about" render={() => <About />} />
      <h2></h2>
     
    
    </Router>
    <div>
        <br />
        <em>Psykologian oppikirja, All rights reserved Design by Markus Masalin</em>
      </div>

     
    </div>
  );
}

export default App;
