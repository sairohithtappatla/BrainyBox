import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Brain, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Project } from '@/pages/Index';

interface SmartSearchProps {
  onSearch: (term: string) => void;
  onFilter: (filters: SearchFilters) => void;
  projects?: Project[];
}

interface SearchFilters {
  difficulty: string[];
  technology: string[];
  subject: string[];
  duration: string[];
}

interface SearchSuggestion {
  text: string;
  type: 'popular' | 'recent' | 'trending';
  count?: number;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ onSearch, onFilter, projects = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [smartSuggestions, setSmartSuggestions] = useState<SearchSuggestion[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [aiInsights, setAiInsights] = useState<string>('');

  // Advanced NLP processing for search queries
  const processNLPQuery = (query: string): SearchFilters => {
    const lowerQuery = query.toLowerCase();
    const techFilters: SearchFilters = {
      difficulty: [],
      technology: [],
      subject: [],
      duration: []
    };

    // Enhanced synonym mapping with more context
    const synonymMap = {
      'python': ['python', 'py', 'snake', 'django', 'flask'],
      'java': ['java', 'spring', 'spring boot', 'jsp', 'servlets'],
      'javascript': ['javascript', 'js', 'node', 'react', 'angular', 'vue'],
      'c++': ['c++', 'cpp', 'c plus plus', 'object oriented'],
      'ai': ['ai', 'artificial intelligence', 'machine learning', 'ml', 'neural', 'deep learning'],
      'web': ['web', 'website', 'frontend', 'backend', 'full stack', 'html', 'css'],
      'database': ['database', 'db', 'sql', 'mysql', 'mongodb', 'postgresql'],
      'security': ['security', 'cybersecurity', 'encryption', 'cryptography', 'blockchain']
    };

    // Smart difficulty detection with context
    const difficultyPatterns = {
      beginner: ['beginner', 'basic', 'easy', 'simple', 'starter', 'intro', 'first time', 'new to'],
      intermediate: ['intermediate', 'medium', 'moderate', 'some experience', 'familiar with'],
      advanced: ['advanced', 'complex', 'expert', 'professional', 'experienced', 'deep dive']
    };

    // Duration detection
    const durationPatterns = {
      short: ['quick', 'fast', 'short', 'weekend', '1 week', 'one week'],
      medium: ['medium', 'moderate', '2 weeks', 'two weeks', 'month'],
      long: ['long', 'extended', 'semester', 'project', 'comprehensive']
    };

    // Process difficulty
    Object.entries(difficultyPatterns).forEach(([level, patterns]) => {
      if (patterns.some(pattern => lowerQuery.includes(pattern))) {
        techFilters.difficulty.push(level);
      }
    });

    // Process duration
    Object.entries(durationPatterns).forEach(([duration, patterns]) => {
      if (patterns.some(pattern => lowerQuery.includes(pattern))) {
        techFilters.duration.push(duration);
      }
    });

    // Advanced technology and subject detection
    Object.entries(synonymMap).forEach(([key, synonyms]) => {
      if (synonyms.some(synonym => lowerQuery.includes(synonym))) {
        if (['python', 'java', 'javascript', 'c++'].includes(key)) {
          techFilters.technology.push(key);
        } else {
          techFilters.subject.push(key);
        }
      }
    });

    // Contextual analysis for better matching
    if (lowerQuery.includes('project for') || lowerQuery.includes('help me with')) {
      // User is looking for specific help
      if (lowerQuery.includes('assignment') || lowerQuery.includes('homework')) {
        techFilters.difficulty.push('beginner');
      }
    }

    return techFilters;
  };

  // AI-powered search suggestions based on user behavior and trends
  const generateSmartSuggestions = useMemo(() => {
    const suggestions: SearchSuggestion[] = [
      // Popular searches
      { text: 'AI projects for beginners', type: 'popular', count: 245 },
      { text: 'Full stack web development', type: 'popular', count: 189 },
      { text: 'Python machine learning', type: 'popular', count: 156 },
      { text: 'Java spring boot projects', type: 'popular', count: 134 },

      // Trending searches
      { text: 'ChatGPT-like AI assistant', type: 'trending', count: 89 },
      { text: 'Blockchain cryptocurrency', type: 'trending', count: 67 },
      { text: 'Computer vision projects', type: 'trending', count: 45 },

      // Recent searches (could be personalized)
      { text: 'Database management system', type: 'recent', count: 78 },
      { text: 'Mobile app development', type: 'recent', count: 56 },
      { text: 'Cybersecurity projects', type: 'recent', count: 34 }
    ];

    return suggestions;
  }, []);

  // AI insights based on search patterns
  const generateAIInsights = (query: string): string => {
    if (!query) return '';

    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('ai') || lowerQuery.includes('machine learning')) {
      return '🤖 AI/ML projects are trending! Our AI assistant can recommend specific projects based on your experience level.';
    }
    
    if (lowerQuery.includes('beginner') || lowerQuery.includes('easy')) {
      return '🌟 For beginners, try our AI assistant for personalized project recommendations that match your learning pace.';
    }
    
    if (lowerQuery.includes('web') || lowerQuery.includes('fullstack')) {
      return '🌐 Web development is in high demand! Ask our AI assistant about MERN, MEAN, or Django projects.';
    }
    
    if (lowerQuery.includes('advanced') || lowerQuery.includes('expert')) {
      return '⚡ Advanced projects require planning. Chat with our AI assistant for complexity assessment and timeline estimates.';
    }
    
    return '💡 Pro tip: Use our AI assistant (bottom-right) for intelligent project recommendations and personalized guidance!';
  };

