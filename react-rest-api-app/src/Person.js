import React, {Component} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Person extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            results: []
        };
    }

    
    componentDidMount() {
        fetch('https://api.randomuser.me/')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    results: result.results
                });
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            } 
        )
    }

    getValidYears = () => {
        const amount = this.state.results[0].dob.age
        const validity = amount / 2
        return validity
    }

    getIVANumber = () => {
        var code = this.state.results[0].location.postcode
        return ++code
    }

    render(){
        const {error, isLoaded, results} = this.state;
        if(error){
            return <div className = "h4 text-center text-danger"> Error : {error.message}</div>;
        } else if(!isLoaded){
            return <div className = "display-4 text-center text-success"> Loading... </div>;
        } else {
            return(

            <div className = "container">
                <section className = "heading">
                    <div className = "display-4 bg-danger text-center text-white"> Personal Information </div>
                </section>

                <section className ="details my-3">
                    <p className= "lead bg-secondary text-center text-warning">
                    The Captain of the <em>controversial </em> 
                    oil tanker, <strong><a className = "text-reset" href = "https://en.wikipedia.org/wiki/MT_New_Diamond" target = "_blank" rel="noopener noreferrer">
                    M.T. New Diamond </a></strong>
                    which was on fire near Sri Lankan east coast</p> 
                </section>

                <section className="dataContainer">
                    <table className = "table table-bordered table-responsive">
                    <tr>
                        <td><span className="text-secondary font-weight-bold">Title: 
            </span> <span className="font-weight-bold">{results[0].name.title}.</span></td>
                        <td><span className="text-secondary font-weight-bold">Full Name: 
            </span> <span className="font-weight-bold">{results[0].name.first} {' '} {results[0].name.last}</span></td>
                        <td><span className="text-secondary font-weight-bold">Gender: 
            </span> <span className="font-weight-bold">{results[0].gender}</span></td>
                    </tr>
                    <tr>
                        <td><span className="text-secondary font-weight-bold">Address: 
                        </span> <span className="font-weight-bold">
                            {results[0].location.street.number},{' '} 
                            {results[0].location.street.name},{' '}  
                            {results[0].location.city},{' '}  
                            {results[0].location.state},{' '} 
            <span className = "text-uppercase">{results[0].location.country}</span> 

                            </span></td>
                        <td><span className="text-secondary font-weight-bold">Nationality: 
            </span> <span className="font-weight-bold">{results[0].nat}</span></td>    
                        
                    </tr>
                    <tr>
                        <td><span className="text-secondary font-weight-bold">Date of Birth: 
            </span> <span className="font-weight-bold">{results[0].dob.date}</span></td>
                        <td><span className="text-secondary font-weight-bold">Age: 
            </span> <span className="font-weight-bold">{results[0].dob.age}</span></td>
                    </tr>
                    <tr>
                        <td><span className="text-secondary font-weight-bold">Phone: 
            </span> <span className="font-weight-bold">{results[0].phone}</span></td>
                        <td><span className="text-secondary font-weight-bold">Mobile: 
            </span> <span className="font-weight-bold">{results[0].cell}</span></td>
                    </tr> 
                    <tr>
                        <section className = "nauticalInfo">
                        <h3 className="mx-2">Nautical Info</h3>
                        <td><span className="text-secondary font-weight-bold">Registration valid for: 
            </span> <span className="font-weight-bold">{this.getValidYears()} Years</span></td>
                        <td><span className="text-secondary font-weight-bold">IVA No: 
                        </span><del className="font-weight-bold">{results[0].location.postcode}</del>{' '}
                        <mark><span className="font-weight-bold">{this.getIVANumber()}</span></mark> </td>
                        </section>
                    </tr>       
                    <tr>
                        <section className ="imageData">
                        <h3 className="mx-2">Apprearence</h3>
                        <div className = "text-center">
                            <img className = "img-fluid rounded " src = {results[0].picture.large} alt = "person"/>
                        </div>
                        </section>
                    </tr>
                    </table>
                    </section>

                    <section>
                        <p className= "lead text-center"> The Captain was 
                        sentenced for <span className="font-weight-bold bg-warning">6 Months</span> jail 
                        in Sri Lankan prison </p>
                    </section>
                        <hr></hr>

                    <footer>
                        <section className = "text-center">
                            <h5>Build with <span role="img" aria-label = "heart">💛</span> by MS Manawadu </h5>
                        </section>
                    </footer>
                </div>    
        )
       }
    }
}

export default Person