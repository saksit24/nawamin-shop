import React, { Component } from 'react';
import { Tabs, Tab, Form, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import '../App.css'
import { post, get, ip } from '../service/service'
import swal from 'sweetalert';
class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name_product: '',
            price_product: '',
            product: [],
            search_product: [],
            search_product2: [],
            image_product: '',
            type_product: '',
            img_defult: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg",
            test: 1,
        }
    }

    componentWillMount() {
        this.get_product()
    }

    get_product = async () => {
        try {
            await get('product/product', null).then((result) => {
                if (result.success) {
                    this.setState({
                        product: result.result,
                        search_product: result.result,
                        search_product2: result.result
                    })
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            swal("เกิดข้อผิดพลาด", error, "error");
        }
    }

    filterProduct = (event) => {

        var updatedList = this.state.search_product_type;
        updatedList = updatedList.filter(function (item) {
            return item.name_product.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        console.log('sss',updatedList)
        this.setState({
            search_product: updatedList,
        });
    }

    ondropdown = (event) => {
        
        var updatedList = this.state.product;
        updatedList = updatedList.filter(function (item) {
            return item.type_product.toString().search(
                event.target.value) !== -1;
        });
        console.log('sss',updatedList)
        this.setState({
            search_product: updatedList,
            search_product_type:updatedList
        });
    }


    render() {
        return (
            <div className="bg pt-5">
            <Container >

                <Form.Row style={{ justifyContent: "center", marginRight: '0', marginLeft: '0', paddingTop: 50, paddingBottom: 50 }} >
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control as="select" custom onChange={this.ondropdown} name='type_product'>
                            <option value="">กรุณาเลือกประเภท</option>
                            <option value="1">ผ้าฝ้ายดีไซน์</option>
                            <option value="2">เสื้อผ้าฝ้ายพื้นเมือง</option>
                            <option value="3">เสื้อหม้อห้อม</option>
                            <option value="4">ผ้าถุง</option>
                        </Form.Control>
                    </Form.Group>
                    <FormControl style={{ width: '20rem' }} name='search_product'
                        onChange={this.filterProduct} placeholder='กรอกชื่อเพื่อค้นหา' icon='search' />

                </Form.Row>

                <Form.Row style={{ marginRight: '0', marginLeft: '0' }}>
                    {
                        this.state.search_product ?
                            this.state.search_product.map((elment) => {
                                return (
                                    <Card style={{ width: '20%', float: 'left', marginLeft: '50px', textAlign: "center", alignItems: "center", marginBottom: '25px' }}>
                                        {
                                            elment.image_product ? <Card.Img variant="top" style={{ width: 200, height: 220, alignItems: "center" }} src={ip + elment.image_product} /> :
                                                <Card.Img variant="top" style={{ width: 200, height: 220, alignItems: "center" }} src={this.state.img_defult} />
                                        }
                                        <Card.Body>
                                            <Card.Title style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap',maxWidth:190}}>{elment.name_product}</Card.Title>
                                            <Card.Text>ราคา {elment.price_product} THB</Card.Text>
                                            <NavLink to={"product_sell?id_product=" + elment.id_product}><Button variant="primary">ตรวจสอบ</Button></NavLink>
                                        </Card.Body>
                                    </Card>
                                )
                            })
                            :
                            this.state.product.map((elment) => {
                                return (
                                    <Card style={{ width: '20%', float: 'left', marginLeft: '50px', textAlign: "center", alignItems: "center", marginBottom: '25px' }}>
                                        {
                                            elment.image_product ? <Card.Img variant="top" style={{ width: 200, height: 220, alignItems: "center" }} src={ip + elment.image_product} /> :
                                                <Card.Img variant="top" style={{ width: 200, height: 220, alignItems: "center" }} src={this.state.img_defult} />
                                        }
                                        <Card.Body>
                                            <Card.Title>{elment.name_product}</Card.Title>
                                            <Card.Text>ราคา {elment.price_product} THB</Card.Text>
                                            <NavLink to={"product_sell?id_product=" + elment.id_product}><Button variant="primary">ตรวจสอบ</Button></NavLink>
                                        </Card.Body>
                                    </Card>
                                )
                            })
                    }
                </Form.Row>
            </Container>
            </div>
        );
    }
}

export default home;