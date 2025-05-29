import { Project } from '@/pages/Index';

export interface AIRecommendation {
  project: Project;
  score: number;
  reason: string;
  difficulty: string;
  estimatedTime: string;
  matchingKeywords: string[];
  relevanceScore: number;
  complexityScore: number;
  learningValue: number;
}

export interface SkillGapAnalysis {
  readinessScore: number;
  missingSkills: string[];
  learningPath: { title: string; duration: string; description: string }[];
  estimatedLearningTime: string;
  recommendedPrerequisites: Project[];
  skillLevel: string;
  nextMilestone: string;
}

export interface UserProfile {
  userId: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  favoriteTech: string[];
  completedProjects: number[];
  preferences: {
    timeAvailable: string;
    projectPurpose: string;
    interests: string[];
  };
  conversationHistory: string[];
  learningGoals: string[];
  careerPath: string;
}

export interface ProjectComparison {
  projects: Project[];
  comparisonMatrix: {
    difficulty: string[];
    timeEstimate: string[];
    technologies: string[][];
    learningValue: number[];
    marketDemand: number[];
    portfolioImpact: number[];
  };
  recommendation: string;
}

export class AIProjectService {
  private static userProfiles: Map<string, UserProfile> = new Map();
  private static conversationMemory: Map<string, any[]> = new Map();

  // Advanced project categories with detailed info
  private static projectCategories = {
    'PPS': {
      name: 'Programming for Problem Solving',
      description: 'C Programming fundamentals - perfect for beginners learning core concepts',
      keywords: ['c', 'programming', 'basic', 'fundamentals', 'beginner', 'algorithms', 'logic'],
      difficulty: 'Beginner',
      timeRange: '2-4 weeks',
      careerValue: 7,
      prerequisites: [],
      learningOutcomes: ['Logic Building', 'C Syntax', 'Problem Solving', 'Algorithm Design']
    },
    'OODP': {
      name: 'Object-Oriented Design and Programming',
      description: 'Advanced C++ with OOP concepts - great for intermediate developers',
      keywords: ['c++', 'oop', 'object', 'oriented', 'class', 'inheritance', 'polymorphism'],
      difficulty: 'Intermediate',
      timeRange: '4-6 weeks',
      careerValue: 8,
      prerequisites: ['PPS'],
      learningOutcomes: ['OOP Concepts', 'Design Patterns', 'Code Organization', 'C++ Mastery']
    },
    'APP': {
      name: 'Advanced Programming Practice',
      description: 'Java GUI and enterprise applications - industry-ready projects',
      keywords: ['java', 'gui', 'swing', 'javafx', 'enterprise', 'desktop', 'application'],
      difficulty: 'Intermediate',
      timeRange: '4-8 weeks',
      careerValue: 9,
      prerequisites: ['OODP'],
      learningOutcomes: ['GUI Development', 'Enterprise Patterns', 'Java Frameworks', 'User Interfaces']
    },
    'DSA': {
      name: 'Data Structures & Algorithms',
      description: 'Core CS concepts with efficient problem solving techniques',
      keywords: ['data', 'structure', 'algorithm', 'tree', 'graph', 'sorting', 'searching'],
      difficulty: 'Intermediate',
      timeRange: '6-10 weeks',
      careerValue: 10,
      prerequisites: ['PPS'],
      learningOutcomes: ['Algorithm Analysis', 'Data Structure Design', 'Optimization', 'Interview Prep']
    },
    'DBMS': {
      name: 'Database Management Systems',
      description: 'SQL programming and database design - essential for all applications',
      keywords: ['database', 'sql', 'mysql', 'postgresql', 'query', 'schema', 'normalization'],
      difficulty: 'Intermediate',
      timeRange: '4-6 weeks',
      careerValue: 9,
      prerequisites: [],
      learningOutcomes: ['Database Design', 'SQL Mastery', 'Query Optimization', 'Data Modeling']
    },
    'AI/ML': {
      name: 'Artificial Intelligence & Machine Learning',
      description: 'Cutting-edge AI projects with real-world applications',
      keywords: ['ai', 'artificial', 'intelligence', 'machine', 'learning', 'neural', 'deep', 'tensorflow', 'pytorch'],
      difficulty: 'Advanced',
      timeRange: '8-16 weeks',
      careerValue: 10,
      prerequisites: ['Python', 'DSA'],
      learningOutcomes: ['ML Algorithms', 'Neural Networks', 'Data Science', 'AI Ethics']
    },
    'FSD': {
      name: 'Full Stack Development',
      description: 'Complete web applications with modern frameworks and technologies',
      keywords: ['web', 'fullstack', 'react', 'node', 'javascript', 'frontend', 'backend', 'mern'],
      difficulty: 'Intermediate',
      timeRange: '6-12 weeks',
      careerValue: 10,
      prerequisites: ['DBMS'],
      learningOutcomes: ['Frontend Development', 'Backend APIs', 'Database Integration', 'Deployment']
    },
    'Computer Vision': {
      name: 'Computer Vision & Image Processing',
      description: 'Advanced image processing and computer vision with OpenCV',
      keywords: ['vision', 'image', 'opencv', 'processing', 'detection', 'recognition', 'camera'],
      difficulty: 'Advanced',
      timeRange: '8-12 weeks',
      careerValue: 9,
      prerequisites: ['Python', 'AI/ML'],
      learningOutcomes: ['Image Processing', 'Computer Vision', 'OpenCV', 'Pattern Recognition']
    },
    'Cryptography': {
      name: 'Cryptography & Security',
      description: 'Security algorithms and encryption for data protection',
      keywords: ['crypto', 'encryption', 'security', 'hash', 'cipher', 'blockchain', 'protection'],
      difficulty: 'Advanced',
      timeRange: '6-10 weeks',
      careerValue: 9,
      prerequisites: ['DSA'],
      learningOutcomes: ['Cryptographic Algorithms', 'Security Protocols', 'Blockchain', 'Ethical Hacking']
    },
    'Python': {
      name: 'Python Programming',
      description: 'Versatile Python projects from automation to data science',
      keywords: ['python', 'automation', 'scripting', 'data', 'analysis', 'django', 'flask'],
      difficulty: 'Beginner',
      timeRange: '3-8 weeks',
      careerValue: 9,
      prerequisites: [],
      learningOutcomes: ['Python Syntax', 'Libraries & Frameworks', 'Data Analysis', 'Web Development']
    }
  };

  // Enhanced recommendation engine with advanced scoring
  static getProjectRecommendations(query: string, allProjects: Project[], userId?: string): AIRecommendation[] {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(word => word.length > 2);
    const recommendations: AIRecommendation[] = [];

    // Get user context if available
    const userProfile = userId ? this.getUserProfile(userId) : null;
    const conversationContext = userId ? this.getConversationContext(userId) : [];

    allProjects.forEach(project => {
      let score = 0;
      let reason = '';
      let matchingKeywords: string[] = [];
      let relevanceScore = 0;
      let complexityScore = this.calculateComplexityScore(project);
      let learningValue = this.calculateLearningValue(project);

      const projectText = `${project.title} ${project.description} ${project.tags.join(' ')}`.toLowerCase();

      // 1. EXACT PHRASE MATCHING (Highest Priority)
      if (projectText.includes(queryLower)) {
        score += 80;
        reason = `Perfect match for "${query}" - exactly what you're looking for!`;
        relevanceScore += 40;
      }

      // 2. USER PROFILE MATCHING
      if (userProfile) {
        const profileScore = this.matchUserProfile(project, userProfile);
        score += profileScore.score;
        if (profileScore.reason && !reason) reason = profileScore.reason;
      }

      // 3. CONVERSATION CONTEXT
      if (conversationContext.length > 0) {
        const contextScore = this.analyzeConversationContext(project, conversationContext);
        score += contextScore;
      }

      // 4. TECHNOLOGY STACK ANALYSIS
      const techStack = this.analyzeTechStack(project.tags, queryLower);
      score += techStack.score;
      if (techStack.reason && !reason) reason = techStack.reason;
      matchingKeywords.push(...techStack.keywords);

      // 5. DIFFICULTY LEVEL MATCHING
      const difficultyMatch = this.matchDifficulty(queryLower, project);
      score += difficultyMatch.score;
      if (difficultyMatch.reason && !reason) reason = difficultyMatch.reason;

      // 6. DOMAIN/CATEGORY ANALYSIS
      const domainMatch = this.analyzeDomain(queryLower, project.tags);
      score += domainMatch.score;
      if (domainMatch.reason && !reason) reason = domainMatch.reason;
      matchingKeywords.push(...domainMatch.keywords);

      // 7. KEYWORD FREQUENCY ANALYSIS
      queryWords.forEach(word => {
        const frequency = (projectText.match(new RegExp(word, 'g')) || []).length;
        score += frequency * 15;
        if (frequency > 0) {
          matchingKeywords.push(word);
          relevanceScore += frequency * 5;
        }
      });

      // 8. SEMANTIC SIMILARITY
      const semanticScore = this.calculateSemanticSimilarity(queryLower, project);
      score += semanticScore.score;
      if (semanticScore.reason && !reason) reason = semanticScore.reason;

      // 9. MARKET DEMAND & TRENDING FACTOR
      const marketScore = this.getMarketDemandScore(project);
      score += marketScore;

      // 10. PORTFOLIO IMPACT
      const portfolioScore = this.getPortfolioImpactScore(project);
      score += portfolioScore;

      // 11. LEARNING PATH OPTIMIZATION
      const learningPathScore = this.getLearningPathScore(project, userProfile);
      score += learningPathScore;

      // Generate smart reason if not set
      if (!reason) {
        reason = this.generateAdvancedReason(project, matchingKeywords, queryLower, userProfile);
      }

      // Calculate final relevance score
      relevanceScore += score / 10;

      if (score > 30) {
        recommendations.push({
          project,
          score: Math.min(score, 100),
          reason,
          difficulty: this.assessDifficulty(project),
          estimatedTime: this.estimateTime(project),
          matchingKeywords: [...new Set(matchingKeywords)],
          relevanceScore: Math.min(relevanceScore, 100),
          complexityScore,
          learningValue
        });
      }
    });

    // Store conversation context
    if (userId) {
      this.updateConversationContext(userId, query, recommendations.slice(0, 3));
    }

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }

