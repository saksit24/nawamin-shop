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
                                                    <span>สินค้า</span>
                                                </a>
                                                <div className="sidebar-submenu">
                                                    <ul>
                                                        <li >
                                                            <NavLink exact to='/product_admin' activeClassName="activeSide">จัดการสินค้า</NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink exact to='/add_product' activeClassName="activeSide">เพิ่มสินค้า</NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li className="sidebar-dropdown">
                                                <a >
                                                    <i className="fa fa-shopping-cart" />
                                                    <span>รายการสั่งซื้อ</span>
                                                </a>
                                                <div className="sidebar-submenu">
                                                    <ul>
                                                        <li>
                                                            <NavLink exact to='/confirm_product' activeClassName="activeSide">ระหว่างการชำระเงิน</NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink exact to='/tracking' activeClassName="activeSide">ระหว่างจัดเตรียมส่ง</NavLink>
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
                                                    <span>วิดีโอ</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink exact to="/add_account" activeClassName="activeSide">
                                                    <i className="fas fa-file-invoice-dollar" />
                                                    <span>บัญชีธนาคาร</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink exact to='/profile' activeClassName="activeSide">
                                                    <i className="fa fa-user" />
                                                    <span>ข้อมูลส่วนตัว</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* sidebar-menu  */}
                                </div>
                                {/* sidebar-content  */}
                                <div className="sidebar-footer">
                                    <a></a>
                                    <a href="/" onClick={this.logOut.bind(this)}><i className="fa fa-power-off" />  ออกจากระบบ </a>
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
                                    <NavText>หน้าหลัก</NavText>
                                </NavItem>
                                <NavItem eventKey="/">
                                    <NavIcon>
                                        <i className="fab fa-youtube" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>แก้ไขวิดีโอ</NavText>
                                </NavItem>

                                <NavItem eventKey="charts">
                                    <NavIcon>
                                        <i className="fas fa-store" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>สินค้า </NavText>
                                    <NavItem eventKey="/product_admin" >
                                        <NavText>จัดการสินค้า</NavText>
                                    </NavItem>
                                    <NavItem eventKey="/add_product">
                                        <NavText>เพิ่มสินค้า</NavText>
                                    </NavItem>
                                </NavItem>
                                <NavItem eventKey="order">
                                    <NavIcon>
                                        <i className="fas fa-shopping-cart" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>รายการสั่งซื้อ </NavText>
                                    <NavItem eventKey="/add_account" >
                                        <NavText>บัญชีธนาคาร</NavText>
                                    </NavItem>
                                    <NavItem eventKey="/confirm_product" >
                                        <NavText>ระหว่างการชำระเงิน</NavText>
                                    </NavItem>
                                    <NavItem eventKey="/tracking">
                                        <NavText>ระหว่างจัดเตรียมส่ง</NavText>
                                    </NavItem>
                                </NavItem>
                                <NavItem eventKey="/profile">
                                    <NavIcon>
                                        <i className="fas fa-user" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>ข้อมูลส่วนตัว</NavText>
                                </NavItem>
                                <NavItem eventKey="/" onClick={this.logOut.bind(this)}>
                                    <NavIcon>
                                        <i className="fas fa-sign-out-alt" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText >ออกจากระบบ</NavText>
                                </NavItem>
                            </SideNav.Nav>
                        </SideNav> */}
                        {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Navbar.Brand href="/">หน้าแรก</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                </Nav>
                                <Nav>
                                    <div className="dropdown">
                                        <button className="dropbtn">สินค้า<MDBIcon icon="angle-down" /></button>
                                        <div className="dropdown-content">
                                            <a href="/product_admin">จัดการสินค้า</a>
                                            <a href="/add_product">เพิ่มสินค้า</a>
                                            <a href="/test">test</a>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <button className="dropbtn">สมาชิก<MDBIcon icon="angle-down" /></button>
                                        <div className="dropdown-content">
                                            <a href="/register">เพิ่มผู้ใช้งาน</a>
                                            <a href="/register_admin">เพิ่มผู้ดูแลระบบ</a>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <button className="dropbtn">บัญชีธนาคาร<MDBIcon icon="angle-down" /></button>
                                        <div className="dropdown-content">
                                            <a href="/add_account">เพิ่มบัญชี</a>
                                            <a href="/account">จัดการบัญชี</a>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <button className="dropbtn">รายการสั่งซื้อ<MDBIcon icon="angle-down" /></button>
                                        <div className="dropdown-content">
                                            <a href="/confirm_product">ระหว่างการชำระเงิน</a>
                                            <a href="/tracking">ระหว่างจัดเตรียมส่ง</a>
                                        </div>
                                    </div>
                                    <Nav.Link href="/profile">ข้อมูลส่วนตัว</Nav.Link>
                                    <Nav.Link onClick={this.logOut.bind(this)}>ออกจากระบบ</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar> */}
                    </div>
                break;

            case 2:
                render_user =
                    // <Navbar bg="dark" variant="dark">
                    //     {/* <div className="Navbar"> */}
                    //         <li><NavLink exact to="/" activeClassName="Active" className="NavbarRight">หน้าหลัก</NavLink></li>
                    //         <li><NavLink exact to="/product" activeClassName="Active" className="NavbarRight">รายการสินค้า</NavLink></li>
                    //         <li><NavLink exact to="/cart" activeClassName="Active" className="NavbarRight">ตะกร้าสินค้า</NavLink></li>
                    //         <li><NavLink exact to="/status_track" activeClassName="Active" className="NavbarRight">รายการสั่งซื้อ</NavLink></li>
                    //         <li><NavLink exact to="/profile" activeClassName="Active" className="NavbarRight">ข้อมูลส่วนตัว</NavLink></li>
                    //         <li><NavLink exact to=" " activeClassName="Active" className="NavbarRight" onClick={this.logOut.bind(this)}>ออกจากระบบ</NavLink></li>
                    //     {/* </div> */}
                    // </Navbar>
                    <Navbar style={{ height: '60px', display: 'fixed' }} className="navbar" bg="dark" variant="dark">
                        <Nav style={{ marginRight: 'auto' }}>
                            <NavLink activeClassName="navbar__link--active" className="navbar__link-home" exact to="/"> หน้าหลัก </NavLink>
                            <NavLink activeClassName="navbar__link--active" className="navbar__link" exact to="/product"> รายการสินค้า </NavLink>
                        </Nav>
                        <Nav>
                            <NavLink activeClassName="navbar__link--active" className="navbar__link" exact to="/cart"> ตะกร้าสินค้า </NavLink>
                            <NavLink activeClassName="navbar__link--active" className="navbar__link" exact to="/status_track"> รายการสั่งซื้อ </NavLink>
                            <NavLink activeClassName="navbar__link--active" className="navbar__link" exact to="/profile"> ข้อมูลส่วนตัว </NavLink>
                            <NavLink exact to=" " activeClassName="navbar__link--active" className="navbar__link" onClick={this.logOut.bind(this)}>ออกจากระบบ</NavLink>
                        </Nav>
                    </Navbar>
                // <Navbar bg="dark" variant="dark">
                //     <Navbar.Brand href="/">หน้าหลัก</Navbar.Brand>
                //     <Nav className="mr-auto">
                //         <Nav.Link href="/product">รายการสินค้า</Nav.Link>
                //     </Nav>
                //     <Nav>
                //         <Nav.Link href="/cart">ตะกร้าสินค้า</Nav.Link>
                //         <Nav.Link href="/status_track">รายการสั่งซื้อ</Nav.Link>
                //         <Nav.Link href="/profile">ข้อมูลส่วนตัว</Nav.Link>
                //         <Nav.Link onClick={this.logOut.bind(this)}>ออกจากระบบ</Nav.Link>
                //     </Nav>

                {/* </Navbar> */ }

                break;

            default:
                render_user =
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                        <Navbar.Brand href="/homereal">หน้าแรก</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            </Nav>
                            <Nav>

                                <Nav.Link onClick={this.logOut.bind(this)}>ออกจากระบบ</Nav.Link>
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

