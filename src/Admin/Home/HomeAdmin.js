import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';
import './home.scss';
import Chart from '../../Components/chart/Chart';

const HomeAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [totalCompletedContractsAmount, setTotalCompletedContractsAmount] = useState(0);
  const [totalCarCount, setTotalCarCount] = useState(0);
  const [totalUserCount, setTotalUserCount] = useState(0);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response1 = await axios.get('https://localhost:7175/api/DepositContracts/statistics/totalCompletedContractsAmount');
        setTotalCompletedContractsAmount(response1.data);

        const response2 = await axios.get('https://localhost:7175/api/Cars/statistics/count');
        setTotalCarCount(response2.data);

        const response3 = await axios.get('https://localhost:7175/api/Users/count');
        setTotalUserCount(response3.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Hàm định dạng số với dấu phân cách hàng nghìn
  const formatNumber = (number) => {
    return number.toLocaleString('en-US');
  };

  return (
    <div className="home">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`homeContainer ${isSidebarOpen ? 'open' : ''}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="admin-dashboard">
          <div className="grid-container">
            <div className="grid-item">
              <h2>Tài khoản</h2>
              <p>{formatNumber(totalUserCount)}</p>
            </div>
            <div className="grid-item">
              <h2>Xe</h2>
              <p>{formatNumber(totalCarCount)}</p>
            </div>
            <div className="grid-item">
              <h2>Doanh thu</h2>
              <p>{formatNumber(totalCompletedContractsAmount)} VNĐ</p>
            </div>
          </div>
        </div>
        <div className="charts">
          {/* <Featured /> */}
          <Chart title="Doanh thu 12 tháng" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
