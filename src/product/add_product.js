import React, { Component } from 'react'
import { Tabs, Tab, Form, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, Navbar, Nav } from 'react-bootstrap'
import { post, get } from '../service/service'
import swal from 'sweetalert';
export class add_product extends Component {
    constructor() {
        super();
        this.state = {
            type_product: null,
            name_product: null,
            detail_product: null,
            price_product: null,
            image_product: null,
            s: '',
            m: '',
            l: '',
            xl: '',
            xxl: '',
            xxxl: '',
            xxxxl: '',
            xxxxxl: ''
        }
    }

    add_product = async () => {
        let object = {
            name_product: this.state.name_product,
            price_product: this.state.price_product,
            type_product: this.state.type_product,
            detail_product: this.state.detail_product,
            image_product: this.state.image_product,
            s: this.state.s,
            m: this.state.m,
            l: this.state.l,
            xl: this.state.xl,
            xxl: this.state.xxl,
            xxxl: this.state.xxxl,
            xxxxl: this.state.xxxxl,
            xxxxxl: this.state.xxxxxl
        };
        try {
            await post(object, "product/add_product", null).then(result => {
                console.log("product", result);
                if (result.success) {
                    swal("เพิ่มสินค้าเรียบร้อย", "", "success");
                    setTimeout(() => { window.location.href = "/add_product" }, 1000)

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

    ondropdown = (event) => {
        this.setState({
            type_product: event.target.value
        })
    }

    uploadpicture = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) {

        } else {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                console.log("img", reader.result)
                this.setState({
                    image_product: reader.result
                });
            }
        }
    }
    render() {
        return (
            <div className="bg page-content pt-5" >
                <Card style={{
                    display: "block",
                    justifyContent: "center",
                    alignItems: "center",
                    width: '40rem',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    <Card.Body className="mx-4 mt-4">
                        <Form.Row className="d-flex justify-content-center">
                            <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">เพิ่มสินค้า</h3>
                        </Form.Row>
                        <Form.Group >
                            <Form.Label>ชื่อสินค้า</Form.Label>
                            <Form.Control type="text" name="name_product" onChange={this.oninput} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>ประเภทสินค้า</Form.Label>
                            <Form.Control as="select" onChange={this.ondropdown}>
                                <option defaultValue>กรุณาเลือกประเภท</option>
                                <option value="1">ผ้าฝ้ายดีไซน์</option>
                                <option value="2">เสื้อผ้าฝ้ายพื้นเมือง</option>
                                <option value="3">เสื้อหม้อห้อม</option>
                                <option value="4">ผ้าถุง</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>ราคาขาย</Form.Label>
                            <Form.Control type="number" min="0" name="price_product" onChange={this.oninput} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>จำนวน</Form.Label>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>S</Form.Label>
                                <Form.Control type="number" defaultValue={0} min={0} name="s" onChange={this.oninput} />
                            </Form.Group>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>M</Form.Label>
                                <Form.Control type="number" defaultValue={0} min={0} name="m" onChange={this.oninput} />
                            </Form.Group>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>L</Form.Label>
                                <Form.Control type="number" defaultValue={0} min={0} name="l" onChange={this.oninput} />
                            </Form.Group>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>XL</Form.Label>
                                <Form.Control type="number" defaultValue={0} min={0} name="xl" onChange={this.oninput} />
                            </Form.Group>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>2XL</Form.Label>
                                <Form.Control type="number" defaultValue={0} min={0} name="xxl" onChange={this.oninput} />
                            </Form.Group>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>3XL</Form.Label>
                                <Form.Control type="number" defaultValue={0} min={0} name="xxxl" onChange={this.oninput} />
                            </Form.Group>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>4XL</Form.Label>
                                <Form.Control type="number" defaultValue={0} min={0} name="xxxxl" onChange={this.oninput} />
                            </Form.Group>
                            <Form.Group as={Col} md='3' >
                                <Form.Label>5XL</Form.Label>
                                <Form.Control type="number" defaultValue={0} min={0} name="xxxxxl" onChange={this.oninput} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>รายละเอียดสินค้า</Form.Label>
                            <Form.Control as="textarea" rows="3" name="detail_product" onChange={this.oninput} />
                        </Form.Group>
                        {
                            this.state.image_product ? <img style={{ width: "150px", height: "150px", display: "block", marginLeft: "auto", marginRight: "auto" }} src={this.state.image_product} /> : null
                        }
                        <br />
                        <input type="file" multiple onChange={this.uploadpicture} />
                        <br />
                        <br />
                        <div style={{ textAlign: 'center' }}>
                            <Button variant="primary" type="submit" onClick={() =>
                                swal({
                                    title: "คุณต้องการเพิ่มสินค้าหรือไม่?",
                                    text: "โปรดตรวจสอบให้แน่ใจก่นยืนยัน!",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            this.add_product()
                                        } else {
                                        }
                                    })}>ยืนยัน</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default add_product
