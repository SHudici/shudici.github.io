/**
 * User model representing a person using the Tree of Life application
 */
export interface User {
  id?: string;
  age: number;
  gender: string;
  upperAgeLimit: number;
  dailyTimeInvestment: number;
  startingAge: number;
  
  // Derived properties for calculation
  totalAvailableLifeSkillPoints: number;
  remainingLifeSkillPoints: number;
}

/**
 * Default values for a new user
 */
export const DEFAULT_USER: User = {
  age: 25,
  gender: 'other',
  upperAgeLimit: 80,
  dailyTimeInvestment: 2, // Default 2 hours per day
  startingAge: 16, // Default starting age for skill acquisition
  totalAvailableLifeSkillPoints: 0, // Calculated based on age and upper limit
  remainingLifeSkillPoints: 0, // Initially same as total, decreases as skills are added
};

/**
 * Create user with calculated skill points
 */
export function createUser(userData: Partial<User>): User {
  const user: User = {
    ...DEFAULT_USER,
    ...userData,
  };
  
  // Calculate total available skill points
  // 1 point = ~50 hours of effort
  const totalYears = user.upperAgeLimit - user.startingAge;
  const daysPerYear = 365;
  const totalDays = totalYears * daysPerYear;
  const totalHours = totalDays * user.dailyTimeInvestment;
  const totalPoints = Math.floor(totalHours / 50);
  
  user.totalAvailableLifeSkillPoints = totalPoints;
  
  // Calculate remaining points (subtract already invested points)
  const usedYears = user.age - user.startingAge;
  const usedDays = Math.max(0, usedYears * daysPerYear);
  const usedHours = usedDays * user.dailyTimeInvestment;
  const usedPoints = Math.floor(usedHours / 50);
  
  user.remainingLifeSkillPoints = Math.max(0, totalPoints - usedPoints);
  
  return user;
}