  // Advanced user profile management
  static getUserProfile(userId: string): UserProfile {
    if (!this.userProfiles.has(userId)) {
      this.userProfiles.set(userId, {
        userId,
        skillLevel: 'Beginner',
        favoriteTech: [],
        completedProjects: [],
        preferences: {
          timeAvailable: '',
          projectPurpose: '',
          interests: []
        },
        conversationHistory: [],
        learningGoals: [],
        careerPath: ''
      });
    }
    return this.userProfiles.get(userId)!;
  }

  static updateUserProfile(userId: string, updates: Partial<UserProfile>): void {
    const profile = this.getUserProfile(userId);
    Object.assign(profile, updates);
    this.userProfiles.set(userId, profile);
  }

  // Conversation context management
  private static getConversationContext(userId: string): any[] {
    return this.conversationMemory.get(userId) || [];
  }

  private static updateConversationContext(userId: string, query: string, recommendations: AIRecommendation[]): void {
    const context = this.getConversationContext(userId);
    context.push({
      timestamp: new Date(),
      query,
      recommendations: recommendations.map(r => ({
        projectId: r.project.id,
        score: r.score,
        reason: r.reason
      }))
    });

    // Keep only last 10 interactions
    if (context.length > 10) {
      context.shift();
    }

    this.conversationMemory.set(userId, context);
  }

  // Advanced scoring algorithms
  private static matchUserProfile(project: Project, profile: UserProfile): { score: number; reason: string } {
    let score = 0;
    let reason = '';

    // Skill level matching
    const projectDifficulty = this.assessDifficulty(project);
    if (projectDifficulty === profile.skillLevel) {
      score += 25;
      reason = `Perfect match for your ${profile.skillLevel.toLowerCase()} skill level!`;
    } else if (
      (profile.skillLevel === 'Beginner' && projectDifficulty === 'Intermediate') ||
      (profile.skillLevel === 'Intermediate' && projectDifficulty === 'Advanced')
    ) {
      score += 15;
      reason = `Great next step to advance from ${profile.skillLevel.toLowerCase()} level!`;
    }

    // Technology preferences
    const projectTechs = project.tags.map(tag => tag.toLowerCase());
    const favoriteTechs = profile.favoriteTech.map(tech => tech.toLowerCase());
    const techMatches = projectTechs.filter(tech =>
      favoriteTechs.some(fav => tech.includes(fav) || fav.includes(tech))
    );

    if (techMatches.length > 0) {
      score += techMatches.length * 10;
      if (!reason) reason = `Matches your interest in ${techMatches.join(', ')}!`;
    }

    // Interest alignment
    const interests = profile.preferences.interests.map(i => i.toLowerCase());
    const projectDescription = project.description.toLowerCase();
    const interestMatches = interests.filter(interest =>
      projectDescription.includes(interest) || project.title.toLowerCase().includes(interest)
    );

    if (interestMatches.length > 0) {
      score += interestMatches.length * 8;
      if (!reason) reason = `Aligns with your interests in ${interestMatches.join(', ')}!`;
    }

    return { score, reason };
  }

  private static analyzeConversationContext(project: Project, context: any[]): number {
    let score = 0;

    // Recent queries similarity
    const recentQueries = context.slice(-3).map(c => c.query.toLowerCase());
    const projectText = `${project.title} ${project.description}`.toLowerCase();

    recentQueries.forEach(query => {
      const queryWords = query.split(/\s+/);
      const matches = queryWords.filter(word => projectText.includes(word));
      score += matches.length * 5;
    });

    // Previous recommendation patterns
    const previouslyRecommended = context.flatMap(c => c.recommendations);
    const similarProjects = previouslyRecommended.filter(rec =>
      project.tags.some(tag => rec.reason?.toLowerCase().includes(tag.toLowerCase()))
    );

    if (similarProjects.length > 0) {
      score += 10; // Bonus for consistency
    }

    return Math.min(score, 30);
  }

  private static calculateComplexityScore(project: Project): number {
    let complexity = 0;

    const complexityIndicators = {
      'neural': 10, 'deep': 10, 'ai': 8, 'machine learning': 8,
      'blockchain': 9, 'cryptography': 8, 'security': 7,
      'real-time': 7, 'distributed': 8, 'microservices': 7,
      'enterprise': 6, 'scalable': 6, 'optimization': 7,
      'algorithm': 6, 'data structure': 6, 'database': 5,
      'gui': 4, 'web': 4, 'automation': 3, 'basic': 2
    };

    const projectText = `${project.title} ${project.description} ${project.tags.join(' ')}`.toLowerCase();

    Object.entries(complexityIndicators).forEach(([keyword, points]) => {
      if (projectText.includes(keyword)) {
        complexity += points;
      }
    });

    return Math.min(complexity, 100);
  }

  private static calculateLearningValue(project: Project): number {
    let value = 0;

    const learningIndicators = {
      'industry': 10, 'professional': 9, 'enterprise': 8,
      'modern': 7, 'trending': 8, 'popular': 6,
      'framework': 7, 'library': 6, 'api': 6,
      'deployment': 7, 'testing': 6, 'documentation': 5,
      'optimization': 7, 'security': 8, 'scalability': 7
    };

    const projectText = `${project.title} ${project.description} ${project.tags.join(' ')}`.toLowerCase();

    Object.entries(learningIndicators).forEach(([keyword, points]) => {
      if (projectText.includes(keyword)) {
        value += points;
      }
    });

    // Bonus for multi-technology projects
    if (project.tags.length > 3) value += 10;

    return Math.min(value, 100);
  }

  private static getMarketDemandScore(project: Project): number {
    const highDemandTechs = {
      'react': 15, 'node': 12, 'python': 14, 'javascript': 13,
      'ai': 18, 'machine learning': 17, 'data science': 15,
      'cloud': 14, 'docker': 12, 'kubernetes': 13,
      'typescript': 12, 'vue': 10, 'angular': 11,
      'blockchain': 14, 'cybersecurity': 16, 'devops': 15
    };

    let score = 0;
    const projectText = `${project.title} ${project.description} ${project.tags.join(' ')}`.toLowerCase();

    Object.entries(highDemandTechs).forEach(([tech, points]) => {
      if (projectText.includes(tech)) {
        score += points;
      }
    });

    return Math.min(score, 25);
  }

  private static getPortfolioImpactScore(project: Project): number {
    let score = 0;

    const portfolioKeywords = {
      'complete': 8, 'full': 7, 'end-to-end': 9, 'production': 10,
      'deployed': 9, 'live': 8, 'interactive': 7, 'responsive': 6,
      'user interface': 6, 'dashboard': 7, 'platform': 8,
      'application': 6, 'system': 7, 'tool': 5
    };

    const projectText = `${project.title} ${project.description}`.toLowerCase();

    Object.entries(portfolioKeywords).forEach(([keyword, points]) => {
      if (projectText.includes(keyword)) {
        score += points;
      }
    });

    return Math.min(score, 20);
  }

  private static getLearningPathScore(project: Project, profile: UserProfile | null): number {
    if (!profile) return 0;

    let score = 0;
    const projectCategory = this.getProjectCategory(project);
    const categoryInfo = this.projectCategories[projectCategory];

    if (categoryInfo) {
      // Check if prerequisites are met
      const completedCategories = profile.completedProjects.map(id =>
        this.getProjectCategory(this.getProjectById(id))
      ).filter(Boolean);

      const prerequisitesMet = categoryInfo.prerequisites.every(prereq =>
        completedCategories.includes(prereq)
      );

      if (prerequisitesMet) {
        score += 15;
      } else {
        score -= 10; // Penalty for missing prerequisites
      }

      // Bonus for career path alignment
      if (profile.careerPath && categoryInfo.name.toLowerCase().includes(profile.careerPath.toLowerCase())) {
        score += 10;
      }
    }

    return score;
  }

