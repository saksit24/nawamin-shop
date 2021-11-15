import React, { Component } from 'react';
import { user_token } from '../support/constance';
import { NavLink } from 'react-router-dom';
import { Tabs, Tab, Form, Row, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, ListGroup, ListGroupItem, Image } from 'react-bootstrap'
import queryString from 'query-string';
import { get, ip, post } from '../service/service';
import swal from 'sweetalert';
import moment from 'moment'
class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            username: '',
            name: '',
            last_name: '',
            dob: '',
            email: '',
            address: '',
            phonenumber: '',
            user_id: null,
            personal_id: '',
            userimg: '',
            usertype: '',
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        };
    }

    render_type = (usertype) => {
        let render_user
        switch (usertype) {
            case 1:
                render_user = <div > Admin </div>
                break;
            case 2:
                render_user = <div > User </div>
                break;

            default:
                render_user = <div className="FontDanger"> เกิดข้อผิดพลาด </div>
                break;
        }
        return render_user
    }


    get_user = async () => {
        try {
            await get('user/profile', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        data: result.result
                    })
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            swal('เกิดข้อผิดพลาด', error, 'error')
        }
    }

    componentWillMount() {
        console.log("gg", this.props)
        this.get_user()
    }

    render() {
        return (
            <div className="bg3 pt-5">
                <br/>
                <Card style={{
                    display: "block",
                    justifyContent: "center",
                    alignItems: "center",
                    width: '40rem',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    <Card.Header style={{ textAlign: 'center' }}>ข้อมูลผู้ใช้งาน</Card.Header>
                    <Card.Body className="mx-4">
                        {
                            this.state.data.map((e, index) => {
                                return (
                                    <Form >

                                        <div className="d-flex justify-content-center">
                                            {e.userimg ?
                                                <a href={ip + e.userimg} target="_blank" ><img style={{ width: "200px", height: "230px" }} src={ip + e.userimg} /></a>

                                                : <img style={{ width: "200px", height: "230px" }} src={this.state.default_user_image} />}
                                        </div>
                                        <Row style={{ paddingTop: 35 }}>
                                            <Col>
                                                <Card.Text>ชื่อผู้ใช้งาน</Card.Text>
                                            </Col>
                                            <Col>
                                                <Card.Text>{e.username ? e.username : null}</Card.Text>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <Card.Text>ชื่อสกุล</Card.Text>
                                            </Col>
                                            <Col>
                                                <Card.Text>{e.name ? e.name : null} {e.last_name ? e.last_name : null}</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Card.Text>ที่อยู่</Card.Text>
                                            </Col>
                                            <Col>
                                                <Card.Text>{e.address ? e.address : null}</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Card.Text>อีเมล</Card.Text>
                                            </Col>
                                            <Col>
                                                <Card.Text>{e.email ? e.email : null}</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Card.Text>เบอร์โทร</Card.Text>
                                            </Col>
                                            <Col>
                                                <Card.Text>{e.phonenumber ? e.phonenumber : null}</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Card.Text>วันเดือนปีเกิด</Card.Text>
                                            </Col>
                                            <Col>
                                                <Card.Text>{e.dob ? moment(e.dob).format('DD/MM/YYYY') : null}</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Card.Text>ประเภทผู้ใช้งาน</Card.Text>
                                            </Col>
                                            <Col>
                                                <Card.Text>{this.render_type(e.usertype)}</Card.Text>
                                            </Col>
                                        </Row>
                                        <div className="text-center mb-1 mt-5">
                                            <NavLink to={"update_user?user_id=" + e.user_id}><Button variant="danger" type="submit" className="btn-block z-depth-2">แก้ไขข้อมูลส่วนตัว</Button></NavLink>
                                        </div>
                                        <div className="text-center mb-4 mt-1">
                                            <NavLink to={"update_password"}><Button variant="danger" type="submit" className="btn-block z-depth-2">แก้ไขรหัสผ่าน</Button></NavLink>
                                        </div>

                                    </Form>
                                )
                            })
                        }
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default profile;