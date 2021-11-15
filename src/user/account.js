import React, { Component } from 'react'
import { Tabs, Table, Form, Row, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { post, get, ip } from '../service/service'
import { user_token } from '../support/constance';
import queryString from 'query-string';
import moment from 'moment'
import { MDBIcon } from "mdbreact";
import swal from 'sweetalert';
export class account extends Component {
    constructor(props) {
        super(props)

        this.state = {
            account: [],
            delete_id: null,
            index_delete: null,
        }
    }

    componentWillMount() {
        this.get_account()
    }

    get_account = async () => {
        try {
            await get('user/get_account', null).then((result) => {
                if (result.success) {
                    this.setState({
                        account: result.result
                    })
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            swal("เกิดข้อผิดพลาด", error, "error");
        }
    }

    delete_array = (delete_id) => {
        let product_data_array = this.state.account
        let index = product_data_array.findIndex((element) => {
            return element.account_id === delete_id
        })

        product_data_array.splice(index, 1)
        this.setState({ product: product_data_array })
        // this.setState({ result: 'confirmed', open: false })
    }

    delete = async (delete_id) => {
        let object = {
            account_id: delete_id
        }
        try {
            await post(object, 'user/delete_account', null).then((res) => {
                if (res.success) {
                    swal("ลบสินค้าเรียบร้อย", "", "success");
                    setTimeout(() => { window.location.href = "/account"; }, 500)
                    this.delete_array(delete_id)

                    // window.location.reload()
                    // console.log(object)
                    // this.get_product()
                } else {
                    swal("เกิดข้อผิดพลาด", res.error_message, "error");
                    console.log("error", res.error_message)
                }
            })
        } catch (err) {
            swal("เกิดข้อผิดพลาด", err, "error");
        }
    }

    render() {
        return (
            <div>
                <Card style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50, marginBottom: 50, width: '70rem' }}>
                    <Table striped bordered hover variant="dark" style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>ธนาคาร</th>
                                <th>สาขา</th>
                                <th>ชื่อบัญชี</th>
                                <th>เลขบัญชี</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.account.map((element, index) => {
                                    return (
                                        <tr>
                                            <td>{element.bank_name}</td>
                                            <td>{element.branch_name}</td>
                                            <td>{element.account_name}</td>
                                            <td>{element.account_number}</td>
                                            <td><NavLink to={"update_account?account_id=" + element.account_id}><Button variant="primary" type="submit">แก้ไข</Button>{'  '}</NavLink>
                                                <Button variant="danger" type="submit" onClick={() => 
                                                        swal({
                                                            title: "คุณต้องการลบบัญชีธนาคารหรือไม่?",
                                                            text: "โปรดตรวจสอบให้แน่ใจก่นยืนยัน!",
                                                            icon: "warning",
                                                            buttons: true,
                                                            dangerMode: true,
                                                        })
                                                            .then((willDelete) => {
                                                                if (willDelete) {
                                                                    this.delete(element.account_id, index)
                                                                } else {
                                                                }
                                                            })
                                                   }>ลบ</Button>{'  '}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </Table>
                </Card>
            </div>
        )
    }
}

export default account
