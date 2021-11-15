import React, { Component } from 'react'
import { Tabs, Tab, Form, Row, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, ListGroup, ListGroupItem, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { post, get, ip } from '../service/service'
import { user_token } from '../support/constance';
import queryString from 'query-string';
import swal from 'sweetalert';
class update_product extends Component {
    constructor() {
        super();
        this.state = {
            product: [],
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
            xxxxxl: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        this.get_update();
    }

    get_update = async () => {
        let url = this.props.location.search
        let param = queryString.parse(url)
        console.log('par', param)
        try {
            await post(param, 'product/get_update', user_token).then((result) => {
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

    edit = async () => {

        let object = {
            id_product: this.state.product.id_product,
            name_product: this.state.product.name_product,
            type_product: this.state.product.type_product,
            price_product: this.state.product.price_product,
            detail_product: this.state.product.detail_product,
            s: this.state.product.s,
            m: this.state.product.m,
            l: this.state.product.l,
            xl: this.state.product.xl,
            xxl: this.state.product.xxl,
            xxxl: this.state.product.xxxl,
            xxxxl: this.state.product.xxxxl,
            xxxxxl: this.state.product.xxxxxl,
            image_product: this.state.product.image_product
        };
        try {
            await post(object, "product/update_product").then(res => {
                if (res.success) {
                    swal("บันทึกข้อมูลเรียบร้อย", "", "success");
                    window.location.href = "detail_product?id_product=" + this.state.product.id_product;

                } else {
                    swal("เกิดข้อผิดพลาด", res.error_message, "error");

                }
            });
        } catch (error) {
            swal("เกิดข้อผิดพลาด", error, "error");
            console.log('error', error)
        }
    }


    handleInputChange(event) {
        const target = event.target;
        const value = event.target.value;
        const name = target.name;


        let product = this.state.product
        product[name] = value
        this.setState({
            product: product
        });
    }


    uploadpicture = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) {
        } else {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                console.log("img", reader.result)
                let product = this.state.product
                product.image_product = reader.result
                this.setState({
                    product: product
                });
            }
        }
    }

    onrenderimage = (image_url) => {
        let url = image_url
        var index = image_url.indexOf('data:image/');
        if (index === -1) {
            url = ip + image_url
        } else {
        }
        return url
    }

    render_type = (type_product) => {
        let render_type
        switch (type_product) {
            case 1:
                render_type = 'หม้อห้อม'
                break;
            case 2:
                render_type = 'ผ้าฝ้าย'
                break;
            case 3:
                render_type = 'มัดย้อม'
                break;
            case 4:
                render_type = 'ผ้าขาวเย็บ'
                break;
            default:
                render_type = <div className="FontDanger"> เกิดข้อผิดพลาด </div>
                break;
        }

        return render_type
    }

    render() {
        return (
            <div className="bg3 page-content pt-5">

                <Card style={{
                    display: "block",
                    justifyContent: "center",
                    alignItems: "center",
                    width: '40rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>
                    <div className="d-flex justify-content-center">
                        {this.state.product.image_product ? <Image size='small' style={{ height: '200px', width: '230px' }} src={this.onrenderimage(this.state.product.image_product)} />
                            : <Image size='small' style={{ height: '200px', width: '230px' }} src={this.state.default_user_image} />}
                    </div>
                    <div className="d-flex justify-content-center">
                        <input width={5} type="file" onChange={this.uploadpicture} />
                    </div>
                    <Card.Body className="mx-4 mt-4">
                        {/* <Form.Row className="d-flex justify-content-center">
                            <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">เพิ่มสินค้า</h3>
                        </Form.Row> */}
                        <Form.Group >
                            <Form.Label>ชื่อสินค้า</Form.Label>
                            <Form.Control
                                value={this.state.product.name_product}
                                type="text"
                                name="name_product"
                                onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>ประเภทสินค้า</Form.Label>
                            <Form.Control as="select" name="type_product" onChange={this.handleInputChange}>
                                <option value="0" defaultValue>{this.render_type(this.state.product.type_product)}</option>
                                <option value="1">ผ้าฝ้ายดีไซน์</option>
                                <option value="2">เสื้อผ้าฝ้ายพื้นเมือง</option>
                                <option value="3">เสื้อหม้อห้อม</option>
                                <option value="4">ผ้าถุง</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>ราคาขาย</Form.Label>
                            <Form.Control
                                value={this.state.product.price_product}
                                type="number"
                                min="0"
                                name="price_product"
                                onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>จำนวน</Form.Label>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>S</Form.Label>
                                <Form.Control type="number" defaultValue="0" min="0" name="s"
                                    value={this.state.product.s}
                                    onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>M</Form.Label>
                                <Form.Control type="number" defaultValue="0" min="0" name="m"
                                    value={this.state.product.m}
                                    onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>L</Form.Label>
                                <Form.Control type="number" defaultValue="0" min="0" name="l"
                                    value={this.state.product.l}
                                    onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>XL</Form.Label>
                                <Form.Control type="number" defaultValue="0" min="0" name="xl"
                                    value={this.state.product.xl}
                                    onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>2XL</Form.Label>
                                <Form.Control type="number" defaultValue="0" min="0" name="xxl"
                                    value={this.state.product.xxl}
                                    onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>3XL</Form.Label>
                                <Form.Control type="number" defaultValue="0" min="0" name="xxxl"
                                    value={this.state.product.xxxl}
                                    onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>4XL</Form.Label>
                                <Form.Control type="number" defaultValue="0" min="0" name="xxxxl"
                                    value={this.state.product.xxxxl}
                                    onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>5XL</Form.Label>
                                <Form.Control type="number" defaultValue="0" min="0" name="xxxxxl"
                                    value={this.state.product.xxxxxl}
                                    onChange={this.handleInputChange} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>รายละเอียดสินค้า</Form.Label>
                            <Form.Control as="textarea" rows="3"
                                value={this.state.product.detail_product}
                                name="detail_product"
                                onChange={this.handleInputChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={() =>
                            swal({
                                title: "คุณต้องกาบันทึกการแก้ไขหรือไม่?",
                                text: "โปรดตรวจสอบให้แน่ใจก่นยืนยัน!",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                            })
                                .then((willDelete) => {
                                    if (willDelete) {
                                        this.edit()
                                    } else {
                                    }
                                })
                        }>บันทึกการแก้ไข</Button>{'  '}
                        <NavLink to={"detail_product?id_product=" + this.state.product.id_product}><Button variant="primary" type="submit">ยกเลิก</Button></NavLink>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default update_product
