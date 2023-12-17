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

const { RangePicker } = DatePicker;
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
            sday: dayjs().subtract(7, 'day').date(),
            smonth: dayjs().subtract(7, 'day').month() + 1,
            syear: dayjs().subtract(7, 'day').year(),
            eday: dayjs().date(),
            emonth: dayjs().month() + 1,
            eyear: dayjs().year(),
        };

        axios
            .get(API_URL + 'admin/order/count-orderRange', { params: date })
            .then((response) => {
                if (response.status === 200) {
                    setOrderByDate(response.data);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
            });
        axios
            .get(API_URL + 'admin/order/count-revenueRange', { params: date })
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

    const handleDatePickerChange1 = async (dates, dateString) => {
        console.log('Selected date revenue:', dateString);
        let day;

        if (!dates) {
            // Xử lý khi không có ngày được chọn (ví dụ: khi bấm vào icon close)
            day = {
                sday: 0,
                smonth: 0,
                syear: 0,
                eday: 0,
                emonth: 0,
                eyear: 0,
            };
        } else {
            day = {
                sday: dayjs(dates[0]).date(),
                smonth: dayjs(dates[0]).month() + 1,
                syear: dayjs(dates[0]).year(),
                eday: dayjs(dates[1]).date(),
                emonth: dayjs(dates[1]).month() + 1,
                eyear: dayjs(dates[1]).year(),
            };
        }

        console.log(day);
        try {
            const response = await axios.get(API_URL + 'admin/order/count-orderRange', { params: day });

            console.log(response);
            if (response.status === 200) {
                setOrderByDate(response.data);
            }
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };

    const handleDatePickerChange2 = async (dates, dateString) => {
        console.log('Selected date revenue:', dateString);

        let day;

        if (!dates) {
            // Xử lý khi không có ngày được chọn (ví dụ: khi bấm vào icon close)
            day = {
                sday: 0,
                smonth: 0,
                syear: 0,
                eday: 0,
                emonth: 0,
                eyear: 0,
            };
        } else {
            day = {
                sday: dayjs(dates[0]).date(),
                smonth: dayjs(dates[0]).month() + 1,
                syear: dayjs(dates[0]).year(),
                eday: dayjs(dates[1]).date(),
                emonth: dayjs(dates[1]).month() + 1,
                eyear: dayjs(dates[1]).year(),
            };
        }

        try {
            const response = await axios.get(API_URL + 'admin/order/count-revenueRange', { params: day });

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
                    <Card
                        style={{
                            background: 'linear-gradient(158deg, rgba(40, 34, 70, 1) 0%, rgba(30, 47, 141, 1) 100%)',
                        }}
                    >
                        <Statistic
                            // title="Total user"
                            title={<span style={{ fontSize: '14px', color: 'white' }}>Total user</span>}
                            value={statistic.quantityUser}
                            valueStyle={{
                                color: 'white',
                            }}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        style={{
                            background: 'linear-gradient(158deg, rgba(53, 138, 148, 1) 0%, rgba(91, 180, 96, 1) 100%)',
                        }}
                    >
                        <Statistic
                            title={<span style={{ fontSize: '14px', color: 'white' }}>Total revenue</span>}
                            value={statistic.totalRevenue}
                            suffix="₫"
                            valueStyle={{
                                color: 'white',
                            }}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        style={{
                            background: 'linear-gradient(158deg, rgba(40, 34, 70, 1) 0%, rgba(30, 47, 141, 1) 100%)',
                        }}
                    >
                        <Statistic
                            title={<span style={{ fontSize: '14px', color: 'white' }}>Total product</span>}
                            value={statistic.quantityProduct}
                            valueStyle={{
                                color: 'white',
                            }}
                        />
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
                                />
                            </Col>
                            <Col span={12}>
                                <RangePicker
                                    defaultValue={[dayjs().subtract(7, 'day'), dayjs()]}
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
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<StockOutlined />}
                                    suffix="₫"
                                />
                            </Col>
                            <Col span={12}>
                                <RangePicker
                                    defaultValue={[dayjs().subtract(7, 'day'), dayjs()]}
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
