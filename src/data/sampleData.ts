import { SkillCategory, createSkill } from 'models/Skill';

/**
 * Sample skill categories and skills for the Tree of Life application
 * Based on a comprehensive RPG-like skill tree
 */
export const sampleSkillCategories: SkillCategory[] = [
  // 🏋️ PHYSICAL TREE
  {
    id: 'physical',
    name: '🏋️ Physical',
    description: 'Skills related to physical health and fitness (60 skill points total)',
    color: '#4CAF50', // Green
    position: { x: 0, y: -120, angle: 270 },
    skills: [
      // Basic fitness branch - the trunk of the physical tree
      createSkill({
        id: 'basic_fitness',
        name: 'Basic Fitness',
        description: 'Foundational health and conditioning',
        category: 'physical',
        branchType: 'main',
        maxLevel: 3,
        unlocked: true,
        position: { x: 0, y: -200 }
      }),
      
      // Cardio branch - left branch
      createSkill({
        id: 'cardio',
        name: 'Cardio Mastery',
        description: 'Running, swimming, cycling proficiency',
        category: 'physical',
        branchType: 'main',
        dependencies: ['basic_fitness'],
        maxLevel: 6,
        unlocked: false,
        position: { x: -100, y: -250 }
      }),
      createSkill({
        id: 'endurance_athletics',
        name: 'Endurance Athletics',
        description: 'Marathon capability, triathlon skills',
        category: 'physical',
        branchType: 'sub',
        dependencies: ['cardio'],
        maxLevel: 12,
        unlocked: false,
        position: { x: -150, y: -290 }
      }),
      
      // Strength branch - right branch
      createSkill({
        id: 'strength',
        name: 'Strength Training',
        description: 'Weightlifting fundamentals',
        category: 'physical',
        branchType: 'main',
        dependencies: ['basic_fitness'],
        maxLevel: 6,
        unlocked: false,
        position: { x: 100, y: -250 }
      }),
      createSkill({
        id: 'power',
        name: 'Power Development',
        description: 'Advanced strength, Olympic lifting',
        category: 'physical',
        branchType: 'sub',
        dependencies: ['strength'],
        maxLevel: 12,
        unlocked: false,
        position: { x: 150, y: -290 }
      }),
      
      // Flexibility branch - left-center branch
      createSkill({
        id: 'flexibility',
        name: 'Flexibility',
        description: 'Basic mobility and stretching',
        category: 'physical',
        branchType: 'main',
        dependencies: ['basic_fitness'],
        maxLevel: 4,
        unlocked: false,
        position: { x: -60, y: -270 }
      }),
      createSkill({
        id: 'movement',
        name: 'Movement Mastery',
        description: 'Yoga, gymnastics foundations, parkour basics',
        category: 'physical',
        branchType: 'sub',
        dependencies: ['flexibility'],
        maxLevel: 8,
        unlocked: false,
        position: { x: -80, y: -330 }
      }),
      
      // Nutrition branch - right-center branch
      createSkill({
        id: 'nutrition',
        name: 'Nutrition',
        description: 'Understanding macros, meal planning',
        category: 'physical',
        branchType: 'main',
        dependencies: ['basic_fitness'],
        maxLevel: 3,
        unlocked: false,
        position: { x: 60, y: -270 }
      }),
      createSkill({
        id: 'advanced_nutrition',
        name: 'Advanced Nutrition',
        description: 'Specialized diets, nutrient timing',
        category: 'physical',
        branchType: 'sub',
        dependencies: ['nutrition'],
        maxLevel: 6,
        unlocked: false,
        position: { x: 80, y: -330 }
      })
    ]
  },
  
  // 🧠 MENTAL TREE
  {
    id: 'mental',
    name: '🧠 Mental',
    description: 'Skills related to cognitive abilities and intellectual growth (72 skill points total)',
    color: '#2196F3', // Blue
    position: { x: 120, y: 0, angle: 0 },
    skills: [
      // Learning fundamentals - the trunk of the mental tree
      createSkill({
        id: 'learning',
        name: 'Learning Fundamentals',
        description: 'Study skills, information processing',
        category: 'mental',
        branchType: 'main',
        maxLevel: 3,
        unlocked: true,
        position: { x: 170, y: 0 }
      }),
      
      // Critical thinking branch - left upward branch
      createSkill({
        id: 'critical_thinking',
        name: 'Critical Thinking',
        description: 'Analysis, logical reasoning',
        category: 'mental',
        branchType: 'sub',
        dependencies: ['learning'],
        maxLevel: 6,
        unlocked: false,
        position: { x: 140, y: -40 }
      }),
      createSkill({
        id: 'problem_solving',
        name: 'Problem Solving',
        description: 'Complex problem breakdown, innovative solutions',
        category: 'mental',
        branchType: 'sub',
        dependencies: ['critical_thinking'],
        maxLevel: 12,
        unlocked: false,
        position: { x: 120, y: -80 }
      }),
      
      // Memory branch - right upward branch
      createSkill({
        id: 'memory',
        name: 'Memory Techniques',
        description: 'Memorization systems, recall methods',
        category: 'mental',
        branchType: 'main',
        dependencies: ['learning'],
        maxLevel: 4,
        unlocked: false,
        position: { x: 210, y: -40 }
      }),
      createSkill({
        id: 'knowledge',
        name: 'Knowledge Mastery',
        description: 'Specialized subject expertise',
        category: 'mental',
        branchType: 'sub',
        dependencies: ['memory'],
        maxLevel: 8,
        unlocked: false,
        position: { x: 240, y: -80 }
      }),
      
      // Languages branch - right downward branch
      createSkill({
        id: 'languages',
        name: 'Languages',
        description: 'Conversational proficiency in multiple languages',
        category: 'mental',
        branchType: 'main',
        dependencies: ['learning'],
        maxLevel: 6,
        unlocked: false,
        position: { x: 210, y: 40 }
      }),
      createSkill({
        id: 'linguistic_mastery',
        name: 'Linguistic Mastery',
        description: 'Near-native fluency in multiple languages',
        category: 'mental',
        branchType: 'sub',
        dependencies: ['languages'],
        maxLevel: 12,
        unlocked: false,
        position: { x: 240, y: 80 }
      }),
      
      // Focus branch - left downward branch
      createSkill({
        id: 'focus',
        name: 'Focus Training',
        description: 'Concentration, meditation basics',
        category: 'mental',
        branchType: 'main',
        dependencies: ['learning'],
        maxLevel: 5,
        unlocked: false,
        position: { x: 140, y: 40 }
      }),
      createSkill({
        id: 'mental_fortitude',
        name: 'Mental Fortitude',
        description: 'Stress resilience, emotional regulation',
        category: 'mental',
        branchType: 'sub',
        dependencies: ['focus'],
        maxLevel: 10,
        unlocked: false,
        position: { x: 120, y: 80 }
      })
    ]
  },
  
  // 👥 SOCIAL TREE
  {
    id: 'social',
    name: '👥 Social',
    description: 'Skills related to interpersonal relationships and communication (48 skill points total)',
    color: '#FF9800', // Orange
    position: { x: 0, y: 120, angle: 90 },
    skills: [
      // Basic communication - the trunk of the social tree
      createSkill({
        id: 'communication',
        name: 'Basic Communication',
        description: 'Clear expression, active listening',
        category: 'social',
        branchType: 'main',
        maxLevel: 3,
        unlocked: true,
        position: { x: 0, y: 170 }
      }),
      
      // Persuasion branch - right branch
      createSkill({
        id: 'persuasion',
        name: 'Persuasion',
        description: 'Influence techniques, negotiation',
        category: 'social',
        branchType: 'sub',
        dependencies: ['communication'],
        maxLevel: 6,
        unlocked: false,
        position: { x: 50, y: 200 }
      }),
      createSkill({
        id: 'leadership',
        name: 'Leadership',
        description: 'Team management, inspiration, vision-setting',
        category: 'social',
        branchType: 'sub',
        dependencies: ['persuasion'],
        maxLevel: 12,
        unlocked: false,
        position: { x: 80, y: 230 }
      }),
      
      // Empathy branch - left branch
      createSkill({
        id: 'empathy',
        name: 'Empathy',
        description: 'Understanding others\' perspectives',
        category: 'social',
        branchType: 'main',
        dependencies: ['communication'],
        maxLevel: 4,
        unlocked: false,
        position: { x: -50, y: 200 }
      }),
      createSkill({
        id: 'relationships',
        name: 'Deep Relationships',
        description: 'Building lasting connections',
        category: 'social',
        branchType: 'sub',
        dependencies: ['empathy'],
        maxLevel: 8,
        unlocked: false,
        position: { x: -80, y: 230 }
      }),
      
      // Networking branch - right center branch
      createSkill({
        id: 'networking',
        name: 'Networking',
        description: 'Building professional connections',
        category: 'social',
        branchType: 'main',
        dependencies: ['communication'],
        maxLevel: 5,
        unlocked: false,
        position: { x: 30, y: 230 }
      }),
      createSkill({
        id: 'community',
        name: 'Community Building',
        description: 'Creating and nurturing groups',
        category: 'social',
        branchType: 'sub',
        dependencies: ['networking'],
        maxLevel: 10,
        unlocked: false,
        position: { x: 40, y: 270 }
      })
    ]
  },
  
  // 🎨 CREATIVE TREE
  {
    id: 'creative',
    name: '🎨 Creative',
    description: 'Skills related to artistic expression and innovation (54 skill points total)',
    color: '#9C27B0', // Purple
    position: { x: -120, y: 0, angle: 180 },
    skills: [
      // Creative foundations - the trunk of the creative tree
      createSkill({
        id: 'creative_foundations',
        name: 'Creative Foundations',
        description: 'Basic principles across disciplines',
        category: 'creative',
        branchType: 'main',
        maxLevel: 3,
        unlocked: true,
        position: { x: -170, y: 0 }
      }),
      
      // Visual arts branch - left upward branch
      createSkill({
        id: 'visual_arts',
        name: 'Visual Arts',
        description: 'Drawing, painting, design fundamentals',
        category: 'creative',
        branchType: 'main',
        dependencies: ['creative_foundations'],
        maxLevel: 6,
        unlocked: false,
        position: { x: -210, y: -40 }
      }),
      createSkill({
        id: 'artistic_mastery',
        name: 'Artistic Mastery',
        description: 'Professional-level art creation',
        category: 'creative',
        branchType: 'sub',
        dependencies: ['visual_arts'],
        maxLevel: 12,
        unlocked: false,
        position: { x: -240, y: -80 }
      }),
      
      // Music branch - right branch
      createSkill({
        id: 'music',
        name: 'Music',
        description: 'Instrument basics or vocal training',
        category: 'creative',
        branchType: 'main',
        dependencies: ['creative_foundations'],
        maxLevel: 6,
        unlocked: false,
        position: { x: -140, y: -40 }
      }),
      createSkill({
        id: 'music_expertise',
        name: 'Musical Expertise',
        description: 'Performance level, composition',
        category: 'creative',
        branchType: 'sub',
        dependencies: ['music'],
        maxLevel: 12,
        unlocked: false,
        position: { x: -120, y: -80 }
      }),
      
      // Writing branch - downward branch
      createSkill({
        id: 'writing',
        name: 'Writing',
        description: 'Clear, engaging written expression',
        category: 'creative',
        branchType: 'main',
        dependencies: ['creative_foundations'],
        maxLevel: 5,
        unlocked: false,
        position: { x: -170, y: 40 }
      }),
      createSkill({
        id: 'narrative',
        name: 'Narrative Mastery',
        description: 'Professional storytelling, publishing',
        category: 'creative',
        branchType: 'sub',
        dependencies: ['writing'],
        maxLevel: 10,
        unlocked: false,
        position: { x: -170, y: 80 }
      })
    ]
  },
  
  // 🛠️ PRACTICAL TREE
  {
    id: 'practical',
    name: '🛠️ Practical',
    description: 'Skills related to hands-on capabilities and self-sufficiency (42 skill points total)',
    color: '#795548', // Brown
    position: { x: -80, y: -80, angle: 210 },
    skills: [
      // Home skills branch
      createSkill({
        id: 'home_maintenance',
        name: 'Home Maintenance',
        description: 'Basic repairs, organization',
        category: 'practical',
        branchType: 'main',
        maxLevel: 3,
        unlocked: true,
        position: { x: -120, y: -120 }
      }),
      createSkill({
        id: 'diy',
        name: 'DIY Expertise',
        description: 'Building, fixing complex household items',
        category: 'practical',
        branchType: 'sub',
        dependencies: ['home_maintenance'],
        maxLevel: 6,
        unlocked: false,
        position: { x: -150, y: -150 }
      }),
      createSkill({
        id: 'craftsmanship',
        name: 'Craftsmanship',
        description: 'Creating professional-quality items',
        category: 'practical',
        branchType: 'sub',
        dependencies: ['diy'],
        maxLevel: 12,
        unlocked: false,
        position: { x: -180, y: -180 }
      }),
      
      // Cooking branch
      createSkill({
        id: 'cooking',
        name: 'Cooking',
        description: 'Meal preparation, basic techniques',
        category: 'practical',
        branchType: 'main',
        maxLevel: 4,
        unlocked: true,
        position: { x: -80, y: -140 }
      }),
      createSkill({
        id: 'culinary_arts',
        name: 'Culinary Arts',
        description: 'Gourmet cooking, specialized cuisines',
        category: 'practical',
        branchType: 'sub',
        dependencies: ['cooking'],
        maxLevel: 8,
        unlocked: false,
        position: { x: -100, y: -180 }
      }),
      
      // Survival branch
      createSkill({
        id: 'survival',
        name: 'Survival Skills',
        description: 'Basic outdoor safety, navigation',
        category: 'practical',
        branchType: 'main',
        maxLevel: 3,
        unlocked: true,
        position: { x: -160, y: -100 }
      }),
      createSkill({
        id: 'self_sufficiency',
        name: 'Self-Sufficiency',
        description: 'Off-grid living capabilities',
        category: 'practical',
        branchType: 'sub',
        dependencies: ['survival'],
        maxLevel: 6,
        unlocked: false,
        position: { x: -200, y: -120 }
      })
    ]
  },
  
  // 💼 CAREER TREE
  {
    id: 'career',
    name: '💼 Career',
    description: 'Skills related to professional success and development (60-120 skill points total)',
    color: '#00BCD4', // Cyan
    position: { x: 80, y: -80, angle: 330 },
    skills: [
      // Professional skills branch
      createSkill({
        id: 'professional_fundamentals',
        name: 'Professional Fundamentals',
        description: 'Industry basics, work ethic',
        category: 'career',
        branchType: 'main',
        maxLevel: 6,
        unlocked: true,
        position: { x: 120, y: -120 }
      }),
      createSkill({
        id: 'specialized_knowledge',
        name: 'Specialized Knowledge',
        description: 'Field-specific expertise',
        category: 'career',
        branchType: 'sub',
        dependencies: ['professional_fundamentals'],
        maxLevel: 12,
        unlocked: false,
        position: { x: 150, y: -150 }
      }),
      createSkill({
        id: 'domain_mastery',
        name: 'Domain Mastery',
        description: 'Expert-level professional skills',
        category: 'career',
        branchType: 'sub',
        dependencies: ['specialized_knowledge'],
        maxLevel: 24,
        unlocked: false,
        position: { x: 180, y: -180 }
      }),
      
      // Management branch
      createSkill({
        id: 'project_management',
        name: 'Project Management',
        description: 'Planning, execution, team coordination',
        category: 'career',
        branchType: 'main',
        dependencies: ['professional_fundamentals'],
        maxLevel: 8,
        unlocked: false,
        position: { x: 100, y: -160 }
      }),
      createSkill({
        id: 'strategic_leadership',
        name: 'Strategic Leadership',
        description: 'Long-term planning, organizational vision',
        category: 'career',
        branchType: 'sub',
        dependencies: ['project_management'],
        maxLevel: 16,
        unlocked: false,
        position: { x: 120, y: -200 }
      }),
      
      // Career advancement branch
      createSkill({
        id: 'career_advancement',
        name: 'Career Advancement',
        description: 'Promotion skills, personal branding',
        category: 'career',
        branchType: 'main',
        dependencies: ['professional_fundamentals'],
        maxLevel: 6,
        unlocked: false,
        position: { x: 160, y: -110 }
      }),
      createSkill({
        id: 'industry_influence',
        name: 'Industry Influence',
        description: 'Becoming a recognized authority',
        category: 'career',
        branchType: 'sub',
        dependencies: ['career_advancement'],
        maxLevel: 12,
        unlocked: false,
        position: { x: 200, y: -130 }
      })
    ]
  },
  
  // 💰 FINANCIAL TREE
  {
    id: 'financial',
    name: '💰 Financial',
    description: 'Skills related to money management and wealth building (36 skill points total)',
    color: '#CDDC39', // Lime
    position: { x: 60, y: 80, angle: 30 },
    skills: [
      // Personal finance branch
      createSkill({
        id: 'personal_finance',
        name: 'Personal Finance',
        description: 'Budgeting, debt management',
        category: 'financial',
        branchType: 'main',
        maxLevel: 3,
        unlocked: true,
        position: { x: 80, y: 120 }
      }),
      createSkill({
        id: 'investment_basics',
        name: 'Investment Basics',
        description: 'Understanding markets, basic portfolio',
        category: 'financial',
        branchType: 'sub',
        dependencies: ['personal_finance'],
        maxLevel: 6,
        unlocked: false,
        position: { x: 100, y: 150 }
      }),
      createSkill({
        id: 'wealth_building',
        name: 'Wealth Building',
        description: 'Advanced investment strategies',
        category: 'financial',
        branchType: 'sub',
        dependencies: ['investment_basics'],
        maxLevel: 12,
        unlocked: false,
        position: { x: 120, y: 180 }
      }),
      
      // Financial planning branch
      createSkill({
        id: 'financial_planning',
        name: 'Financial Planning',
        description: 'Long-term financial roadmapping',
        category: 'financial',
        branchType: 'main',
        dependencies: ['personal_finance'],
        maxLevel: 4,
        unlocked: false,
        position: { x: 110, y: 100 }
      }),
      createSkill({
        id: 'business_finance',
        name: 'Business Finance',
        description: 'Understanding business economics',
        category: 'financial',
        branchType: 'sub',
        dependencies: ['financial_planning'],
        maxLevel: 8,
        unlocked: false,
        position: { x: 140, y: 120 }
      }),
      
      // Income branch
      createSkill({
        id: 'income_expansion',
        name: 'Income Expansion',
        description: 'Side hustles, passive income basics',
        category: 'financial',
        branchType: 'main',
        dependencies: ['personal_finance'],
        maxLevel: 3,
        unlocked: false,
        position: { x: 60, y: 150 }
      })
    ]
  },
  
  // 💻 TECHNOLOGY TREE
  {
    id: 'technology',
    name: '💻 Technology',
    description: 'Skills related to digital tools and computation (54 skill points total)',
    color: '#607D8B', // Blue Grey
    position: { x: -60, y: 80, angle: 150 },
    skills: [
      // Programming branch
      createSkill({
        id: 'digital_literacy',
        name: 'Digital Literacy',
        description: 'Basic computer use, online navigation',
        category: 'technology',
        branchType: 'main',
        maxLevel: 3,
        unlocked: true,
        position: { x: -80, y: 120 }
      }),
      createSkill({
        id: 'programming',
        name: 'Programming Fundamentals',
        description: 'Basic coding, logic',
        category: 'technology',
        branchType: 'sub',
        dependencies: ['digital_literacy'],
        maxLevel: 6,
        unlocked: false,
        position: { x: -100, y: 150 }
      }),
      createSkill({
        id: 'software_dev',
        name: 'Software Development',
        description: 'Building complex applications',
        category: 'technology',
        branchType: 'sub',
        dependencies: ['programming'],
        maxLevel: 12,
        unlocked: false,
        position: { x: -120, y: 180 }
      }),
      
      // Media production branch
      createSkill({
        id: 'media_production',
        name: 'Media Production',
        description: 'Video, audio, content creation',
        category: 'technology',
        branchType: 'main',
        dependencies: ['digital_literacy'],
        maxLevel: 5,
        unlocked: false,
        position: { x: -50, y: 150 }
      }),
      createSkill({
        id: 'digital_artistry',
        name: 'Digital Artistry',
        description: 'Professional-level digital creation',
        category: 'technology',
        branchType: 'sub',
        dependencies: ['media_production'],
        maxLevel: 10,
        unlocked: false,
        position: { x: -60, y: 190 }
      }),
      
      // Data analysis branch
      createSkill({
        id: 'data_analysis',
        name: 'Data Analysis',
        description: 'Understanding and using data',
        category: 'technology',
        branchType: 'main',
        dependencies: ['digital_literacy'],
        maxLevel: 6,
        unlocked: false,
        position: { x: -110, y: 100 }
      }),
      createSkill({
        id: 'advanced_analytics',
        name: 'Advanced Analytics',
        description: 'AI, machine learning basics',
        category: 'technology',
        branchType: 'sub',
        dependencies: ['data_analysis'],
        maxLevel: 12,
        unlocked: false,
        position: { x: -140, y: 120 }
      })
    ]
  },
  
  // 💭 EMOTIONAL TREE
  {
    id: 'emotional',
    name: '💭 Emotional',
    description: 'Skills related to emotional intelligence and wellbeing (36 skill points total)',
    color: '#E91E63', // Pink
    position: { x: -50, y: -100, angle: 240 },
    skills: [
      // Self-awareness branch
      createSkill({
        id: 'self_awareness',
        name: 'Self-Awareness',
        description: 'Understanding personal patterns',
        category: 'emotional',
        branchType: 'main',
        maxLevel: 3,
        unlocked: true,
        position: { x: -60, y: -140 }
      }),
      createSkill({
        id: 'emotional_regulation',
        name: 'Emotional Regulation',
        description: 'Managing reactions, stress control',
        category: 'emotional',
        branchType: 'sub',
        dependencies: ['self_awareness'],
        maxLevel: 6,
        unlocked: false,
        position: { x: -70, y: -180 }
      }),
      createSkill({
        id: 'inner_peace',
        name: 'Inner Peace',
        description: 'Consistent calm, balanced responses',
        category: 'emotional',
        branchType: 'sub',
        dependencies: ['emotional_regulation'],
        maxLevel: 12,
        unlocked: false,
        position: { x: -80, y: -220 }
      }),
      
      // Resilience branch
      createSkill({
        id: 'resilience',
        name: 'Resilience',
        description: 'Bouncing back from difficulties',
        category: 'emotional',
        branchType: 'main',
        dependencies: ['self_awareness'],
        maxLevel: 4,
        unlocked: false,
        position: { x: -100, y: -160 }
      }),
      createSkill({
        id: 'growth_mindset',
        name: 'Growth Mindset',
        description: 'Thriving through challenges',
        category: 'emotional',
        branchType: 'sub',
        dependencies: ['resilience'],
        maxLevel: 8,
        unlocked: false,
        position: { x: -130, y: -180 }
      }),
      
      // Happiness branch
      createSkill({
        id: 'happiness',
        name: 'Happiness Skills',
        description: 'Practices for increased wellbeing',
        category: 'emotional',
        branchType: 'main',
        dependencies: ['self_awareness'],
        maxLevel: 3,
        unlocked: false,
        position: { x: -30, y: -160 }
      })
    ]
  },
  
  // 🧘 SPIRITUAL TREE
  {
    id: 'spiritual',
    name: '🧘 Spiritual',
    description: 'Skills related to inner development and consciousness (30 skill points total)',
    color: '#9E9E9E', // Grey
    position: { x: 50, y: -100, angle: 300 },
    skills: [
      // Mindfulness branch
      createSkill({
        id: 'mindfulness',
        name: 'Mindfulness',
        description: 'Present-moment awareness',
        category: 'spiritual',
        branchType: 'main',
        maxLevel: 3,
        unlocked: true,
        position: { x: 60, y: -140 }
      }),
      createSkill({
        id: 'meditation',
        name: 'Meditation',
        description: 'Consistent practice, various techniques',
        category: 'spiritual',
        branchType: 'sub',
        dependencies: ['mindfulness'],
        maxLevel: 6,
        unlocked: false,
        position: { x: 70, y: -180 }
      }),
      createSkill({
        id: 'deep_consciousness',
        name: 'Deep Consciousness',
        description: 'Profound awareness, presence',
        category: 'spiritual',
        branchType: 'sub',
        dependencies: ['meditation'],
        maxLevel: 12,
        unlocked: false,
        position: { x: 80, y: -220 }
      }),
      
      // Philosophy branch
      createSkill({
        id: 'philosophy',
        name: 'Philosophy',
        description: 'Understanding wisdom traditions',
        category: 'spiritual',
        branchType: 'main',
        maxLevel: 3,
        unlocked: true,
        position: { x: 100, y: -120 }
      }),
      createSkill({
        id: 'meaning',
        name: 'Meaning & Purpose',
        description: 'Developing personal meaning systems',
        category: 'spiritual',
        branchType: 'sub',
        dependencies: ['philosophy'],
        maxLevel: 6,
        unlocked: false,
        position: { x: 130, y: -150 }
      })
    ]
  }
];
