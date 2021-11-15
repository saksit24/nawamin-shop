import React, { Component } from 'react'
import { Tabs, Table, Form, Row, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { post, get, ip } from '../service/service'
import { user_token } from '../support/constance';
import queryString from 'query-string';
import moment from 'moment'
import { MDBIcon } from "mdbreact";
import swal from 'sweetalert';
export class add_account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account_img: null,
            account: [],
            delete_id: null,
            index_delete: null,
        }
    }



    add_account = async () => {
        let object = {
            account: this.state.account_img
        };
        try {
            await post(object, "user/add_account", null).then(result => {
                console.log("product", result);
                if (result.success) {
                    swal("เพิ่มบัญชีเรียบร้อย", "", "success");
                    setTimeout(() => { window.location.href = "/add_account" }, 1000)

                } else {
                    swal("เกิดข้อผิดพลาด", result.error_message, "error");
                }
            });
        } catch (error) {
            swal("เกิดข้อผิดพลาด", error, "error");
        }
        // console.log("Signup" + this.state);
    }

    delete_array = (delete_id) => {
        let product_data_array = this.state.account
        console.log('tes', product_data_array)
        let index = product_data_array.findIndex((element) => {
            return element.account_id === delete_id
        })

        product_data_array.splice(index, 1)
        this.setState({ account: product_data_array })
        // this.setState({ result: 'confirmed', open: false })
    }

    delete = async (delete_id) => {
        let object = {
            account_id: delete_id
        }
        try {
            await post(object, 'user/delete_account', null).then((res) => {
                if (res.success) {
                    swal("ลบบัญชีธนาคารแล้ว", "", "success");
                    setTimeout(() => { window.location.href = "/add_account"; }, 500)
                    this.delete_array(delete_id)

                } else {
                    swal("เกิดข้อผิดพลาด", res.error_message, "error");
                }
            })
        } catch (err) {
            swal("เกิดข้อผิดพลาด", err, "error");
        }
    }

    get_account = async () => {
        try {
            await get('account/get_account', null).then((result) => {
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

    componentWillMount() {
        this.get_account()
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
                    account_img: reader.result
                });
            }
        }
    }

    render() {
        return (
            <div className='bg page-content pt-5'>

                <Card style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50, marginBottom: 50, width: '60rem' }}>
                    <Card.Header style={{ textAlign: 'center' }}>อัพโหลดรูปบัญชีธนาคาร</Card.Header>
                    {
                        this.state.account_img ? <img style={{ width: "500px", height: "500px", display: "block", marginLeft: "auto", marginRight: "auto" }} src={this.state.account_img} /> : null
                    }
                    <br />
                    <input type="file" multiple onChange={this.uploadpicture} />
                    <br />
                    <br />
                    {
                        this.state.account_img ? <Button variant="primary" type="submit" onClick={() =>
                            swal({
                                title: "คุณต้องการอัพโหลดบัญชีธนาคารหรือไม่?",
                                text: "โปรดตรวจสอบให้แน่ใจก่นยืนยัน!",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                            })
                                .then((willDelete) => {
                                    if (willDelete) {
                                        this.add_account()
                                    } else {
                                    }
                                })
                        }>อัพโหลด</Button> :
                            null
                    }
                </Card>
                <Card style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50, marginBottom: 50, width: '60rem' }}>
                    <Card.Header style={{ textAlign: 'center' }}>บัญชีธนาคาร</Card.Header>
                    {
                        this.state.account.map((element, index) => {
                            return (
                                element.account ?
                                    <Row>
                                        <Col>
                                        <a href={ip + element.account} target="_blank" ><Card.Img style={{ width: "500px", height: "500px", display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: 20 }} src={ip + element.account} /></a>
                                            
                                        </Col>
                                        <Col style={{ textAlign: 'center', marginTop: '100px' }}>
                                            <Button variant='danger' type='submit' onClick={() =>
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
                                            }>ลบ</Button>
                                        </Col>
                                    </Row>

                                    : 'ยังไม่มีบัญชีธนาคาร กรุณาเพิ่ม'
                            )
                        })

                    }
                </Card>
            </div>
        )
    }
}

export default add_account
