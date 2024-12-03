<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Revshop</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
    <style>
        /* Reset and Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', 'Arial', sans-serif;
        }

        :root {
            --primary: #3b82f6;
            --success: #10b981;
            --warning: #f59e0b;
            --purple: #8b5cf6;
            --sidebar-width: 250px;
            --transition-speed: 0.3s;
        }

        body {
            background: #f8fafc;
            min-height: 100vh;
        }

        /* Sidebar Styles */
        .sidebar {
            width: var(--sidebar-width);
            height: 100vh;
            background: white;
            position: fixed;
            left: 0;
            top: 0;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
            transition: transform var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
        }

        .sidebar-header {
            padding: 24px;
            border-bottom: 1px solid #e5e7eb;
            background: linear-gradient(135deg, #fff, #f8fafc);
        }

        .logo {
            font-size: 1.75rem;
            font-weight: 800;
            background: linear-gradient(45deg, var(--primary), var(--purple));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: logoShine 3s ease-in-out infinite;
        }

        @keyframes logoShine {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }

        .menu-list {
            padding: 16px 0;
            list-style: none;
        }

        .menu-item {
            padding: 14px 24px;
            margin: 4px 12px;
            display: flex;
            align-items: center;
            color: #64748b;
            text-decoration: none;
            border-radius: 8px;
            transition: all var(--transition-speed) ease;
            position: relative;
            overflow: hidden;
        }

        .menu-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 0;
            background: var(--primary);
            opacity: 0.1;
            transition: width var(--transition-speed) ease;
        }

        .menu-item:hover::before {
            width: 100%;
        }

        .menu-item:hover {
            color: var(--primary);
            transform: translateX(4px);
        }

        .menu-item.active {
            background: #eff6ff;
            color: var(--primary);
            font-weight: 600;
            box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
        }

        .menu-icon {
            margin-right: 12px;
            font-size: 1.2rem;
            transition: transform var(--transition-speed) ease;
        }

        .menu-item:hover .menu-icon {
            transform: scale(1.1);
        }

        /* Dashboard Content */
        .dashboard {
            padding: 32px;
            max-width: 1600px;
            margin: 0 auto;
            margin-left: var(--sidebar-width);
            transition: margin-left var(--transition-speed) ease;
        }

        /* Stats Cards */
        .stats-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
            margin-bottom: 32px;
            animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .stat-card {
            background: white;
            padding: 28px;
            border-radius: 16px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: all var(--transition-speed) ease;
            position: relative;
            overflow: hidden;
        }

        .stat-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transform: translateX(-100%);
            transition: transform 0.6s ease;
        }

        .stat-card:hover::after {
            transform: translateX(100%);
        }

        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
        }

        .stat-card h3 {
            color: #64748b;
            font-size: 0.95em;
            margin-bottom: 16px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            position: relative;
        }

        .stat-card .value {
            font-size: 2.5em;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 12px;
            transition: color var(--transition-speed) ease;
        }

        .stat-card:hover .value {
            color: var(--primary);
        }

        /* Welcome Message */
        .welcome-message {
            font-size: 2.2em;
            font-weight: 800;
            color: #1e293b;
            text-align: center;
            padding: 32px;
            border-radius: 16px;
            background: linear-gradient(135deg, #fff, #f8fafc);
            border: 2px solid #e2e8f0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            margin-bottom: 32px;
            animation: welcomeSlide 1s ease-out;
        }

        @keyframes welcomeSlide {
            0% {
                transform: translateX(-100%);
                opacity: 0;
            }
            100% {
                transform: translateX(0);
                opacity: 1;
            }
        }

        /* Charts Section */
        .charts-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 24px;
            animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .chart-card {
            background: white;
            padding: 28px;
            border-radius: 16px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: transform var(--transition-speed) ease;
        }

        .chart-card:hover {
            transform: translateY(-3px);
        }

        .chart-card h3 {
            color: #1e293b;
            margin-bottom: 24px;
            font-size: 1.2em;
            font-weight: 600;
            position: relative;
            padding-bottom: 8px;
        }

        .chart-card h3::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 40px;
            height: 3px;
            background: var(--primary);
            border-radius: 2px;
            transition: width var(--transition-speed) ease;
        }

        .chart-card:hover h3::after {
            width: 60px;
        }

        /* Toggle Button */
        .toggle-btn {
            display: none;
            position: fixed;
            left: 20px;
            top: 20px;
            z-index: 1001;
            background: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: transform var(--transition-speed) ease;
        }

        .toggle-btn:hover {
            transform: scale(1.1);
        }

        /* Responsive Layout */
        @media (max-width: 1024px) {
            .dashboard {
                margin-left: 0;
            }

            .sidebar {
                transform: translateX(-100%);
            }

            .sidebar.active {
                transform: translateX(0);
            }

            .toggle-btn {
                display: block;
            }
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <div class="logo">Revshop</div>
        </div>
        <ul class="menu-list">
            <a href="/admin" class="menu-item active">
                <span class="menu-icon"><i class="fas fa-chart-line"></i></span>
                <span class="menu-text">Dashboard</span>
            </a>
            <a href="/admin/orders" class="menu-item">
                <span class="menu-icon"><i class="fas fa-box"></i></span>
                <span class="menu-text">Orders</span>
            </a>
            <a href="/admin/transactions" class="menu-item">
                <span class="menu-icon"><i class="fas fa-credit-card"></i></span>
                <span class="menu-text">Transactions</span>
            </a>
            <a href="/admin/products" class="menu-item">
                <span class="menu-icon"><i class="fas fa-shopping-cart"></i></span>
                <span class="menu-text">Products</span>
            </a>
            <a href="/admin/categories" class="menu-item">
                <span class="menu-icon"><i class="fas fa-folder"></i></span>
                <span class="menu-text">Category</span>
            </a>
            <a href="/admin/addProduct" class="menu-item">
                <span class="menu-icon"><i class="fas fa-plus"></i></span>
                <span class="menu-text">Add Product</span>
            </a>
        </ul>
    </div>

    <div class="dashboard">
        <div class="welcome-message">
            Welcome back, User!
        </div>

        <div class="stats-container">
            <div class="stat-card">
                <h3>Total Sales</h3>
                <div class="value" id="totalSalesValue">$0</div>
                <p>Since last month</p>
            </div>
            <div class="stat-card">
                <h3>Total Buyers</h3>
                <div class="value">350</div>
                <p>Since last month</p>
            </div>
            <div class="stat-card">
                <h3>Total Orders</h3>
                <div class="value">100</div>
                <p>All-time</p>
            </div>
        </div>

        <div class="charts-container">
            <div class="chart-card">
                <h3>Sales Overview</h3>
                <canvas id="salesChart"></canvas>
            </div>
            <div class="chart-card">
                <h3>User Growth</h3>
                <canvas id="userGrowthChart"></canvas>
            </div>
        </div>
    </div>

    <button class="toggle-btn">☰</button>

    <script>
        // Chart.js setup for sales chart
        async function fetchTotalSales() {
        try {
            const response = await fetch('http://localhost:8087/orders/total-sales');
            if (!response.ok) {
                throw new Error('Failed to fetch total sales');
            }
            const totalSales = await response.json();
            // Update the total sales value on the page
            const totalSalesElement = document.getElementById('totalSalesValue');
            if (totalSalesElement) {
            	totalSalesElement.textContent = '$' + totalSales.toLocaleString();
            } else {
                console.error('Element with id "totalSalesValue" not found.');
            }        } catch (error) {
            console.error('Error fetching total sales:', error);
        }
    	}

        window.addEventListener('load', fetchTotalSales);
        
        
        const ctx = document.getElementById('salesChart').getContext('2d');
        const salesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May'],
                datasets: [{
                    label: 'Sales',
                    data: [12000, 15000, 13000, 16000, 17000],
                    borderColor: 'var(--primary)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            }
        });

        // Chart.js setup for user growth chart
        const userGrowthCtx = document.getElementById('userGrowthChart').getContext('2d');
        const userGrowthChart = new Chart(userGrowthCtx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May'],
                datasets: [{
                    label: 'New Users',
                    data: [50, 70, 90, 80, 120],
                    backgroundColor: 'var(--success)',
                    borderColor: 'var(--success)',
                    borderWidth: 1
                }]
            }
        });

        // Sidebar toggle functionality
        const toggleBtn = document.querySelector('.toggle-btn');
        const sidebar = document.querySelector('.sidebar');
        
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    </script>
</body>
</html>
