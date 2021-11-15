import React, { Component } from 'react'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import { post, get } from '../service/service'
import { Tabs, Tab, Form, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl } from 'react-bootstrap'
// import { NavLink } from 'react-router-dom';
import { user_token, user_token_decoded } from '../support/constance';
import swal from 'sweetalert';
class home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      data: '',
      play: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.get_video()
  }

  video = async () => {
    let object = {
      url: this.state.data.url
    };
    try {
      await post(object, "product/video", null).then(res => {
        if (res.success) {
          swal("เพิ่มวิดีโอแล้ว", "", "success");
          setTimeout(() => { window.location.href = '/' }, 1000)
        } else {
          swal("เกิดข้อผิดพลาด", res.error_message, "error");
        }
      });
    } catch (error) {
      swal("เกิดข้อผิดพลาด", error, "error");
    }
  }



  get_video = async () => {
    try {
      await get('product/get_video', null).then((result) => {
        if (result.success) {
          this.setState({
            data: result.result,
            play: result.result
          })
        } else {
          window.location.href = "/";
        }
      });
    } catch (error) {
      swal("เกิดข้อผิดพลาด", error, "error");
    }
  }


  handleInputChange(event) {
    const target = event.target;
    const value = event.target.value;
    const name = target.name;


    let data = this.state.data
    data[name] = value
    this.setState({
      data: data
    });
  }



  render_type = () => {
    let render_user
    switch (user_token_decoded.usertype) {
      case 1:
        render_user =
          <div className='bg2 page-content container-fluid'>
            <Form.Row style={{ justifyContent: 'center', paddingTop: '8rem' }}>
              <div className="d-flex justify-content-center ">
                <InputGroup style={{ width: 900 }}>
                  <InputGroup.Prepend>
                    <InputGroup.Text>เพิ่ม url จาก YouTube</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl style={{ height: '60px' }}
                    name="url"
                    value={this.state.play.url}
                    onChange={this.handleInputChange}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => this.video()} variant="danger">ยืนยัน</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Form.Row>

            <Form.Row style={{ justifyContent: 'center', paddingTop: '1rem' }}>
              <YouTubePlayer
                url={this.state.play.url}
                playing
                controls
              />
            </Form.Row>
          </div>
        break;

      case 2:
        render_user =
          <div  className="bg3">
            <Form.Row style={{ justifyContent: 'center', paddingTop: '8rem' }}>
            </Form.Row>
            <Form.Row style={{ justifyContent: 'center', paddingTop: '1rem' }}>
              <YouTubePlayer
                url={this.state.play.url}
                playing
                controls
              />
            </Form.Row>
          </div>

        break;

      default:
        render_user = <div>เกิดข้อผิดพลาด</div>
        break;
    }
    return render_user
  }
  render() {
    return (
      <div>
        {
          localStorage.user_token ?
            <div >
              {this.render_type()}
            </div>
            :
            <div className="bg2">
              <Form.Row style={{ justifyContent: 'center', paddingTop: '8rem' }}>
                <th style={{ fontSize: 50, color: '#6A5ACD' }}>WELLCOME To NAWAMIN SHOP</th>
              </Form.Row>
              <Form.Row style={{ justifyContent: 'center', paddingTop: '1rem' }}>
                <YouTubePlayer
                  url={this.state.data.url}
                  playing
                  controls
                />
              </Form.Row>
              <Form.Row style={{ justifyContent: 'center', paddingTop: '1rem' }} >
                <Button variant="danger" href="/login">ลงชื่อเข้าใช้</Button>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <Button variant="danger" href="/register">ลงทะเบียน</Button>
              </Form.Row>
            </div>
        }

      </div>
    )
  }
}
export default home;