  private static getProjectCategory(project: Project): string {
    // Extract category from tags
    const categoryTags = ['PPS', 'OODP', 'APP', 'DSA', 'DBMS', 'FSD', 'AI/ML', 'Computer Vision', 'Cryptography', 'Python'];
    return project.tags.find(tag => categoryTags.includes(tag)) || 'General';
  }

  private static getProjectById(id: number): Project | null {
    // This would typically fetch from your projects array
    // For now, return null as placeholder
    return null;
  }

  private static generateAdvancedReason(project: Project, keywords: string[], query: string, profile: UserProfile | null): string {
    const reasons = [];

    if (keywords.length > 0) {
      reasons.push(`Strong match with ${keywords.slice(0, 2).join(' and ')}`);
    }

    if (profile) {
      const difficulty = this.assessDifficulty(project);
      if (difficulty === profile.skillLevel) {
        reasons.push(`perfect for your ${profile.skillLevel.toLowerCase()} level`);
      }
    }

    const complexity = this.calculateComplexityScore(project);
    if (complexity > 70) {
      reasons.push('industry-level complexity');
    } else if (complexity < 30) {
      reasons.push('beginner-friendly approach');
    }

    const learningValue = this.calculateLearningValue(project);
    if (learningValue > 60) {
      reasons.push('high learning value');
    }

    if (reasons.length === 0) {
      reasons.push('relevant to your interests');
    }

    return `Great choice - ${reasons.join(', ')}!`;
  }