  // Handle search with NLP processing
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setIsAnalyzing(true);

    // Simulate AI processing
    setTimeout(() => {
      const filters = processNLPQuery(term);
      const insights = generateAIInsights(term);

      setAiInsights(insights);
      onSearch(term);
      onFilter(filters);
      setIsAnalyzing(false);
    }, 800);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Brain className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isAnalyzing ? 'text-coral animate-pulse' : 'text-muted-foreground'
            }`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
            placeholder="Try: 'AI projects for beginners' or 'advanced web development'"
            className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-2 border-border/40 bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/50 transition-all duration-300 shadow-lg"
          />
        </div>

        {/* AI Processing Indicator */}
        {isAnalyzing && (
          <div className="absolute top-full mt-2 left-0 right-0 bg-coral/10 rounded-xl p-3 border border-coral/20">
            <div className="flex items-center space-x-2 text-coral">
              <Brain className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">AI is analyzing your query...</span>
            </div>
          </div>
        )}
      </div>

      {/* AI Insights */}
      {aiInsights && (
        <div className="bg-gradient-to-r from-coral/10 to-raspberry/10 rounded-xl p-4 border border-coral/20">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-coral mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">AI Insight</h4>
              <p className="text-sm text-muted-foreground">{aiInsights}</p>
            </div>
          </div>
        </div>
      )}

      {/* Smart Suggestions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Smart Suggestions</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Advanced Filters</span>
          </Button>
        </div>

        {/* Suggestion Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Popular Searches */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span>Popular</span>
            </div>
            {generateSmartSuggestions
              .filter(s => s.type === 'popular')
              .slice(0, 3)
              .map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="w-full text-left p-3 rounded-xl bg-background/60 hover:bg-coral/10 border border-border/40 hover:border-coral/30 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium group-hover:text-coral transition-colors">
                      {suggestion.text}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {suggestion.count}+
                    </span>
                  </div>
                </button>
              ))}
          </div>

          {/* Trending Searches */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span>Trending</span>
            </div>
            {generateSmartSuggestions
              .filter(s => s.type === 'trending')
              .slice(0, 3)
              .map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="w-full text-left p-3 rounded-xl bg-background/60 hover:bg-raspberry/10 border border-border/40 hover:border-raspberry/30 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium group-hover:text-raspberry transition-colors">
                      {suggestion.text}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {suggestion.count}+ 🔥
                    </span>
                  </div>
                </button>
              ))}
          </div>

          {/* Recent Searches */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Recent</span>
            </div>
            {generateSmartSuggestions
              .filter(s => s.type === 'recent')
              .slice(0, 3)
              .map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="w-full text-left p-3 rounded-xl bg-background/60 hover:bg-coral/10 border border-border/40 hover:border-coral/30 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium group-hover:text-coral transition-colors">
                      {suggestion.text}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {suggestion.count}+
                    </span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Advanced Filters (Collapsible) */}
      {showAdvancedFilters && (
        <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-border/40 space-y-4">
          <h4 className="font-semibold text-foreground">Advanced AI Filters</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Difficulty Level</label>
              <select className="w-full p-2 rounded-lg border border-border/40 bg-background/50">
                <option value="">Any Level</option>
                <option value="beginner">Beginner (2-4 weeks)</option>
                <option value="intermediate">Intermediate (4-8 weeks)</option>
                <option value="advanced">Advanced (8+ weeks)</option>
              </select>
            </div>

            {/* Technology Filter */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Technology</label>
              <select className="w-full p-2 rounded-lg border border-border/40 bg-background/50">
                <option value="">Any Technology</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
                <option value="c++">C++</option>
                <option value="ai">AI/ML</option>
              </select>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Subject Area</label>
              <select className="w-full p-2 rounded-lg border border-border/40 bg-background/50">
                <option value="">Any Subject</option>
                <option value="web">Web Development</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="database">Database Systems</option>
                <option value="security">Cybersecurity</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Project Duration</label>
              <select className="w-full p-2 rounded-lg border border-border/40 bg-background/50">
                <option value="">Any Duration</option>
                <option value="short">Short (1-2 weeks)</option>
                <option value="medium">Medium (3-6 weeks)</option>
                <option value="long">Long (7+ weeks)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSearch;