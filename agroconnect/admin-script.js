// Apply display mode immediately to prevent flicker
const savedDisplayMode = localStorage.getItem('displayMode');
if (savedDisplayMode === 'mobile') {
    document.body.classList.add('mobile-view');
}

document.addEventListener('DOMContentLoaded', function () {
    // 0. Display Mode Settings
    const modeWeb = document.getElementById('mode-web');
    const modeMobile = document.getElementById('mode-mobile');

    if (modeWeb && modeMobile) {
        // Initialize state
        if (savedDisplayMode === 'mobile') {
            modeMobile.classList.add('selected');
        } else {
            modeWeb.classList.add('selected');
        }

        // Handle clicks
        modeWeb.addEventListener('click', () => {
            localStorage.setItem('displayMode', 'web');
            document.body.classList.remove('mobile-view');
            modeWeb.classList.add('selected');
            modeMobile.classList.remove('selected');
        });

        modeMobile.addEventListener('click', () => {
            localStorage.setItem('displayMode', 'mobile');
            document.body.classList.add('mobile-view');
            modeMobile.classList.add('selected');
            modeWeb.classList.remove('selected');
        });
    }

    // 1. Sidebar toggle functionality for mobile responsiveness
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menuBtn');
    const closeSidebar = document.getElementById('closeSidebar');

    // Create an overlay element for mobile sidebar
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.querySelector('.dashboard-container').appendChild(overlay);

    menuBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.style.display = 'block';
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
    });

    // Handle window resize to clean up mobile state
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            overlay.style.display = 'none';
        }
    });

    // 2. Chart Design System Options
    // Ensuring fonts look clean and professional (Inter font used globally)
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#64748b'; // Tailwind text-slate-500

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    boxWidth: 8,
                    font: {
                        size: 13,
                        weight: '500'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)', // slate-900
                titleFont: { size: 14, weight: '600' },
                bodyFont: { size: 13 },
                padding: 12,
                cornerRadius: 8,
                displayColors: false
            }
        }
    };

    // Only initialize charts if we are on the page containing them
    if (document.getElementById('salesLineChart')) {

        // --- 3. Sales & Revenue Trends (Line Chart) ---
        // Showcases dual axis or multi-dataset line chart
        const salesCtx = document.getElementById('salesLineChart').getContext('2d');

        // Gradient definitions for modern aesthetic
        const revenueGradient = salesCtx.createLinearGradient(0, 0, 0, 300);
        revenueGradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)'); // Emerald-500 light
        revenueGradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

        const salesGradient = salesCtx.createLinearGradient(0, 0, 0, 300);
        salesGradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)'); // Blue-500 light
        salesGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                datasets: [
                    {
                        label: 'Revenue ($)',
                        data: [42000, 51000, 47000, 63000, 58000, 72000, 85000, 94000],
                        borderColor: '#10b981', // Emerald
                        backgroundColor: revenueGradient,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4, // Smooth curve
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#10b981',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Orders',
                        data: [25000, 31000, 28000, 42000, 38000, 49000, 61000, 73000],
                        borderColor: '#3b82f6', // Blue
                        backgroundColor: salesGradient,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#3b82f6',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                ...chartOptions,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(226, 232, 240, 0.5)', // slate-200
                            drawBorder: false,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            callback: function (value) {
                                if (value >= 1000) return '$' + (value / 1000) + 'k';
                                return '$' + value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    }
                }
            }
        });

        // --- 4. User Growth (Bar Chart) ---
        // Represents farmers vs customers onboarding over time
        const userCtx = document.getElementById('userGrowthBarChart').getContext('2d');
        new Chart(userCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'New Customers',
                        data: [1200, 1500, 1100, 1800, 2100, 2400],
                        backgroundColor: '#8b5cf6', // Violet
                        borderRadius: 6,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    },
                    {
                        label: 'New Farmers',
                        data: [350, 420, 380, 510, 650, 720],
                        backgroundColor: '#f59e0b', // Amber
                        borderRadius: 6,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    }
                ]
            },
            options: {
                ...chartOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(226, 232, 240, 0.5)',
                            drawBorder: false,
                            borderDash: [5, 5]
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    }
                }
            }
        });

        // --- 5. Category-wise Sales (Pie/Doughnut Chart) ---
        const categoryCtx = document.getElementById('categoryPieChart').getContext('2d');
        new Chart(categoryCtx, {
            type: 'pie',
            data: {
                labels: ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Spices'],
                datasets: [{
                    data: [35, 25, 20, 12, 8],
                    backgroundColor: [
                        '#10b981', // Emerald
                        '#3b82f6', // Blue
                        '#f59e0b', // Amber
                        '#8b5cf6', // Violet
                        '#ef4444'  // Red
                    ],
                    borderWidth: 0,
                    hoverOffset: 6
                }]
            },
            options: {
                ...chartOptions,
                plugins: {
                    ...chartOptions.plugins,
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            boxWidth: 8
                        }
                    }
                }
            }
        });

        // --- 6. Delivery Statistics (Doughnut Chart) ---
        const deliveryCtx = document.getElementById('deliveryDoughnutChart').getContext('2d');
        new Chart(deliveryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Delivered', 'In Transit', 'Pending', 'Cancelled'],
                datasets: [{
                    data: [68, 18, 10, 4],
                    backgroundColor: [
                        '#10b981', // Emerald
                        '#3b82f6', // Blue
                        '#f59e0b', // Amber
                        '#ef4444'  // Red
                    ],
                    borderWidth: 0,
                    hoverOffset: 4,
                    cutout: '75%' // Thin doughnut style
                }]
            },
            options: {
                ...chartOptions,
                plugins: {
                    ...chartOptions.plugins,
                    legend: {
                        position: 'right', // Fits better beside doughnut
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            boxWidth: 8
                        }
                    }
                }
            },
            plugins: [{
                // Custom plugin to add text in the center
                id: 'textCenter',
                beforeDraw: function (chart) {
                    var width = chart.width,
                        height = chart.height,
                        ctx = chart.ctx;

                    ctx.restore();
                    var fontSize = (height / 140).toFixed(2);
                    ctx.font = "bold " + fontSize + "em Inter";
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = "#0f172a"; // slate-900

                    var text = "68%",
                        textX = Math.round((width - ctx.measureText(text).width) / 2) - (chart.legend.width / 2),
                        textY = height / 2;

                    ctx.fillText(text, textX, textY);

                    // Add subtitle
                    ctx.font = "500 " + (fontSize * 0.4) + "em Inter";
                    ctx.fillStyle = "#64748b"; // slate-500
                    var subText = "Delivered";
                    var subTextX = Math.round((width - ctx.measureText(subText).width) / 2) - (chart.legend.width / 2);
                    ctx.fillText(subText, subTextX, textY + 25);

                    ctx.save();
                }
            }]
        });

    } // End of chart check
});
