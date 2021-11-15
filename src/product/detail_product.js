import React, { Component } from 'react'
import { Tabs, Tab, Form, Row, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { post, get, ip } from '../service/service'
import { user_token } from '../support/constance';
import queryString from 'query-string';
import moment from 'moment'
import swal from 'sweetalert';
class detail_product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            search_product: [],
            type_product: null,
            name_product: null,
            detail_product: null,
            price_product: null,
            image_product: null,
            s: null,
            m: null,
            l: null,
            xl: null,
            xxl: null,
            xxxl: null,
            xxxxl: null,
            xxxxxl: null,
            date: null,
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        };
    }

    componentWillMount() {
        this.get_product()
    }

    get_product = async () => {
        let url = this.props.location.search
        let param = queryString.parse(url)
        console.log('par', param)
        try {
            await post(param, 'product/get_product', null).then((result) => {
                if (result.success) {
                    this.setState({
                        product: result.result
                    })

                } else {
                    swal("เกิดข้อผิดพลาด", result.error_message, "error");
                }
            });
        } catch (error) {

            swal("เกิดข้อผิดพลาด", error, "error");
        }
    }

    render_type = (type_product) => {
        let render_type
        switch (type_product) {
            case 1:
                render_type = 'ผ้าฝ้ายดีไซน์'
                break;
            case 2:
                render_type = 'เสื้อผ้าฝ้ายพื้นเมือง'
                break;
            case 3:
                render_type = 'เสื้อหม้อห้อม'
                break;
            case 4:
                render_type = 'ผ้าถุง'
                break;
            default:
                render_type = 'เกิดข้อผิดพลาด'
                break;
        }
        return render_type
    }



    render() {
        return (
            <Form className="bg3 page-content pt-5">
                <Card style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 50, width: '75rem' }}>
                    <Card.Header style={{ textAlign: 'center' }}>รายละเอียดสินค้า</Card.Header>
                    <Row>
                        <Col>
                            <a href={ip + this.state.product.image_product} target="_blank" ><Card.Img variant="top" src={ip + this.state.product.image_product} /></a>

                        </Col>
                        <Col>

                            <ListGroup className="list-group-flush">
                                <ListGroupItem>ชื่อ {this.state.product.name_product}</ListGroupItem>
                                <ListGroupItem>ประเภท {this.render_type(this.state.product.type_product)}</ListGroupItem>
                                <ListGroupItem>ราคา {this.state.product.price_product} บาท</ListGroupItem>
                            </ListGroup>
                            <Card.Body>

                                <Card.Title style={{ fontSize: 15 }}>จำนวน</Card.Title>
                                <Row>
                                    <Col>
                                        <Card.Text >S = {this.state.product.s} ชิ้น</Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text>M = {this.state.product.m} ชิ้น</Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text>L = {this.state.product.l} ชิ้น</Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text>XL = {this.state.product.xl} ชิ้น</Card.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card.Text>2XL = {this.state.product.xxl} ชิ้น</Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text>3XL = {this.state.product.xxxl} ชิ้น</Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text>4XL = {this.state.product.xxxxl} ชิ้น</Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text>5XL = {this.state.product.xxxxxl} ชิ้น</Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title style={{ fontSize: 15 }}>รายละเอียดเพิ่มเติม</Card.Title>
                                <Card.Text>{this.state.product.detail_product}</Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <NavLink to={"update_product?id_product=" + this.state.product.id_product}> <Button type="button" >แก้ไข</Button>{'   '}</NavLink>

                                <NavLink to="/product_admin"><Button type="button" >ย้อนกลับ</Button></NavLink>
                            </Card.Body>
                        </Col>
                    </Row>

                    <Card.Footer style={{ textAlign: 'center' }} className="text-muted">เพิ่มเมื่อ {moment(this.state.product.date).format('DD/MM/YYYY เวลา HH:mm:ss')}</Card.Footer>
                </Card>
            </Form>
        )
    }
}
export default detail_product;

