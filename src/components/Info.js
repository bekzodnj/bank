import React from 'react';
import axios from 'axios';
import SelectUser from './SelectUser';
import { Link } from 'react-router-dom';

class Info extends React.Component{
	
	
	constructor(props){
		super(props);
		
		// update function
		this.handler = this.handler.bind(this);

		this.state  = {
			infos: [],
			isUpdated: false,
		};
	}
	


	async componentDidMount(){
		//Getting id of the user
		const {id} = this.props.match.params;
		//console.log(id);
		
		//Passing id to Fetch 
		await axios.get(`http://192.168.14.185:8080/user/byProject/${id}`).then(res=>{
			if(res.data.length){
				this.setState({infos: res.data});
			}
		});
	}
	
	//
	async handler(){
		const {id} = this.props.match.params;
		//console.log(id);
		
		//Passing id to Fetch 
		await axios.get(`http://192.168.14.185:8080/user/byProject/${id}`).then(res=>{
			if(res.data.length){
				this.setState({infos: res.data});
			}
		});

		//console.log('Handler called');
		this.setState({isUpdated: true});
	}

	
	render(){
		//console.log(this.props.match.params.id);
		//const {id} = this.props.match.params;
		// If state is empty or len = 0 loading will appear
		if( this.state.infos === undefined) {
      		return <div>Loading...</div>
  		}else{
  			//console.log(this.state.infos);
  		}
		
		// getting passed state from Link 
		const {projectName} = this.props.location.state;
		//console.log(projectName);

		return(
			<div className="wrapper mt-2">
				<div className="container">
					<h1 className="text-center lead mb-3"><span className="lead">Project: </span>{projectName}</h1>
	            	<Link to={{pathname: `/` }}>
                   		<button className="btn btn-info mb-2">&larr;Main</button>
         			 </Link>
	            	<div className={this.state.isUpdated === true ? "alert alert-primary" : ""}>
	            	{this.state.isUpdated === true ? "New user has been added" : " "}
	            	</div>
	            	<table className="table table-striped">
		                 <thead>
				            <tr>
				              <th scope="col">User Id</th>
				              <th scope="col">Full Name</th>
				              <th scope="col">Vacancy Name</th>
				              <th scope="col">Section Name</th>
				              <th scope="col">Phone Number</th>
				            </tr>
		          		</thead>
		          		<tbody>
              				{this.state.infos.map(item => {
							return(
								<tr key={item.userId}>
									<th scope="row">{item.userId}</th>
									<td>
										 	<span>{item.fname} {item.lname}</span>
									 </td>
									<td>{item.vacancy.vacancyName}</td>
									<td>{item.vacancy.section.sectionName}</td>
									<td>{item.phoneNumber}</td>
								</tr>
					);
				})}
         </tbody>
	        		</table>
					
					<h1 className="lead mt-4">Add new Member for a Project</h1>
	        		<div className="">
	        			<SelectUser urlParam={this.props.match.params.id} action={this.handler}/>
	 					
	        		</div>
        		</div>
			</div>
		);
	}
}

export default Info;