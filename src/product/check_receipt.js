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


    get_product = async () => {
        let url = this.props.location.search
        let param = queryString.parse(url)
        console.log('par', param)
        try {
            await post(param, 'product/get_product_user', null).then((result) => {
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

    detail_ex_user = async () => {
        let url = this.props.location.search
        let param = queryString.parse(url)
        console.log('par', param)
        try {
            await post(param, 'product/detail_ex_user', null).then((result) => {
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

    componentWillMount() {
        this.get_product();
        this.detail_ex_user();
    }


    render() {
        return (
            <div className='bg3 pt-5'>
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
                        <Card.Footer style={{ textAlign: 'center' }}>สั่งสินค้าเมื่อ {moment(this.state.ex.date).format('lll')}</Card.Footer>
                </Card>
            </div>
        )
    }
}

export default detail_confirm
