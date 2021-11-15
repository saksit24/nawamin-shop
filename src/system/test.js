import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
class test extends React.Component {
    render() {
       
        return (
            <div className="bg">

    
            </div>
            // <SideNav
            //     onSelect={(selected) => {
            //         window.location.href = selected
            //     }}
            // >
            //     <SideNav.Toggle />
            //     <SideNav.Nav defaultSelected="/wellcome">
            //         <NavItem eventKey="/wellcome">
            //             <NavIcon>
            //                 <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            //             </NavIcon>
            //             <NavText>หน้าหลัก</NavText>
            //         </NavItem>
            //         <NavItem eventKey="/">
            //             <NavIcon>
            //             <i class="fab fa-youtube" style={{ fontSize: '1.75em' }} />
            //             </NavIcon>
            //             <NavText>แก้ไขวิดีโอ</NavText>
            //         </NavItem>
                    
            //         <NavItem eventKey="charts">
            //             <NavIcon>
            //                 <i class="fas fa-store" style={{ fontSize: '1.75em' }} />
            //             </NavIcon>
            //             <NavText>สินค้า </NavText>
            //             <NavItem eventKey="/product_admin" >
            //                 <NavText>จัดการสินค้า</NavText>
            //             </NavItem>
            //             <NavItem eventKey="/add_product">
            //                 <NavText>เพิ่มสินค้า</NavText>
            //             </NavItem>
            //         </NavItem>
            //         <NavItem eventKey="order">
            //             <NavIcon>
            //                 <i class="fas fa-shopping-cart" style={{ fontSize: '1.75em' }} />
            //             </NavIcon>
            //             <NavText>รายการสั่งซื้อ </NavText>
            //             <NavItem eventKey="/confirm_product" >
            //                 <NavText>ระหว่างการชำระเงิน</NavText>
            //             </NavItem>
            //             <NavItem eventKey="/tracking">
            //                 <NavText>ระหว่างจัดเตรียมส่ง</NavText>
            //             </NavItem>
            //         </NavItem>
            //         <NavItem eventKey="/profile">
            //             <NavIcon>
            //                 <i class="fas fa-user" style={{ fontSize: '1.75em' }} />
            //             </NavIcon>
            //             <NavText>ข้อมูลส่วนตัว</NavText>
            //         </NavItem>
            //         <NavItem eventKey="logout">
            //             <NavIcon>
            //                 <i class="fas fa-sign-out-alt" style={{ fontSize: '1.75em' }} />
            //             </NavIcon>
            //             <NavText>ออกจากระบบ</NavText>
            //         </NavItem>
            //     </SideNav.Nav>
            // </SideNav>
        );
    }
}

export default test;