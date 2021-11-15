import React, { Component } from 'react'
import { Tabs, Table, Form, Row, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { post, get, ip } from '../service/service'
import { user_token } from '../support/constance';
import queryString from 'query-string';
import moment from 'moment'
import { MDBIcon } from "mdbreact";

export class add_account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: [],
            account_name: null,
            account_number: null,
            bank_name: null,
            branch_name: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    update = async () => {
        var object = {
            account_id: this.state.account.account_id,
            account_name: this.state.account.account_name,
            account_number: this.state.account.account_number,
            bank_name: this.state.account.bank_name,
            branch_name: this.state.account.branch_name
        };
        console.log('test',object)
        try {
            await post(object, "user/update_account", null).then(result => {
                console.log("product", result);
                if (result.success) {
                    alert('อัพเดทบัญชีธนาคารเรียบร้อย')
                    setTimeout(() => { window.location.href = "update_account?account_id=" + this.state.account.account_id }, 1000)

                } else {
                    alert('error ' + result.error_message);
                }
            });
        } catch (error) {
            alert('error :', error);
        }
        console.log("edit2" + this.state);
    }



    get_account = async () => {
        let url = this.props.location.search
        let param = queryString.parse(url)
        console.log('par', param)
        try {
            await post(param, 'user/get_update_account', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        account: result.result
                    })
                    setTimeout(() => {
                        console.log("get update", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            alert("get_user2" + error);
        }
    }


    handleInputChange(event) {
        const target = event.target;
        const value = event.target.value;
        const name = target.name;


        let account = this.state.account
        account[name] = value
        this.setState({
            account: account
        });
    }

    componentWillMount() {
        this.get_account()
    }


    render() {
        return (
            <div>
                <Card style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50, marginBottom: 50, width: '50rem' }}>
                    <Card.Header style={{ textAlign: 'center' }}>แก้ไขบัญชีธนาคาร</Card.Header>
                    <Card.Body className="mx-4 mt-4">
                        <Form >

                            <Form.Group >
                                <Form.Label>หมายเลขบัญชี</Form.Label>
                                <Form.Control type="number" name="account_number"
                                    value={this.state.account.account_number}
                                    onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group  >
                                <Form.Label>ชื่อบัญชี</Form.Label>
                                <Form.Control type="text" name="account_name" value={this.state.account.account_name}
                                    onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group  >
                                <Form.Label>ธนาคาร</Form.Label>
                                <Form.Control type="text" name="bank_name" value={this.state.account.bank_name}
                                    onChange={this.handleInputChange} />
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>สาขา</Form.Label>
                                <Form.Control type="text" name="branch_name" value={this.state.account.branch_name}
                                    onChange={this.handleInputChange} />
                            </Form.Group>



                            <Button variant="primary" type="submit" onClick={() => this.update()} >บันทึกการแก้ไข</Button>{'  '}
                            <NavLink to={"account"}><Button variant="primary" type="submit">ยกเลิก</Button></NavLink>


                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default add_account
