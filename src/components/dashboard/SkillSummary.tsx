import React from 'react';
import styled from 'styled-components';
import { Skill } from 'models/Skill';
import { useAppContext } from 'contexts/AppContext';

interface SkillSummaryProps {
  skills: Skill[];
}

const SummaryContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const SkillList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SkillItem = styled.div`
  padding: 1rem;
  border-radius: var(--border-radius);
  border: 1px solid #eee;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const SkillCategory = styled.span<{ color: string }>`
  font-size: 0.8rem;
  background-color: ${props => props.color || 'var(--primary-color)'};
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
`;

const ProgressContainer = styled.div`
  margin: 0.5rem 0;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.25rem;
`;

const Progress = styled.div<{ width: number; color: string }>`
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${props => props.color || 'var(--primary-color)'};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const SkillDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--gray-color);
`;

const SkillLevel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LevelIndicator = styled.span<{ active: boolean }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'var(--primary-color)' : '#ddd'};
`;

const InvestButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 0.5rem;
  
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const NoSkillsMessage = styled.p`
  text-align: center;
  color: var(--gray-color);
  padding: 2rem 0;
`;

const getColorForCategory = (category: string): string => {
  const colors: Record<string, string> = {
    physical: '#4CAF50', // Green
    mental: '#2196F3',   // Blue
    creative: '#9C27B0', // Purple
    social: '#FF9800',   // Orange
    professional: '#795548' // Brown
  };
  
  return colors[category] || '#4CAF50';
};

const SkillSummary: React.FC<SkillSummaryProps> = ({ skills }) => {
  const { state, dispatch } = useAppContext();
  const activeSkills = skills.filter(skill => skill.level > 0 || skill.unlocked);
  
  const handleInvestPoint = (skillId: string) => {
    if (state.user.remainingLifeSkillPoints > 0) {
      dispatch({
        type: 'INVEST_POINTS',
        payload: { skillId, points: 1 }
      });
    }
  };
  
  if (activeSkills.length === 0) {
    return (
      <NoSkillsMessage>
        No active skills yet. Start your journey by investing points in the skill tree!
      </NoSkillsMessage>
    );
  }
  
  return (
    <SummaryContainer>
      <SkillList>
        {activeSkills.slice(0, 5).map(skill => {
          const progress = (skill.level / skill.maxLevel) * 100;
          const color = getColorForCategory(skill.category);
          
          return (
            <SkillItem key={skill.id}>
              <SkillHeader>
                <SkillName>{skill.name}</SkillName>
                <SkillCategory color={color}>
                  {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                </SkillCategory>
              </SkillHeader>
              
              <ProgressContainer>
                <ProgressBar>
                  <Progress width={progress} color={color} />
                </ProgressBar>
              </ProgressContainer>
              
              <SkillDetails>
                <span>Level {skill.level}/{skill.maxLevel}</span>
                <span>{skill.pointsInvested} points invested</span>
              </SkillDetails>
              
              <SkillLevel>
                {[...Array(skill.maxLevel)].map((_, i) => (
                  <LevelIndicator key={i} active={i < skill.level} />
                ))}
              </SkillLevel>
              
              <InvestButton 
                onClick={() => handleInvestPoint(skill.id)}
                disabled={state.user.remainingLifeSkillPoints <= 0 || skill.level >= skill.maxLevel}
              >
                Invest 1 Point
              </InvestButton>
            </SkillItem>
          );
        })}
      </SkillList>
    </SummaryContainer>
  );
};

export default SkillSummary;
