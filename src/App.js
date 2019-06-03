import React, {Component} from 'react';
import TableList from './components/TableList.js'
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1 >Xalq Banki Projects</h1>
        <div className="container">
        <div className="d-flex justify-content-center">
            <button className="btn btn-info mr-2">Current Projects</button>
            <Link to={{pathname: `/addNewProject/`
                     }}>
                    <button className="btn btn-outline-info">Add New Project + </button>
            </Link>
           
        </div>
        <div className="d-flex justify-content-between my-2">
          <h1 className="lead">Current Projects</h1>
          <Link to={{pathname: `/allDevelopers/`
                     }}>
                   <button className="btn btn-info">All Developers List &rarr;</button>
          </Link>
         
        </div>

            <table className="table table-striped">
                 <thead>
            <tr>
              <th scope="col">Project Id</th>
              <th scope="col">Project</th>
              <th scope="col">Start</th>
              <th scope="col">End</th>
            </tr>
          </thead>
          <TableList />
        </table>
        </div>

      </header>
    </div>
  );
}

export default App;
