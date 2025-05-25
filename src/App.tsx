import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from 'contexts/AppContext';

// Components
import Header from 'components/layout/Header';
import UserSetup from 'components/user/UserSetup';
import SkillTreeView from 'components/skills/SkillTreeView';
import Dashboard from 'components/dashboard/Dashboard';
import Footer from 'components/layout/Footer';

// Styles
import GlobalStyle from 'styles/GlobalStyle';

function App() {
  return (
    <AppProvider>
      <GlobalStyle />
      <Router>
        <div className="app-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/setup" element={<UserSetup />} />
              <Route path="/tree" element={<SkillTreeView />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
