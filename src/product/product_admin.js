import React, { Component } from 'react'
import { Tabs, Tab, Form, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, Navbar, Nav, Table, Image } from 'react-bootstrap'
import { post, get, ip } from '../service/service'
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
class product_admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            search_product: [],
            delete_id: null,
            index_delete: null,
            name_product: '',
            type_product: '',
            image_product: null,
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        };
    }

    componentWillMount() {
        this.get_list()
    }

    get_list = async () => {
        try {
            await get('product/list_product', null).then((result) => {
                if (result.success) {
                    this.setState({
                        product: result.result,
                        search_product: result.result
                    })
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            swal("เกิดข้อผิดพลาด", error, "error");
        }
    }


    delete_array = (delete_id) => {
        let product_data_array = this.state.product
        console.log('tes', product_data_array)
        let index = product_data_array.findIndex((element) => {
            return element.id_product === delete_id
        })

        product_data_array.splice(index, 1)
        this.setState({ product: product_data_array })
        // this.setState({ result: 'confirmed', open: false })
    }

    delete = async (delete_id) => {
        let object = {
            id_product: delete_id
        }
        console.log('testtttt', object)
        try {
            await post(object, 'product/delete_product', null).then((res) => {
                if (res.success) {
                    swal("ลบสินค้าเรียบร้อย", "", "success");
                    setTimeout(() => { window.location.href = "/product_admin"; }, 500)
                    this.delete_array(delete_id)
                } else {
                    swal("เกิดข้อผิดพลาด", res.error_message, "error");
                }
            })
        } catch (err) {
            swal("เกิดข้อผิดพลาด", err, "error");
        }
    }

    filterProduct = (event) => {

        var updatedList = this.state.product;
        updatedList = updatedList.filter(function (item) {
            return item.name_product.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        console.log(updatedList)
        this.setState({
            search_product: updatedList,
        });
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
            <div className="bg page-content">
                <div style={{ paddingTop: 70, width: 500, paddingLeft: 100 }}>
                    <InputGroup className="mb-2">
                        <FormControl
                            placeholder="ค้นหาชื่อสินค้า..."
                            name='search_product'
                            onChange={this.filterProduct}
                        />
                    </InputGroup>
                </div>
                <div style={{ paddingLeft: 100, paddingRight: 100 }}>
                    <Table striped bordered hover variant="dark" style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ภาพ</th>
                                <th>ชื่อ</th>
                                <th>ประเภท</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.search_product ?
                                    this.state.search_product.map((ele, index) => {
                                        let amount = ele.s + ele.m + ele.l + ele.xl + ele.xxl + ele.xxxl + ele.xxxxl + ele.xxxxxl
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{ele.image_product ? <Image style={{ width: "150px", height: "150px" }} src={ip + ele.image_product} />
                                                    : <Image style={{ width: "150px", height: "150px" }} src={ele.default_user_image} />}</td>
                                                <td>{ele.name_product}</td>
                                                <td>{this.render_type(ele.type_product)}</td>
                                                <td>
                                                    <NavLink to={"detail_product?id_product=" + ele.id_product}><Button variant="primary" type="submit">ตรวจสอบ</Button>{'  '}</NavLink>
                                                    <Button variant="danger" type="submit" onClick={() => {
                                                        amount == 0 ? swal({
                                                            title: "คุณต้องการลบรายการสินค้าหรือไม่?",
                                                            text: "โปรดตรวจสอบให้แน่ใจก่อนยืนยัน!",
                                                            icon: "warning",
                                                            buttons: true,
                                                            dangerMode: true,
                                                        })
                                                            .then((willDelete) => {
                                                                if (willDelete) {
                                                                    this.delete(ele.id_product, index)
                                                                } else {
                                                                }
                                                            }) :
                                                            swal({
                                                                title: `ท่านยังมีสินค้าเหลืออยู่ ${amount} ชิ้น ต้องการจะลบหรือไม่?`,
                                                                text: "โปรดตรวจสอบให้แน่ใจก่อนยืนยัน!",
                                                                icon: "warning",
                                                                buttons: true,
                                                                dangerMode: true,
                                                            })
                                                                .then((willDelete) => {
                                                                    if (willDelete) {
                                                                        this.delete(ele.id_product, index)
                                                                    } else {
                                                                    }
                                                                })
                                                    }
                                                    }>ลบ</Button>{'  '}
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    this.state.product.map((element, index) => {
                                        let amount = element.s + element.m + element.l + element.xl + element.xxl + element.xxxl + element.xxxxl + element.xxxxxl
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>

                                                <td>{element.image_product ? <Image style={{ width: "150px", height: "150px" }} src={ip + element.image_product} />
                                                    : <Image style={{ width: "150px", height: "150px" }} src={element.default_user_image} />}</td>
                                                <td>{element.name_product}</td>
                                                <td>{element.type_product}</td>
                                                <td>
                                                    <NavLink to={"detail_product?id_product=" + element.id_product}><Button variant="primary" type="submit">ตรวจสอบ</Button>{'  '}</NavLink>
                                                    <Button variant="danger" type="submit" onClick={() => {
                                                        amount == 0 ?
                                                            swal({
                                                                title: "คุณต้องการลบรายการสินค้าหรือไม่?",
                                                                text: "โปรดตรวจสอบให้แน่ใจก่อนยืนยัน!",
                                                                icon: "warning",
                                                                buttons: true,
                                                                dangerMode: true,
                                                            })
                                                                .then((willDelete) => {
                                                                    if (willDelete) {
                                                                        this.delete(element.id_product, index)
                                                                    } else {
                                                                    }
                                                                })
                                                            :
                                                            swal({
                                                                title: `ท่านยังมีสินค้าเหลืออยู่ ${amount} ชิ้น ต้องการจะลบหรือไม่?`,
                                                                text: "โปรดตรวจสอบให้แน่ใจก่อนยืนยัน!",
                                                                icon: "warning",
                                                                buttons: true,
                                                                dangerMode: true,
                                                            })
                                                                .then((willDelete) => {
                                                                    if (willDelete) {
                                                                        this.delete(element.id_product, index)
                                                                    } else {
                                                                    }
                                                                })
                                                    }
                                                    }>ลบ</Button>{'  '}
                                                </td>
                                            </tr>
                                        )
                                    }
                                    )
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default product_admin;
