import React, {Component} from 'react';
import '../../support/css/component/Header.css';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {cekLogin,cookieChecked,doLogOut} from '../../action/index';
import {Nav, Navbar, NavItem, NavDropdown,MenuItem} from 'react-bootstrap';
const cookies = new Cookies();
class Header extends Component
{
  componentWillMount() {
    const cookie = cookies.get("userCookie");
    if(cookie !== undefined) {
        this.props.cekLogin(cookie);
    }
    else {
        this.props.cookieChecked();
    }
}
componentWillReceiveProps(cookie) {
  if(cookie.user.username === "") {
      cookies.remove("userCookie");
  }
}
 doLogOut =()=>{
    this.props.doLogOut();
    }
  renderNavbar = ()=>
  {
    console.log(this.props.user);
    if(this.props.user.role==="admin")
    {
      return(
      <Navbar id="navhead" fixedTop={true} collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link id="brandnav" to="/">PenLa</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header >
      <Navbar.Collapse>
        <Nav>
          <NavItem id="text" eventKey={1}>
          <Link to="/resto">Resto List</Link>
          </NavItem>
          <NavItem id="text" eventKey={2}>
            Link
          </NavItem>
          <NavDropdown  eventKey={3} title="LOL" id="basic-nav-dropdown">
            <MenuItem id="text" eventKey={3.1}>Action</MenuItem>
            <MenuItem id="text" eventKey={3.2}>Another action</MenuItem>
            <MenuItem id="text" eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem id="text" eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullRight>
      <NavItem id="text" eventKey={1}>
      Sudah {this.props.username}
      </NavItem>
      <NavItem id="text" eventKey={2} onSelect={this.doLogOut}>
        SignOut
      </NavItem>
    </Nav>
      </Navbar.Collapse>
      </Navbar>
    );
  }
// BELUM LOGIN

    return(
      <Navbar id="navhead"  fixedTop={true} collapseOnSelect>
<Navbar.Header>
  <Navbar.Brand>
  <Link id="brandnav" to="/">PenLa</Link>
  </Navbar.Brand>
  <Navbar.Toggle />
</Navbar.Header >
<Navbar.Collapse>
  <Nav>
    <NavItem id="text" eventKey={1}>
    <Link id="text2" to="/resto">Resto List</Link>
    </NavItem>
    

  </Nav>
  <Nav pullRight>
    <NavItem id="text" eventKey={1}>
    <Link id="text2" to="/signIn">Sign-In</Link>
    </NavItem>
    <NavItem id="text" eventKey={2}>
    <Link id="text2" to="/signUp">Sign-Up</Link>
    </NavItem>
  </Nav>
</Navbar.Collapse>
</Navbar>
      
  );
  }
  render(){    
    return(
      this.renderNavbar()
    );
  }
}

const mapStateToProps =(state)=>{
  const user= state.cekLogin;
  return{user};
}

export default connect(mapStateToProps,{cekLogin,cookieChecked,doLogOut})(Header);