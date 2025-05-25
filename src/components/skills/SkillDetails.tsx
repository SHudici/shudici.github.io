import React from 'react';
import styled from 'styled-components';
import { Skill, calculateTimeToLevel } from 'models/Skill';

interface SkillDetailsProps {
  skill: Skill;
  onClose: () => void;
  onInvestPoint: (skillId: string) => void;
  canInvest: boolean;
  dailyTimeInvestment: number;
  currentAge: number;
}

const DetailsPanel = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 350px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  overflow: hidden;
`;

const Header = styled.div<{ color: string }>`
  background-color: ${props => props.color};
  color: white;
  padding: 1rem;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const SkillTitle = styled.h2`
  margin: 0;
  font-size: 1.3rem;
  margin-right: 1.5rem;
`;

const SkillCategory = styled.div`
  font-size: 0.8rem;
  margin-top: 0.25rem;
  opacity: 0.9;
`;

const Content = styled.div`
  padding: 1rem;
`;

const SkillDescription = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const ProgressSection = styled.div`
  margin-bottom: 1.5rem;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const ProgressBar = styled.div`
  height: 10px;
  background-color: #eee;
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = styled.div<{ width: number; color: string }>`
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${props => props.color};
  border-radius: 5px;
  transition: width 0.3s ease;
`;

const StatsSection = styled.div`
  margin-bottom: 1.5rem;
`;

const StatsTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: var(--dark-color);
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.span`
  color: var(--gray-color);
`;

const StatValue = styled.span`
  font-weight: 500;
`;

const TimeSection = styled.div`
  margin-bottom: 1.5rem;
`;

const InvestButton = styled.button<{ isLocked?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.isLocked ? '#d32f2f' : 'var(--primary-color)'};
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.isLocked ? '#b71c1c' : '#3d8b40'};
  }
  
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
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

const SkillDetails: React.FC<SkillDetailsProps> = ({
  skill,
  onClose,
  onInvestPoint,
  canInvest,
  dailyTimeInvestment,
  currentAge
}) => {
  const color = getColorForCategory(skill.category);
  const progressPercent = (skill.level / skill.maxLevel) * 100;
  
  // Calculate time to next level
  const timeToNextLevel = skill.level < skill.maxLevel
    ? calculateTimeToLevel(skill, skill.level + 1, dailyTimeInvestment, currentAge)
    : null;
  
  // Calculate time to max level
  const timeToMaxLevel = skill.level < skill.maxLevel
    ? calculateTimeToLevel(skill, skill.maxLevel, dailyTimeInvestment, currentAge)
    : null;
  
  return (
    <DetailsPanel>
      <Header color={color}>
        <SkillTitle>{skill.name}</SkillTitle>
        <SkillCategory>
          {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
          {skill.subCategory && ` > ${skill.subCategory}`}
        </SkillCategory>
        <CloseButton onClick={onClose}>×</CloseButton>
      </Header>
      
      <Content>
        <SkillDescription>
          {skill.description || 'Develop this skill to grow your tree of life.'}
        </SkillDescription>
        
        <ProgressSection>
          <ProgressLabel>
            <span>Level {skill.level}/{skill.maxLevel}</span>
            <span>{skill.pointsInvested} points invested</span>
          </ProgressLabel>
          <ProgressBar>
            <Progress width={progressPercent} color={color} />
          </ProgressBar>
        </ProgressSection>
        
        <StatsSection>
          <StatsTitle>Skill Stats</StatsTitle>
          <StatRow>
            <StatLabel>Current Level</StatLabel>
            <StatValue>{skill.level}</StatValue>
          </StatRow>
          <StatRow>
            <StatLabel>Points to Next Level</StatLabel>
            <StatValue>{skill.level < skill.maxLevel ? skill.pointsToNextLevel : 'Max Level'}</StatValue>
          </StatRow>
          <StatRow>
            <StatLabel>Total Points Invested</StatLabel>
            <StatValue>{skill.pointsInvested}</StatValue>
          </StatRow>
        </StatsSection>
        
        {(timeToNextLevel || timeToMaxLevel) && (
          <TimeSection>
            <StatsTitle>Time Predictions</StatsTitle>
            {timeToNextLevel && (
              <StatRow>
                <StatLabel>Time to Next Level</StatLabel>
                <StatValue>
                  {timeToNextLevel.days < 30
                    ? `${timeToNextLevel.days} days`
                    : `${timeToNextLevel.months} months`}
                </StatValue>
              </StatRow>
            )}
            {timeToMaxLevel && (
              <StatRow>
                <StatLabel>Time to Master</StatLabel>
                <StatValue>
                  {timeToMaxLevel.years < 1
                    ? `${timeToMaxLevel.months} months`
                    : `${timeToMaxLevel.years} years`}
                </StatValue>
              </StatRow>
            )}
            {timeToMaxLevel && (
              <StatRow>
                <StatLabel>Age at Mastery</StatLabel>
                <StatValue>
                  {timeToMaxLevel.ageAtCompletion.toFixed(1)} years
                </StatValue>
              </StatRow>
            )}
          </TimeSection>
        )}
        
        <InvestButton
          onClick={() => onInvestPoint(skill.id)}
          disabled={!canInvest}
          isLocked={!canInvest && skill.level < skill.maxLevel && !skill.unlocked && skill.dependencies && skill.dependencies.length > 0}
        >
          {skill.level >= skill.maxLevel
            ? 'Mastered'
            : !canInvest
              ? (!skill.unlocked && skill.dependencies && skill.dependencies.length > 0
                ? 'Locked - Complete Prerequisites'
                : 'Not Enough Points')
              : 'Invest 1 Skill Point'}
        </InvestButton>
      </Content>
    </DetailsPanel>
  );
};

export default SkillDetails;
