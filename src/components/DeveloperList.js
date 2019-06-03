import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class DeveloperList extends React.Component{
	
	state  = {
		infos: [],
	};
	
	async componentDidMount(){
		//Getting id of the user
		//const {id} = this.props.match.params;
		
		//Passing id to Fetch 
		await axios.get(`http://192.168.14.185:8080/user/userProjects/all`).then(res=>{
			
			if(res.data.length){
				this.setState({infos: res.data});
			}
		});
	}

	render(){
		//console.log(this.props.match.params.id);
		//const {id} = this.props.match.params;
		// If state is empty or len = 0 loading will appear
		if( this.state.infos === undefined ) {
      		return <div>Loading...</div>
  		}else{
  			//console.log(this.state.infos);
  		}
		
		return(
			<div className="wrapper mt-2">
				<div className="container">
					<h1 >Xalq Banki Projects</h1>
					<h1 className="text-center lead mb-3"><span className="lead">All Developers List: </span></h1>
	            	<Link to={{pathname: `/` }}>
                   		<button className="btn btn-info mb-2">&larr;Main</button>
         			 </Link>
	            	<table className="table table-striped">
		                 <thead>
				            <tr>
				             
				              <th scope="col">Full Name</th>
				              <th scope="col">Vacancy Name</th>
				              <th scope="col">Project</th>
				              <th scope="col">Start time</th>
				              <th scope="col">Deadline</th>
				            </tr>
		          		</thead>
		          		<tbody>
              				{this.state.infos.map(item => {

              				//Converting timestamp to real Date
              				const startDate  = (new Intl.DateTimeFormat
              					('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'})
              					.format(item.project.startingTime));

              				const deadline  = (new Intl.DateTimeFormat
			  					('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'})
			  					.format(item.project.deadline));

							return(
								<tr key={item.userProjectId}>
								
									<td>
										 	<span>{item.user.fname} {item.user.lname}</span>
									 </td>
									<td>{item.user.vacancy.vacancyName}</td>
									<td>{item.project.projectName}</td>
									<td>
									{startDate}
									</td>
									<td>{item.project.deadline==null? "In Process" : deadline}</td>
								</tr>
								);
							})}
         				</tbody>
	        		</table>
					
					
        		</div>
			</div>
		);
	}
}

export default DeveloperList;