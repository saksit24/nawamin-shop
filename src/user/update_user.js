import React, { Component } from 'react'
import { Tabs, Tab, Form, Row, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, ListGroup, ListGroupItem, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { post, get, ip } from '../service/service'
import { user_token } from '../support/constance';
import queryString from 'query-string';
import swal from 'sweetalert';
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class update_user extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
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
            startDate: '',
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        }
        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }
    handleInputChange = (event) => {
        console.log(this.state.user)
        // const target = event.target;
        const value = event.target.value;
        const name = event.target.name;
        // console.log(event)

        let user = this.state.user
        user[name] = value
        this.setState({
            user: user
        });
    }
    handleChange = date => {

        console.log(date)
        let user = this.state.user
        user['dob'] = moment(date).utc(7)
        this.setState({
            user: user
        });
    };

    update = async () => {
        let object = {
            // username: this.state.user.username,
            email: this.state.user.email,
            name: this.state.user.name,
            // gender: this.state.data_user.gender,
            last_name: this.state.user.last_name,
            phonenumber: this.state.user.phonenumber,
            address: this.state.user.address,
            userimg: this.state.user.userimg,
            dob: this.state.user.dob

        };
        console.log("edit2", object);

        try {
            await post(object, "user/update_user", user_token).then(res => {
                console.log('ssssss', res)
                if (res.success) {
                    swal('บันทึกข้อมูลเรียบร้อย', '', 'success')
                    setTimeout(() => { window.location.href = "profile?user_id=" + this.state.user.user_id }, 1000)
                } else {
                    swal('เกิดข้อผิดพลาด', res.error_message, 'error')
                }
            });
        } catch (error) {
            swal('เกิดข้อผิดพลาด', error, 'error')
        }
        // console.log("edit2" + this.state);
    }



    get_update = async () => {
        try {
            await get('user/profile', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        user: result.result[0]
                    })
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            swal('เกิดข้อผิดพลาด', error, 'error')
        }
    }





    uploadpicture = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) {
        } else {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                console.log("img", reader.result)
                let user = this.state.user
                user.userimg = reader.result
                this.setState({
                    user: user
                });
            }
        }
    }

    onrenderimage = (image_url) => {
        let url = image_url
        var index = image_url.indexOf('data:image/');
        if (index === -1) {
            url = ip + image_url
        } else {
        }
        return url
    }

    componentWillMount() {
        this.get_update()
    }


    render() {
        return (
            <div className="bg3 pt-5">
                <Card style={{
                    display: "block",
                    justifyContent: "center",
                    alignItems: "center",
                    width: '40rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',

                }}>
                    <Card.Header style={{ textAlign: 'center' }}>แก้ไขข้อมูลส่วนตัว</Card.Header>
                    <div className="d-flex justify-content-center">
                        {this.state.user.userimg ? <Image size='small' style={{ height: '200px', width: '230px' }} src={this.onrenderimage(this.state.user.userimg)} />
                            : <Image size='small' style={{ height: '200px', width: '230px' }} src={this.state.default_user_image} />}

                    </div>
                    <div className="d-flex justify-content-center"> <input width={5} type="file" onChange={this.uploadpicture} /></div>

                    <Card.Body className="mx-4">
                        {/* <Form.Group >
                            <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
                            <Form.Control
                                value={this.state.user.username}
                                type="text"
                                name="username"
                                onChange={this.handleInputChange} />
                        </Form.Group> */}
                        <Form.Row>
                            <Form.Group as={Col} md='6' >
                                <Form.Label>ชื่อ</Form.Label>
                                <Form.Control
                                    value={this.state.user.name}
                                    type="text"
                                    name="name"
                                    onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group as={Col} md='6' >
                                <Form.Label>นามสกุล</Form.Label>
                                <Form.Control
                                    value={this.state.user.last_name}
                                    type="text"
                                    name="last_name"
                                    onChange={this.handleInputChange} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group>
                            <Form.Label>ที่อยู่</Form.Label>
                            <Form.Control
                                value={this.state.user.address}
                                name="address"
                                type="text"
                                onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} md='4' >
                                <Form.Label>อีเมล</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={this.state.user.email}
                                    onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group as={Col} md='4' >
                                <Form.Label>เบอร์โทร</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phonenumber"
                                    value={this.state.user.phonenumber}
                                    onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group as={Col} md='4' >
                                <Form.Label>วันเดือนปีเกิด</Form.Label>
                                <DatePicker
                                    className='form-control'
                                    value={moment(this.state.user.dob).format('DD/MM/YYYY')}
                                    selected=""
                                    // onSelect={this.handleSelect} //when day is clicked
                                    onChange={this.handleChange} //only when value has changed
                                    name="dob"
                                    showYearDropdown
                                    showMonthDropdown
                                    maxDate={new Date()}
                                />
                                {/* <Form.Control
                                    type="text"
                                    name="dob"
                                    value={moment(this.state.user.dob).format('DD/MM/YYYY')}
                                    onChange={this.handleInputChange} /> */}
                            </Form.Group>
                        </Form.Row>
                        <div style={{ textAlign: 'center'}}>
                            <Button variant="primary" type="submit" onClick={() =>
                                swal({
                                    title: "คุณต้องการบึนทึกการเปลี่ยนแปลงหรือไม่?",
                                    text: "โปรดตรวจสอบให้แน่ใจก่อนยืนยัน!",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            this.update()
                                        } else {
                                        }
                                    })
                            } >บันทึกการแก้ไข</Button>{'  '}
                            <NavLink to={"profile?user_id=" + this.state.user.user_id}><Button variant="primary" type="submit">ยกเลิก</Button></NavLink>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default update_user
