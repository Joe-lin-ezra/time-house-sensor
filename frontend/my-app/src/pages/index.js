/*
 * @Author: your name
 * @Date: 2022-04-12 12:01:23
 * @LastEditTime: 2022-06-09 11:51:35
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\index.js
 */

import React, { useEffect, useState } from "react";

import { Layout, Row, Col, Space, Avatar } from "antd";
import { Input, Tooltip } from "antd";
import axios from "../Axios.config";
import { HeaderBar } from "./components/HeaderBar";
import { SeatMap } from "./components/SeatMap";
const seatState = require("./json/seatState.json");
const { Content, Footer } = Layout;

const Home = () => {

//   const formatNumber = (value) => new Intl.NumberFormat().format(value);

//   const { value, onChange } = props;
// const [aonChange,onChange]=useState('');
//   const handleChange = (e) => {
//     const { value: inputValue } = e.target;
//     const reg = /^-?\d*(\.\d*)?$/;

//     if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
//       onChange(inputValue);
//     }

// }
  const [seats, setSeats] = useState([]);

  const getSeatsInfo = () => {
    axios.get(`/api/seatsInfo`).then((res) => {
      let tempSeat = res.data.seats;
      tempSeat.splice(4, 0, { state: "null" });
      tempSeat.splice(8, 0, { state: "null" });
      setSeats(tempSeat);
    });
  };

  useEffect(() => {
    getSeatsInfo();
    let timer = setInterval(() => {
      getSeatsInfo();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
    <div className="page-container">
      <HeaderBar />
      <Content>
        <div className="seatmap"><div className="a"/>
          <Row justify="center" align="middle">
            {seats.map((seat, i) => (
              <Col span={6} style={{ alignItems: "center" }}>
                <SeatMap key={i} seat={seat} callSeatApi={getSeatsInfo} />
              </Col>
            ))}
          </Row>
        </div>

        {/* <Input
        // {...props}

       value={aonChange}
        onChange={handleChange}

        placeholder="請輸入連絡電話"
        maxLength={25}
      /> */}
      </Content>
      </div>

      <Footer style={{ textAlign: "center", background: "white" }}>
        {seatState.map((seat) => (
          
          <Space>
            &emsp; 
            <Avatar className={seat.color} /> &nbsp;
         <b style={{ fontSize:"24px"}}>{seat.state}</b>  
          </Space>
        ))}
        
      </Footer>
    </div>
  );
};

export default Home;
