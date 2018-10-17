import React, {Component} from 'react';
import {doLogOut} from '../../action/index';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../../support/css/component/Header.css';
import {Nav, Navbar, NavItem, NavDropdown,MenuItem} from 'react-bootstrap';


class Header extends Component{
  
toCart=()=>{
  this.props.history.replace(`/cart`); 
}
doSearch=(x)=>{
  var a = x.which||x.keyCode;
  if(a===13)
  {  
    this.props.history.replace(`/home?temp=${this.refs.search.value}`); 
  }
  
}

 doLogOut =()=>{
    this.props.doLogOut();
    this.props.history.replace(`/`); 
    }
  renderNavbar = ()=>
  {
    // console.log(this.props.user);
    if(this.props.user.role==="admin")
    {
      return(

        <Navbar id="navhead"  fixedTop={true} collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand >
          <Link id="brandnav" to="/">PenLa</Link> 
          </Navbar.Brand>
          <Navbar.Brand>
           <input  id="brandnav" ref="search" type="text" className="search" placeholder="Search.." onKeyPress={this.doSearch}/>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header >
        <Navbar.Collapse>
          <Nav pullRight>
      <NavDropdown  eventKey={1} title="Account " id="basic-nav-dropdown">
      <MenuItem id="text" eventKey={1.1}>{this.props.user.username}</MenuItem>
      <MenuItem id="text" eventKey={1.2} onSelect={this.doLogOut}> Sign-Out</MenuItem>
      </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
  }
  else if(this.props.user.role==="customer")
  {
    return(

      <Navbar id="navhead"  fixedTop={true} collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand >
        <Link id="brandnav" to="/">PenLa</Link> 
        </Navbar.Brand>
        <Navbar.Brand>
         <input  id="brandnav" ref="search" type="text" className="search" placeholder="Search.." onKeyPress={this.doSearch}/>
        </Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header >
      <Navbar.Collapse>
           {/* <Nav>
           <NavItem id="text" eventKey={1} onSelect={this.toTransaction}>
           Transaction
           </NavItem>
         </Nav> */}
        <Nav pullRight>
    <NavDropdown  eventKey={2} title="Account " id="basic-nav-dropdown">
    <MenuItem id="text" eventKey={2.1}>{this.props.user.username}</MenuItem>
    <MenuItem id="text" eventKey={2.2} onSelect={this.toCart}> Cart</MenuItem>
    <MenuItem id="text" eventKey={2.3} onSelect={this.doLogOut}> Sign-Out</MenuItem>
    </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
  );
}
// BELUM LOGIN

    return(
      <Navbar id="navhead"  fixedTop={true} collapseOnSelect>
<Navbar.Header>
  <Navbar.Brand >
  <Link id="brandnav" to="/">PenLa</Link> 
  </Navbar.Brand>
  <Navbar.Brand>
   <input  id="brandnav" ref="search" type="text" className="search" placeholder="Search.." onKeyPress={this.doSearch}/>
   
  </Navbar.Brand>
  <Navbar.Toggle/>
</Navbar.Header >
<Navbar.Collapse>
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

export default withRouter(connect(mapStateToProps,{doLogOut})(Header));