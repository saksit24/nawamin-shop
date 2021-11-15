import React, { Component } from 'react'
import { Tabs, Table, Form, Row, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { post, get, ip } from '../service/service'
import { user_token } from '../support/constance';
import queryString from 'query-string';
import moment from 'moment'
import { MDBIcon } from "mdbreact";
import swal from 'sweetalert';
export class status_track extends Component {
    constructor(props) {
        super(props)

        this.state = {
            receipt: [],
            account: [],
            delete_id: null,
            index_delete: null,
        }
    }

    componentWillMount() {
        this.get_receipt()
        this.get_account()
    }

    get_receipt = async () => {
        try {
            await get('product/get_receipt', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        receipt: result.result
                    })
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            swal("เกิดข้อผิดพลาด", error, "error");
        }
    }

    get_account = async () => {
        try {
            await get('account/get_account_user', null).then((result) => {
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
        let receipt_data_array = this.state.receipt
        let index = receipt_data_array.findIndex((element) => {
            return element.receipt_id === delete_id
        })

        receipt_data_array.splice(index, 1)
        this.setState({ receipt: receipt_data_array })
    }

    delete = async (delete_id) => {
        let object = {
            receipt_id: delete_id
        }
        try {
            await post(object, 'product/delete_receipt', null).then((res) => {
                if (res.success) {
                    swal("ลบรายการสั่งซื้อสินค้าเรียบร้อย", "", "success");
                    setTimeout(() => { window.location.href = "/status_track"; }, 500)
                    this.delete_array(delete_id)
                } else {
                    swal("เกิดข้อผิดพลาด", res.error_message, "error");
                }
            })
        } catch (err) {
            swal("เกิดข้อผิดพลาด", err, "error");
        }
    }


    render_type = (ex_status) => {
        let render_type
        switch (ex_status) {
            case 0:
                render_type = 'รอการชำระเงิน'
                break;
            case 1:
                render_type = 'รอการยืนยันเพื่อเตรียมจัดส่ง'
                break;
            case 2:
                render_type = 'กำลังเตรียมการจัดส่ง'
                break;
            case 3:
                render_type = 'จัดส่งแล้ว'
                break;
            default:
                render_type = 'เกิดข้อผิดพลาด'
                break;
        }
        return render_type
    }

    render() {
        return (
            <div className='bg1 pt-5'>
                <br />
                <Card style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 50, width: '80rem' }}>
                    <Card.Header style={{ textAlign: 'center' }}>บัญชีธนาคาร</Card.Header>
                    <Card.Body style={{ color: 'red', fontSize: 30 }}>* เมื่อชำระเงินแล้วจะไม่สามารถยกเลิกการสั่งซื้อได้โปรดตรวจสอบให้แน่ใจก่อนชำระเงิน</Card.Body>
                    <Card.Body style={{ color: 'red', fontSize: 30 }}>** โปรดชำระเงินภายใน7วันที่ทำการสั่งซื้อ หากท่านไม่ชำระ ออเดอร์จะถูกยกเลิกทันที</Card.Body>
                    {
                        this.state.account.map((element) => {
                            return (
                                element.account ?
                                    <Card.Img style={{ width: "400px", height: "400px", display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: 20 }} src={ip + element.account} />
                                    : null
                            )
                        })}
                </Card>
                <Card style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50, marginBottom: 50, width: '80rem' }}>
                    <Card.Header style={{ textAlign: 'center' }}>รายการสั่งซื้อ</Card.Header>
                    <Table responsive bordered size="lg" style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>เลขรายการ</th>
                                <th>วันที่</th>
                                <th>จำนวนเงิน</th>
                                <th>สถานะสินค้า</th>
                                <th>ติดตามสถานะสินค้า</th>
                                <th>สถานะการโอน</th>
                                <th>ตรวจสอบ</th>
                                <th>ยกเลิก</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.receipt.map((element, index) => {
                                    return (
                                        <tr>
                                            <td>{element.receipt_id}</td>
                                            <td>{moment(element.date).format('lll')}</td>
                                            <td>{element.sum_price} THB</td>
                                            <td>{this.render_type(element.ex_status)}</td>
                                            <td style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: 0 }}>{element.track ? <a href={element.track} style={{ textDecoration: 'underline' }} target="_blank" >{element.track}</a> : '-'}</td>
                                            <td>{element.receipt_img ? 'ชำระเงินแล้ว' : <NavLink to={"upload_confirm?receipt_id=" + element.receipt_id}><Button variant="primary" type="submit">กรุณาแนบหลักฐานการโอน</Button></NavLink>}</td>
                                            <td><NavLink to={"check_receipt?receipt_id=" + element.receipt_id}><Button variant="primary" type="submit">ตรวจสอบ</Button></NavLink></td>
                                            <td>{element.receipt_img ? '-' : <Button variant="danger" type="submit" onClick={() =>
                                                swal({
                                                    title: "คุณต้องการลบรายการสั่งซื้อสินค้าหรือไม่?",
                                                    text: "โปรดตรวจสอบให้แน่ใจก่นยืนยัน!",
                                                    icon: "warning",
                                                    buttons: true,
                                                    dangerMode: true,
                                                })
                                                    .then((willDelete) => {
                                                        if (willDelete) {
                                                            this.delete(element.receipt_id, index)
                                                        } else {
                                                        }
                                                    })
                                            }>ยกเลิกรายการสั่งซื้อ</Button>}</td>
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

export default status_track
