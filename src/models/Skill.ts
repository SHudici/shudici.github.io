/**
 * Skill model representing a node in the Tree of Life
 */
export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  subCategory?: string;
  level: number;
  maxLevel: number;
  pointsInvested: number;
  pointsToNextLevel: number;
  dependencies?: string[]; // IDs of skills that must be developed first
  position?: { x: number; y: number }; // Position in the tree visualization
  unlocked: boolean;
  
  // Visual representation properties
  branchType: 'main' | 'sub'; // Main category or sub-branch
  visualState: 'dormant' | 'growing' | 'flourishing'; // Visual growth state
}

/**
 * Skill Category representing a major branch of the tree
 */
export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon?: string;
  skills: Skill[];
  position: { x: number; y: number; angle: number }; // Position and angle in the tree
}

/**
 * Create a new skill with default values
 */
export function createSkill(data: Partial<Skill>): Skill {
  return {
    id: '',
    name: '',
    description: '',
    category: '',
    level: 0,
    maxLevel: 10,
    pointsInvested: 0,
    pointsToNextLevel: 1,
    unlocked: false,
    branchType: 'sub',
    visualState: 'dormant',
    ...data
  };
}

/**
 * Calculate time to reach a specific skill level
 * @param skill The skill to evaluate
 * @param targetLevel The desired level to reach
 * @param dailyHours Hours per day to invest
 * @returns Object containing days, months, years and age predictions
 */
export function calculateTimeToLevel(
  skill: Skill, 
  targetLevel: number, 
  dailyHours: number, 
  currentAge: number
): { days: number; months: number; years: number; ageAtCompletion: number } {
  if (targetLevel <= skill.level) {
    return { days: 0, months: 0, years: 0, ageAtCompletion: currentAge };
  }
  
  // Points needed to reach target level
  let pointsNeeded = 0;
  let currentPoints = skill.pointsInvested;
  let currentLevel = skill.level;
  
  while (currentLevel < targetLevel) {
    // Simple progression model: each level requires level+1 points
    pointsNeeded += currentLevel + 1;
    currentLevel++;
  }
  
  pointsNeeded -= currentPoints;
  
  // Convert points to time (1 point = 50 hours)
  const hoursNeeded = pointsNeeded * 50;
  const daysNeeded = Math.ceil(hoursNeeded / dailyHours);
  const monthsNeeded = Math.ceil(daysNeeded / 30);
  const yearsNeeded = daysNeeded / 365;
  
  // Calculate age at completion
  const ageAtCompletion = currentAge + yearsNeeded;
  
  return {
    days: daysNeeded,
    months: monthsNeeded,
    years: Number(yearsNeeded.toFixed(2)),
    ageAtCompletion: Number(ageAtCompletion.toFixed(2))
  };
}

/**
 * Add points to a skill and recalculate its level
 */
export function investPointsInSkill(skill: Skill, points: number): Skill {
  const updatedSkill = { ...skill };
  updatedSkill.pointsInvested += points;
  
  // Recalculate level based on points
  let totalPointsForLevel = 0;
  let newLevel = 0;
  
  while (true) {
    const pointsForNextLevel = newLevel + 1;
    if (totalPointsForLevel + pointsForNextLevel > updatedSkill.pointsInvested || newLevel >= updatedSkill.maxLevel) {
      break;
    }
    
    totalPointsForLevel += pointsForNextLevel;
    newLevel++;
  }
  
  updatedSkill.level = newLevel;
  updatedSkill.pointsToNextLevel = newLevel < updatedSkill.maxLevel 
    ? (newLevel + 1) - (updatedSkill.pointsInvested - totalPointsForLevel)
    : 0;
  
  // Update visual state based on level progression
  if (newLevel === 0) {
    updatedSkill.visualState = 'dormant';
  } else if (newLevel < updatedSkill.maxLevel / 2) {
    updatedSkill.visualState = 'growing';
  } else {
    updatedSkill.visualState = 'flourishing';
  }
  
  return updatedSkill;
}

/**
 * Check if a skill is available based on its dependencies
 */
export function isSkillUnlocked(skill: Skill, allSkills: Skill[]): boolean {
  if (!skill.dependencies || skill.dependencies.length === 0) {
    return true;
  }
  
  return skill.dependencies.every(depId => {
    const dependency = allSkills.find(s => s.id === depId);
    return dependency && dependency.level > 0;
  });
}
