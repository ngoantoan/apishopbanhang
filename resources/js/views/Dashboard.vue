<template>
    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
            <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
        </div>

        <div class="row">
            <div class="col-xl-8 col-lg-7">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Thống kê theo quý</h6>
                    </div>
                    <div class="card-body">
                        <div class="chart-bar">
                            <canvas id="areaChart"></canvas>
                        </div>
                    <hr>
                    </div>
                </div>
            </div>
             <!-- Donut Chart -->
            <div class="col-xl-4 col-lg-5">
                <div class="card shadow mb-4">
                    <!-- Card Header - Dropdown -->
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Sản phẩm bán chạy</h6>
                    </div>
                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="chart-pie pt-4">
                            <canvas id="pieChart"></canvas>
                        </div>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as dashboardService from '../services/dashboard_service.js';

    export default {
        name: "Dashboard",
        data() {
            return {
                dataAreaChart: [],
                dataPieChartTen: [],
                dataPieChartGia: [],
            }
        },
        async mounted () {
            // Thống kê theo quý
            await this.getQuarterlyStatistics();
            await this.getCategorytStatistics();

            var area = document.getElementById("areaChart");
            var data = this.dataAreaChart;
            var myLineChart = new Chart(area, {
                type: 'line',
                data: {
                    labels: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"],
                    datasets: [{
                        label: "Earnings",
                        lineTension: 0.3,
                        backgroundColor: "rgba(78, 115, 223, 0.05)",
                        borderColor: "rgba(78, 115, 223, 1)",
                        pointRadius: 3,
                        pointBackgroundColor: "rgba(78, 115, 223, 1)",
                        pointBorderColor: "rgba(78, 115, 223, 1)",
                        pointHoverRadius: 3,
                        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                        pointHitRadius: 10,
                        pointBorderWidth: 2,
                        data: data,
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    layout: {
                    padding: {
                        left: 10,
                        right: 25,
                        top: 25,
                        bottom: 0
                    }
                    },
                    scales: {
                    xAxes: [{
                        time: {
                        unit: 'date'
                        },
                        gridLines: {
                        display: false,
                        drawBorder: false
                        },
                        ticks: {
                        maxTicksLimit: 7
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 2000000000,
                            maxTicksLimit: 5,
                            padding: 10,
                            // Include a dollar sign in the ticks
                            callback: function(value, index, values) {
                                return number_format(value) + ' vnđ';
                            }
                        },
                        gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                        }
                    }],
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        titleMarginBottom: 10,
                        titleFontColor: '#6e707e',
                        titleFontSize: 14,
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        intersect: false,
                        mode: 'index',
                        caretPadding: 10,
                        callbacks: {
                            label: function(tooltipItem, chart) {
                                // var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                                return 'Doanh thu: ' + number_format(tooltipItem.yLabel) + ' vnđ ';
                            }
                        }
                    }
                }
            });

            // thống kê theo sản phẩm bán chạy
            var pie = document.getElementById("pieChart");
            var pieChart = new Chart(pie, {
                type: 'doughnut',
                data: {
                    labels: this.dataPieChartTen,
                    datasets: [{
                        data: this.dataPieChartGia,
                        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#d81153', '#eb0dc7', '#0ee9dd', '#0ee964'],
                        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#6f0c52', '#151d6d', '#0f8a17', '#8c3e09'],
                        hoverBorderColor: "rgba(234, 236, 244, 1)",
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                        callbacks: {
                            title: function(tooltipItem, data) {
                                return false;
                            },
                            label: function(tooltipItem, data) {
                                return false;
                            },
                            afterLabel: function(tooltipItem, data) {
                                var dataset = data['datasets'][0];
                                return 'Doanh thu: ' + number_format((dataset['data'][tooltipItem['index']])) + ' vnđ ';
                            }
                        },
                    },
                    legend: {
                        display: true,
                    },
                    cutoutPercentage: 0,
                },
            });
        },
        methods: {
            getQuarterlyStatistics: async function() {
                try {
                    const response = await dashboardService.getQuarterlyStatistics();
                    this.dataAreaChart = response.data;
                } catch (error) {
                    swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng tải lại", "error");
                }
            },
            getCategorytStatistics: async function() {
                try {
                    const response = await dashboardService.getCategorytStatistics();
                    this.dataPieChartTen = response.data.arrTen;
                    this.dataPieChartGia = response.data.arrPrice;

                } catch (error) {
                    swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng tải lại", "error");
                }
            }
        }
    }

    function number_format(number, decimals, dec_point, thousands_sep) {
        // *     example: number_format(1234.56, 2, ',', ' ');
        // *     return: '1 234,56'
        number = (number + '').replace(',', '').replace(' ', '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
            };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }
</script>

<style scoped>

</style>
