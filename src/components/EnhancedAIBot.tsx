import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, ExternalLink, Star, TrendingUp, Brain, Code, FileText, BarChart3, Lightbulb, Target, Zap, Rocket, Trophy, BookOpen, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Project } from '@/pages/Index';
import { AIProjectService } from '@/services/AIProjectservice';
import { allProjects } from '@/pages/Projects';
import { useNavigate } from 'react-router-dom';

interface AIRecommendation {
  project: Project;
  score: number;
  reason: string;
  difficulty: string;
  estimatedTime: string;
  learningValue: number;
  complexityScore: number;
  matchingKeywords?: string[];
}

interface SkillGapAnalysis {
  readinessScore: number;
  nextMilestone: string;
  strengthAreas: string[];
  improvementAreas: string[];
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  recommendations?: AIRecommendation[];
  suggestions?: string[];
  codeAnalysis?: any;
  skillGap?: SkillGapAnalysis;
  quickActions?: QuickAction[];
  roadmap?: ProjectRoadmap;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

interface ProjectRoadmap {
  phases: RoadmapPhase[];
  totalDuration: string;
  skillsGained: string[];
}

interface RoadmapPhase {
  name: string;
  duration: string;
  projects: Project[];
  skills: string[];
  description: string;
}

const EnhancedAIBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showCodeAnalyzer, setShowCodeAnalyzer] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Generate unique user ID
  const [userId] = useState(() => {
    return localStorage.getItem('brainybox-user-id') ||
      (() => {
        const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('brainybox-user-id', id);
        return id;
      })();
  });

  // Helper functions defined within component scope
  const extractSkillsFromQuery = (query: string): string[] => {
    const skillKeywords = {
      'python': ['Python', 'Django', 'Flask'],
      'javascript': ['JavaScript', 'Node.js', 'React'],
      'java': ['Java', 'Spring', 'JavaFX'],
      'c++': ['C++', 'OOP'],
      'c': ['C Programming'],
      'web': ['HTML', 'CSS', 'JavaScript', 'React'],
      'ai': ['Machine Learning', 'TensorFlow', 'PyTorch'],
      'database': ['SQL', 'MongoDB', 'Database Design'],
      'mobile': ['Android', 'iOS', 'React Native']
    };

    const skills: string[] = [];
    const queryLower = query.toLowerCase();

    Object.entries(skillKeywords).forEach(([key, values]) => {
      if (queryLower.includes(key)) {
        skills.push(...values);
      }
    });

    return skills.length > 0 ? skills : ['Programming Fundamentals'];
  };

  const generateSkillAnalysis = (skills: string[]) => {
    const skillLevels = {
      'Programming Fundamentals': 1, 'C Programming': 1,
      'JavaScript': 2, 'Python': 2, 'Java': 2,
      'React': 3, 'Node.js': 3, 'Machine Learning': 4,
      'TensorFlow': 4, 'System Design': 5, 'DevOps': 4
    };

    const avgLevel = skills.reduce((sum, skill) => sum + (skillLevels[skill] || 1), 0) / skills.length;

    let level = 'Beginner';
    let summary = `You have a solid foundation in ${skills.slice(0, 2).join(' and ')}`;

    if (avgLevel >= 4) {
      level = 'Advanced';
      summary = `You have advanced expertise in ${skills.join(', ')}`;
    } else if (avgLevel >= 2.5) {
      level = 'Intermediate';
      summary = `You have intermediate skills in ${skills.join(', ')}`;
    }

    const nextSteps = {
      'Beginner': ['Practice basic projects', 'Learn fundamental concepts', 'Focus on one technology'],
      'Intermediate': ['Build portfolio projects', 'Learn advanced concepts', 'Explore new technologies'],
      'Advanced': ['Lead complex projects', 'Mentor others', 'Contribute to open source']
    }[level] || [];

    const focusAreas = {
      'Beginner': ['Syntax mastery', 'Problem solving', 'Best practices'],
      'Intermediate': ['Design patterns', 'Testing', 'Performance optimization'],
      'Advanced': ['Architecture design', 'Team leadership', 'Innovation']
    }[level] || [];

    return { level, summary, nextSteps, focusAreas };
  };

  const generateLearningRoadmap = (query: string) => {
    const queryLower = query.toLowerCase();
    let goal = 'Software Development';
    let targetLevel = 'Intermediate';

    if (queryLower.includes('ai') || queryLower.includes('machine learning')) {
      goal = 'AI/ML Engineer';
      targetLevel = 'Advanced';
    } else if (queryLower.includes('web') || queryLower.includes('full stack')) {
      goal = 'Full Stack Developer';
      targetLevel = 'Advanced';
    } else if (queryLower.includes('beginner')) {
      targetLevel = 'Beginner';
      goal = 'Programming Fundamentals';
    }

    return AIProjectService.generateProjectRoadmap('Beginner', goal, '6 months');
  };

  const analyzeCode = (code: string) => {
    const languages = {
      'def ': 'Python',
      'function': 'JavaScript',
      'public class': 'Java',
      '#include': 'C/C++',
      'SELECT': 'SQL'
    };

    let detectedLanguage = 'Unknown';
    Object.entries(languages).forEach(([pattern, lang]) => {
      if (code.includes(pattern)) {
        detectedLanguage = lang;
      }
    });

    const complexity = code.split('\n').length > 50 ? 'High' :
      code.split('\n').length > 20 ? 'Medium' : 'Low';

    return {
      language: detectedLanguage,
      complexity,
      suggestions: [
        'Consider adding comments for better readability',
        'Break down complex functions into smaller ones',
        'Add error handling for robustness'
      ]
    };
  };

  const CodeAnalyzer = () => (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
      <h4 className="font-bold text-sm mb-3 flex items-center space-x-2">
        <Code className="w-4 h-4 text-coral" />
        <span>Code Analyzer</span>
      </h4>
      <textarea
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
        placeholder="Paste your code here for analysis..."
        className="w-full h-32 p-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-coral/50"
      />
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs text-gray-500">{codeInput.length} characters</span>
        <div className="space-x-2">
          <Button size="sm" variant="outline" onClick={() => setShowCodeAnalyzer(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            className="bg-coral hover:bg-coral/90"
            onClick={() => {
              if (codeInput.trim()) {
                const analysis = analyzeCode(codeInput);
                setInputValue(`Analyze this ${analysis.language} code with ${analysis.complexity.toLowerCase()} complexity`);
                setShowCodeAnalyzer(false);
                setCodeInput('');
              }
            }}
          >
            Analyze Code
          </Button>
        </div>
      </div>
    </div>
  );

  // Revolutionary AI processing with advanced features
  const processUserQuery = (query: string): { content: string; recommendations?: AIRecommendation[]; quickActions?: QuickAction[]; skillGap?: SkillGapAnalysis; roadmap?: ProjectRoadmap } => {
    const queryLower = query.toLowerCase().trim();

    // 🎯 SMART GREETING DETECTION
    if (/^(hi|hello|hey|sup|yo|good morning|good afternoon|good evening)(\s|$)/i.test(query)) {
      const timeOfDay = new Date().getHours();
      const greeting = timeOfDay < 12 ? 'Good morning' : timeOfDay < 17 ? 'Good afternoon' : 'Good evening';

      return {
        content: `${greeting}! I'm Brainy, your advanced AI project assistant! 🚀\n\nI have intelligent knowledge of all ${allProjects.length} projects and can provide:\n\n🎯 Personalized project recommendations\n💻 Code analysis and feedback\n📊 Skill gap analysis\n🗺️ Learning roadmap generation\n⏱️ Time and difficulty assessment\n🏆 Career guidance\n\nWhat would you like to explore today?`,
        quickActions: [
          {
            id: 'analyze_skills',
            label: 'Analyze My Skills',
            icon: <BarChart3 className="w-4 h-4" />,
            action: () => setInputValue('Analyze my programming skills')
          },
          {
            id: 'find_projects',
            label: 'Find Perfect Project',
            icon: <Target className="w-4 h-4" />,
            action: () => setInputValue('Help me find the perfect project for my level')
          },
          {
            id: 'code_help',
            label: 'Code Analysis',
            icon: <Code className="w-4 h-4" />,
            action: () => setShowCodeAnalyzer(true)
          },
          {
            id: 'roadmap',
            label: 'Learning Roadmap',
            icon: <BookOpen className="w-4 h-4" />,
            action: () => setInputValue('Create a learning roadmap for me')
          }
        ]
      };
    }

    // 🔍 SKILL ANALYSIS REQUEST
    if (/\b(analyze|assessment|skills|ability|evaluate|check)\b.*\b(skill|ability|level)\b/i.test(query)) {
      const userSkills = extractSkillsFromQuery(query);
      const skillAnalysis = generateSkillAnalysis(userSkills);

      return {
        content: `🎯 **Skill Analysis Complete!**\n\n📊 **Current Skill Assessment:**\n${skillAnalysis.summary}\n\n🎓 **Recommended Level:** ${skillAnalysis.level}\n\n🚀 **Next Steps:**\n${skillAnalysis.nextSteps.map(step => `• ${step}`).join('\n')}\n\n💡 **Suggested Focus Areas:**\n${skillAnalysis.focusAreas.map(area => `• ${area}`).join('\n')}`,
        recommendations: AIProjectService.getProjectRecommendations(`${skillAnalysis.level} projects`, allProjects, userId),
        quickActions: [
          {
            id: 'roadmap',
            label: 'Create Learning Path',
            icon: <BookOpen className="w-4 h-4" />,
            action: () => setInputValue(`Create a ${skillAnalysis.level.toLowerCase()} learning roadmap`)
          },
          {
            id: 'projects',
            label: 'Show Matching Projects',
            icon: <Rocket className="w-4 h-4" />,
            action: () => setInputValue(`Show me ${skillAnalysis.level.toLowerCase()} projects`)
          }
        ]
      };
    }

    // 🗺️ ROADMAP GENERATION
    if (/\b(roadmap|path|plan|journey|progression|curriculum)\b/i.test(query)) {
      const roadmap = generateLearningRoadmap(query);

      return {
        content: `🗺️ **Personalized Learning Roadmap Created!**\n\n🎯 **Goal:** ${roadmap.goal}\n⏱️ **Total Duration:** ${roadmap.totalDuration}\n🎓 **Skill Level:** ${roadmap.targetLevel}\n\n📚 **Learning Path:**\n${roadmap.phases.map((phase, i) => `${i + 1}. **${phase.name}** (${phase.duration})\n   ${phase.description}`).join('\n\n')}`,
        roadmap,
        quickActions: [
          {
            id: 'start_phase1',
            label: 'Start Phase 1',
            icon: <Zap className="w-4 h-4" />,
            action: () => setInputValue(`Show me ${roadmap.phases[0]?.name} projects`)
          },
          {
            id: 'skill_gap',
            label: 'Skill Gap Analysis',
            icon: <BarChart3 className="w-4 h-4" />,
            action: () => setInputValue('Analyze my skill gaps')
          }
        ]
      };
    }

    // 🔍 ADVANCED RECOMMENDATION ENGINE
    if (/\b(recommend|suggest|find|show|need|want|looking for|help me)\b/i.test(query)) {
      const recommendations = AIProjectService.getProjectRecommendations(query, allProjects, userId);

      if (recommendations.length > 0) {
        const topRec = recommendations[0];
        const averageScore = Math.round(recommendations.reduce((sum, rec) => sum + rec.score, 0) / recommendations.length);

        return {
          content: `🎯 **Perfect Matches Found!** 🚀\n\nI analyzed "${query}" and found ${recommendations.length} excellent projects!\n\n📊 **Match Quality:** ${averageScore}% average relevance\n🎓 **Difficulty Range:** ${[...new Set(recommendations.map(r => r.difficulty))].join(', ')}\n⏱️ **Time Range:** ${recommendations[0]?.estimatedTime} to ${recommendations[recommendations.length - 1]?.estimatedTime}\n\nHere are your top matches:`,
          recommendations: recommendations.slice(0, 3),
          quickActions: [
            {
              id: 'more_projects',
              label: 'Show More Results',
              icon: <ExternalLink className="w-4 h-4" />,
              action: () => setInputValue(`Show me more ${query} projects`)
            },
            {
              id: 'compare',
              label: 'Compare Projects',
              icon: <BarChart3 className="w-4 h-4" />,
              action: () => setInputValue('Compare these projects')
            }
          ]
        };
      } else {
        return {
          content: `🤔 **No exact matches found for "${query}"**\n\nLet me suggest some popular alternatives:\n\n🔥 **Trending Categories:**\n• 🤖 AI & Machine Learning (${allProjects.filter(p => p.tags.some(t => t.toLowerCase().includes('ai'))).length} projects)\n• 🌐 Web Development (${allProjects.filter(p => p.tags.some(t => t.toLowerCase().includes('fsd'))).length} projects)\n• 🐍 Python Programming (${allProjects.filter(p => p.tags.some(t => t.toLowerCase().includes('python'))).length} projects)\n\n💡 **Try being more specific:**\n• "AI projects for beginners"\n• "React web applications"\n• "Python data science projects"`,
          quickActions: [
            {
              id: 'ai_projects',
              label: 'Explore AI Projects',
              icon: <Brain className="w-4 h-4" />,
              action: () => setInputValue('Show me AI projects')
            },
            {
              id: 'web_projects',
              label: 'Web Development',
              icon: <ExternalLink className="w-4 h-4" />,
              action: () => setInputValue('Show me web development projects')
            }
          ]
        };
      }
    }

    // DEFAULT INTELLIGENT RESPONSE
    const recommendations = AIProjectService.getProjectRecommendations(query, allProjects);

    return {
      content: `🧠 Let me understand your needs better! 🎯\n\nI analyzed "${query}" and I'm ready to help! With ${allProjects.length} projects in my database, I can find exactly what you need.\n\n🔥 Popular Right Now:\n• 🤖 AI/ML Projects - Future-proof skills\n• 🌐 Web Development - Universal demand\n• 🐍 Python Programming - Versatile power\n• ☕ Java Applications - Enterprise ready\n\n💡 Be more specific to get perfect matches:\nTry: "AI for beginners", "React web apps", "Python automation", or "Java GUI projects"\n\nWhat catches your interest?`,
      recommendations: recommendations.length > 0 ? recommendations.slice(0, 2) : undefined
    };
  };

  // Initialize with engaging welcome
  useEffect(() => {
    if (messages.length === 0) {
      const currentHour = new Date().getHours();
      const timeGreeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

      setMessages([{
        id: '1',
        type: 'bot',
        content: `${timeGreeting}! Welcome to BrainyBox! 🧠✨\n\nI'm Brainy, your intelligent project assistant with deep knowledge of all ${allProjects.length} academic projects!\n\n🎯 I'm here to help you:\n• Find perfect projects for your skill level\n• Recommend based on your interests and goals\n• Provide detailed project insights and timelines\n• Guide your learning journey\n\n🚀 Ready to discover your next amazing project?\n\nJust tell me what you're interested in - I understand natural language!`,
        timestamp: new Date(),
        suggestions: [
          'Show me trending AI projects',
          'I need beginner-friendly projects',
          'Web development with React',
          'Python projects for data science',
          'Help me choose the right project'
        ]
      }]);
    }
  }, []);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Realistic AI processing time
    setTimeout(() => {
      const response = processUserQuery(currentInput);
      const contextualSuggestions = getSmartSuggestions(currentInput);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        recommendations: response.recommendations,
        suggestions: contextualSuggestions,
        quickActions: response.quickActions,
        roadmap: response.roadmap
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const getSmartSuggestions = (query: string): string[] => {
    const queryLower = query.toLowerCase();

    if (queryLower.includes('ai') || queryLower.includes('machine learning')) {
      return [
        'Computer vision applications',
        'Natural language processing',
        'Predictive analytics projects',
        'AI for beginners vs advanced'
      ];
    }

    if (queryLower.includes('web') || queryLower.includes('fullstack')) {
      return [
        'Modern React applications',
        'Backend API development',
        'Full-stack MERN projects',
        'E-commerce platforms'
      ];
    }

    if (queryLower.includes('python')) {
      return [
        'Data science with Python',
        'Automation and scripting',
        'Django web frameworks',
        'Python GUI applications'
      ];
    }

    if (queryLower.includes('beginner')) {
      return [
        'Best first programming projects',
        'Learning path recommendations',
        'Time estimates for beginners',
        'Skills to focus on first'
      ];
    }

    return [
      'Tell me about project difficulty',
      'Show me trending technologies',
      'What skills will I learn?',
      'How long will this take?',
      'Similar project alternatives'
    ];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  // Enhanced project click handler with proper navigation
  const handleProjectClick = (project: Project) => {
    // Close the chatbot
    setIsOpen(false);

    // Navigate to projects page with the specific project
    navigate('/projects', {
      state: {
        selectedProjectId: project.id,
        openModal: true
      }
    });

    // Optional: Add a small delay then trigger project modal
    setTimeout(() => {
      // Dispatch custom event to open project modal
      const event = new CustomEvent('openProjectModal', {
        detail: { project }
      });
      window.dispatchEvent(event);
    }, 500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-coral to-raspberry hover:from-coral/90 hover:to-raspberry/90 text-white shadow-xl transition-all duration-300 hover:scale-105 rounded-full p-4 group"
        size="lg"
      >
        <MessageCircle className="w-6 h-6 mr-2" />
        <span className="font-semibold">Ask Brainy AI</span>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
          <Brain className="w-3 h-3 text-white" />
        </div>
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[650px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-coral/10 to-raspberry/10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-coral to-raspberry rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">Brainy AI Assistant</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>{allProjects.length} projects • Advanced AI</span>
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 ${message.type === 'user'
              ? 'bg-gradient-to-r from-coral to-raspberry text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-md'
              }`}>
              <div className="flex items-start space-x-3">
                {message.type === 'bot' && (
                  <Brain className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                )}
                {message.type === 'user' && (
                  <User className="w-5 h-5 flex-shrink-0 mt-1" />
                )}
                <div className="flex-1">
                  <div className="whitespace-pre-line text-sm leading-relaxed">{message.content}</div>

                  {/* Quick Actions */}
                  {message.quickActions && (
                    <div className="mt-4 space-y-2">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>Quick Actions:</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {message.quickActions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => action.action()}
                            className="flex items-center space-x-2 text-xs px-3 py-2 rounded-lg bg-coral/10 hover:bg-coral/20 text-coral border border-coral/20 hover:border-coral/40 transition-all duration-200"
                          >
                            {action.icon}
                            <span>{action.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Project Recommendations */}
                  {message.recommendations && message.recommendations.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs font-medium text-coral">
                          <TrendingUp className="w-4 h-4" />
                          <span>Smart Recommendations (Click to View):</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {message.recommendations.length} matches
                        </div>
                      </div>
                      {message.recommendations.map((rec, index) => (
                        <div
                          key={index}
                          onClick={() => handleProjectClick(rec.project)}
                          className="group p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg hover:border-coral/50 hover:bg-coral/5 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center space-x-2 group-hover:text-coral transition-colors">
                                <span className="text-lg">{rec.project.icon}</span>
                                <span>{rec.project.title}</span>
                              </h4>

                              {/* Enhanced metrics */}
                              <div className="flex items-center space-x-3 mt-2 text-xs">
                                <span className="bg-coral/20 text-coral px-2 py-1 rounded-full font-medium">
                                  {rec.difficulty}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                                  <Target className="w-3 h-3" />
                                  <span>{rec.estimatedTime}</span>
                                </span>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-3 h-3 text-yellow-500" />
                                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                                    {Math.round(rec.score)}% match
                                  </span>
                                </div>
                                {rec.learningValue > 70 && (
                                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                                    High Learning Value
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                                {rec.reason}
                              </p>

                              {/* Skills tags */}
                              {rec.matchingKeywords && rec.matchingKeywords.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {rec.matchingKeywords.slice(0, 4).map((keyword, idx) => (
                                    <span key={idx} className="text-xs bg-coral/10 text-coral px-2 py-0.5 rounded border border-coral/20">
                                      {keyword}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Progress indicators */}
                              <div className="mt-3 space-y-1">
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>Complexity</span>
                                  <span>{rec.complexityScore}/100</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className="bg-coral rounded-full h-1.5 transition-all duration-300"
                                    style={{ width: `${rec.complexityScore}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="mt-2 text-xs text-coral font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                                <ExternalLink className="w-3 h-3" />
                                <span>Click to view project details</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Comparison button */}
                      {message.recommendations.length > 1 && (
                        <button
                          onClick={() => setInputValue('Compare these recommended projects')}
                          className="w-full mt-2 py-2 text-xs text-coral border border-coral/30 rounded-lg hover:bg-coral/10 transition-colors"
                        >
                          Compare All Recommendations
                        </button>
                      )}
                    </div>
                  )}

                  {/* Learning Roadmap */}
                  {message.roadmap && (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <h5 className="font-bold text-sm text-green-800 dark:text-green-200 mb-3 flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Learning Roadmap</span>
                      </h5>
                      <div className="space-y-3">
                        {message.roadmap.phases.slice(0, 3).map((phase, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <h6 className="font-medium text-xs text-green-800 dark:text-green-200">{phase.name}</h6>
                              <p className="text-xs text-green-600 dark:text-green-300">{phase.duration}</p>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => setInputValue('Show me detailed roadmap with projects')}
                          className="w-full mt-2 py-2 text-xs text-green-700 border border-green-300 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          View Complete Roadmap
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Code Analysis */}
                  {showCodeAnalyzer && <CodeAnalyzer />}

                  {/* Smart Suggestions */}
                  {message.suggestions && (
                    <div className="mt-4 space-y-2">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Try asking:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-coral/20 hover:text-coral dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-all duration-200 border border-transparent hover:border-coral/30"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-md">
              <div className="flex items-center space-x-3">
                <Brain className="w-5 h-5 text-coral" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-coral rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-coral rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-coral rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Brainy is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything about projects! I understand natural language 🧠"
            className="flex-1 px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/50 transition-all duration-200"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-coral to-raspberry hover:from-coral/90 hover:to-raspberry/90 text-white rounded-xl px-5 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-xs text-gray-400 mt-2 text-center">
          💡 Powered by advanced AI • Try: "AI for portfolio" or "Quick Python projects"
        </div>
      </div>
    </div>
  );
};

export default EnhancedAIBot;

