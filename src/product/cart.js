import React, { Component } from 'react'
// import { Tabs, Table, Form, Row, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { post, get, ip } from '../service/service'
import { user_token } from '../support/constance';
import queryString from 'query-string';
import moment from 'moment'
import { MDBIcon } from "mdbreact";
import ImgNoCart from '../const/NoCart.png'
import swal from 'sweetalert';
class cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
            product: [],
            sum_price: [],
            name_product: null,
            price_product: null,
            s: null,
            m: null,
            l: null,
            xl: null,
            xxl: null,
            xxxl: null,
            xxxxl: null,
            xxxxxl: null,
            delete_id: null,
            index_delete: null,
            // order_status:null
        }
    }

    componentWillMount() {
        this.get_cart()
        // this.cart_product()
    }

    get_cart = async () => {
        try {
            await get('product/get_cart', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        cart: result.result,
                        cart_no_product: false
                    })
                    setTimeout(() => {
                        console.log("get update", result.result)
                    }, 500)
                } else {
                    this.setState({
                        cart_no_product: true
                    })
                }
            });
        } catch (error) {
            swal("เกิดข้อผิดพลาด", error, "error");
        }
    }

    add_receipt = async () => {
        let object = {
            cart: this.state.cart,
            sum_price: this.sum_data(this.state.cart)
        };
        try {
            await post(object, "product/add_receipt", user_token).then(result => {
                console.log("product", result);
                if (result.success) {

                    swal("สั่งซื้อเรียบร้อย", '', "success");
                    setTimeout(() => { window.location.href = "/status_track" }, 1000)

                } else {

                    swal("เกิดข้อผิดพลาด", result.error_message, "error");
                }
            });
        } catch (error) {
            swal("เกิดข้อผิดพลาด", error, "error");
        }
    }


    delete_array = (delete_id) => {
        let product_data_array = this.state.cart
        console.log('tes', product_data_array)
        let index = product_data_array.findIndex((element) => {
            return element.order_id === delete_id
        })

        product_data_array.splice(index, 1)
        this.setState({ cart: product_data_array })
        // this.setState({ result: 'confirmed', open: false })
    }

    delete = async (delete_id) => {
        let object = {
            order_id: delete_id
        }
        console.log('testtttt', object)
        try {
            await post(object, 'product/delete_order', null).then((res) => {
                if (res.success) {
                    swal("ลบสินค้าเรียบร้อย", "", "success");
                    setTimeout(() => { window.location.href = "/cart"; }, 500)
                    this.delete_array(delete_id)

                    // window.location.reload()
                    // console.log(object)
                    // this.get_product()
                } else {
                    swal("เกิดข้อผิดพลาด", res.error_message, "error");
                }
            })
        } catch (err) {
            swal("เกิดข้อผิดพลาด", err, "error");
        }
    }


    sum_data = (data) => {
        let sum = 0
        data.map((data_element) => {
            let sum1 = data_element.s + data_element.m + data_element.l + data_element.xl + data_element.xxl + data_element.xxxl + data_element.xxxxl + data_element.xxxxxl
            sum = (data_element.price_product * sum1) + sum
        })
        return sum;
    }

    render() {
        const { cart_no_product } = this.state
        return (
            <div className='bg3 pt-5'>
                <br/>
                <div className="card" style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 50, width: '70rem' }}>
                    <h5 className="card-header" style={{ textAlign: 'center' }}>ตะกร้าสินค้า</h5>
                    {
                        cart_no_product ? <div className="cart-body" style={{ textAlign: "center" }}>
                            <img src={ImgNoCart}></img>
                            <h2>ยังไม่มีสินค้าในรถเข็น</h2>
                            <NavLink to='/product' className="btn btn-danger">ไปซื้อสินค้า</NavLink>
                        </div>
                            : <div className="cart-body">
                                <br/>
                                <div className="row">
                                    <div className="col-1"></div>
                                    <div className="col-10">
                                        <table className="table table-responsive" style={{ textAlign: 'center' }} >
                                            <thead >
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
                                                    <th>ลบรายการ</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {
                                                    this.state.cart.map((element, index) => {
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

                                                                <td><button className="btn btn-danger" type="button" onClick={() =>
                                                                    swal({
                                                                        title: "คุณต้องการลบรายการสินค้าหรือไม่?",
                                                                        text: "โปรดตรวจสอบให้แน่ใจก่นยืนยัน!",
                                                                        icon: "warning",
                                                                        buttons: true,
                                                                        dangerMode: true,
                                                                    })
                                                                        .then((willDelete) => {
                                                                            if (willDelete) {
                                                                                this.delete(element.order_id, index)
                                                                            } else {
                                                                            }
                                                                        })
                                                                }><MDBIcon far icon="trash-alt" size="lg" /></button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                <tr >
                                                    <th colSpan="11" ></th>
                                                    <th> ราคารวมทั้งหมด</th>
                                                    <th>{this.sum_data(this.state.cart)}</th>
                                                    <th> บาท</th>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>
                                    <div className="col-1"></div>
                                </div>
                                <div className="text-center mb-4 mt-5">
                                    <button className="btn btn-danger btn-block z-depth-2" type="submit" onClick={() => this.add_receipt()} >สั่งซื้อ</button>
                                </div>
                            </div>
                    }

                </div>
            </div >
        )
    }
}

export default cart

