import React, { Component } from 'react'
import { Tabs, Table, Form, Row, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { post, get, ip } from '../service/service'
import { user_token } from '../support/constance';
import queryString from 'query-string';
import moment from 'moment'
import { MDBIcon } from "mdbreact";

export class wellcome extends Component {
    render() {
        return (
            <div className='page-content'>
                <Card style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50, marginBottom: 50, width: '80rem' }}>
                    <Card.Header style={{ textAlign: 'center' }}><p>ระบบบริหารจัดการร้านค้าออนไลน์</p><p>WEBSITE MANAGEMENT SYSTEM</p></Card.Header>
                </Card>
            </div>
        )
    }
}

export default wellcome
