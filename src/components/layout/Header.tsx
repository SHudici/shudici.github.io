import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from 'contexts/AppContext';

const HeaderContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Logo = styled.div`
  font-family: var(--font-secondary);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? 'var(--primary-color)' : 'var(--dark-color)'};
  font-weight: ${props => props.$active ? '600' : '400'};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    background-color: var(--primary-color);
    transition: width var(--transition-speed);
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const SkillPoints = styled.span`
  background-color: var(--primary-color);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const TreeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22V12M12 12V6M12 12H7.5M12 12H16.5M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6ZM7.5 12C8.32843 12 9 11.3284 9 10.5C9 9.67157 8.32843 9 7.5 9C6.67157 9 6 9.67157 6 10.5C6 11.3284 6.67157 12 7.5 12ZM16.5 12C17.3284 12 18 11.3284 18 10.5C18 9.67157 17.3284 9 16.5 9C15.6716 9 15 9.67157 15 10.5C15 11.3284 15.6716 12 16.5 12Z" 
    stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Header: React.FC = () => {
  const { state } = useAppContext();
  const location = useLocation();
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <TreeIcon />
          Tree of Life
        </Logo>
        
        <Nav>
          <NavLink to="/" $active={location.pathname === '/'}>
            Dashboard
          </NavLink>
          <NavLink to="/tree" $active={location.pathname === '/tree'}>
            Skill Tree
          </NavLink>
          <NavLink to="/setup" $active={location.pathname === '/setup'}>
            Settings
          </NavLink>
        </Nav>
        
        <UserInfo>
          <span>Age: {state.user.age}</span>
          <SkillPoints>
            {state.user.remainingLifeSkillPoints} skill points
          </SkillPoints>
        </UserInfo>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
