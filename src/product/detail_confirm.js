import React, { Component } from 'react'
import { Tabs, Table, Form, Row, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { post, get, ip } from '../service/service'
import { user_token } from '../support/constance';
import queryString from 'query-string';
import moment from 'moment'
import swal from 'sweetalert';
export class detail_confirm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ex: [],
            product: [],
            user: [],
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        }
    }


    detail_ex = async () => {
        let url = this.props.location.search
        let param = queryString.parse(url)
        console.log('par', param)
        try {
            await post(param, 'receipt/detail_ex', null).then((result) => {
                if (result.success) {
                    this.setState({
                        ex: result.result
                    })

                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            swal("เกิดข้อผิดพลาด", error, "error");
        }
    }

    get_product_ex = async () => {
        let url = this.props.location.search
        let param = queryString.parse(url)
        console.log('par', param)
        try {
            await post(param, 'product/get_product_ex', null).then((result) => {
                if (result.success) {
                    this.setState({
                        product: result.result
                    })

                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {

            swal("เกิดข้อผิดพลาด", error, "error");
        }
    }
    user_status = async () => {
        let url = this.props.location.search
        let param = queryString.parse(url)
        console.log('par', param)
        try {
            await post(param, 'product/user_status', null).then((result) => {
                if (result.success) {
                    this.setState({
                        user: result.result
                    })
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {

            swal("เกิดข้อผิดพลาด", error, "error");
        }
    }
    componentWillMount() {
        this.detail_ex();
        this.get_product_ex();
        this.user_status();
    }

    add_status = async () => {
        let object = {
            receipt_id: this.state.ex.receipt_id,
        };
        try {
            await post(object, "product/ex_status2", null).then(result => {
                if (result.success) {
                    swal("เพิ่มบัญชีเรียบร้อย", '', "success");
                    setTimeout(() => { window.location.href = "/confirm_product" }, 1000)

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
            <div className='bg page-content pt-5'>
                <Card style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50, marginBottom: 50, width: '75rem' }}>
                    <Card.Header style={{ textAlign: 'center' }}>รายการสินค้า</Card.Header>
                    <Table responsive style={{ textAlign: 'center' }} >
                        <thead>
                            <tr>
                                <th>รายการที่</th>
                                <th>ชื่อสินค้า</th>
                                <th>S</th>
                                <th>M</th>
                                <th>L</th>
                                <th>XL</th>
                                <th>2Xl</th>
                                <th>3XL</th>
                                <th>4XL</th>
                                <th>5XL</th>
                                <th>ราคา/ตัว</th>
                                <th>จำนวนรวม</th>
                                <th>ราคารวม</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                this.state.product.map((element, index) => {
                                    let sum = element.s + element.m + element.l + element.xl + element.xxl + element.xxxl + element.xxxxl + element.xxxxxl
                                    let sum_price = sum * element.price_product
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{element.name_product}</td>
                                            <td>{element.s}</td>
                                            <td>{element.m}</td>
                                            <td>{element.l}</td>
                                            <td>{element.xl}</td>
                                            <td>{element.xxl}</td>
                                            <td>{element.xxxl}</td>
                                            <td>{element.xxxxl}</td>
                                            <td>{element.xxxxxl}</td>
                                            <td>{element.price_product}</td>
                                            <td>{sum}</td>
                                            <td>{sum_price}</td>

                                        </tr>
                                    )
                                })
                            }
                            <tr >
                                <th colSpan="10" ></th>
                                <th> ราคารวมทั้งหมด</th>
                                <th>{this.state.ex.sum_price}</th>
                                <th> บาท</th>
                            </tr>
                        </tbody>
                    </Table>

                </Card>
                <Card style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50, marginBottom: 50, width: '75rem' }}>
                    <Card.Header style={{ textAlign: 'center' }}>ข้อมูลลูกค้า</Card.Header>
                    <Row>
                        <Col>
                            {
                                this.state.user.userimg ?
                                    <a href={ip + this.state.user.userimg} target="_blank" ><Card.Img variant="top" style={{ width: "250px", height: "280px", display: "block", marginLeft: "auto", marginRight: "auto" }} src={ip + this.state.user.userimg} /></a>
                                    :
                                    <Card.Img variant="top" style={{ width: "250px", height: "280px", display: "block", marginLeft: "auto", marginRight: "auto" }} src={this.state.default_user_image} />
                            }

                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: 15 }}>ชื่อใช้</Card.Title>
                                        <Card.Text>{this.state.user.username}</Card.Text>
                                    </Card.Body>
                                </Col>
                                <Col>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: 15 }}>ชื่อ-สกุล</Card.Title>
                                        <Card.Text>{this.state.user.name} {this.state.user.last_name}</Card.Text>
                                    </Card.Body>
                                </Col>
                                <Col>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: 15 }}>เบอร์โทร</Card.Title>
                                        <Card.Text>{this.state.user.phonenumber}</Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: 15 }}>E-mail</Card.Title>
                                        <Card.Text>{this.state.user.email}</Card.Text>
                                    </Card.Body>
                                </Col>
                                <Col>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: 15 }}>ที่อยู่</Card.Title>
                                        <Card.Text>{this.state.user.address}</Card.Text>
                                    </Card.Body>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Card>
                <Card style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50, marginBottom: 50, width: '75rem' }}>
                    <Card.Header style={{ textAlign: 'center' }}>หลักฐานการชำระเงิน</Card.Header>
                    {
                        this.state.ex.receipt_img ?
                            <Row>
                                <Col>
                                    <a href={ip + this.state.ex.receipt_img} target="_blank" ><Card.Img variant="top" style={{ width: "500px", height: "500px", display: "block", marginLeft: "auto", marginRight: "auto" }} src={ip + this.state.ex.receipt_img} /></a>
                                </Col>
                                {
                                    this.state.ex.ex_status == 1 ?
                                        <Col style={{ textAlign: 'center', marginTop: '230px' }}>
                                            <Card.Text>โปรดตรวจสอบความถูกต้องก่อนยืนยัน</Card.Text>
                                            <Button type='submit' variant='primary' onClick={() =>
                                                swal({
                                                    title: "คุณต้องการยืนการชำระเงินหรือไม่?",
                                                    text: "โปรดตรวจสอบให้แน่ใจก่นยืนยัน!",
                                                    icon: "warning",
                                                    buttons: true,
                                                    dangerMode: true,
                                                })
                                                    .then((willDelete) => {
                                                        if (willDelete) {
                                                            this.add_status()
                                                        } else {
                                                        }
                                                    })
                                            }>ยืนยัน</Button>
                                        </Col>
                                        :
                                        null
                                }

                            </Row>
                            :
                            <Card.Text style={{ textAlign: 'center' }}>ไม่พบหลักฐานการโอน</Card.Text>
                    }

                </Card>
            </div>
        )
    }
}

export default detail_confirm
