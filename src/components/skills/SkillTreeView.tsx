import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { useAppContext } from 'contexts/AppContext';
import { Skill } from 'models/Skill';
import SkillDetails from './SkillDetails';

const TreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  min-height: 600px;
  position: relative;
  background: linear-gradient(to bottom, #87CEEB 0%, #87CEEB 60%, #98FB98 60%, #228B22 100%);
  border-radius: var(--border-radius);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TreeSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

const Controls = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const ZoomControls = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ZoomButton = styled.button`
  background-color: white;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

const ResetButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background-color: #3d8b40;
  }
`;

const ResetTreeButton = styled.button`
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 1rem;
  
  &:hover {
    background-color: #b71c1c;
  }
`;

const Legend = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const LegendTitle = styled.h3`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--dark-color);
`;

const LegendItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

interface TreeNode {
  id: string;
  name: string;
  parentId?: string;
  x: number;
  y: number;
  color?: string;
  radius?: number;
  level?: number;
  maxLevel?: number;
  type: 'trunk' | 'category' | 'skill';
  unlocked?: boolean;
  categoryId?: string;
  angleOffset?: number;
  skill?: Skill;
  depth?: number;
  branchThickness?: number;
  skillDepth?: number;
  parentReachedMax?: boolean;
  icon?: string;
}

// Skill icons mapping
const getSkillIcon = (skillId: string): string => {
  const icons: {[key: string]: string} = {
    // Physical skills
    'basic_fitness': '🏃',
    'cardio': '❤️',
    'endurance_athletics': '🏅',
    'strength': '💪',
    'power': '⚡',
    'flexibility': '🤸',
    'movement': '🌀',
    'nutrition': '🥗',
    'advanced_nutrition': '🧪',
    
    // Mental skills
    'learning': '📚',
    'critical_thinking': '🧩',
    'problem_solving': '💡',
    'memory': '🧠',
    'knowledge': '🎓',
    'languages': '🌍',
    'linguistic_mastery': '🗣️',
    'focus': '🎯',
    'mental_fortitude': '🛡️',
    
    // Social skills
    'communication': '💬',
    'persuasion': '🎭',
    'leadership': '👑',
    'empathy': '❤️‍🩹',
    'relationships': '🤝',
    'networking': '🌐',
    'community': '👥',
    
    // Creative skills
    'creative_foundations': '🎨',
    'visual_arts': '🖼️',
    'artistic_mastery': '🎭',
    'music': '🎵',
    'music_expertise': '🎼',
    'writing': '✍️',
    'narrative': '📖',
    
    // Practical skills
    'home_maintenance': '🔧',
    'diy': '🔨',
    'craftsmanship': '⚒️',
    'cooking': '👨‍🍳',
    'culinary_arts': '🍳',
    'survival': '🏕️',
    'self_sufficiency': '🌱',
    
    // Career skills
    'professional_fundamentals': '📊',
    'specialized_knowledge': '🔬',
    'domain_mastery': '🏆',
    'project_management': '📋',
    'strategic_leadership': '♟️',
    'career_advancement': '📈',
    'industry_influence': '🌟',
    
    // Financial skills
    'personal_finance': '💳',
    'investment_basics': '📊',
    'wealth_building': '💎',
    'financial_planning': '📅',
    'business_finance': '🏢',
    'income_expansion': '💹',
    
    // Technology skills
    'digital_literacy': '💻',
    'programming': '👨‍💻',
    'software_dev': '⚙️',
    'media_production': '🎬',
    'digital_artistry': '🖥️',
    'data_analysis': '📊',
    'advanced_analytics': '🤖',
    
    // Emotional skills
    'self_awareness': '🪞',
    'emotional_regulation': '⚖️',
    'inner_peace': '☮️',
    'resilience': '🌈',
    'growth_mindset': '🌱',
    'happiness': '😊',
    
    // Spiritual skills
    'mindfulness': '🧘',
    'meditation': '🕉️',
    'deep_consciousness': '🌌',
    'philosophy': '📿',
    'meaning': '🔮'
  };
  
  return icons[skillId] || '⭐';
};

const SkillTreeView: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const currentTransformRef = useRef<d3.ZoomTransform | null>(null);
  
  // Function to check if nodes overlap
  const checkOverlap = (node1: TreeNode, node2: TreeNode): boolean => {
    if (node1.id === node2.id) return false;
    const distance = Math.sqrt(
      Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)
    );
    // Different padding for different node types
    let minDistance = 20;
    if (node1.type === 'category' || node2.type === 'category') {
      minDistance = 50; // More space around categories
    } else if (node1.type === 'skill' && node2.type === 'skill') {
      minDistance = 35; // Space between skills
    }
    minDistance += (node1.radius || 10) + (node2.radius || 10);
    return distance < minDistance;
  };
  
  // Function to adjust node position to avoid overlap
  const adjustNodePosition = (node: TreeNode, allNodes: TreeNode[]): TreeNode => {
    let adjusted = { ...node };
    let hasOverlap = true;
    let attempts = 0;
    const maxAttempts = 20;
    
    while (hasOverlap && attempts < maxAttempts) {
      hasOverlap = false;
      for (const otherNode of allNodes) {
        if (otherNode.type === 'trunk') continue; // Don't adjust for trunk
        
        if (checkOverlap(adjusted, otherNode)) {
          hasOverlap = true;
          // Move node away from the overlapping node
          const dx = adjusted.x - otherNode.x;
          const dy = adjusted.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          
          // Stronger repulsion for categories
          const moveDistance = adjusted.type === 'category' ? 25 : 15;
          adjusted.x += (dx / distance) * moveDistance;
          adjusted.y += (dy / distance) * moveDistance;
        }
      }
      attempts++;
    }
    
    return adjusted;
  };
  
  // Generate tree structure based on skill dependencies
  useEffect(() => {
    if (!state.skillCategories.length) return;
    
    const treeNodes: TreeNode[] = [];
    const trunkBase = { x: 0, y: 200 };
    const trunkTop = { x: 0, y: -100 };
    
    // Create trunk segments for a more natural look
    const trunkSegments = 5;
    for (let i = 0; i <= trunkSegments; i++) {
      const t = i / trunkSegments;
      const x = trunkBase.x + (trunkTop.x - trunkBase.x) * t + (Math.random() - 0.5) * 10;
      const y = trunkBase.y + (trunkTop.y - trunkBase.y) * t;
      treeNodes.push({
        id: `trunk-${i}`,
        name: 'Trunk',
        parentId: i > 0 ? `trunk-${i-1}` : undefined,
        x,
        y,
        type: 'trunk',
        radius: 20 - (i * 2),
        color: '#654321',
        branchThickness: 20 - (i * 2)
      });
    }
    
    // Main branches spreading pattern - wider spread
    const categoryCount = state.skillCategories.length;
    const angleSpread = 200; // Increased from 160
    const angleStep = categoryCount > 1 ? angleSpread / (categoryCount - 1) : 0;
    const startAngle = -angleSpread / 2;
    
    state.skillCategories.forEach((category, catIndex) => {
      // Calculate angle for this category
      const angle = startAngle + (catIndex * angleStep) - 90;
      const radians = (angle * Math.PI) / 180;
      
      // Vary the starting height on trunk
      const trunkAttachmentHeight = -30 - (catIndex % 3) * 30;
      
      // Category branch length - more variation
      const branchLength = 140 + (catIndex % 3) * 30 + Math.random() * 20;
      
      // Calculate branch endpoint
      const endX = Math.cos(radians) * branchLength;
      const endY = trunkAttachmentHeight + Math.sin(radians) * branchLength;
      
      // Create category node with smaller size (30% reduction)
      const categoryNode: TreeNode = {
        id: category.id,
        name: category.name,
        parentId: 'trunk-3',
        x: endX,
        y: endY,
        type: 'category',
        radius: 17.5, // Reduced from 25 (30% smaller)
        color: category.color,
        angleOffset: angle,
        depth: 1,
        branchThickness: 12
      };
      
      treeNodes.push(categoryNode);
      
      // Create a map to track skill positions and dependencies
      const skillMap = new Map<string, Skill>();
      const skillNodeMap = new Map<string, TreeNode>();
      
      // Build skill map
      category.skills.forEach(skill => {
        skillMap.set(skill.id, skill);
      });
      
      // Function to get skill depth (1 for root skills, 2 for their dependencies, etc.)
      const getSkillDepth = (skill: Skill): number => {
        if (!skill.dependencies || skill.dependencies.length === 0) return 1;
        const parentDepths = skill.dependencies.map(depId => {
          const parent = skillMap.get(depId);
          if (!parent) return 0;
          return getSkillDepth(parent);
        });
        return Math.max(...parentDepths) + 1;
      };
      
      // Sort skills by depth to process in order
      const sortedSkills = [...category.skills].sort((a, b) => getSkillDepth(a) - getSkillDepth(b));
      
      // Process skills by depth level
      sortedSkills.forEach(skill => {
        const depth = getSkillDepth(skill);
        let parentNode: TreeNode | undefined;
        let baseX = endX;
        let baseY = endY;
        let parentAngle = angle;
        let parentReachedMax = false;
        
        // If skill has dependencies, position relative to parent skill
        if (skill.dependencies && skill.dependencies.length > 0) {
          const parentSkillId = skill.dependencies[0]; // Use first dependency as parent
          parentNode = skillNodeMap.get(parentSkillId);
          
          if (parentNode) {
            baseX = parentNode.x;
            baseY = parentNode.y;
            // Check if parent skill has reached max level
            const parentSkill = skillMap.get(parentSkillId);
            parentReachedMax = parentSkill ? parentSkill.level >= parentSkill.maxLevel : false;
          }
        }
        
        // Calculate position based on depth and siblings
        const siblingsAtDepth = sortedSkills.filter(s => {
          const sDepth = getSkillDepth(s);
          if (sDepth !== depth) return false;
          
          // Check if they have the same parent
          if (depth === 1) return true; // All depth 1 skills are siblings
          
          const sParent = s.dependencies?.[0];
          const currentParent = skill.dependencies?.[0];
          return sParent === currentParent;
        });
        
        const siblingIndex = siblingsAtDepth.indexOf(skill);
        const siblingCount = siblingsAtDepth.length;
        
        // Adjust angle for this skill
        let skillAngle = parentAngle;
        if (depth === 1) {
          // Root skills spread from category
          const spreadAngle = 90;
          const angleOffset = siblingCount > 1 ? (siblingIndex - (siblingCount - 1) / 2) * (spreadAngle / (siblingCount - 1)) : 0;
          skillAngle = angle + angleOffset;
        } else {
          // Dependent skills spread from their parent
          const spreadAngle = 60;
          const angleOffset = siblingCount > 1 ? (siblingIndex - (siblingCount - 1) / 2) * (spreadAngle / (siblingCount - 1)) : 0;
          skillAngle = parentNode?.angleOffset || angle;
          skillAngle += angleOffset;
        }
        
        const skillRadians = (skillAngle * Math.PI) / 180;
        
        // Distance based on depth with more spacing
        const baseDistance = depth === 1 ? 100 : 80; // Increased spacing
        const skillDistance = baseDistance + Math.random() * 10;
        
        // Calculate skill position
        const skillX = baseX + Math.cos(skillRadians) * skillDistance;
        const skillY = baseY + Math.sin(skillRadians) * skillDistance;
        
        const skillNode: TreeNode = {
          id: skill.id,
          name: skill.name,
          parentId: parentNode ? parentNode.id : category.id,
          x: skillX,
          y: skillY,
          type: 'skill',
          radius: 8 + (skill.level || 0) * 2,
          color: category.color,
          level: skill.level,
          maxLevel: skill.maxLevel,
          unlocked: skill.unlocked || parentReachedMax,
          categoryId: category.id,
          skill,
          depth: 1 + depth,
          branchThickness: 4 + (skill.level || 0),
          angleOffset: skillAngle,
          skillDepth: depth,
          parentReachedMax,
          icon: getSkillIcon(skill.id)
        };
        
        treeNodes.push(skillNode);
        skillNodeMap.set(skill.id, skillNode);
      });
    });
    
    // Apply collision detection to prevent overlaps - adjust categories too
    const adjustedNodes = [...treeNodes];
    // First adjust categories
    for (let i = 0; i < adjustedNodes.length; i++) {
      if (adjustedNodes[i].type === 'category') {
        adjustedNodes[i] = adjustNodePosition(adjustedNodes[i], adjustedNodes.slice(0, i));
      }
    }
    // Then adjust skills
    for (let i = 0; i < adjustedNodes.length; i++) {
      if (adjustedNodes[i].type === 'skill') {
        adjustedNodes[i] = adjustNodePosition(adjustedNodes[i], adjustedNodes);
      }
    }
    
    setNodes(adjustedNodes);
  }, [state.skillCategories, state.allSkills]);
  
  // Render the tree with organic shapes
  useEffect(() => {
    if (!svgRef.current || !nodes.length) return;
    
    d3.select(svgRef.current).selectAll('*').remove();
    
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const centerX = width / 2;
    const centerY = height / 2 + 100;
    
    const svg = d3.select(svgRef.current);
    const g = svg.append('g');
    
    // Set up zoom behavior
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        currentTransformRef.current = event.transform;
      });
    
    svg.call(zoomBehavior);
    zoomRef.current = zoomBehavior;
    
    // Use saved transform or default
    const savedTransform = currentTransformRef.current || d3.zoomIdentity.translate(centerX, centerY).scale(0.6);
    svg.call(zoomBehavior.transform, savedTransform);
    
    // Draw ground
    const groundGradient = g.append('defs')
      .append('radialGradient')
      .attr('id', 'groundGradient');
    
    groundGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#654321')
      .attr('stop-opacity', 0.8);
    
    groundGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#8B4513')
      .attr('stop-opacity', 0.4);
    
    g.append('ellipse')
      .attr('cx', 0)
      .attr('cy', 220)
      .attr('rx', 350)
      .attr('ry', 60)
      .attr('fill', 'url(#groundGradient)');
    
    // Add grass patches
    for (let i = 0; i < 30; i++) {
      const grassX = (Math.random() - 0.5) * 700;
      const grassY = 210 + Math.random() * 25;
      g.append('path')
        .attr('d', `M ${grassX} ${grassY} L ${grassX - 2} ${grassY - 10} L ${grassX + 2} ${grassY - 10} Z`)
        .attr('fill', '#228B22')
        .attr('opacity', 0.6);
    }
    
    // Create organic trunk
    const trunkNodes = nodes.filter(n => n.type === 'trunk');
    const trunkGroup = g.append('g');
    
    // Main trunk shape
    trunkGroup.append('path')
      .datum(trunkNodes)
      .attr('d', d => {
        const leftSide = d.map((node) => ({
          x: node.x - (node.branchThickness || 20),
          y: node.y
        }));
        const rightSide = d.map((node) => ({
          x: node.x + (node.branchThickness || 20),
          y: node.y
        })).reverse();
        
        const combinedPath = [...leftSide, ...rightSide, leftSide[0]];
        return d3.line<{x: number, y: number}>()
          .x(p => p.x)
          .y(p => p.y)
          .curve(d3.curveBasis)(combinedPath) || '';
      })
      .attr('fill', '#654321')
      .attr('stroke', '#4A3621')
      .attr('stroke-width', 2);
    
    // Add bark texture
    for (let i = 0; i < 10; i++) {
      const startY = 200 - Math.random() * 300;
      const endY = startY - 20 - Math.random() * 40;
      const xOffset = (Math.random() - 0.5) * 30;
      
      trunkGroup.append('path')
        .attr('d', `M ${xOffset} ${startY} L ${xOffset + (Math.random() - 0.5) * 10} ${endY}`)
        .attr('stroke', '#4A3621')
        .attr('stroke-width', 1)
        .attr('opacity', 0.5);
    }
    
    // Draw branches based on dependencies
    const branchPaths = nodes
      .filter(n => n.parentId && n.type !== 'trunk')
      .map(node => {
        const parent = nodes.find(n => n.id === node.parentId);
        if (!parent) return null;
        
        // Check if this is a skill-to-skill dependency
        const isSkillDependency = parent.type === 'skill' && node.type === 'skill';
        const isUnlocked = node.unlocked || node.parentReachedMax;
        
        return {
          source: parent,
          target: node,
          thickness: node.branchThickness || 6,
          isSkillDependency,
          isLocked: !isUnlocked
        };
      })
      .filter(Boolean);
    
    // Draw branches
    g.selectAll('.branch')
      .data(branchPaths)
      .enter()
      .append('path')
      .attr('class', 'branch')
      .attr('d', d => {
        if (!d || !d.source || !d.target) return '';
        
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        
        // Less curve for skill dependencies to show clear connections
        const curveFactor = d.isSkillDependency ? 0.1 : 0.2;
        
        const ctrl1X = d.source.x + dx * 0.3 + (Math.random() - 0.5) * 20 * curveFactor;
        const ctrl1Y = d.source.y + dy * 0.3 - Math.abs(dx) * curveFactor;
        const ctrl2X = d.source.x + dx * 0.7 + (Math.random() - 0.5) * 20 * curveFactor;
        const ctrl2Y = d.source.y + dy * 0.7 - Math.abs(dx) * curveFactor * 0.5;
        
        return `M ${d.source.x} ${d.source.y} C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${d.target.x} ${d.target.y}`;
      })
      .attr('stroke', d => {
        if (d?.target.type === 'category') return '#654321';
        if (d?.isLocked) return '#999999';
        return d?.target.color || '#8B4513';
      })
      .attr('stroke-width', d => {
        if (d?.isLocked) return (d?.thickness || 6) * 0.5;
        return d?.thickness || 6;
      })
      .attr('fill', 'none')
      .attr('stroke-linecap', 'round')
      .attr('opacity', d => {
        if (d?.isLocked) return 0.3;
        if (d?.isSkillDependency) return 0.6;
        return 0.8;
      })
      .attr('stroke-dasharray', d => {
        // Dashed line for locked skill dependencies
        if (d?.isSkillDependency && d?.isLocked) return '5,5';
        return 'none';
      });
    
    // Create node groups
    const nodeGroups = g.selectAll('.node')
      .data(nodes.filter(n => n.type !== 'trunk'))
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('cursor', d => d.type === 'skill' ? 'pointer' : 'default')
      .on('click', (event, d) => {
        if (d.type === 'skill' && d.skill) {
          setSelectedSkill(d.skill);
        }
      });
    
    // Add glow effect
    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'glow');
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode')
      .attr('in', 'coloredBlur');
    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');
    
    // Draw category nodes
    nodeGroups.filter(d => d.type === 'category')
      .each(function(d) {
        const group = d3.select(this);
        
        // Draw leaves around category (scaled down with node)
        const leafCount = 8;
        for (let i = 0; i < leafCount; i++) {
          const angle = (i / leafCount) * 2 * Math.PI;
          const leafDistance = 21; // Reduced from 30 (30% smaller)
          const leafX = Math.cos(angle) * leafDistance;
          const leafY = Math.sin(angle) * leafDistance;
          
          group.append('ellipse')
            .attr('cx', leafX)
            .attr('cy', leafY)
            .attr('rx', 10.5) // Reduced from 15 (30% smaller)
            .attr('ry', 5.6)  // Reduced from 8 (30% smaller)
            .attr('fill', d.color || '#4CAF50')
            .attr('opacity', 0.6)
            .attr('transform', `rotate(${angle * 180 / Math.PI + 45}, ${leafX}, ${leafY})`);
        }
        
        // Main circle
        group.append('circle')
          .attr('r', d.radius || 17.5)
          .attr('fill', d.color || '#4CAF50')
          .attr('stroke', '#2E7D32')
          .attr('stroke-width', 3)
          .attr('filter', 'url(#glow)');
        
        // Category icon
        group.append('text')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('font-size', '14px') // Reduced from 20px (30% smaller)
          .text(() => {
            // Use the category ID for more reliable icon mapping
            const categoryIcons: {[key: string]: string} = {
              'physical': '🏋️',
              'mental': '🧠',
              'social': '👥',
              'creative': '🎨',
              'practical': '🛠️',
              'career': '💼',
              'financial': '💰',
              'spiritual': '🧘',
              'technology': '💻',
              'emotional': '💭'
            };
            return categoryIcons[d.id] || categoryIcons[d.name.split(' ')[0].toLowerCase()] || '🌟';
          });
      });
    
    // Draw skill nodes with clear locked/unlocked states
    nodeGroups.filter(d => d.type === 'skill')
      .each(function(d) {
        const group = d3.select(this);
        const level = d.level || 0;
        const isUnlocked = d.unlocked || d.parentReachedMax;
        const isMaxed = level >= (d.maxLevel || 10);
        
        // Make the entire group clickable with a larger hit area
        group.append('circle')
          .attr('r', (d.radius || 10) + 10)
          .attr('fill', 'transparent')
          .attr('cursor', 'pointer');
        
        // Draw leaves for skills with levels
        if (level > 0) {
          const leafCount = Math.min(level * 2, 8);
          for (let i = 0; i < leafCount; i++) {
            const angle = (i / leafCount) * 2 * Math.PI + Math.random() * 0.5;
            const distance = (d.radius || 8) + 5 + Math.random() * 5;
            const leafX = Math.cos(angle) * distance;
            const leafY = Math.sin(angle) * distance;
            
            group.append('path')
              .attr('d', `M 0 0 Q ${leafX * 0.5} ${leafY * 0.5 - 3}, ${leafX} ${leafY} Q ${leafX + 3} ${leafY + 2}, ${leafX * 0.7} ${leafY * 0.7 + 2} Z`)
              .attr('fill', d.color || '#4CAF50')
              .attr('opacity', 0.7 + Math.random() * 0.3);
          }
        }
        
        // Skill circle with different states
        group.append('circle')
          .attr('r', d.radius || 10)
          .attr('fill', () => {
            if (!isUnlocked) return '#CCCCCC';
            if (isMaxed) return '#FFD700'; // Gold for maxed
            if (level === 0) return '#E8F5E9';
            return d.color || '#4CAF50';
          })
          .attr('stroke', () => {
            if (!isUnlocked) return '#999999';
            if (isMaxed) return '#FFD700'; // Gold border for maxed skills
            return d.color || '#4CAF50';
          })
          .attr('stroke-width', isMaxed ? 3 : 2)
          .attr('opacity', isUnlocked ? 1 : 0.5)
          .attr('filter', (level > 0 || isMaxed) ? 'url(#glow)' : 'none');
        
        // Add skill icon (no lock icon if unlocked)
        if (!isUnlocked) {
          group.append('text')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('font-size', '12px')
            .attr('opacity', 0.5)
            .text('🔒');
        } else {
          // Show skill-specific icon
          group.append('text')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('font-size', isMaxed ? '14px' : '12px')
            .text(d.icon || '⭐');
        }
        
        // Add skill level indicator for non-maxed skills
        if (level > 0 && !isMaxed && isUnlocked) {
          group.append('text')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('y', 15)
            .attr('font-size', '8px')
            .attr('font-weight', 'bold')
            .attr('fill', d.color || '#4CAF50')
            .text(`${level}/${d.maxLevel}`);
        }
      });
    
    // Tooltips
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tree-tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '8px 12px')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('z-index', 1000);
    
    nodeGroups
      .on('mouseover', function(event, d) {
        const nodeData = d as TreeNode;
        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
        
        let content = `<strong>${nodeData.name}</strong>`;
        if (nodeData.type === 'skill') {
          content += `<br>Level: ${nodeData.level || 0}/${nodeData.maxLevel || 10}`;
          if (!nodeData.unlocked && !nodeData.parentReachedMax) {
            content += '<br><em>Locked - Requires prerequisite at max level</em>';
          }
          if (nodeData.skill?.dependencies && nodeData.skill.dependencies.length > 0) {
            content += '<br>Prerequisites: ' + nodeData.skill.dependencies.join(', ');
          }
        }
        
        tooltip.html(content)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });
    
    // Cleanup on unmount
    return () => {
      d3.select('body').selectAll('.tree-tooltip').remove();
    };
  }, [nodes]);
  
  // Update selected skill when state changes
  useEffect(() => {
    if (selectedSkill) {
      const updatedSkill = state.allSkills.find(s => s.id === selectedSkill.id);
      if (updatedSkill) {
        setSelectedSkill(updatedSkill);
      }
    }
  }, [state.allSkills, selectedSkill]);
  
  // Custom invest point handler that doesn't reset view
  const handleInvestPoint = (skillId: string) => {
    // Check if skill is unlocked before investing
    const skill = state.allSkills.find(s => s.id === skillId);
    if (!skill) return;
    
    // Check dependencies
    if (skill.dependencies && skill.dependencies.length > 0) {
      const parentSkill = state.allSkills.find(s => s.id === skill.dependencies![0]);
      if (parentSkill && parentSkill.level < parentSkill.maxLevel) {
        // Parent not maxed - don't allow investment
        return;
      }
    }
    
    if (state.user.remainingLifeSkillPoints > 0 && skill.level < skill.maxLevel) {
      dispatch({
        type: 'INVEST_POINTS',
        payload: { skillId, points: 1 }
      });
    }
  };
  
  // Zoom controls
  const handleZoomIn = () => {
    if (svgRef.current && zoomRef.current) {
      d3.select(svgRef.current).transition().call(zoomRef.current.scaleBy as any, 1.2);
    }
  };
  
  const handleZoomOut = () => {
    if (svgRef.current && zoomRef.current) {
      d3.select(svgRef.current).transition().call(zoomRef.current.scaleBy as any, 0.8);
    }
  };
  
  const handleResetZoom = () => {
    if (svgRef.current && zoomRef.current) {
      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;
      d3.select(svgRef.current)
        .transition()
        .call(zoomRef.current.transform as any, d3.zoomIdentity.translate(width / 2, height / 2 + 100).scale(0.6));
    }
  };
  
  const handleResetTree = () => {
    setShowResetConfirmation(true);
  };
  
  const confirmResetTree = () => {
    dispatch({ type: 'RESET_SKILL_TREE' });
    setShowResetConfirmation(false);
    if (selectedSkill) {
      setSelectedSkill(null);
    }
  };
  
  const cancelResetTree = () => {
    setShowResetConfirmation(false);
  };
  
  return (
    <TreeContainer>
      <TreeSvg ref={svgRef} />
      
      <Controls>
        <ZoomControls>
          <ZoomButton onClick={handleZoomIn}>+</ZoomButton>
          <ZoomButton onClick={handleZoomOut}>-</ZoomButton>
        </ZoomControls>
        <ResetButton onClick={handleResetZoom}>Reset View</ResetButton>
        <ResetTreeButton onClick={handleResetTree}>Reset Skill Tree</ResetTreeButton>
        
        {showResetConfirmation && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '10px',
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: 'var(--border-radius)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 200,
            width: '250px'
          }}>
            <p style={{ margin: '0 0 1rem', fontSize: '0.9rem' }}>
              Are you sure you want to reset all skill points? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                onClick={cancelResetTree}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: 'var(--border-radius)',
                  backgroundColor: '#e0e0e0',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmResetTree}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: 'var(--border-radius)',
                  backgroundColor: '#d32f2f',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </Controls>
      
      <Legend>
        <LegendTitle>Skill Categories</LegendTitle>
        <LegendItems>
          {state.skillCategories.map(category => (
            <LegendItem key={category.id}>
              <LegendColor color={category.color} />
              <span>{category.name}</span>
            </LegendItem>
          ))}
        </LegendItems>
      </Legend>
      
      {selectedSkill && (
        <SkillDetails
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onInvestPoint={handleInvestPoint}
          canInvest={
            state.user.remainingLifeSkillPoints > 0 && 
            selectedSkill.level < selectedSkill.maxLevel &&
            (!!selectedSkill.unlocked || 
              !!(selectedSkill.dependencies && selectedSkill.dependencies.length > 0 && 
                 state.allSkills.find(s => s.id === selectedSkill.dependencies![0])?.level === 
                 state.allSkills.find(s => s.id === selectedSkill.dependencies![0])?.maxLevel))
          }
          dailyTimeInvestment={state.user.dailyTimeInvestment}
          currentAge={state.user.age}
        />
      )}
    </TreeContainer>
  );
};

export default SkillTreeView;
