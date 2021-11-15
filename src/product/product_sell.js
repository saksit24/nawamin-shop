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
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
            xxxxl: 0,
            xxxxxl: 0,
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
                    // window.location.href = "/";
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

    check_product = async () => {
        if ((this.state.s == 0) && (this.state.m == 0) && (this.state.l == 0) && (this.state.xl == 0) && (this.state.xxl == 0) && (this.state.xxxl == 0) && (this.state.xxxxl == 0) && (this.state.xxxxxl == 0)) {
            swal("กรุณาใส่จำนวนสินค้า", '', "warning");
        }else if ((this.state.s > this.state.product.s) || (this.state.m > this.state.product.m) || (this.state.l > this.state.product.l) || (this.state.xl > this.state.product.xl) || (this.state.xxl > this.state.product.xxl) || (this.state.xxxl > this.state.product.xxxl) || (this.state.xxxxl > this.state.product.xxxxl) || (this.state.xxxxxl > this.state.product.xxxxxl)) {
            swal("สินค้าในคลังมีไม่พอกรุณาใส่จำนวนให้ถูกต้อง", '', "warning");
        } else {
            this.add_order()
        }
    }

    add_order = async () => {
        let object = {
            id_product: this.state.product.id_product,
            s: this.state.s,
            m: this.state.m,
            l: this.state.l,
            xl: this.state.xl,
            xxl: this.state.xxl,
            xxxl: this.state.xxxl,
            xxxxl: this.state.xxxxl,
            xxxxxl: this.state.xxxxxl,
            name_product: this.state.product.name_product,
            price_product: this.state.product.price_product,
        };
        try {
            await post(object, "product/order", user_token).then(result => {
                console.log("product", result);
                if (result.success) {
                    swal("เพิ่มสินค้าลงตะกร้าเรียบร้อย", "", "success");
                    setTimeout(() => { window.location.href = "/product" }, 1000)

                } else {
                    swal("เกิดข้อผิดพลาด", result.error_message, "error");
                }
            });
        } catch (error) {
            swal("เกิดข้อผิดพลาด", error, "error");
        }
    }

    oninput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <Form className="bg3 pt-5">
                <Card style={{ marginLeft: 'auto', marginRight: 'auto', width: '75rem' }}>
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
                                <Card.Title style={{ fontSize: 15 }}>รายละเอียดเพิ่มเติม</Card.Title>
                                <Card.Text>{this.state.product.detail_product}</Card.Text>
                            </Card.Body>
                            <Card.Body>

                                <Card.Title style={{ fontSize: 15 }}>จำนวน</Card.Title>
                                <Form.Row>
                                    {
                                        this.state.product.s != 0 ?
                                            <Form.Group as={Col} md='3' >
                                                <Row>
                                                    <Form.Label> S</Form.Label>
                                                    <p>&nbsp;&nbsp;&nbsp;</p>
                                                    <Form.Text className="text-muted">มีจำนวน {this.state.product.s} ชิ้น</Form.Text>
                                                </Row>
                                                <Form.Control type="number" defaultValue={0} min={0} max={this.state.product.s} name="s" onChange={this.oninput} />
                                            </Form.Group> : null
                                    }
                                    {
                                        this.state.product.m != 0 ?
                                            <Form.Group as={Col} md='3' >
                                                <Row>
                                                    <Form.Label>M </Form.Label>
                                                    <p>&nbsp;&nbsp;&nbsp;</p>
                                                    <Form.Text className="text-muted">มีจำนวน {this.state.product.m} ชิ้น</Form.Text>
                                                </Row>
                                                <Form.Control type="number" defaultValue={0} min={0} max={this.state.product.m} name="m" onChange={this.oninput} />
                                            </Form.Group> : null
                                    }
                                    {
                                        this.state.product.l != 0 ?
                                            <Form.Group as={Col} md='3' >
                                                <Row>
                                                    <Form.Label>L</Form.Label>
                                                    <p>&nbsp;&nbsp;&nbsp;</p>
                                                    <Form.Text className="text-muted">มีจำนวน {this.state.product.l} ชิ้น</Form.Text>
                                                </Row>
                                                <Form.Control type="number" defaultValue={0} min={0} max={this.state.product.l} name="l" onChange={this.oninput} />
                                            </Form.Group> : null
                                    }
                                    {
                                        this.state.product.xl != 0 ?
                                            <Form.Group as={Col} md='3' >
                                                <Row>
                                                    <Form.Label>XL</Form.Label>
                                                    <p>&nbsp;&nbsp;&nbsp;</p>
                                                    <Form.Text className="text-muted">มีจำนวน {this.state.product.xl} ชิ้น</Form.Text>
                                                </Row>
                                                <Form.Control type="number" defaultValue={0} min={0} max={this.state.product.xl} name="xl" onChange={this.oninput} />
                                            </Form.Group> : null
                                    }
                                    {
                                        this.state.product.xxl != 0 ?
                                            <Form.Group as={Col} md='3' >
                                                <Row>
                                                    <Form.Label>2XL</Form.Label>
                                                    <p>&nbsp;&nbsp;&nbsp;</p>
                                                    <Form.Text className="text-muted">มีจำนวน {this.state.product.xxl} ชิ้น</Form.Text>
                                                </Row>
                                                <Form.Control type="number" defaultValue={0} min={0} max={this.state.product.xxl} name="xxl" onChange={this.oninput} />
                                            </Form.Group> : null
                                    }
                                    {
                                        this.state.product.xxxl != 0 ?
                                            <Form.Group as={Col} md='3' >
                                                <Row>
                                                    <Form.Label>3XL</Form.Label>
                                                    <p>&nbsp;&nbsp;&nbsp;</p>
                                                    <Form.Text className="text-muted">มีจำนวน {this.state.product.xxxl} ชิ้น</Form.Text>
                                                </Row>
                                                <Form.Control type="number" defaultValue={0} min={0} max={this.state.product.xxxl} name="xxxl" onChange={this.oninput} />
                                            </Form.Group> : null
                                    }
                                    {
                                        this.state.product.xxxxl != 0 ?
                                            <Form.Group as={Col} md='3' >
                                                <Row>
                                                    <Form.Label>4XL</Form.Label>
                                                    <p>&nbsp;&nbsp;&nbsp;</p>
                                                    <Form.Text className="text-muted">มีจำนวน {this.state.product.xxxxl} ชิ้น</Form.Text>
                                                </Row>
                                                <Form.Control type="number" defaultValue={0} min={0} max={this.state.product.xxxxl} name="xxxxl" onChange={this.oninput} />
                                            </Form.Group> : null
                                    }
                                    {
                                        this.state.product.xxxxxl != 0 ?
                                            <Form.Group as={Col} md='3' >
                                                <Row>
                                                    <Form.Label>5XL</Form.Label>
                                                    <p>&nbsp;&nbsp;&nbsp;</p>
                                                    <Form.Text className="text-muted">มีจำนวน {this.state.product.xxxxxl} ชิ้น</Form.Text>
                                                </Row>
                                                <Form.Control type="number" defaultValue={0} min={0} max={this.state.product.xxxxxl} name="xxxxxl" onChange={this.oninput} />
                                            </Form.Group> : null
                                    }

                                </Form.Row>
                            </Card.Body>

                            <Card.Body>
                                <Button type="button" onClick={() => this.check_product()}>เพิ่มในตะกร้าสินค้า</Button>{'   '}

                                <NavLink to="/product"><Button type="button" >ย้อนกลับ</Button></NavLink>
                            </Card.Body>
                        </Col>
                    </Row>

                    <Card.Footer style={{ textAlign: 'center' }} className="text-muted">NAWAMIN SHOP</Card.Footer>
                </Card>
            </Form>
        )
    }
}
export default detail_product;

