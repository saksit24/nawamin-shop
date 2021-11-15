import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import { Tabs, Table, Form, Row, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap'
import { get, post } from '../service/service';
import { user_token, user_token_decoded } from '../support/constance'
import swal from 'sweetalert';
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            check:''
        }
    }
    // componentWillMount() {
    //     if (user_token) {
    //       this.props.history.push('/homereal')
    //     }
    //   }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Signin" + this.state);
    }

    check_type = async () => {
        const user_token = localStorage.getItem('user_token')
        var jwt_decode = require('jwt-decode');
        const decode_token = (user_token_decoded_func) => {
            let decoded
            if (user_token_decoded_func) {
                decoded = jwt_decode(user_token_decoded_func);
            } else {
                decoded = { id: null, type: null }
            }
            return decoded;
        }
        const user_token_decoded = decode_token(user_token)
        if (user_token_decoded.usertype == 1) {

            window.location.href = "/wellcome";
        } else {
            window.location.href = "/";
        }
    }

    login = async () => {
        let object = {
            username: this.state.username,
            password: this.state.password
        };
        try {
            await post(object, "user/login", null).then(res => {
                if (res.success) {
                    // alert(res.token)
                    localStorage.setItem("user_token", res.token);
                    // window.location.href = "/wellcome";
                    setTimeout(() => this.check_type(), 500)

                } else {
                    swal('เกิดข้อผิดพลาด', res.error_message, 'error')

                }
            });
        } catch (error) {
            swal('เกิดข้อผิดพลาด', error, 'error')
        }
    }


    render() {
        return (
            <div className="bg100 pt-5">
                {/* <MDBContainer style={{ paddingTop: 50 }}> */}
                    <MDBRow style={{ justifyContent: "center" }}>
                        <MDBCol md="6">
                            <MDBCard>
                                <div className="header pt-3 grey lighten-2">
                                    <MDBRow className="d-flex justify-content-center" >
                                        <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">ลงชื่อเข้าใช้</h3>
                                    </MDBRow>
                                </div>
                                <MDBCardBody className="mx-4 mt-4">
                                    <MDBInput label="Username" group type="text" validate name="username" onChange={this.handleChange} />
                                    <MDBInput label="password" group type="password" validate name="password" onChange={this.handleChange} containerClass="mb-0" />
                                    <div className="text-center mb-4 mt-5">
                                        <MDBBtn color="danger" type="submit" className="btn-block z-depth-2" onClick={() => this.login()}>ลงชื่อเข้าใช้</MDBBtn>
                                    </div>
                                    <p className="font-small grey-text d-flex justify-content-center">ยังไม่มีบัญชีใช่ไหม ?
                                        <a href="/register" className="dark-grey-text font-weight-bold ml-1">ลงทะเบียน </a>
                                    </p>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                {/* </MDBContainer> */}
            </div>
        )
    }
}

export default login;