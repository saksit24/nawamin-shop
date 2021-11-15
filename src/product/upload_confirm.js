import React, { Component } from 'react'
import { Tabs, Table, Form, Row, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { post, get, ip } from '../service/service'
import { user_token } from '../support/constance';
import queryString from 'query-string';
import moment from 'moment'
import { MDBIcon } from "mdbreact";
import swal from 'sweetalert';
export class upload_confirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            receipt_img: null
        }
    }

    upload_con = async () => {
        let url = this.props.location.search
        let param = queryString.parse(url)
        console.log('par', param)
        let object = {
            receipt_img: this.state.receipt_img,
            receipt_id: param.receipt_id
        };
        try {
            await post(object, "product/upload_receipt", null).then(result => {
                console.log("product", result);
                if (result.success) {
                    swal("อัพโหลดหลักฐานสำเร็จ", "", "success");
                    setTimeout(() => { window.location.href = "/status_track" }, 1000)

                } else {
                    swal("เกิดข้อผิดพลาด", result.error_message, "error");
                }
            });
        } catch (error) {
            swal("เกิดข้อผิดพลาด", error, "error");
        }
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
                    receipt_img: reader.result
                });
            }
        }
    }

    render() {
        return (
            <div className='bg3 pt-5'>

                <Card style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 50, width: '60rem' }}>
                    {
                        this.state.receipt_img ? <img style={{ width: "500px", height: "500px", display: "block", marginLeft: "auto", marginRight: "auto" }} src={this.state.receipt_img} /> : null
                    }
                    <br />
                    <input type="file" multiple onChange={this.uploadpicture} />
                    <br />
                    <br />
                    {
                        this.state.receipt_img ?
                            <Button variant="primary" type="submit" onClick={() =>
                                swal({
                                    title: "คุณต้องการอัพโหลดหลักฐานการโอนหรือไม่?",
                                    text: "โปรดตรวจสอบให้แน่ใจก่นยืนยัน!",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            this.upload_con()
                                        } else {
                                        }
                                    })
                            }>อัพโหลด</Button>
                            : null
                    }
                </Card>
            </div>
        )
    }
}

export default upload_confirm
