import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ThemeProvider } from '../components/theme-provider';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import FloatingAIBot from '../components/FloatingAIBot';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Search, Filter, Grid, List, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from './Index';
import Loading from '../components/Loading';

// Extended project data for the projects page - 45 projects total
const allProjects: Project[] = [
  // Page 1 (1-9)
  {
    id: 1,
    title: "Smart Home Dashboard",
    description: "A beautiful React dashboard for controlling IoT devices with real-time data visualization and responsive design.",
    icon: "🏠",
    tags: ["React", "IoT", "Dashboard"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800"],
    author: "Alex Chen",
    price: "$49"
  },
  {
    id: 2,
    title: "AI Study Companion",
    description: "An intelligent study assistant that uses machine learning to adapt to your learning style and schedule.",
    icon: "🤖",
    tags: ["AI", "Python", "Education"],
    images: ["https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800"],
    author: "Maya Patel",
    price: "$79"
  },
  {
    id: 3,
    title: "Eco-Tracker Mobile App",
    description: "Track your carbon footprint with this beautiful mobile app featuring gamification and social challenges.",
    icon: "🌱",
    tags: ["React Native", "Sustainability", "Mobile"],
    images: ["https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=800", "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800"],
    author: "Jordan Kim",
    price: "$35"
  },
  {
    id: 4,
    title: "Virtual Study Rooms",
    description: "Collaborative virtual spaces for students to study together with video chat, whiteboards, and resource sharing.",
    icon: "📚",
    tags: ["WebRTC", "Collaboration", "Education"],
    images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800"],
    author: "Sam Rodriguez",
    price: "$65"
  },
  {
    id: 5,
    title: "Blockchain Voting System",
    description: "Secure and transparent voting platform using blockchain technology with modern UI and real-time results.",
    icon: "🗳️",
    tags: ["Blockchain", "Security", "Web3"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"],
    author: "Taylor Swift",
    price: "$120"
  },
  {
    id: 6,
    title: "Social Recipe Sharing",
    description: "Connect food lovers worldwide with this recipe sharing platform featuring video tutorials and social features.",
    icon: "👨‍🍳",
    tags: ["Social", "Food", "Community"],
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800", "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800"],
    author: "Chef Maria",
    price: "$45"
  },
  {
    id: 7,
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce solution with payment integration, inventory management, and admin dashboard.",
    icon: "🛒",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"],
    author: "David Park",
    price: "$150"
  },
  {
    id: 8,
    title: "Real-Time Chat Application",
    description: "Modern chat application with real-time messaging, file sharing, and video calling capabilities.",
    icon: "💬",
    tags: ["Socket.io", "React", "WebRTC"],
    images: ["https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"],
    author: "Sarah Johnson",
    price: "$85"
  },
  {
    id: 9,
    title: "Fitness Tracking App",
    description: "Comprehensive fitness tracking with workout plans, nutrition tracking, and progress analytics.",
    icon: "💪",
    tags: ["React Native", "Health", "Analytics"],
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800"],
    author: "Mike Wilson",
    price: "$55"
  },
  
  // Page 2 (10-18)
  {
    id: 10,
    title: "Task Management System",
    description: "Enterprise-grade task management with team collaboration, time tracking, and project analytics.",
    icon: "📋",
    tags: ["Vue.js", "Express", "PostgreSQL"],
    images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800", "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800"],
    author: "Emma Davis",
    price: "$95"
  },
  {
    id: 11,
    title: "Weather Forecast Dashboard",
    description: "Beautiful weather dashboard with detailed forecasts, maps, and weather alerts.",
    icon: "🌤️",
    tags: ["Angular", "Weather API", "Maps"],
    images: ["https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800", "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800"],
    author: "James Lee",
    price: "$40"
  },
  {
    id: 12,
    title: "Learning Management System",
    description: "Complete LMS with course creation, student tracking, and interactive learning tools.",
    icon: "🎓",
    tags: ["Django", "React", "Education"],
    images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800", "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800"],
    author: "Lisa Wang",
    price: "$180"
  },
  {
    id: 13,
    title: "Cryptocurrency Portfolio Tracker",
    description: "Track and analyze your crypto investments with real-time prices and portfolio analytics.",
    icon: "💰",
    tags: ["React", "Crypto API", "Charts"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800"],
    author: "Chris Lee",
    price: "$75"
  },
  {
    id: 14,
    title: "Travel Planning App",
    description: "Complete travel companion with itinerary planning, booking integration, and expense tracking.",
    icon: "✈️",
    tags: ["React Native", "Travel", "Maps"],
    images: ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800", "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800"],
    author: "Anna Thompson",
    price: "$90"
  },
  {
    id: 15,
    title: "Stock Market Analytics",
    description: "Advanced stock market analysis platform with technical indicators and trading signals.",
    icon: "📊",
    tags: ["Python", "Finance", "ML"],
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800"],
    author: "Robert Chen",
    price: "$130"
  },
  {
    id: 16,
    title: "Music Streaming Platform",
    description: "Full-featured music streaming service with playlists, recommendations, and social features.",
    icon: "🎵",
    tags: ["React", "Node.js", "Audio"],
    images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800"],
    author: "Elena Rodriguez",
    price: "$110"
  },
  {
    id: 17,
    title: "Restaurant Management System",
    description: "Complete restaurant POS system with ordering, inventory, and analytics dashboard.",
    icon: "🍽️",
    tags: ["Vue.js", "Restaurant", "POS"],
    images: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"],
    author: "Marco Italian",
    price: "$160"
  },
  {
    id: 18,
    title: "Social Media Analytics",
    description: "Comprehensive social media monitoring and analytics platform with sentiment analysis.",
    icon: "📱",
    tags: ["React", "Analytics", "AI"],
    images: ["https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800", "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800"],
    author: "Sophie Marketing",
    price: "$95"
  },

  // Page 3 (19-27)
  {
    id: 19,
    title: "Video Conference Platform",
    description: "Enterprise video conferencing solution with screen sharing, recording, and collaboration tools.",
    icon: "📹",
    tags: ["WebRTC", "React", "Collaboration"],
    images: ["https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800", "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=800"],
    author: "Tech Team",
    price: "$140"
  },
  {
    id: 20,
    title: "Customer Support Chatbot",
    description: "AI-powered customer support system with natural language processing and ticket management.",
    icon: "🤖",
    tags: ["AI", "NLP", "Support"],
    images: ["https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800", "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"],
    author: "AI Solutions",
    price: "$105"
  },
  {
    id: 21,
    title: "Event Management Platform",
    description: "Complete event planning and management system with ticketing, scheduling, and analytics.",
    icon: "🎪",
    tags: ["React", "Events", "Ticketing"],
    images: ["https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"],
    author: "Event Pro",
    price: "$125"
  },
  {
    id: 22,
    title: "Digital Wallet App",
    description: "Secure digital wallet with contactless payments, budgeting tools, and transaction history.",
    icon: "💳",
    tags: ["React Native", "Fintech", "Security"],
    images: ["https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"],
    author: "FinTech Dev",
    price: "$85"
  },
  {
    id: 23,
    title: "Property Management System",
    description: "Real estate management platform with tenant management, maintenance tracking, and rent collection.",
    icon: "🏢",
    tags: ["Vue.js", "Real Estate", "Management"],
    images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"],
    author: "Property Pro",
    price: "$170"
  },
  {
    id: 24,
    title: "Online Code Editor",
    description: "Web-based IDE with syntax highlighting, real-time collaboration, and code execution.",
    icon: "💻",
    tags: ["React", "Code Editor", "Collaboration"],
    images: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800", "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800"],
    author: "Code Master",
    price: "$115"
  },
  {
    id: 25,
    title: "Inventory Management",
    description: "Advanced inventory tracking system with barcode scanning, alerts, and analytics.",
    icon: "📦",
    tags: ["Angular", "Inventory", "Analytics"],
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"],
    author: "Inventory Inc",
    price: "$100"
  },
  {
    id: 26,
    title: "Dating App Platform",
    description: "Modern dating application with matching algorithms, chat features, and video calls.",
    icon: "💕",
    tags: ["React Native", "Social", "Dating"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"],
    author: "Love Tech",
    price: "$95"
  },
  {
    id: 27,
    title: "News Aggregator",
    description: "Personalized news platform with AI-powered recommendations and social sharing features.",
    icon: "📰",
    tags: ["React", "News", "AI"],
    images: ["https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800", "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800"],
    author: "News Tech",
    price: "$70"
  },

  // Page 4 (28-36)
  {
    id: 28,
    title: "Telemedicine Platform",
    description: "Healthcare platform with video consultations, prescription management, and patient records.",
    icon: "🏥",
    tags: ["React", "Healthcare", "Telemedicine"],
    images: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800"],
    author: "HealthTech",
    price: "$200"
  },
  {
    id: 29,
    title: "Smart Parking System",
    description: "IoT-based parking management with real-time availability, booking, and payment integration.",
    icon: "🅿️",
    tags: ["IoT", "React", "Smart City"],
    images: ["https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"],
    author: "Smart City",
    price: "$120"
  },
  {
    id: 30,
    title: "Language Learning App",
    description: "Interactive language learning platform with speech recognition, games, and progress tracking.",
    icon: "🗣️",
    tags: ["React Native", "Education", "AI"],
    images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800", "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800"],
    author: "LinguaTech",
    price: "$80"
  },
  {
    id: 31,
    title: "Agricultural Monitoring",
    description: "Smart farming solution with IoT sensors, crop monitoring, and yield prediction analytics.",
    icon: "🚜",
    tags: ["IoT", "Agriculture", "Analytics"],
    images: ["https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800", "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800"],
    author: "AgriTech",
    price: "$150"
  },
  {
    id: 32,
    title: "Virtual Reality Showroom",
    description: "Immersive VR shopping experience with 3D product visualization and virtual try-on.",
    icon: "🥽",
    tags: ["VR", "Three.js", "E-commerce"],
    images: ["https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800", "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800"],
    author: "VR Commerce",
    price: "$220"
  },
  {
    id: 33,
    title: "Expense Tracking App",
    description: "Personal finance management with expense categorization, budgets, and financial insights.",
    icon: "💸",
    tags: ["React Native", "Finance", "Personal"],
    images: ["https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800", "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800"],
    author: "Finance Guru",
    price: "$60"
  },
  {
    id: 34,
    title: "Food Delivery Platform",
    description: "Complete food ordering and delivery system with restaurant management and real-time tracking.",
    icon: "🍕",
    tags: ["React", "Food", "Delivery"],
    images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"],
    author: "Food Tech",
    price: "$175"
  },
  {
    id: 35,
    title: "Document Management",
    description: "Enterprise document storage and collaboration platform with version control and search.",
    icon: "📄",
    tags: ["React", "Document", "Enterprise"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"],
    author: "DocuTech",
    price: "$135"
  },
  {
    id: 36,
    title: "Gaming Leaderboard",
    description: "Competitive gaming platform with tournaments, rankings, and prize management.",
    icon: "🎮",
    tags: ["React", "Gaming", "Competition"],
    images: ["https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800", "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"],
    author: "Game Master",
    price: "$90"
  },

  // Page 5 (37-45)
  {
    id: 37,
    title: "Hotel Booking System",
    description: "Complete hotel reservation platform with room management, booking engine, and guest services.",
    icon: "🏨",
    tags: ["React", "Hospitality", "Booking"],
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800"],
    author: "Hotel Tech",
    price: "$190"
  },
  {
    id: 38,
    title: "Meditation & Wellness App",
    description: "Mindfulness app with guided meditations, mood tracking, and wellness insights.",
    icon: "🧘",
    tags: ["React Native", "Wellness", "Health"],
    images: ["https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"],
    author: "Wellness Co",
    price: "$65"
  },
  {
    id: 39,
    title: "Job Portal Platform",
    description: "Professional job search platform with AI matching, resume builder, and company profiles.",
    icon: "💼",
    tags: ["React", "Jobs", "AI"],
    images: ["https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"],
    author: "Career Hub",
    price: "$145"
  },
  {
    id: 40,
    title: "Smart Energy Monitor",
    description: "IoT energy monitoring system with usage analytics, cost optimization, and sustainability metrics.",
    icon: "⚡",
    tags: ["IoT", "Energy", "Analytics"],
    images: ["https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"],
    author: "EnergyTech",
    price: "$110"
  },
  {
    id: 41,
    title: "Car Rental Platform",
    description: "Vehicle rental marketplace with booking, fleet management, and GPS tracking.",
    icon: "🚗",
    tags: ["React", "Rental", "GPS"],
    images: ["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800", "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800"],
    author: "Auto Rental",
    price: "$155"
  },
  {
    id: 42,
    title: "Pet Care Management",
    description: "Comprehensive pet care app with health records, appointment scheduling, and care reminders.",
    icon: "🐕",
    tags: ["React Native", "Pet Care", "Health"],
    images: ["https://images.unsplash.com/photo-1544568100-847a948585b9?w=800", "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800"],
    author: "Pet Tech",
    price: "$75"
  },
  {
    id: 43,
    title: "Auction Platform",
    description: "Online auction system with real-time bidding, payment processing, and seller management.",
    icon: "🔨",
    tags: ["React", "Auction", "Real-time"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"],
    author: "Auction Pro",
    price: "$165"
  },
  {
    id: 44,
    title: "Photography Portfolio",
    description: "Professional photography showcase platform with galleries, client proofing, and booking system.",
    icon: "📸",
    tags: ["React", "Photography", "Portfolio"],
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"],
    author: "Photo Pro",
    price: "$85"
  },
  {
    id: 45,
    title: "Subscription Management",
    description: "Advanced subscription billing platform with recurring payments, analytics, and customer portal.",
    icon: "🔄",
    tags: ["React", "Billing", "SaaS"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800"],
    author: "SubTech",
    price: "$195"
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const projectsPerPage = 9;
  // Extended categories to match solution categories
  const categories = [
    'All', 'React', 'AI', 'Mobile', 'Blockchain', 'Education', 'Social', 'Health', 'Security', 'IoT', 'Finance',
    'Node.js', 'Cloud', 'Design', 'Collaboration', 'Integration', 'Performance', 'Custom'
  ];

  // Set initial category from URL parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredProjects = useMemo(() => {
    let filtered = allProjects;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project =>
        project.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
    }

    // Sort projects
    switch (sortBy) {
      case 'price-low':
        filtered = filtered.sort((a, b) => parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', '')));
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => parseInt(b.price.replace('$', '')) - parseInt(a.price.replace('$', '')));
        break;
      case 'title':
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // newest (default order)
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleSearch = (term: string) => {
    setIsSearching(true);
    setSearchTerm(term);
    setCurrentPage(1);

    // Balanced search simulation - 600ms
    setTimeout(() => {
      setIsSearching(false);
    }, 600);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  // Get category display name for the header
  const getCategoryDisplayName = () => {
    if (selectedCategory === 'All') return 'All Projects';
    return `${selectedCategory} Projects`;
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="brainybox-theme">
      <div className="min-h-screen bg-background">
        <Header />

        {/* Projects Header */}
        <section className="pt-20 pb-8 px-6 bg-gradient-to-br from-coral/5 to-raspberry/5 dark:from-coral/10 dark:to-raspberry/10">
          <div className="max-w-7xl mx-auto">
            {/* Back to Home Button */}
            <div className="mb-6">
              <Button
                onClick={handleBackToHome}
                variant="outline"
                className="bg-background/80 backdrop-blur-md border border-border/40 hover:bg-background/90 hover:border-border/60 transition-all duration-300 group pt-5"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300 " />
                Back to Home
              </Button>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground dark:text-foreground">
                <span className="bg-gradient-to-r from-coral to-raspberry bg-clip-text text-transparent">
                  {getCategoryDisplayName()}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground dark:text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {selectedCategory === 'All' 
                  ? "Explore our complete collection of premium projects. Find the perfect solution for your next development project."
                  : `Discover amazing ${selectedCategory.toLowerCase()} projects from talented creators. Find inspiration for your next big idea.`
                }
              </p>
              
              {/* Category Badge */}
              {selectedCategory !== 'All' && (
                <div className="inline-flex items-center gap-2 bg-coral/20 dark:bg-coral/30 border border-coral/40 px-4 py-2 rounded-full mt-4 text-sm font-semibold text-coral">
                  <span>🎯</span>
                  <span>Filtered by: {selectedCategory}</span>
                  <button 
                    onClick={() => setSelectedCategory('All')}
                    className="ml-2 hover:bg-coral/30 rounded-full p-1 transition-colors duration-200"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Search and Filters */}
            <div className="bg-background/80 dark:bg-background/90 backdrop-blur-md rounded-3xl p-6 border border-border/40 dark:border-border/30">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/40 dark:border-border/30 bg-background/50 dark:bg-background/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/50 transition-all duration-300"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-border/40 dark:border-border/30 bg-background/50 dark:bg-background/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/50 transition-all duration-300"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-border/40 dark:border-border/30 bg-background/50 dark:bg-background/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/50 transition-all duration-300"
                >
                  <option value="newest">Newest First</option>
                  <option value="title">Alphabetical</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                {/* View Toggle */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="flex-1"
                  >
                    <Grid className="w-5 h-5" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="flex-1"
                  >
                    <List className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Results Count and Pagination Info */}
              <div className="flex flex-col sm:flex-row justify-between items-center text-muted-foreground dark:text-muted-foreground">
                <div>
                  Showing {startIndex + 1}-{Math.min(startIndex + projectsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
                </div>
                <div>
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            {currentProjects.length > 0 ? (
              <>
                <div className={`grid gap-6 sm:gap-8 ${viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 lg:grid-cols-2'
                  }`}>
                  {currentProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-16 space-x-2">
                    {/* Previous Button */}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="bg-background/80 backdrop-blur-md border border-border/40 hover:bg-background/90 hover:border-border/60 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>

                    {/* Page Numbers */}
                    {generatePageNumbers().map((page, index) => (
                      <div key={index}>
                        {page === '...' ? (
                          <span className="px-3 py-2 text-muted-foreground">...</span>
                        ) : (
                          <Button
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="icon"
                            onClick={() => handlePageChange(page as number)}
                            className={`${currentPage === page
                              ? 'bg-gradient-to-r from-coral to-raspberry text-white'
                              : 'bg-background/80 backdrop-blur-md border border-border/40 hover:bg-background/90 hover:border-border/60'
                            }`}
                          >
                            {page}
                          </Button>
                        )}
                      </div>
                    ))}

                    {/* Next Button */}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="bg-background/80 backdrop-blur-md border border-border/40 hover:bg-background/90 hover:border-border/60 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-foreground dark:text-foreground mb-4">
                  No projects found
                </h3>
                <p className="text-muted-foreground dark:text-muted-foreground mb-8">
                  Try adjusting your search criteria or filters to find more projects.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setCurrentPage(1);
                  }}
                  className="bg-gradient-to-r from-coral to-raspberry hover:from-coral/90 hover:to-raspberry/90 text-white px-8 py-3 rounded-xl"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Loading Indicator */}
            {isSearching && (
              <div className="flex justify-center py-8">
                <Loading size="md" type="dots" text="Searching projects..." />
              </div>
            )}
          </div>
        </section>

        <Footer />

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
        <FloatingAIBot />
      </div>
    </ThemeProvider>
  );
};

export default Projects;