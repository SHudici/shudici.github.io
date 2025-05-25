import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, DEFAULT_USER, createUser } from 'models/User';
import { Skill, SkillCategory, investPointsInSkill, isSkillUnlocked } from 'models/Skill';
import { sampleSkillCategories } from 'data/sampleData';

// Define the application state
interface AppState {
  user: User;
  skillCategories: SkillCategory[];
  allSkills: Skill[];
  isLoading: boolean;
  error: string | null;
}

// Define action types
type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_SKILL_CATEGORIES'; payload: SkillCategory[] }
  | { type: 'INVEST_POINTS'; payload: { skillId: string; points: number } }
  | { type: 'RESET_SKILL_TREE' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Initial state
const initialState: AppState = {
  user: DEFAULT_USER,
  skillCategories: [],
  allSkills: [],
  isLoading: false,
  error: null,
};

// Create the context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'RESET_SKILL_TREE': {
      // Reset all skills to their initial state
      const resetSkills = state.allSkills.map(skill => ({
        ...skill,
        level: 0,
        pointsInvested: 0
      }));
      
      // Reset skill categories with the resetSkills
      const resetCategories = state.skillCategories.map(category => ({
        ...category,
        skills: category.skills.map(skill => {
          const resetSkill = resetSkills.find(s => s.id === skill.id);
          return resetSkill || skill;
        })
      }));
      
      // Reset user's remaining skill points to total available
      const resetUser = {
        ...state.user,
        remainingLifeSkillPoints: state.user.totalAvailableLifeSkillPoints
      };
      
      return {
        ...state,
        user: resetUser,
        skillCategories: resetCategories,
        allSkills: resetSkills,
        error: null
      };
    }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'UPDATE_USER': {
      const updatedUser = createUser({
        ...state.user,
        ...action.payload,
      });
      return {
        ...state,
        user: updatedUser,
      };
    }
    case 'SET_SKILL_CATEGORIES': {
      // Extract all skills from categories
      const allSkills = action.payload.flatMap(category => category.skills);
      return {
        ...state,
        skillCategories: action.payload,
        allSkills,
      };
    }
    case 'INVEST_POINTS': {
      const { skillId, points } = action.payload;
      
      // Verify user has enough points
      if (points > state.user.remainingLifeSkillPoints) {
        return {
          ...state,
          error: 'Not enough skill points available',
        };
      }
      
      // Find and update the skill
      const skill = state.allSkills.find(s => s.id === skillId);
      if (!skill) {
        return {
          ...state,
          error: `Skill with ID ${skillId} not found`,
        };
      }
      
      // Check if skill is unlocked
      if (!isSkillUnlocked(skill, state.allSkills)) {
        return {
          ...state,
          error: 'This skill is locked. You need to develop prerequisite skills first.',
        };
      }
      
      // Update the skill
      const updatedSkill = investPointsInSkill(skill, points);
      
      // Update the user's remaining points
      const updatedUser = {
        ...state.user,
        remainingLifeSkillPoints: state.user.remainingLifeSkillPoints - points,
      };
      
      // Update all skills and categories
      const updatedAllSkills = state.allSkills.map(s => 
        s.id === skillId ? updatedSkill : s
      );
      
      const updatedCategories = state.skillCategories.map(category => {
        if (category.skills.some(s => s.id === skillId)) {
          return {
            ...category,
            skills: category.skills.map(s => 
              s.id === skillId ? updatedSkill : s
            ),
          };
        }
        return category;
      });
      
      return {
        ...state,
        user: updatedUser,
        allSkills: updatedAllSkills,
        skillCategories: updatedCategories,
        error: null,
      };
    }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

// Context provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Initialize data when the component mounts
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Set sample data
    dispatch({ type: 'SET_SKILL_CATEGORIES', payload: sampleSkillCategories });
    
    // Initialize user
    const initialUser = createUser(DEFAULT_USER);
    dispatch({ type: 'SET_USER', payload: initialUser });
    
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for using the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