  // Skill Gap Analysis
  static analyzeSkillGap(userSkills: string[], targetProject: Project): SkillGapAnalysis {
    const requiredSkills = this.extractRequiredSkills(targetProject);
    const missingSkills = requiredSkills.filter(skill =>
      !userSkills.some(userSkill =>
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );

    const readinessScore = Math.round(((requiredSkills.length - missingSkills.length) / requiredSkills.length) * 100);
    const learningPath = this.generateLearningPath(missingSkills);
    const estimatedTime = this.calculateLearningTime(missingSkills);
    const prerequisites = this.getPrerequisiteProjects(missingSkills);

    let skillLevel = 'Beginner';
    if (readinessScore >= 80) skillLevel = 'Advanced';
    else if (readinessScore >= 50) skillLevel = 'Intermediate';

    const nextMilestone = missingSkills.length > 0 ?
      `Master ${missingSkills[0]} to improve readiness` :
      'Ready to start this project!';

    return {
      readinessScore,
      missingSkills,
      learningPath,
      estimatedLearningTime: estimatedTime,
      recommendedPrerequisites: prerequisites,
      skillLevel,
      nextMilestone
    };
  }

  private static extractRequiredSkills(project: Project): string[] {
    const skillMap = {
      'PPS': ['C Programming', 'Logic Building', 'Problem Solving'],
      'OODP': ['C++', 'Object-Oriented Programming', 'Design Patterns'],
      'APP': ['Java', 'GUI Development', 'Swing/JavaFX'],
      'DSA': ['Data Structures', 'Algorithms', 'Time Complexity'],
      'DBMS': ['SQL', 'Database Design', 'Normalization'],
      'FSD': ['HTML/CSS', 'JavaScript', 'React/Node.js', 'Database'],
      'AI/ML': ['Python', 'Machine Learning', 'Statistics', 'TensorFlow/PyTorch'],
      'Python': ['Python Syntax', 'Libraries', 'Frameworks'],
      'Computer Vision': ['OpenCV', 'Image Processing', 'Pattern Recognition'],
      'Cryptography': ['Encryption Algorithms', 'Security Protocols', 'Mathematics']
    };

    const skills = new Set<string>();
    project.tags.forEach(tag => {
      if (skillMap[tag]) {
        skillMap[tag].forEach(skill => skills.add(skill));
      }
    });

    // Add technology-specific skills from description
    const description = project.description.toLowerCase();
    if (description.includes('react')) skills.add('React');
    if (description.includes('node')) skills.add('Node.js');
    if (description.includes('mongodb')) skills.add('MongoDB');
    if (description.includes('tensorflow')) skills.add('TensorFlow');
    if (description.includes('opencv')) skills.add('OpenCV');

    return Array.from(skills);
  }

  private static generateLearningPath(missingSkills: string[]): { title: string; duration: string; description: string }[] {
    const learningMap = {
      'C Programming': { duration: '2-3 weeks', description: 'Master C syntax, pointers, and memory management' },
      'Object-Oriented Programming': { duration: '3-4 weeks', description: 'Learn classes, inheritance, polymorphism, and encapsulation' },
      'JavaScript': { duration: '4-6 weeks', description: 'Modern JavaScript ES6+, async programming, and DOM manipulation' },
      'React': { duration: '4-5 weeks', description: 'Component-based UI development with hooks and state management' },
      'Python': { duration: '3-4 weeks', description: 'Python syntax, data structures, and popular libraries' },
      'Machine Learning': { duration: '6-8 weeks', description: 'ML algorithms, data preprocessing, and model evaluation' },
      'SQL': { duration: '2-3 weeks', description: 'Database queries, joins, and database design principles' },
      'Data Structures': { duration: '4-6 weeks', description: 'Arrays, linked lists, trees, graphs, and hash tables' },
      'Algorithms': { duration: '4-6 weeks', description: 'Sorting, searching, dynamic programming, and optimization' }
    };

    return missingSkills.map(skill => ({
      title: skill,
      duration: learningMap[skill]?.duration || '2-4 weeks',
      description: learningMap[skill]?.description || `Master the fundamentals of ${skill}`
    }));
  }

  private static calculateLearningTime(missingSkills: string[]): string {
    const timeMap = {
      'C Programming': 3, 'Object-Oriented Programming': 4, 'JavaScript': 5,
      'React': 4, 'Python': 3, 'Machine Learning': 8, 'SQL': 2,
      'Data Structures': 5, 'Algorithms': 5
    };

    const totalWeeks = missingSkills.reduce((total, skill) => {
      return total + (timeMap[skill] || 3);
    }, 0);

    if (totalWeeks <= 4) return `${totalWeeks} weeks`;
    if (totalWeeks <= 12) return `${Math.ceil(totalWeeks / 4)} months`;
    return `${Math.ceil(totalWeeks / 12)} months`;
  }

  private static getPrerequisiteProjects(missingSkills: string[]): Project[] {
    // This would return actual prerequisite projects based on missing skills
    // For now, return empty array as placeholder
    return [];
  }

  // Enhanced existing methods
  private static analyzeTechStack(tags: string[], query: string): { score: number; reason: string; keywords: string[] } {
    const techMap = {
      'ai': { tags: ['AI/ML', 'Machine Learning'], score: 50, reason: 'Perfect for AI/ML enthusiasts - cutting-edge technology!' },
      'machine learning': { tags: ['AI/ML', 'Machine Learning'], score: 50, reason: 'Excellent ML project - industry-relevant skills!' },
      'web': { tags: ['FSD', 'Web'], score: 45, reason: 'Great web development project - high demand skills!' },
      'python': { tags: ['Python'], score: 40, reason: 'Python is versatile and powerful - excellent choice!' },
      'java': { tags: ['APP', 'Java'], score: 40, reason: 'Solid Java project - enterprise-ready development!' },
      'database': { tags: ['DBMS'], score: 35, reason: 'Essential database skills - needed in every application!' },
      'security': { tags: ['Cryptography'], score: 45, reason: 'Critical security skills - highly valued in industry!' },
      'vision': { tags: ['Computer Vision'], score: 45, reason: 'Advanced computer vision - cutting-edge field!' },
      'c++': { tags: ['OODP'], score: 35, reason: 'Strong C++ fundamentals - great for system programming!' },
      'react': { tags: ['FSD', 'React'], score: 40, reason: 'Modern React development - top framework demand!' }
    };

    let bestMatch = { score: 0, reason: '', keywords: [] as string[] };

    Object.entries(techMap).forEach(([keyword, config]) => {
      if (query.includes(keyword)) {
        const hasMatchingTag = tags.some(tag =>
          config.tags.some(techTag => tag.toLowerCase().includes(techTag.toLowerCase()))
        );

        if (hasMatchingTag && config.score > bestMatch.score) {
          bestMatch = {
            score: config.score,
            reason: config.reason,
            keywords: [keyword]
          };
        }
      }
    });

    return bestMatch;
  }

  private static matchDifficulty(query: string, project: Project): { score: number; reason: string } {
    const difficulty = this.assessDifficulty(project);

    if (query.includes('beginner') || query.includes('easy') || query.includes('simple')) {
      if (difficulty === 'Beginner') {
        return { score: 35, reason: 'Perfect for beginners - builds strong foundations!' };
      }
      return { score: -20, reason: '' };
    }

    if (query.includes('advanced') || query.includes('complex') || query.includes('challenging')) {
      if (difficulty === 'Advanced') {
        return { score: 35, reason: 'Advanced challenge - will push your skills to the limit!' };
      }
      return { score: -15, reason: '' };
    }

    if (query.includes('intermediate') || query.includes('medium')) {
      if (difficulty === 'Intermediate') {
        return { score: 30, reason: 'Perfect intermediate level - ideal skill progression!' };
      }
    }

    return { score: 0, reason: '' };
  }

  private static analyzeDomain(query: string, tags: string[]): { score: number; reason: string; keywords: string[] } {
    const domains = {
      'game': { score: 30, reason: 'Fun gaming project - learn while playing!', keywords: ['game', 'gaming'] },
      'finance': { score: 35, reason: 'Valuable finance domain - high industry demand!', keywords: ['finance', 'financial'] },
      'health': { score: 35, reason: 'Healthcare technology - making a real difference!', keywords: ['health', 'medical'] },
      'ecommerce': { score: 30, reason: 'E-commerce skills - essential for modern business!', keywords: ['ecommerce', 'shopping'] },
      'social': { score: 25, reason: 'Social platform development - connect people!', keywords: ['social', 'networking'] },
      'automation': { score: 30, reason: 'Automation projects - increase efficiency!', keywords: ['automation', 'scripting'] }
    };

    let bestMatch = { score: 0, reason: '', keywords: [] as string[] };

    Object.entries(domains).forEach(([domain, config]) => {
      if (query.includes(domain) || tags.some(tag => tag.toLowerCase().includes(domain))) {
        if (config.score > bestMatch.score) {
          bestMatch = config;
        }
      }
    });

    return bestMatch;
  }

  private static calculateSemanticSimilarity(query: string, project: Project): { score: number; reason: string } {
    const synonyms = {
      'bot': ['chatbot', 'assistant', 'ai', 'automation'],
      'prediction': ['forecast', 'analytics', 'analysis', 'predictor'],
      'detection': ['recognition', 'identification', 'classification'],
      'management': ['system', 'portal', 'platform', 'dashboard'],
      'tracker': ['monitoring', 'tracking', 'analyzer']
    };

    let score = 0;
    let reason = '';

    Object.entries(synonyms).forEach(([key, syns]) => {
      if (query.includes(key)) {
        syns.forEach(syn => {
          if (project.title.toLowerCase().includes(syn) || project.description.toLowerCase().includes(syn)) {
            score += 20;
            reason = `Semantically related to ${key} - smart match!`;
          }
        });
      }
    });

    return { score, reason };
  }

  // Enhanced utility methods
  static assessDifficulty(project: Project): string {
    const complexityKeywords = {
      beginner: ['basic', 'simple', 'calculator', 'grade', 'atm', 'library', 'management', 'pps'],
      intermediate: ['system', 'web', 'gui', 'database', 'app', 'spring', 'react', 'api'],
      advanced: ['ai', 'ml', 'neural', 'deep', 'computer vision', 'cryptography', 'blockchain', 'real-time']
    };

    const projectText = `${project.title} ${project.description} ${project.tags.join(' ')}`.toLowerCase();

    let scores = { beginner: 0, intermediate: 0, advanced: 0 };

    Object.entries(complexityKeywords).forEach(([level, keywords]) => {
      keywords.forEach(keyword => {
        if (projectText.includes(keyword)) {
          scores[level as keyof typeof scores]++;
        }
      });
    });

    const maxScore = Math.max(scores.beginner, scores.intermediate, scores.advanced);

    if (scores.advanced === maxScore && maxScore >= 2) return 'Advanced';
    if (scores.intermediate === maxScore && maxScore >= 2) return 'Intermediate';
    return 'Beginner';
  }

  static estimateTime(project: Project): string {
    const difficulty = this.assessDifficulty(project);
    const projectText = `${project.title} ${project.description}`.toLowerCase();

    let baseTime = {
      'Beginner': { min: 2, max: 4 },
      'Intermediate': { min: 4, max: 8 },
      'Advanced': { min: 8, max: 12 }
    }[difficulty];

    // Adjust for specific technologies and complexity
    if (projectText.includes('ai') || projectText.includes('machine learning')) {
      baseTime.min += 2;
      baseTime.max += 4;
    }

    if (projectText.includes('full stack') || projectText.includes('web')) {
      baseTime.min += 1;
      baseTime.max += 2;
    }

    if (projectText.includes('real-time') || projectText.includes('distributed')) {
      baseTime.min += 2;
      baseTime.max += 3;
    }

    return `${baseTime.min}-${baseTime.max} weeks`;
  }

  static getCategoryDescription(tag: string): string {
    const category = this.projectCategories[tag as keyof typeof this.projectCategories];
    return category ? category.description : 'Exciting project category with practical applications!';
  }

  // New advanced methods
  static compareProjects(projects: Project[]): ProjectComparison {
    const comparisonMatrix = {
      difficulty: projects.map(p => this.assessDifficulty(p)),
      timeEstimate: projects.map(p => this.estimateTime(p)),
      technologies: projects.map(p => p.tags),
      learningValue: projects.map(p => this.calculateLearningValue(p)),
      marketDemand: projects.map(p => this.getMarketDemandScore(p)),
      portfolioImpact: projects.map(p => this.getPortfolioImpactScore(p))
    };

    // Generate recommendation based on comparison
    const bestOverall = projects.reduce((best, current, index) => {
      const currentScore = comparisonMatrix.learningValue[index] +
        comparisonMatrix.marketDemand[index] +
        comparisonMatrix.portfolioImpact[index];
      const bestScore = comparisonMatrix.learningValue[best.index] +
        comparisonMatrix.marketDemand[best.index] +
        comparisonMatrix.portfolioImpact[best.index];

      return currentScore > bestScore ? { project: current, index } : best;
    }, { project: projects[0], index: 0 });

    const recommendation = `Based on learning value, market demand, and portfolio impact, I recommend "${bestOverall.project.title}" as it offers the best overall value for skill development and career growth.`;

    return {
      projects,
      comparisonMatrix,
      recommendation
    };
  }

  static generateProjectRoadmap(userLevel: string, goal: string, timeframe: string): any {
    const roadmapTemplates = {
      'web-development': {
        beginner: [
          { name: 'Foundation', duration: '4 weeks', skills: ['HTML', 'CSS', 'JavaScript'] },
          { name: 'Frontend Framework', duration: '6 weeks', skills: ['React', 'State Management'] },
          { name: 'Backend Development', duration: '6 weeks', skills: ['Node.js', 'Express', 'APIs'] },
          { name: 'Database Integration', duration: '4 weeks', skills: ['MongoDB', 'SQL'] },
          { name: 'Full Stack Project', duration: '6 weeks', skills: ['MERN Stack', 'Deployment'] }
        ],
        intermediate: [
          { name: 'Advanced Frontend', duration: '4 weeks', skills: ['TypeScript', 'Advanced React'] },
          { name: 'Backend Architecture', duration: '6 weeks', skills: ['Microservices', 'GraphQL'] },
          { name: 'DevOps & Deployment', duration: '4 weeks', skills: ['Docker', 'AWS', 'CI/CD'] },
          { name: 'Testing & Quality', duration: '3 weeks', skills: ['Jest', 'Cypress', 'Testing Strategies'] },
          { name: 'Enterprise Project', duration: '8 weeks', skills: ['Scalable Architecture', 'Performance'] }
        ]
      },
      'ai-ml': {
        beginner: [
          { name: 'Python Fundamentals', duration: '3 weeks', skills: ['Python', 'NumPy', 'Pandas'] },
          { name: 'Statistics & Math', duration: '4 weeks', skills: ['Statistics', 'Linear Algebra'] },
          { name: 'Machine Learning Basics', duration: '6 weeks', skills: ['Scikit-learn', 'Supervised Learning'] },
          { name: 'Data Visualization', duration: '3 weeks', skills: ['Matplotlib', 'Seaborn', 'Plotly'] },
          { name: 'ML Project', duration: '6 weeks', skills: ['End-to-end ML Pipeline', 'Model Deployment'] }
        ]
      }
    };

    // Default to web development roadmap
    const template = roadmapTemplates['web-development'][userLevel.toLowerCase() as keyof typeof roadmapTemplates['web-development']] ||
      roadmapTemplates['web-development']['beginner'];

    return {
      goal: goal || 'Full Stack Web Development',
      targetLevel: userLevel,
      totalDuration: template.reduce((total, phase) => total + parseInt(phase.duration), 0) + ' weeks',
      phases: template.map(phase => ({
        ...phase,
        description: `Master ${phase.skills.join(', ')} through hands-on projects and real-world applications.`,
        projects: [] // Would be populated with actual projects
      })),
      skillsGained: template.flatMap(phase => phase.skills)
    };
  }
}