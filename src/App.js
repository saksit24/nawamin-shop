import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Product from './product/product'
import './App.css'
import NavLogin from './system/navbarLogin'
import Home from './system/home'
import DetailProduct from './product/detail_product'
import Login from './user/login'
import Register from './user/register'
import AddProduct from './product/add_product'
import ProductAdmin from './product/product_admin'
import UpdateProduct from './product/update_product'
import Profile from './user/profile'
import UpdateUser from './user/update_user'
import UpdatePassword from './user/update_password'
import RegisterAdmin from './user/register_admin'
import ProductSell from './product/product_sell'
import Cart from './product/cart'
import StatusTrack from './product/status_track'
import UploadConfirm from './product/upload_confirm'
import AddAccount from './user/add_account'
import Account from './user/account'
import UpdateAccount from './user/update_account'
import ConfirmProduct from './product/confirm_product'
import Tracking from './product/tracking'
import DetailConfirm from './product/detail_confirm'
import test from './system/test'
import WellCome from './system/wellcome'
import CheckReceipt from './product/check_receipt'
class App extends Component {
  render() {
    return (
      <div className="page-wrapper chiller-theme toggled">
        <Router exact path='/'>
          <Route exact path='/login' component={Login} />                                   {/*หน้าลงชื่อเข้าใช้ */}
          <NavLogin />
          {/* <div className="page-content"> */}
            
              <Route exact path='/' component={Home} />                                     {/*หน้าวิดีโอ */}
              <Route exact path='/nav' component={NavLogin} />                              {/*หน้าแถบเมนูบาร์ */}
              <Route exact path='/product' component={Product} />                           {/*หน้ารวมสินค้าสำหรับลูกค้า */}
              <Route exact path='/detail_product' component={DetailProduct} />              {/*หน้ารายละเอียดสินค้าสำหรับแอดมิน */}
              <Route exact path='/check_receipt' component={CheckReceipt} />                {/*ตรวจสอบรายการสั่งซื้อสำหรับลูกค้า*/}               
              <Route exact path='/register' component={Register} />                         {/*หน้าลงทะเบียน */}
              <Route exact path='/add_product' component={AddProduct} />                    {/*หน้าเพิ่มสินค้าสำหรับแอดมิน */}
              <Route exact path='/product_admin' component={ProductAdmin} />                {/*หน้ารวมสินค้าสำหรับแอดมิน */}
              <Route exact path='/update_product' component={UpdateProduct} />              {/*หน้าแก้ไขข้อมูลสินค้าสำหรับแอดมิน */}
              <Route exact path='/profile' component={Profile} />                           {/*หน้าข้อมูลส่วนตัว */}
              <Route exact path='/update_password' component={UpdatePassword} />            {/*หน้าแก้ไขรหัสผ่าน */}
              <Route exact path='/register_admin' component={RegisterAdmin} />              {/*ลงทะเบียนสำหรับแอดมิน (ตาม url)*/}
              <Route exact path='/product_sell' component={ProductSell} />                  {/*รายละเอียดสินค้าเพื่อสั่งซื้อาำหรับลูกค้า */}
              <Route exact path='/cart' component={Cart} />                                 {/*หน้าตะกร้าสินค้าสำหรับลูกค้า */}
              <Route exact path='/status_track' component={StatusTrack} />                  {/*หน้ารายการสั่งซื้อสินค้าสำหรับลูกค้า */}
              <Route exact path='/upload_confirm' component={UploadConfirm} />              {/*หน้าอัพโหลดหลักฐานการโอนสำหรับลูกค้า */}
              <Route exact path='/add_account' component={AddAccount} />                    {/*หน้าจัดการบัญชีธนาคารสำหรับแอดมิน */}
              <Route exact path='/confirm_product' component={ConfirmProduct} />            {/*หน้ารายการสั่งซื้อ (ตรวจสอบหลักฐานการชำระเงิน) สำหรับแอดมิน*/}
              <Route exact path='/tracking' component={Tracking} />                         {/*หน้ารายการสั่งซื้อ (เตรียมการจัดส่งสินค้า) สำหรับแอดมิน*/}
              <Route exact path='/detail_confirm' component={DetailConfirm} />              {/*หน้ารายละเอียดรายการสั่งซื้อสำหรับแอดมิน */}
              <Route exact path='/wellcome' component={WellCome} />                         {/*หน้าแรกสำหรับแอดมิน */}
              <Route exact path='/update_user' component={UpdateUser} />                    {/*หน้าอัพเดทข้อมูลส่วนตัว*/}
              {/* <Route exact path='/account' component={Account} /> */}                   {/*ไม่ได้ใช้ */}
              {/* <Route exact path='/update_account' component={UpdateAccount} /> */}      {/*ไม่ได้ใช้ */}
              {/* <Route exact path='/test' component={test} /> */}                         {/*ไม่ได้ใช้ */}
       
          {/* </div> */}
        </Router>
      </div>
    )
  }
}
export default App;

