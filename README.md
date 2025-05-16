# 🛠️ Ship Maintenance Dashboard

A responsive React application to manage ships, components, and maintenance jobs with KPI analytics, chart visualizations, job scheduling, and in-app notifications. Built using React, Context API, and localStorage for persistence.

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js >= 14
- npm or yarn

### Steps

```bash
# Clone the repository
git clone https://github.com/your-username/ship-maintenance-dashboard.git
cd ship-maintenance-dashboard

# Install dependencies
npm install

# Start the development server
npm start

🧩 Application Architecture Overview

src/
├── components/            # Reusable UI components
│   ├── Authentication/    # LoginForm
│   ├── Dashboard/         # KPICards, Charts
│   ├── Ships/             # ShipList, ShipForm, ShipDetail
│   ├── Components/        # ComponentList, ComponentForm
│   ├── Jobs/              # JobList, JobForm, JobCalendar
│   ├── Notifications/     # NotificationCenter
├── contexts/              # Global state using React Context API
│   ├── AuthContext.jsx
│   ├── ShipsContext.jsx
│   ├── ComponentsContext.jsx
│   ├── JobsContext.jsx
├── pages/                 # Route-level pages
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── ShipsPage.jsx
│   ├── ShipDetailPage.jsx
│   ├── JobsPage.jsx
├── utils/                 # Utility functions
│   ├── localStorageUtils.js
│   ├── roleUtils.js
├── styles/                # Custom global styles
│   └── main.css
├── App.jsx                # Main application and route config
└── index.js               # Entry point

📋 Features
✅ User Authentication with dummy login (via AuthContext)

🛳️ Ship Management: Add, edit, delete ships

⚙️ Component Management: Attach components to ships, view last maintenance

🔧 Job Management: Create jobs, assign priority/status, filter by ship

📅 Maintenance Calendar: View scheduled jobs by day

📈 Dashboard: KPI cards + charts (Bar & Pie)

🔔 In-App Notifications: Toasts on job actions

💾 Data Persistence via localStorage

📱 Responsive Design using Tailwind CSS

🧠 Technical Decisions
React Context API was chosen for global state (no Redux needed for small app).

localStorage used to persist data without backend or DB.

Recharts selected for KPI visualizations (lightweight and customizable).

Tailwind CSS used for rapid, responsive styling with minimal CSS files.

Dynamic Routing with React Router for detail/edit pages.

⚠️ Known Issues / Limitations
❗ No real user authentication (mock login via AuthContext)

❗ No backend API or database — all data is lost if localStorage is cleared

📅 Calendar view is basic and does not support drag/drop or sync

🔐 Role-based access not fully implemented yet (structure is ready in roleUtils.js)

🧪 No formal tests or CI pipeline yet

✨ Future Enhancements (Ideas)
Add user roles: Admin vs Engineer vs Viewer

Backend API with authentication and real database (MongoDB / PostgreSQL)

Real-time updates using WebSockets

Export reports as PDF/CSV

Notifications with sound/badge support

📄 License
This project is licensed under the MIT License.

🙌 Acknowledgments
React.js

Recharts

Tailwind CSS

React Calendar

yaml
