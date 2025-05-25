import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from 'contexts/AppContext';

const SetupContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const SetupCard = styled.div`
  background-color: #fff;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Description = styled.p`
  margin-bottom: 2rem;
  text-align: center;
  color: var(--gray-color);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3d8b40;
  }
`;

const InfoBox = styled.div`
  background-color: rgba(76, 175, 80, 0.1);
  border-left: 3px solid var(--primary-color);
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const InlineLabel = styled.span`
  font-weight: 600;
  margin-right: 0.5rem;
`;

const UserSetup: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  
  const [formData, setFormData] = useState({
    age: state.user.age,
    gender: state.user.gender,
    upperAgeLimit: state.user.upperAgeLimit,
    dailyTimeInvestment: state.user.dailyTimeInvestment,
    startingAge: state.user.startingAge,
  });
  
  // Calculations based on form data
  const [calculatedPoints, setCalculatedPoints] = useState({
    totalAvailable: 0,
    remaining: 0,
  });
  
  // Update calculations when form data changes
  useEffect(() => {
    // Calculate total available skill points
    const totalYears = formData.upperAgeLimit - formData.startingAge;
    const daysPerYear = 365;
    const totalDays = totalYears * daysPerYear;
    const totalHours = totalDays * formData.dailyTimeInvestment;
    const totalPoints = Math.floor(totalHours / 50);
    
    // Calculate remaining points
    const usedYears = formData.age - formData.startingAge;
    const usedDays = Math.max(0, usedYears * daysPerYear);
    const usedHours = usedDays * formData.dailyTimeInvestment;
    const usedPoints = Math.floor(usedHours / 50);
    const remainingPoints = Math.max(0, totalPoints - usedPoints);
    
    setCalculatedPoints({
      totalAvailable: totalPoints,
      remaining: remainingPoints,
    });
  }, [formData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'gender' ? value : Number(value),
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user data in context
    dispatch({
      type: 'UPDATE_USER',
      payload: formData,
    });
    
    // Redirect to the dashboard
    navigate('/');
  };
  
  return (
    <SetupContainer>
      <SetupCard>
        <Title>Your Life Journey</Title>
        <Description>
          Configure your personal parameters to calculate available skill points
          and visualize your life journey.
        </Description>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="age">Current Age</Label>
            <Input
              type="number"
              id="age"
              name="age"
              min="1"
              max="120"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="gender">Gender</Label>
            <Select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="upperAgeLimit">Upper Age Limit</Label>
            <Input
              type="number"
              id="upperAgeLimit"
              name="upperAgeLimit"
              min={formData.age}
              max="120"
              value={formData.upperAgeLimit}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="dailyTimeInvestment">Daily Time Investment (hours)</Label>
            <Input
              type="number"
              id="dailyTimeInvestment"
              name="dailyTimeInvestment"
              min="0.5"
              max="12"
              step="0.5"
              value={formData.dailyTimeInvestment}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="startingAge">Starting Age for Skill Acquisition</Label>
            <Input
              type="number"
              id="startingAge"
              name="startingAge"
              min="1"
              max={formData.age}
              value={formData.startingAge}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <InfoBox>
            <InfoTitle>Skill Point Calculations</InfoTitle>
            <p>
              <InlineLabel>Total Available Skill Points:</InlineLabel>
              {calculatedPoints.totalAvailable}
            </p>
            <p>
              <InlineLabel>Remaining Skill Points:</InlineLabel>
              {calculatedPoints.remaining}
            </p>
            <p>
              <em>Note: 1 skill point = ~50 hours of effort</em>
            </p>
          </InfoBox>
          
          <SubmitButton type="submit">
            Save Configuration
          </SubmitButton>
        </form>
      </SetupCard>
    </SetupContainer>
  );
};

export default UserSetup;
