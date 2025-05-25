# Tree of Life - RPG Skill Tree Web Application

Tree of Life is an interactive web application that represents human skill development as an RPG-style skill tree. Users can track and plan their life skills through a visual, growing oak tree visualization.

## Features

- **Personalized Skill System**
  - Configure age, gender, and upper age limit
  - System calculates available and remaining skill points (1 point = ~50 hours of effort)
  - Configurable daily time investment (default: 2 hours/day)

- **Dynamic Calculation Engine**
  - Calculate time (days/months/years) to reach specific skill levels
  - Predict user's age when reaching skill milestones
  - Account for previously invested time since age 16

- **Visual Tree Representation**
  - Oak tree visualization with branches for skill categories
  - Sub-branches for individual skills and specializations
  - Visual growth and "coming to life" where points are invested
  - Leaves and visual elements appear as skills develop

## Technology Stack

- **Frontend**: React, TypeScript
- **Styling**: Styled Components
- **Visualization**: D3.js
- **Routing**: React Router
- **State Management**: React Context API

## Project Structure

```
treeoflife/
│
├── public/                 # Static files
│   ├── index.html          # HTML template
│   └── manifest.json       # Web app manifest
│
├── src/                    # Source files
│   ├── components/         # React components
│   │   ├── dashboard/      # Dashboard-related components
│   │   ├── layout/         # Layout components (header, footer)
│   │   ├── skills/         # Skill tree visualization components
│   │   └── user/           # User-related components
│   │
│   ├── contexts/           # React context providers
│   │   └── AppContext.tsx  # Application state management
│   │
│   ├── data/               # Sample data and mock data
│   │   └── sampleData.ts   # Sample skill categories and skills
│   │
│   ├── models/             # Data models and utility functions
│   │   ├── Skill.ts        # Skill data model and functions
│   │   └── User.ts         # User data model and functions
│   │
│   ├── styles/             # Global styles
│   │   └── GlobalStyle.ts  # Global styled-components styles
│   │
│   ├── App.tsx             # Main App component
│   ├── index.tsx           # Application entry point
│   └── reportWebVitals.ts  # Performance measurement
│
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/treeoflife.git
   cd treeoflife
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. **Initial Setup**:
   - Navigate to the "Settings" page to configure your age, gender, and time investment preferences.
   - The system will calculate your available skill points based on your settings.

2. **Explore the Skill Tree**:
   - Navigate to the "Skill Tree" page to view your tree of life.
   - Click on different skills to see details and invest points.

3. **Invest Skill Points**:
   - Click on a skill node to open its details.
   - Use the "Invest 1 Skill Point" button to develop that skill.
   - Watch as your tree grows and branches develop as you invest points.

4. **Track Progress**:
   - The Dashboard shows your overall progress and statistics.
   - View predictions on how long it will take to master different skills.

## Future Enhancements

- Mobile application versions (Android/iOS)
- User accounts and cloud synchronization
- Social sharing features
- Custom skill categories and skill creation
- Progress tracking with achievements and milestones

## License

This project is licensed under the MIT License - see the LICENSE file for details.
