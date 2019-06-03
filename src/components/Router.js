import React from 'react';
import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import App from '../App';
import Info from './Info';
import DeveloperList from './DeveloperList';
import AddNewProject from './AddNewProject';

const Router = () =>(
	<BrowserRouter>
		<Switch>
			<Route path="/" component={App} exact/>	
			<Route path="/projects/:id" component={Info} exact/>	
			<Route path="/allDevelopers/" component={DeveloperList} exact/>	
			<Route path="/addNewProject/" component={AddNewProject} exact/>	
		</Switch>
	</BrowserRouter>
);

export default Router;

