'use client';

import { useState, useMemo } from 'react';
import { SKILLS_DATA, PixelSkill } from '@/data/skills';

export type CategoryFilter = 'all' | 'frontend' | 'backend' | 'database' | 'security' | 'performance' | 'orchestration';

export function useSkillExplorer() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedSkill, setSelectedSkill] = useState<PixelSkill | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        skill.capabilities.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return {
    activeCategory,
    setActiveCategory,
    selectedSkill,
    setSelectedSkill,
    searchQuery,
    setSearchQuery,
    filteredSkills,
    allSkills: SKILLS_DATA
  };
}
