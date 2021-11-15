import React, { Component } from 'react'
import { Tabs, Tab, Form, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, Navbar, Nav } from 'react-bootstrap'
import { post, get } from '../service/service'
import DatePicker from "react-datepicker";
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
class register extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            name: null,
            last_name: null,
            address: null,
            phonenumber: null,
            dob: null,
            personal_id: null,
            password: null,
            email: null,
            startDate: null,

        }
    }
   
    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    handleSubmit = () => {
        if (this.state.password !== this.state.c_password) {
            swal('รหัสผ่านไม่ตรงกัน', '', 'warning')
        } else {
            this.register();

        }
    }
    register = async () => {
        let object = {
            username: this.state.username,
            name: this.state.name,
            last_name: this.state.last_name,
            email: this.state.email,
            address: this.state.address,
            password: this.state.password,
            personal_id: 1,
            phonenumber: this.state.phonenumber,
            dob: this.state.startDate
        };
        console.log('ddd', object)
        try {
            await post(object, "user/register", null).then(result => {
                console.log("product", result);
                if (result.success) {
                    swal('สมัครสมาชิกเรียบร้อย', '', 'success')
                    setTimeout(() => { window.location.href = "/" }, 1000)

                } else {
                    swal('เกิดข้อผิดพลาด', result.error_message, 'error')
                }
            });
        } catch (error) {
            swal('เกิดข้อผิดพลาด', error, 'error')
        }
    }

    oninput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    ondropdown = (event) => {
        this.setState({
            type_product: event.target.value
        })
    }




    render() {
        return (
            <div className="bg " style={{ paddingTop: 20 }}>
                <Card style={{
                    display: "block",
                    justifyContent: "center",
                    alignItems: "center",
                    width: '40rem',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    <Card.Body className="mx-4 mt-4">

                        <Form.Row className="d-flex justify-content-center">
                            <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">ลงทะเบียน</h3>
                        </Form.Row>
                        <Form.Group >
                            <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
                            <Form.Control name="username" onChange={this.oninput} />
                        </Form.Group>
                        <Form.Row >
                            <Form.Group as={Col} >
                                <Form.Label>รหัสผ่าน</Form.Label>
                                <Form.Control type="password" name="password" onChange={this.oninput} />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
                                <Form.Control type="password" name="c_password" onChange={this.oninput} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row >
                            <Form.Group as={Col} >
                                <Form.Label>ชื่อ</Form.Label>
                                <Form.Control type="text" name="name" onChange={this.oninput} />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>นามสกุล</Form.Label>
                                <Form.Control type="text" name="last_name" onChange={this.oninput} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row >
                            <Form.Group as={Col} >
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control type="text" name="email" onChange={this.oninput} />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md='6'>
                                <Form.Label>หมายเลขโทรศัพท์</Form.Label>
                                <Form.Control type="number" name="phonenumber" onChange={this.oninput} />
                            </Form.Group>
                            <Form.Group as={Col} md='5'>
                                <Form.Label>วันเดือนปีเกิด</Form.Label>
                                <DatePicker
                                    className='form-control'
                                    selected={this.state.startDate}
                                    onChange={this.handleChange} //only when value has changed
                                    showYearDropdown
                                    showMonthDropdown
                                    maxDate={new Date()}
                                />
                             
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                            <Form.Label>ที่อยู่</Form.Label>
                            <Form.Control name="address" onChange={this.oninput} />
                        </Form.Group>
                        <div className="text-center mb-1 mt-5">
                            <Button variant="danger" type="submit" onClick={() =>
                                swal({
                                    title: "คุณต้องการลงทะเบียนหรือไม่?",
                                    text: "โปรดตรวจสอบให้แน่ใจก่นยืนยัน!",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            this.handleSubmit()
                                        } else {
                                        }
                                    })
                            } className="btn-block z-depth-2">ลงทะเบียน</Button>
                        </div>
                        <div className="text-center mb-4 mt-1">
                            <NavLink to='/'><Button variant="danger" type="submit" className="btn-block z-depth-2">ยกเลิก</Button></NavLink>
                        </div>


                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default register;