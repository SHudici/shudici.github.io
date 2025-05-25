import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAppContext } from 'contexts/AppContext';

// Components
import SkillSummary from './SkillSummary';
import TimeInvestmentChart from './TimeInvestmentChart';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const WelcomeCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  grid-column: 1 / -1;
`;

const WelcomeTitle = styled.h1`
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  grid-column: 1 / -1;
`;

const StatCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: var(--gray-color);
  font-size: 0.9rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  color: var(--dark-color);
`;

const SkillsSection = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TimeSection = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ViewTreeButton = styled(Link)`
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3d8b40;
    color: white;
  }
`;

const Dashboard: React.FC = () => {
  const { state } = useAppContext();
  const { user, allSkills } = state;
  
  // Calculate some stats for the dashboard
  const totalSkills = allSkills.length;
  const activeSkills = allSkills.filter(skill => skill.level > 0).length;
  const completedSkills = allSkills.filter(skill => skill.level === skill.maxLevel).length;
  
  return (
    <>
      <WelcomeCard>
        <WelcomeTitle>Welcome to Your Tree of Life</WelcomeTitle>
        <p>
          Track and develop your life skills like an RPG character. Invest your
          skill points wisely to grow your tree of life!
        </p>
        <ViewTreeButton to="/tree">
          View Your Skill Tree
        </ViewTreeButton>
      </WelcomeCard>
      
      <StatsContainer>
        <StatCard>
          <StatValue>{user.remainingLifeSkillPoints}</StatValue>
          <StatLabel>Skill Points Available</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{activeSkills}</StatValue>
          <StatLabel>Active Skills</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{completedSkills}</StatValue>
          <StatLabel>Mastered Skills</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalSkills}</StatValue>
          <StatLabel>Total Skills</StatLabel>
        </StatCard>
      </StatsContainer>
      
      <DashboardContainer>
        <SkillsSection>
          <SectionTitle>Your Skills</SectionTitle>
          <SkillSummary skills={allSkills} />
        </SkillsSection>
        
        <TimeSection>
          <SectionTitle>Time Investment</SectionTitle>
          <TimeInvestmentChart user={user} />
        </TimeSection>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
