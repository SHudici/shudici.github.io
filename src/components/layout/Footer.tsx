import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--light-color);
  padding: 1.5rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.div`
  font-size: 0.9rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  a {
    font-size: 0.9rem;
    color: var(--dark-color);
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          &copy; {currentYear} Tree of Life. All rights reserved.
        </Copyright>
        <FooterLinks>
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
