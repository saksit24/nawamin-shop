import React, { Component } from 'react'
import { Tabs, Tab, Form, Row, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, ListGroup, ListGroupItem, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { post, get, ip } from '../service/service'
import { user_token } from '../support/constance';
import swal from 'sweetalert';

class update_password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null,
            new_password: null,
            c_new_password: null
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = () => {
        // perform all neccassary validations

        if (this.state.new_password !== this.state.c_new_password) {
            swal('รหัสผ่านไม่ตรงกัน', '', 'warning')
        } else {
            this.edit();
            // console.log(this.state)
        }

    }

    edit = async () => {
        let object = {
            password: this.state.password,
            new_password: this.state.new_password
        };
        try {
            console.log(object)
            await post(object, "user/update_password", user_token).then((res) => {
                if (res.success) {
                    swal('เปลี่ยนรหัสผ่านแล้ว','', 'success')
                    setTimeout(() => {window.location.href = "/profile"},1000)
                    
                    
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
                    <Card.Header style={{ textAlign: 'center' }}>เปลี่ยนรหัสผ่าน</Card.Header>
                    <Card.Body className="mx-4">
                        <div className="form-group">
                            <label for="password" >รหัสผ่านเดิม:</label>
                            <input type="password" id='password' className="form-control" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label for="new_password" >รหัสผ่านใหม่:</label>
                            <input type="password" id='new_password' className="form-control" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label for="c_new_password" >ยืนยันรหัสผ่านใหม่:</label>
                            <input type="password" id='c_new_password' className="form-control" onChange={this.handleChange} />
                        </div>


                        <div className="text-center mb-1 mt-5">
                            <Button variant="danger" type="submit" onClick={() => this.handleSubmit()} className="btn-block z-depth-2">บึกทึก</Button>
                        </div>
                        <div className="text-center mb-4 mt-1">
                            <NavLink to="/profile"><Button variant="danger" type="submit" className="btn-block z-depth-2">ยกเลิก</Button></NavLink>
                        </div>


                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default update_password;