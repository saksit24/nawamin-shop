import React, { Component } from 'react'
import { Tabs, Tab, Form, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, Navbar, Nav } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom';

import '../App.css'
import { user_token, user_token_decoded } from '../support/constance';
import { get } from '../service/service';
import { MDBIcon } from "mdbreact"
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import './sidebar.css'
class navbarLogin extends Component {
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            get_user: [],
            isOpan: false,
            to: ''
        };
    }
    componentDidMount() {

        const script = document.createElement("script")
        script.src = 'js/content.js'
        script.async = true

        document.body.appendChild(script)
    }
    toggleNavbar() {
        this.setState({
            isOpan: !this.state.collapsed
        });
    }

    render_type = () => {

        console.log(this.props)
        // const nav = (
        //     <NavLink to={this.state}></NavLink>
        // )
        // let history = useHistory()
        let render_user
        switch (user_token_decoded.usertype) {
            case 1:
                render_user =

                    <div >
                        <div>
                            <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
                                <i className="fas fa-bars" />
                            </a>
                            <nav id="sidebar" className="sidebar-wrapper">
                                <div className="sidebar-content">
                                    <div className="sidebar-brand">
                                        <NavLink exact to='/wellcome'>Nawamin Shop</NavLink>
                                        <div id="close-sidebar">
                                            <i className="fas fa-times" />
                                        </div>
                                    </div>
                                    <div className="sidebar-menu">
                                        <ul>
                                            <li className="header-menu">
                                                <span>General</span>
                                            </li>
                                            <li className="sidebar-dropdown">
                                                <a >
                                                    <i className="fas fa-store" />
                                                    <span>??????????????????</span>
                                                </a>
                                                <div className="sidebar-submenu">
                                                    <ul>
                                                        <li >
                                                            <NavLink exact to='/product_admin' activeClassName="activeSide">????????????????????????????????????</NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink exact to='/add_product' activeClassName="activeSide">?????????????????????????????????</NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li className="sidebar-dropdown">
                                                <a >
                                                    <i className="fa fa-shopping-cart" />
                                                    <span>??????????????????????????????????????????</span>
                                                </a>
                                                <div className="sidebar-submenu">
                                                    <ul>
                                                        <li>
                                                            <NavLink exact to='/confirm_product' activeClassName="activeSide">??????????????????????????????????????????????????????</NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink exact to='/tracking' activeClassName="activeSide">?????????????????????????????????????????????????????????</NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>

                                            <li className="header-menu">
                                                <span>Extra</span>
                                            </li>

                                            <li>
                                                <NavLink exact to="/" activeClassName="activeSide">
                                                    <i className="fab fa-youtube" />
                                                    <span>??????????????????</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink exact to="/add_account" activeClassName="activeSide">
                                                    <i className="fas fa-file-invoice-dollar" />
                                                    <span>?????????????????????????????????</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink exact to='/profile' activeClassName="activeSide">
                                                    <i className="fa fa-user" />
                                                    <span>???????????????????????????????????????</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* sidebar-menu  */}
                                </div>
                                {/* sidebar-content  */}
                                <div className="sidebar-footer">
                                    <a></a>
                                    <a href="/" onClick={this.logOut.bind(this)}><i className="fa fa-power-off" />  ?????????????????????????????? </a>
                                    <a> </a>

                                </div>
                            </nav>
                            {/* sidebar-wrapper  */}
                        </div>


                        {/* <SideNav
                            onSelect={(selected) => {
                                const to = selected;
                                if (window.location.pathname !== to) {
                                    // this.setState({
                                    //     to: to
                                    // })
                                    // console.log("this.props",this.props)
                                    window.location.pathname = to

                                    // history.push(to);
                                }

                            }}
                        >
                            <SideNav.Toggle />
                            <SideNav.Nav defaultSelected='/wellcome'>
                                                    
                                <NavItem eventKey="/wellcome">
                                    <NavIcon>
                                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>????????????????????????</NavText>
                                </NavItem>
                                <NavItem eventKey="/">
                                    <NavIcon>
                                        <i className="fab fa-youtube" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>?????????????????????????????????</NavText>
                                </NavItem>

                                <NavItem eventKey="charts">
                                    <NavIcon>
                                        <i className="fas fa-store" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>?????????????????? </NavText>
                                    <NavItem eventKey="/product_admin" >
                                        <NavText>????????????????????????????????????</NavText>
                                    </NavItem>
                                    <NavItem eventKey="/add_product">
                                        <NavText>?????????????????????????????????</NavText>
                                    </NavItem>
                                </NavItem>
                                <NavItem eventKey="order">
                                    <NavIcon>
                                        <i className="fas fa-shopping-cart" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>?????????????????????????????????????????? </NavText>
                                    <NavItem eventKey="/add_account" >
                                        <NavText>?????????????????????????????????</NavText>
                                    </NavItem>
                                    <NavItem eventKey="/confirm_product" >
                                        <NavText>??????????????????????????????????????????????????????</NavText>
                                    </NavItem>
                                    <NavItem eventKey="/tracking">
                                        <NavText>?????????????????????????????????????????????????????????</NavText>
                                    </NavItem>
                                </NavItem>
                                <NavItem eventKey="/profile">
                                    <NavIcon>
                                        <i className="fas fa-user" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>???????????????????????????????????????</NavText>
                                </NavItem>
                                <NavItem eventKey="/" onClick={this.logOut.bind(this)}>
                                    <NavIcon>
                                        <i className="fas fa-sign-out-alt" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText >??????????????????????????????</NavText>
                                </NavItem>
                            </SideNav.Nav>
                        </SideNav> */}
                        {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Navbar.Brand href="/">?????????????????????</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                </Nav>
                                <Nav>
                                    <div className="dropdown">
                                        <button className="dropbtn">??????????????????<MDBIcon icon="angle-down" /></button>
                                        <div className="dropdown-content">
                                            <a href="/product_admin">????????????????????????????????????</a>
                                            <a href="/add_product">?????????????????????????????????</a>
                                            <a href="/test">test</a>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <button className="dropbtn">??????????????????<MDBIcon icon="angle-down" /></button>
                                        <div className="dropdown-content">
                                            <a href="/register">??????????????????????????????????????????</a>
                                            <a href="/register_admin">????????????????????????????????????????????????</a>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <button className="dropbtn">?????????????????????????????????<MDBIcon icon="angle-down" /></button>
                                        <div className="dropdown-content">
                                            <a href="/add_account">??????????????????????????????</a>
                                            <a href="/account">?????????????????????????????????</a>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <button className="dropbtn">??????????????????????????????????????????<MDBIcon icon="angle-down" /></button>
                                        <div className="dropdown-content">
                                            <a href="/confirm_product">??????????????????????????????????????????????????????</a>
                                            <a href="/tracking">?????????????????????????????????????????????????????????</a>
                                        </div>
                                    </div>
                                    <Nav.Link href="/profile">???????????????????????????????????????</Nav.Link>
                                    <Nav.Link onClick={this.logOut.bind(this)}>??????????????????????????????</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar> */}
                    </div>
                break;

            case 2:
                render_user =
                    // <Navbar bg="dark" variant="dark">
                    //     {/* <div className="Navbar"> */}
                    //         <li><NavLink exact to="/" activeClassName="Active" className="NavbarRight">????????????????????????</NavLink></li>
                    //         <li><NavLink exact to="/product" activeClassName="Active" className="NavbarRight">????????????????????????????????????</NavLink></li>
                    //         <li><NavLink exact to="/cart" activeClassName="Active" className="NavbarRight">????????????????????????????????????</NavLink></li>
                    //         <li><NavLink exact to="/status_track" activeClassName="Active" className="NavbarRight">??????????????????????????????????????????</NavLink></li>
                    //         <li><NavLink exact to="/profile" activeClassName="Active" className="NavbarRight">???????????????????????????????????????</NavLink></li>
                    //         <li><NavLink exact to=" " activeClassName="Active" className="NavbarRight" onClick={this.logOut.bind(this)}>??????????????????????????????</NavLink></li>
                    //     {/* </div> */}
                    // </Navbar>
                    <Navbar style={{ height: '60px', display: 'fixed' }} className="navbar" bg="dark" variant="dark">
                        <Nav style={{ marginRight: 'auto' }}>
                            <NavLink activeClassName="navbar__link--active" className="navbar__link-home" exact to="/"> ???????????????????????? </NavLink>
                            <NavLink activeClassName="navbar__link--active" className="navbar__link" exact to="/product"> ???????????????????????????????????? </NavLink>
                        </Nav>
                        <Nav>
                            <NavLink activeClassName="navbar__link--active" className="navbar__link" exact to="/cart"> ???????????????????????????????????? </NavLink>
                            <NavLink activeClassName="navbar__link--active" className="navbar__link" exact to="/status_track"> ?????????????????????????????????????????? </NavLink>
                            <NavLink activeClassName="navbar__link--active" className="navbar__link" exact to="/profile"> ??????????????????????????????????????? </NavLink>
                            <NavLink exact to=" " activeClassName="navbar__link--active" className="navbar__link" onClick={this.logOut.bind(this)}>??????????????????????????????</NavLink>
                        </Nav>
                    </Navbar>
                // <Navbar bg="dark" variant="dark">
                //     <Navbar.Brand href="/">????????????????????????</Navbar.Brand>
                //     <Nav className="mr-auto">
                //         <Nav.Link href="/product">????????????????????????????????????</Nav.Link>
                //     </Nav>
                //     <Nav>
                //         <Nav.Link href="/cart">????????????????????????????????????</Nav.Link>
                //         <Nav.Link href="/status_track">??????????????????????????????????????????</Nav.Link>
                //         <Nav.Link href="/profile">???????????????????????????????????????</Nav.Link>
                //         <Nav.Link onClick={this.logOut.bind(this)}>??????????????????????????????</Nav.Link>
                //     </Nav>

                {/* </Navbar> */ }

                break;

            default:
                render_user =
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                        <Navbar.Brand href="/homereal">?????????????????????</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            </Nav>
                            <Nav>

                                <Nav.Link onClick={this.logOut.bind(this)}>??????????????????????????????</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                break;
        }
        return render_user
    }


    logOut = (e) => {
        e.preventDefault()
        localStorage.removeItem('user_token')
        window.location.href = "/";
    }
    render() {
        const login = (
            <div>

                {this.render_type()}

            </div>
        )
        const unlogin = (
            <div>

            </div>
        )
        return (
            <div>

                {
                    localStorage.user_token ? login : unlogin
                }
            </div>
        )
    }
}
export default navbarLogin;

