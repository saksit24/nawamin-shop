import React, { Component } from 'react'
import { Tabs, Table, Form, Row, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { post, get, ip } from '../service/service'
import { user_token } from '../support/constance';
import queryString from 'query-string';
import moment from 'moment'
import { MDBIcon } from "mdbreact";
import swal from 'sweetalert';
class tracking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ex_status: [],
            track: ''
        }
    }

    componentWillMount() {
        this.ex_status()
        // this.cart_product()
    }

    ex_status = async () => {
        try {
            await get('product/get_status2', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        ex_status: result.result
                    })
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            swal("เกิดข้อผิดพลาด", error, "error");
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

    oninput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    add_track = async (data) => {
        let object = {
            track: this.state.track,
            receipt_id: data
        };
        try {
            await post(object, "product/add_track", null).then(result => {
                if (result.success) {
                    swal("เพิ่มหมายเลขติดตามสินค้าเรียบร้อย", '', "success");
                    setTimeout(() => { window.location.href = "/tracking" }, 1000)

                } else {
                    swal("เกิดข้อผิดพลาด", result.error_message, "error");
                }
            });
        } catch (error) {
            swal("เกิดข้อผิดพลาด", error, "error");
        }
    }

    render() {
        return (
            <div className='bg3 page-content pt-5'>
                <Card style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50, marginBottom: 50, width: '75rem' }}>
                    <Card.Header style={{ textAlign: 'center' }}>รายการสั่งซื้อ (เตรียมการจัดส่งสินค้า)</Card.Header>
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.ex_status.map((element, index) => {
                                    return (
                                        <tr>
                                            <td>{element.receipt_id}</td>
                                            <td>{moment(element.date).format('lll')}</td>
                                            <td>{element.sum_price} THB</td>
                                            <td>{this.render_type(element.ex_status)}</td>
                                            <td  style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap',maxWidth:0}}>{
                                                element.track ? <a href={element.track} style={{ textDecoration: 'underline' }} target="_blank" >{element.track}</a> : <>
                                                    <Form.Control type="text" name='track' onChange={this.oninput} />
                                                    {
                                                        this.state.track ?
                                                            <Button variant="primary" type="submit" onClick={() =>
                                                                swal({
                                                                    title: "คุณต้องการเพิ่มหรือไม่?",
                                                                    text: "โปรดตรวจสอบให้แน่ใจก่นยืนยัน!",
                                                                    icon: "warning",
                                                                    buttons: true,
                                                                    dangerMode: true,
                                                                })
                                                                    .then((willDelete) => {
                                                                        if (willDelete) {
                                                                            this.add_track(element.receipt_id)
                                                                        } else {
                                                                        }
                                                                    })
                                                            }>บันทึกการแก้ไข</Button>
                                                            : null
                                                    }

                                                </>
                                            }


                                            </td>
                                            <td>{element.receipt_img ? 'ชำระเงินแล้ว' : 'ยังไม่ได้แนบหลักฐานการโอน'}</td>
                                            <td><NavLink to={"detail_confirm?receipt_id=" + element.receipt_id + "&&user_id=" + element.user_id}><Button variant="pink" type="submit">ตรวจสอบ</Button></NavLink></td>
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

export default tracking
