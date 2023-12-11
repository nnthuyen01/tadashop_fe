import React, { Fragment, useEffect, useState } from 'react';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { API_URL } from '~/config/constant';

import { Card, Statistic, Row, Col, Space } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, RiseOutlined, StockOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker } from 'antd';
dayjs.extend(customParseFormat);

/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY', 'MM-YYYY'];

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// const labels = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
// ];
// const data = {
//     labels,
//     datasets: [
//         // {
//         //     label: 'Dataset 1',
//         //     data: labels.map(() => Math.floor(Math.random() * 1000)),
//         //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         // },
//         {
//             label: 'Revenue',
//             data: labels.map(() => Math.floor(Math.random() * 1000)),
//             backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         },
//     ],
// };

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Daily revenue',
        },
    },
};

function Statistics() {
    const [statistic, setStatistic] = useState({});
    const [orderByDate, setOrderByDate] = useState(0);
    const [revenueByDate, setRevenueByDate] = useState(0);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        axios
            .get(API_URL + 'admin/statistic')
            .then((response) => {
                if (response.status === 200) {
                    setStatistic(response.data);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
            });

        const date = {
            day: dayjs().date(),
            month: dayjs().month() + 1,
            year: dayjs().year(),
        };

        axios
            .get(API_URL + 'admin/order/count-order', { params: date })
            .then((response) => {
                if (response.status === 200) {
                    setOrderByDate(response.data);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
            });
        axios
            .get(API_URL + 'admin/order/count-revenue', { params: date })
            .then((response) => {
                if (response.status === 200) {
                    setRevenueByDate(response.data);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
            });
        const chart = {
            month: dayjs().month() + 1,
            year: dayjs().year(),
        };
        console.log(chart);
        axios
            .get(API_URL + 'admin/chart', { params: chart })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    // Update the chart data with the fetched data
                    setChartData({
                        labels: response.data.map((item) => item.date), // Assuming date is an array of objects
                        datasets: [
                            {
                                label: `Revenue of month ${chart.month}`,
                                data: response.data.map((item) => item.totalRevenue), // Assuming totalRevenue is an array of objects
                                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            },
                        ],
                    });
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
            });
    }, []);

    const handleDatePickerChange1 = async (date, dateString) => {
        console.log('Selected date revenue:', dateString);

        const day = {
            day: date.date(),
            month: date.month() + 1,
            year: date.year(),
        };

        console.log(day);

        try {
            const response = await axios.get(API_URL + 'admin/order/count-order', { params: day });

            if (response.status === 200) {
                setOrderByDate(response.data);
            }
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };

    const handleDatePickerChange2 = async (date, dateString) => {
        console.log('Selected date revenue:', dateString);

        const day = {
            day: date.date(),
            month: date.month() + 1,
            year: date.year(),
        };

        console.log(day);

        try {
            const response = await axios.get(API_URL + 'admin/order/count-revenue', { params: day });

            if (response.status === 200) {
                setRevenueByDate(response.data);
            }
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };

    //chart

    const fetchDataForChart = async (date) => {
        const filter = {
            month: date.month() + 1,
            year: date.year(),
        };

        try {
            const response = await axios
                .get(API_URL + 'admin/chart', { params: filter })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        // Update the chart data with the fetched data
                        setChartData({
                            labels: response.data.map((item) => item.date), // Assuming date is an array of objects
                            datasets: [
                                {
                                    label: `Revenue of month ${filter.month}`,
                                    data: response.data.map((item) => item.totalRevenue), // Assuming totalRevenue is an array of objects
                                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                },
                            ],
                        });
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi fetch dữ liệu từ API:', error);
                });
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };

    return (
        <div>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic title="Total user" value={statistic.quantityUser} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Total revenue" value={statistic.totalRevenue} suffix="₫" />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Total product" value={statistic.quantityProduct} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic
                                    title="Order By Date"
                                    value={orderByDate}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<StockOutlined />}
                                    // suffix="%"
                                />
                            </Col>
                            <Col span={12}>
                                <DatePicker
                                    // defaultValue={dayjs('01/01/2015', dateFormatList[0])}
                                    defaultValue={dayjs()}
                                    format={dateFormatList}
                                    onChange={handleDatePickerChange1}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic
                                    title="Revenue By Date"
                                    value={revenueByDate}
                                    // precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<StockOutlined />}
                                    suffix="₫"
                                />
                            </Col>
                            <Col span={12}>
                                <DatePicker
                                    defaultValue={dayjs()}
                                    format={dateFormatList}
                                    onChange={handleDatePickerChange2}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            {chartData && (
                <Fragment>
                    {' '}
                    <Bar options={options} data={chartData} />{' '}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Space direction="vertical">
                            <DatePicker
                                picker="month"
                                defaultValue={dayjs()}
                                format={dateFormatList[4]}
                                onChange={fetchDataForChart}
                            />
                        </Space>
                    </div>
                </Fragment>
            )}
        </div>
    );
}

export default Statistics;
