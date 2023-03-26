import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route as RouterRoute } from 'react-router-dom';
import PopulationChart from './components/populationChart/populationChart'
import Route from './enum/route.enum';
class App extends Component {
  render() {
    return (
      <Router >
        <div className="column">
          <div className="column">
            {/* {Storages.loginStorage.getToken() && <HomeNavbar />} */}
          </div>
        </div>
        <div className="container-fixed">
        <div className="columns">
        <div  className="column is-2">
          {/* {Storages.loginStorage.getToken() && <div id="scrollableContentSidebar" > */}
            <div className='container is-fullhd'>
              <div className="notification is-white">
                {/* <SideMenubar /> */}
              </div>
            </div>
          </div>
          <div  className="column is-10">
          <div id="scrollableContent">
                <Routes>
                  {/* <RouterRoute exact path={Route.PopulationChart} component={PopulationChart}></RouterRoute> */}
                  <RouterRoute exact={true} path={Route.PopulationChart} component={PopulationChart}></RouterRoute>

                  {/* <RouterRoute exact component={Home}></RouterRoute> */}
                </Routes>
              </div>
            </div>
          
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
