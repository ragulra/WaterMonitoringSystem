import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


// import { Container, Row, Col, Input, Button } from 'mdbreact';
import './login.css';
class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isAuthenticated : false 
        }
    }


    onSubmitHandler = ( event ) => {

        let data = {
            email : this.state.email,
            password : this.state.password
        }

        event.preventDefault();
        axios.post('http://localhost:4000/login', data)
          .then((response) => {
            console.log(response);
            this.setState({
                isAuthenticated : response.isAuthenticated 
            })
          });
        console.log(this.state);
        this.props.history.push('/navbar');
    }



    render() {

        const isAuthenticated = this.state.isAuthenticated;

        return (
            <div className="container">
                <h1>Smart Water Monitoring System</h1>
                <div className="card card-container">
                    <img id="profile-img" className="profile-img-card" src="/images/userAvatar.png" />
                    <p id="profile-name" className="profile-name-card"></p>
                    <form className="form-signin">
                        <span id="reauth-email" className="reauth-email" />
                        <input type="email"
                                name="email" 
                                value={this.state.email} 
                                onChange={(e) => this.setState({
                                    email: e.target.value
                                })}
                               id="inputEmail" 
                               className="form-control" 
                               placeholder="Email address" 
                               required autoFocus />
                        <input type="password"
                               name="password" 
                               value={this.state.password} 
                               onChange={(e) => this.setState({
                                 password: e.target.value
                               })}
                               id="inputPassword"
                               className="form-control"
                               placeholder="Password" 
                               required />
                        <div id="remember" className="checkbox">
                            <label>
                                <input type="checkbox" value="remember-me" /> Remember me
                            </label>
                        </div>
                        <button onClick={(e) => this.onSubmitHandler(e)} className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
                    </form>
                    <a href="#" className="forgot-password">Forgot the password?</a>
                    <Link to="/register" className="forgot-password">Register</Link>
                    {isAuthenticated && <Link to="/navbar"></Link>}
                </div>
            </div>

        );
    }
};

export default LoginPage;

