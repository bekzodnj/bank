import React, {Component} from 'react';
// import TableRow from './TableRow';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableList extends Component {
	
	state  = {
		projects: []
	};
	componentDidMount(){
		axios.get(`http://192.168.14.185:8080/project/all`).then(res=>{
			//console.log(res.data);
			this.setState({projects: res.data});
		});
	}
	// render(){
	// 	return(
	// 		<Movie movie_info={this.state.movies}/>
	// 	);
	// }
	render(){
		return(
		<tbody>
              {this.state.projects.map(item => {

              	//Converting timestamp to real Date
  				const startDate  = (new Intl.DateTimeFormat
  					('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'})
  					.format(item.startingTime));

				const deadline  = (new Intl.DateTimeFormat
  					('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'})
  					.format(item.deadline));

				return(
						<tr key={item.projectId}>
							<th scope="row">{item.projectId}</th>
							<td>
								 <Link to={{pathname: `/projects/${item.projectId}`,
											state: {
												projectName: item.projectName
											}
								}}>
								 	<span>{item.projectName}</span>
								 </Link>
							 </td>
							<td>{item.startingTime==null? "In Process" : startDate}</td>
							<td>{item.deadline==null? "In Process" : deadline}</td>
						</tr>

					);
				})}
         </tbody>
	);
	}
}

export default TableList;
