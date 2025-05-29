import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../components/theme-provider';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import Footer from '../components/Footer';
import EnhancedAIBot from '../components/EnhancedAIBot';
import SmartSearch from '../components/SmartSearch';
import MetaTags from '../components/SEO/MetaTags';
import StructuredData from '../components/SEO/StructuredData';
import LazyImage from '../components/Performance/LazyImage';
import { Button } from '@/components/ui/button';
import { Filter, Grid, List, ArrowLeft, ChevronLeft, ChevronRight, Zap, Search } from 'lucide-react';
import { Project } from './Index';
import Loading from '../components/Loading';

// Extended project data - 150+ academic projects total
const allProjects: Project[] = [
  // PPS (Programming for Problem Solving) - 25 Projects
  {
    id: 1,
    title: "Student Grade Calculator",
    description: "Comprehensive C program for calculating student grades with multiple subjects, GPA calculation, and statistical analysis including mean, median, and grade distribution.",
    icon: "🎓",
    tags: ["PPS", "C Programming", "Problem Solving"],
    images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"]
  },
  {
    id: 2,
    title: "ATM Simulation System",
    description: "C programming project simulating ATM operations including account management, balance inquiry, cash withdrawal, deposit, and transaction history.",
    icon: "🏧",
    tags: ["PPS", "Simulation", "C Programming"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 3,
    title: "Traffic Light Controller",
    description: "Embedded C programming project for controlling traffic lights with timing algorithms, emergency vehicle detection, and adaptive signal control.",
    icon: "🚦",
    tags: ["PPS", "Embedded", "C Programming"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800"]
  },
  {
    id: 4,
    title: "Calculator with Scientific Functions",
    description: "Advanced C calculator implementing basic arithmetic, trigonometric functions, logarithms, and memory operations with error handling.",
    icon: "🔢",
    tags: ["PPS", "Mathematics", "C Programming"],
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800"]
  },
  {
    id: 5,
    title: "File Management System",
    description: "C programming project for file operations including directory management, file compression utilities, and file encryption/decryption.",
    icon: "📁",
    tags: ["PPS", "File System", "Utilities"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"]
  },
  {
    id: 6,
    title: "Number System Converter",
    description: "C program for converting numbers between different bases (binary, octal, decimal, hexadecimal) with validation and error checking.",
    icon: "🔄",
    tags: ["PPS", "Number Systems", "C Programming"],
    images: ["https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"]
  },
  {
    id: 7,
    title: "Temperature Monitoring System",
    description: "IoT-based temperature monitoring using C programming with sensor data collection, alerts, and data logging capabilities.",
    icon: "🌡️",
    tags: ["PPS", "IoT", "Sensors"],
    images: ["https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"]
  },
  {
    id: 8,
    title: "Pattern Printing Programs",
    description: "Collection of C programs for printing various patterns including pyramids, diamonds, and number patterns with customizable dimensions.",
    icon: "🔶",
    tags: ["PPS", "Patterns", "Logic"],
    images: ["https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800", "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800"]
  },
  {
    id: 9,
    title: "Matrix Operations Calculator",
    description: "C program implementing matrix operations including addition, multiplication, transpose, determinant calculation, and inverse matrix.",
    icon: "🔢",
    tags: ["PPS", "Mathematics", "Matrices"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800"]
  },
  {
    id: 10,
    title: "String Manipulation Toolkit",
    description: "Comprehensive C library for string operations including palindrome check, string reversal, word count, and pattern matching.",
    icon: "📝",
    tags: ["PPS", "Strings", "Text Processing"],
    images: ["https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800", "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800"]
  },
  {
    id: 11,
    title: "Simple Banking System",
    description: "C programming project for basic banking operations including account creation, money transfer, balance inquiry, and transaction logs.",
    icon: "🏦",
    tags: ["PPS", "Banking", "Data Management"],
    images: ["https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"]
  },
  {
    id: 12,
    title: "Lottery Number Generator",
    description: "Random number generator for lottery systems with probability calculations, number validation, and historical analysis features.",
    icon: "🎰",
    tags: ["PPS", "Random Numbers", "Probability"],
    images: ["https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },
  {
    id: 13,
    title: "Employee Payroll System",
    description: "C program for calculating employee salaries with overtime, deductions, tax calculations, and payslip generation.",
    icon: "💰",
    tags: ["PPS", "Payroll", "HR Management"],
    images: ["https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800", "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800"]
  },
  {
    id: 14,
    title: "Library Book Catalog",
    description: "Simple library management using C with book search, add/remove functionality, and basic cataloging system.",
    icon: "📚",
    tags: ["PPS", "Library", "Catalog Management"],
    images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800", "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800"]
  },
  {
    id: 15,
    title: "Digital Clock Display",
    description: "C program creating a digital clock with alarm functionality, time formatting options, and timezone support.",
    icon: "🕐",
    tags: ["PPS", "Time Management", "Display"],
    images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800", "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800"]
  },
  {
    id: 16,
    title: "Student Record Management",
    description: "C programming project for managing student records including marks entry, grade calculation, and report generation.",
    icon: "📊",
    tags: ["PPS", "Student Management", "Records"],
    images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800", "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800"]
  },
  {
    id: 17,
    title: "Unit Converter Application",
    description: "Multi-purpose unit converter for length, weight, temperature, and currency with accurate conversion formulas.",
    icon: "⚖️",
    tags: ["PPS", "Conversion", "Utilities"],
    images: ["https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800", "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800"]
  },
  {
    id: 18,
    title: "Password Generator",
    description: "Secure password generator with customizable length, character sets, and strength validation using C programming.",
    icon: "🔐",
    tags: ["PPS", "Security", "Password Generation"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 19,
    title: "Simple Voting System",
    description: "Electronic voting system implementation in C with candidate management, vote counting, and result declaration.",
    icon: "🗳️",
    tags: ["PPS", "Voting", "Democracy"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800"]
  },
  {
    id: 20,
    title: "Maze Solver Algorithm",
    description: "C implementation of maze solving algorithms including backtracking and shortest path finding with visualization.",
    icon: "🌀",
    tags: ["PPS", "Algorithms", "Pathfinding"],
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },
  {
    id: 21,
    title: "Contact Directory System",
    description: "Personal contact management system in C with add, search, edit, delete functionalities and phone number validation.",
    icon: "📞",
    tags: ["PPS", "Contact Management", "Directory"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },
  {
    id: 22,
    title: "Game Score Tracker",
    description: "C program for tracking game scores, player statistics, leaderboards, and performance analytics.",
    icon: "🎮",
    tags: ["PPS", "Gaming", "Statistics"],
    images: ["https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800", "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"]
  },
  {
    id: 23,
    title: "Text Encoder/Decoder",
    description: "C implementation of various text encoding schemes including Caesar cipher, Base64, and custom encryption algorithms.",
    icon: "🔤",
    tags: ["PPS", "Cryptography", "Text Processing"],
    images: ["https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800", "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800"]
  },
  {
    id: 24,
    title: "Prime Number Generator",
    description: "Efficient C program for generating prime numbers using Sieve of Eratosthenes with optimization techniques.",
    icon: "🔢",
    tags: ["PPS", "Mathematics", "Prime Numbers"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800"]
  },
  {
    id: 25,
    title: "Calendar Application",
    description: "C programming project for calendar display with event scheduling, reminder system, and date calculations.",
    icon: "📅",
    tags: ["PPS", "Calendar", "Date Management"],
    images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800", "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800"]
  },

  // OODP (Object-Oriented Design & Programming) - 25 Projects
  {
    id: 26,
    title: "Library Management System",
    description: "Complete object-oriented library management with book tracking, member management, fine calculation, and reservation system using C++.",
    icon: "📚",
    tags: ["OODP", "C++", "OOP"],
    images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800", "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800"]
  },
  {
    id: 27,
    title: "Hospital Management System",
    description: "Object-oriented design for hospital management with patient records, appointment scheduling, billing, and doctor management.",
    icon: "🏥",
    tags: ["OODP", "Healthcare", "C++"],
    images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800", "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800"]
  },
  {
    id: 28,
    title: "Vehicle Management System",
    description: "Object-oriented vehicle rental system demonstrating inheritance, polymorphism, and encapsulation with different vehicle types.",
    icon: "🚗",
    tags: ["OODP", "Vehicle", "OOP"],
    images: ["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800", "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800"]
  },
  {
    id: 29,
    title: "Game Development Engine",
    description: "Object-oriented game engine with physics simulation, graphics rendering, collision detection, and modular architecture.",
    icon: "🎮",
    tags: ["OODP", "Game Engine", "Graphics"],
    images: ["https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800", "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"]
  },
  {
    id: 30,
    title: "Banking System with Polymorphism",
    description: "Advanced C++ banking system demonstrating polymorphism with different account types and transaction processing.",
    icon: "🏦",
    tags: ["OODP", "Banking", "Polymorphism"],
    images: ["https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"]
  },
  {
    id: 31,
    title: "Student Information System",
    description: "Object-oriented student management with inheritance hierarchy for different student types and academic tracking.",
    icon: "🎓",
    tags: ["OODP", "Education", "Inheritance"],
    images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"]
  },
  {
    id: 32,
    title: "Shopping Cart System",
    description: "E-commerce shopping cart implementation using OOP principles with product catalog, cart management, and order processing.",
    icon: "🛒",
    tags: ["OODP", "E-commerce", "Shopping"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 33,
    title: "Employee Management System",
    description: "HR management system with class hierarchy for different employee types, payroll processing, and performance tracking.",
    icon: "👥",
    tags: ["OODP", "HR", "Employee Management"],
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"]
  },
  {
    id: 34,
    title: "Shape Calculator with Inheritance",
    description: "Geometric shape calculator demonstrating inheritance and virtual functions for area and perimeter calculations.",
    icon: "🔷",
    tags: ["OODP", "Geometry", "Virtual Functions"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },
  {
    id: 35,
    title: "Media Player Application",
    description: "Object-oriented media player with support for different file formats using polymorphism and factory patterns.",
    icon: "🎵",
    tags: ["OODP", "Media", "Design Patterns"],
    images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800"]
  },
  {
    id: 36,
    title: "Inventory Management with Templates",
    description: "Template-based inventory system demonstrating generic programming and STL usage in C++.",
    icon: "📦",
    tags: ["OODP", "Templates", "Generic Programming"],
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"]
  },
  {
    id: 37,
    title: "Animal Classification System",
    description: "Biological classification system using inheritance hierarchy with mammals, birds, and reptiles classes.",
    icon: "🐾",
    tags: ["OODP", "Biology", "Classification"],
    images: ["https://images.unsplash.com/photo-1544568100-847a948585b9?w=800", "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800"]
  },
  {
    id: 38,
    title: "Text Editor with OOP",
    description: "Feature-rich text editor implementing command pattern, observer pattern, and file handling using C++.",
    icon: "📝",
    tags: ["OODP", "Text Editor", "Command Pattern"],
    images: ["https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800", "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800"]
  },
  {
    id: 39,
    title: "Restaurant Ordering System",
    description: "Object-oriented restaurant management with menu management, order processing, and billing system.",
    icon: "🍽️",
    tags: ["OODP", "Restaurant", "Order Management"],
    images: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"]
  },
  {
    id: 40,
    title: "File Compression Tool",
    description: "Object-oriented file compression utility with different compression algorithms and archive management.",
    icon: "🗜️",
    tags: ["OODP", "File Compression", "Algorithms"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"]
  },
  {
    id: 41,
    title: "Calculator with Operator Overloading",
    description: "Advanced calculator demonstrating operator overloading for complex numbers and matrix operations.",
    icon: "🧮",
    tags: ["OODP", "Operator Overloading", "Mathematics"],
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800"]
  },
  {
    id: 42,
    title: "Chess Game Implementation",
    description: "Complete chess game using OOP with piece hierarchy, move validation, and game state management.",
    icon: "♟️",
    tags: ["OODP", "Chess", "Game Logic"],
    images: ["https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800", "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800"]
  },
  {
    id: 43,
    title: "Book Store Management",
    description: "Bookstore management system with book catalog, customer management, and sales tracking using OOP principles.",
    icon: "📖",
    tags: ["OODP", "Bookstore", "Sales Management"],
    images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"]
  },
  {
    id: 44,
    title: "Smart Home Automation",
    description: "IoT-based home automation system using C++ with device hierarchy and remote control capabilities.",
    icon: "🏠",
    tags: ["OODP", "IoT", "Home Automation"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800"]
  },
  {
    id: 45,
    title: "Graphics Drawing Application",
    description: "2D graphics drawing tool with shape hierarchy, drawing primitives, and design patterns implementation.",
    icon: "🎨",
    tags: ["OODP", "Graphics", "Drawing"],
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"]
  },
  {
    id: 46,
    title: "Music Streaming System",
    description: "Object-oriented music streaming platform with playlist management, user profiles, and recommendation engine.",
    icon: "🎧",
    tags: ["OODP", "Music Streaming", "Entertainment"],
    images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800"]
  },
  {
    id: 47,
    title: "Ticket Booking System",
    description: "Event ticket booking system with seat selection, payment processing, and customer management using OOP.",
    icon: "🎫",
    tags: ["OODP", "Ticketing", "Event Management"],
    images: ["https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"]
  },
  {
    id: 48,
    title: "Scientific Calculator Advanced",
    description: "Advanced scientific calculator with expression parsing, function evaluation, and graph plotting capabilities.",
    icon: "🔬",
    tags: ["OODP", "Scientific Computing", "Mathematics"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800"]
  },
  {
    id: 49,
    title: "Weather Monitoring Station",
    description: "Weather data collection and analysis system with sensor integration and forecasting algorithms.",
    icon: "🌤️",
    tags: ["OODP", "Weather", "Data Analysis"],
    images: ["https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800", "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800"]
  },
  {
    id: 50,
    title: "Travel Booking Platform",
    description: "Comprehensive travel booking system with flight, hotel, and car rental management using object-oriented design.",
    icon: "✈️",
    tags: ["OODP", "Travel", "Booking Management"],
    images: ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800", "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800"]
  },

  // APP (Advanced Programming Practice) - 25 Projects
  {
    id: 51,
    title: "Banking System Application",
    description: "Enterprise-grade Java banking application with GUI, database connectivity, transaction processing, and security features.",
    icon: "🏦",
    tags: ["APP", "Java", "GUI"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 52,
    title: "Inventory Management System",
    description: "Advanced Java application with database connectivity for warehouse management, stock tracking, and automated reordering.",
    icon: "📦",
    tags: ["APP", "Java", "Database"],
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"]
  },
  {
    id: 53,
    title: "Stock Trading Application",
    description: "Real-time stock trading platform with market data processing, portfolio management, and risk analysis.",
    icon: "📈",
    tags: ["APP", "Trading", "Real-time"],
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800"]
  },
  {
    id: 54,
    title: "Banking Desktop Application",
    description: "Multi-threaded Java Swing application for banking operations with concurrent transaction processing.",
    icon: "🏧",
    tags: ["APP", "Banking", "Desktop"],
    images: ["https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"]
  },
  {
    id: 55,
    title: "Enterprise Resource Planning",
    description: "Large-scale Java ERP system with modules for finance, HR, inventory, and customer relationship management.",
    icon: "🏢",
    tags: ["APP", "Enterprise", "ERP"],
    images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"]
  },
  {
    id: 56,
    title: "Hotel Management System",
    description: "Complete hotel management solution with reservation system, billing, housekeeping, and guest services.",
    icon: "🏨",
    tags: ["APP", "Hospitality", "Management"],
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800"]
  },
  {
    id: 57,
    title: "Point of Sale System",
    description: "Retail POS system with inventory tracking, customer management, sales reporting, and barcode scanning.",
    icon: "🛍️",
    tags: ["APP", "Retail", "POS"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800"]
  },
  {
    id: 58,
    title: "Student Management Portal",
    description: "Comprehensive student information system with academic tracking, fee management, and parent portal.",
    icon: "🎓",
    tags: ["APP", "Education", "Management"],
    images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"]
  },
  {
    id: 59,
    title: "Healthcare Management System",
    description: "Medical practice management with patient records, appointment scheduling, billing, and prescription management.",
    icon: "⚕️",
    tags: ["APP", "Healthcare", "Medical"],
    images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800", "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800"]
  },
  {
    id: 60,
    title: "Library Automation System",
    description: "Advanced library management with RFID integration, digital catalog, fine management, and user analytics.",
    icon: "📚",
    tags: ["APP", "Library", "Automation"],
    images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800", "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800"]
  },
  {
    id: 61,
    title: "Customer Relationship Management",
    description: "CRM system for managing customer interactions, sales pipeline, marketing campaigns, and analytics.",
    icon: "👥",
    tags: ["APP", "CRM", "Sales"],
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"]
  },
  {
    id: 62,
    title: "Payroll Management System",
    description: "Enterprise payroll processing with tax calculations, benefit management, and compliance reporting.",
    icon: "💰",
    tags: ["APP", "Payroll", "HR"],
    images: ["https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800", "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800"]
  },
  {
    id: 63,
    title: "Fleet Management System",
    description: "Vehicle fleet tracking and management with GPS integration, maintenance scheduling, and fuel monitoring.",
    icon: "🚛",
    tags: ["APP", "Fleet Management", "GPS"],
    images: ["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800", "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800"]
  },
  {
    id: 64,
    title: "Event Management Platform",
    description: "Complete event planning and management system with venue booking, catering, and attendee management.",
    icon: "🎪",
    tags: ["APP", "Event Management", "Planning"],
    images: ["https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"]
  },
  {
    id: 65,
    title: "Project Management Tool",
    description: "Agile project management with task tracking, team collaboration, time logging, and progress reporting.",
    icon: "📋",
    tags: ["APP", "Project Management", "Collaboration"],
    images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800", "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800"]
  },
  {
    id: 66,
    title: "Document Management System",
    description: "Enterprise document storage and management with version control, search functionality, and access control.",
    icon: "📄",
    tags: ["APP", "Document Management", "Enterprise"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"]
  },
  {
    id: 67,
    title: "Asset Management System",
    description: "IT asset tracking and management with depreciation calculations, maintenance schedules, and audit trails.",
    icon: "🖥️",
    tags: ["APP", "Asset Management", "IT"],
    images: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800", "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800"]
  },
  {
    id: 68,
    title: "Supply Chain Management",
    description: "End-to-end supply chain management with vendor management, procurement, and logistics tracking.",
    icon: "🚚",
    tags: ["APP", "Supply Chain", "Logistics"],
    images: ["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"]
  },
  {
    id: 69,
    title: "Insurance Management System",
    description: "Insurance policy management with claims processing, premium calculations, and customer service portal.",
    icon: "🛡️",
    tags: ["APP", "Insurance", "Claims"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 70,
    title: "Real Estate Management",
    description: "Property management system with tenant management, rent collection, maintenance tracking, and reporting.",
    icon: "🏠",
    tags: ["APP", "Real Estate", "Property"],
    images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"]
  },
  {
    id: 71,
    title: "Conference Management System",
    description: "Academic conference management with paper submission, peer review, scheduling, and registration.",
    icon: "🎤",
    tags: ["APP", "Conference", "Academic"],
    images: ["https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800", "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800"]
  },
  {
    id: 72,
    title: "Examination Management System",
    description: "Online examination platform with question banks, automated grading, anti-cheating measures, and analytics.",
    icon: "📝",
    tags: ["APP", "Examination", "Online Testing"],
    images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800", "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800"]
  },
  {
    id: 73,
    title: "Parking Management System",
    description: "Smart parking management with slot allocation, payment processing, and real-time availability tracking.",
    icon: "🅿️",
    tags: ["APP", "Parking", "Smart City"],
    images: ["https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"]
  },
  {
    id: 74,
    title: "Workflow Management System",
    description: "Business process automation with workflow designer, task assignment, and performance monitoring.",
    icon: "⚙️",
    tags: ["APP", "Workflow", "Automation"],
    images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800", "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800"]
  },
  {
    id: 75,
    title: "Complaint Management Portal",
    description: "Customer complaint tracking and resolution system with SLA management and escalation procedures.",
    icon: "📞",
    tags: ["APP", "Customer Service", "Support"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },

  // DSA (Data Structures & Algorithms) - 25 Projects
  {
    id: 76,
    title: "Binary Search Tree Visualizer",
    description: "Interactive visualization tool for BST operations including insertion, deletion, traversal, and balancing with step-by-step execution.",
    icon: "🌳",
    tags: ["DSA", "Algorithms", "Data Structures"],
    images: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800", "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800"]
  },
  {
    id: 77,
    title: "Sorting Algorithm Visualizer",
    description: "Interactive demonstration of various sorting algorithms with time complexity analysis and performance comparison.",
    icon: "📊",
    tags: ["DSA", "Algorithms", "Visualization"],
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800"]
  },
  {
    id: 78,
    title: "Graph Algorithms Simulator",
    description: "Implementation of graph algorithms including Dijkstra, BFS, DFS, and MST with interactive visualization.",
    icon: "🔗",
    tags: ["DSA", "Graph", "Algorithms"],
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800", "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800"]
  },
  {
    id: 79,
    title: "Dynamic Programming Solutions",
    description: "Collection of dynamic programming problems with optimal solutions and space-time complexity analysis.",
    icon: "⚡",
    tags: ["DSA", "Dynamic Programming", "Optimization"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800"]
  },
  {
    id: 80,
    title: "Hash Table Implementation",
    description: "Custom hash table with collision resolution strategies including chaining and open addressing.",
    icon: "🔐",
    tags: ["DSA", "Hash Tables", "Data Structures"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"]
  },
  {
    id: 81,
    title: "Heap and Priority Queue",
    description: "Implementation of heap data structure with priority queue operations and heap sort algorithm.",
    icon: "⛰️",
    tags: ["DSA", "Heap", "Priority Queue"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800"]
  },
  {
    id: 82,
    title: "AVL Tree Implementation",
    description: "Self-balancing binary search tree with rotation operations and balance factor maintenance.",
    icon: "🌲",
    tags: ["DSA", "AVL Tree", "Self-Balancing"],
    images: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },
  {
    id: 83,
    title: "String Matching Algorithms",
    description: "Implementation of pattern matching algorithms including KMP, Boyer-Moore, and Rabin-Karp.",
    icon: "🔍",
    tags: ["DSA", "String Algorithms", "Pattern Matching"],
    images: ["https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800", "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800"]
  },
  {
    id: 84,
    title: "Linked List Operations",
    description: "Comprehensive linked list implementation with singly, doubly, and circular linked lists.",
    icon: "🔗",
    tags: ["DSA", "Linked Lists", "Linear Data Structures"],
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },
  {
    id: 85,
    title: "Stack and Queue Applications",
    description: "Practical applications of stacks and queues including expression evaluation and process scheduling.",
    icon: "📚",
    tags: ["DSA", "Stack", "Queue"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800"]
  },
  {
    id: 86,
    title: "Trie Data Structure",
    description: "Prefix tree implementation for efficient string storage and retrieval with autocomplete functionality.",
    icon: "🌿",
    tags: ["DSA", "Trie", "String Storage"],
    images: ["https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800", "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"]
  },
  {
    id: 87,
    title: "Segment Tree Implementation",
    description: "Range query data structure for efficient sum, minimum, and maximum queries with updates.",
    icon: "📊",
    tags: ["DSA", "Segment Tree", "Range Queries"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800"]
  },
  {
    id: 88,
    title: "Backtracking Algorithms",
    description: "Collection of backtracking problems including N-Queens, Sudoku solver, and maze solving.",
    icon: "🧩",
    tags: ["DSA", "Backtracking", "Problem Solving"],
    images: ["https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800", "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800"]
  },
  {
    id: 89,
    title: "Greedy Algorithm Solutions",
    description: "Optimization problems solved using greedy approach including activity selection and Huffman coding.",
    icon: "🎯",
    tags: ["DSA", "Greedy Algorithms", "Optimization"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },
  {
    id: 90,
    title: "Red-Black Tree",
    description: "Self-balancing binary search tree with red-black properties and efficient operations.",
    icon: "🔴",
    tags: ["DSA", "Red-Black Tree", "Balanced Trees"],
    images: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },
  {
    id: 91,
    title: "Disjoint Set Union",
    description: "Union-Find data structure for tracking connected components and cycle detection in graphs.",
    icon: "🔗",
    tags: ["DSA", "Union Find", "Graph Algorithms"],
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800", "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800"]
  },
  {
    id: 92,
    title: "Fenwick Tree (BIT)",
    description: "Binary Indexed Tree for efficient prefix sum queries and updates in logarithmic time.",
    icon: "🌳",
    tags: ["DSA", "Fenwick Tree", "Prefix Sums"],
    images: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },
  {
    id: 93,
    title: "Topological Sorting",
    description: "Implementation of topological sort for directed acyclic graphs with dependency resolution.",
    icon: "📈",
    tags: ["DSA", "Topological Sort", "DAG"],
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800", "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800"]
  },
  {
    id: 94,
    title: "Suffix Array and LCP",
    description: "Suffix array construction with longest common prefix array for string processing.",
    icon: "📝",
    tags: ["DSA", "Suffix Array", "String Processing"],
    images: ["https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800", "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800"]
  },
  {
    id: 95,
    title: "Flow Network Algorithms",
    description: "Maximum flow algorithms including Ford-Fulkerson and Edmonds-Karp with applications.",
    icon: "🌊",
    tags: ["DSA", "Network Flow", "Graph Theory"],
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800", "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800"]
  },
  {
    id: 96,
    title: "Binary Heap Variants",
    description: "Implementation of min-heap, max-heap, and binomial heap with performance analysis.",
    icon: "⛰️",
    tags: ["DSA", "Heap Variants", "Priority Structures"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800"]
  },
  {
    id: 97,
    title: "Aho-Corasick Algorithm",
    description: "Multiple pattern matching algorithm for efficient string search in large texts.",
    icon: "🔍",
    tags: ["DSA", "Pattern Matching", "String Algorithms"],
    images: ["https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },
  {
    id: 98,
    title: "Geometric Algorithms",
    description: "Computational geometry algorithms including convex hull, line intersection, and closest pair.",
    icon: "📐",
    tags: ["DSA", "Computational Geometry", "Algorithms"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },
  {
    id: 99,
    title: "Skip List Implementation",
    description: "Probabilistic data structure for fast search, insertion, and deletion operations.",
    icon: "🎲",
    tags: ["DSA", "Skip List", "Probabilistic Structures"],
    images: ["https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },
  {
    id: 100,
    title: "Advanced Sorting Techniques",
    description: "Implementation of advanced sorting algorithms including radix sort, counting sort, and bucket sort.",
    icon: "🔄",
    tags: ["DSA", "Advanced Sorting", "Non-Comparison Sort"],
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800"]
  },

  // DBMS (Database Management Systems) - 25 Projects
  {
    id: 101,
    title: "University Database System",
    description: "Comprehensive DBMS for university management including student information, course management, and academic record tracking with complex queries.",
    icon: "🗄️",
    tags: ["DBMS", "SQL", "Database"],
    images: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800", "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800"]
  },
  {
    id: 102,
    title: "Employee Database System",
    description: "HR database management with employee records, payroll processing, performance tracking, and department management.",
    icon: "👥",
    tags: ["DBMS", "HR", "SQL"],
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"]
  },
  {
    id: 103,
    title: "School Database Management",
    description: "Educational institution database with student records, staff management, academic tracking, and fee management.",
    icon: "🏫",
    tags: ["DBMS", "Education", "Management"],
    images: ["https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800", "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800"]
  },
  {
    id: 104,
    title: "Distributed Database System",
    description: "Advanced DBMS implementing distributed database concepts with replication, consistency, and fault tolerance.",
    icon: "🌐",
    tags: ["DBMS", "Distributed", "Replication"],
    images: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800", "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800"]
  },
  {
    id: 105,
    title: "Hospital Database Management",
    description: "Medical database system with patient records, doctor schedules, appointment management, and billing.",
    icon: "🏥",
    tags: ["DBMS", "Healthcare", "Medical Records"],
    images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800", "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800"]
  },
  {
    id: 106,
    title: "Library Database System",
    description: "Comprehensive library management with book catalog, member management, circulation tracking, and fine calculation.",
    icon: "📚",
    tags: ["DBMS", "Library", "Catalog Management"],
    images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800", "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800"]
  },
  {
    id: 107,
    title: "Bank Database System",
    description: "Banking database with account management, transaction processing, loan tracking, and customer profiles.",
    icon: "🏦",
    tags: ["DBMS", "Banking", "Financial"],
    images: ["https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"]
  },
  {
    id: 108,
    title: "E-commerce Database Design",
    description: "Online shopping database with product catalog, order management, customer data, and inventory tracking.",
    icon: "🛒",
    tags: ["DBMS", "E-commerce", "Online Shopping"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 109,
    title: "Hotel Reservation Database",
    description: "Hospitality database with room booking, guest management, billing, and housekeeping operations.",
    icon: "🏨",
    tags: ["DBMS", "Hospitality", "Reservations"],
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800"]
  },
  {
    id: 110,
    title: "Airline Database System",
    description: "Aviation database with flight scheduling, passenger booking, crew management, and aircraft maintenance.",
    icon: "✈️",
    tags: ["DBMS", "Aviation", "Flight Management"],
    images: ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800", "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800"]
  },
  {
    id: 111,
    title: "Inventory Database Management",
    description: "Warehouse database with stock tracking, supplier management, order processing, and automated reordering.",
    icon: "📦",
    tags: ["DBMS", "Inventory", "Warehouse"],
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"]
  },
  {
    id: 112,
    title: "Real Estate Database",
    description: "Property management database with listings, client management, agent tracking, and transaction records.",
    icon: "🏠",
    tags: ["DBMS", "Real Estate", "Property Management"],
    images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"]
  },
  {
    id: 113,
    title: "Sports Database Management",
    description: "Sports league database with player statistics, team management, match scheduling, and tournament tracking.",
    icon: "⚽",
    tags: ["DBMS", "Sports", "Statistics"],
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800"]
  },
  {
    id: 114,
    title: "Music Database System",
    description: "Music streaming database with artist catalogs, playlist management, user preferences, and listening history.",
    icon: "🎶",
    tags: ["DBMS", "Music", "Streaming"],
    images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800"]
  },
  {
    id: 115,
    title: "Vehicle Database System",
    description: "Automotive database with vehicle registration, insurance tracking, maintenance schedules, and traffic violation records.",
    icon: "🚗",
    tags: ["DBMS", "Automotive", "Registration"],
    images: ["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800", "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800"]
  },
  {
    id: 116,
    title: "Online Course Database",
    description: "E-learning platform database with course catalog, student enrollments, progress tracking, and certification management.",
    icon: "💻",
    tags: ["DBMS", "E-learning", "Education"],
    images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800"]
  },
  {
    id: 117,
    title: "Event Management Database",
    description: "Event planning database with venue management, attendee registration, catering, and budget tracking.",
    icon: "🎪",
    tags: ["DBMS", "Events", "Planning"],
    images: ["https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"]
  },
  {
    id: 118,
    title: "Restaurant Database System",
    description: "Restaurant management database with menu management, order processing, table reservations, and staff scheduling.",
    icon: "🍽️",
    tags: ["DBMS", "Restaurant", "Food Service"],
    images: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"]
  },
  {
    id: 119,
    title: "Fitness Center Database",
    description: "Gym management database with member profiles, workout tracking, trainer schedules, and equipment maintenance.",
    icon: "💪",
    tags: ["DBMS", "Fitness", "Health"],
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800"]
  },
  {
    id: 120,
    title: "Pharmacy Database System",
    description: "Medical pharmacy database with drug inventory, prescription management, patient records, and insurance claims.",
    icon: "💊",
    tags: ["DBMS", "Pharmacy", "Healthcare"],
    images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800", "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800"]
  },
  {
    id: 121,
    title: "Insurance Database System",
    description: "Insurance company database with policy management, claims processing, customer profiles, and risk assessment.",
    icon: "🛡️",
    tags: ["DBMS", "Insurance", "Risk Management"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 122,
    title: "Media Database System",
    description: "Digital media management database with content cataloging, user ratings, streaming analytics, and licensing.",
    icon: "📺",
    tags: ["DBMS", "Media", "Content Management"],
    images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800"]
  },
  {
    id: 123,
    title: "Social Network Database",
    description: "Social media platform database with user profiles, connections, posts, messaging, and privacy controls.",
    icon: "📱",
    tags: ["DBMS", "Social Media", "Networking"],
    images: ["https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800", "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800"]
  },
  {
    id: 124,
    title: "Transportation Database",
    description: "Public transport database with route management, scheduling, passenger tracking, and fare calculation.",
    icon: "🚌",
    tags: ["DBMS", "Transportation", "Public Transit"],
    images: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"]
  },
  {
    id: 125,
    title: "Weather Database System",
    description: "Meteorological database with weather data collection, forecasting, historical records, and climate analysis.",
    icon: "🌤️",
    tags: ["DBMS", "Weather", "Climate Data"],
    images: ["https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800", "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800"]
  },

  // AI/ML (Artificial Intelligence & Machine Learning) - 25 Projects
  {
    id: 126,
    title: "Smart Study Companion",
    description: "AI-powered learning assistant with machine learning algorithms for personalized study recommendations and progress tracking.",
    icon: "🤖",
    tags: ["AI/ML", "Python", "Machine Learning"],
    images: ["https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800"]
  },
  {
    id: 127,
    title: "Predictive Analytics System",
    description: "Machine learning system for predictive analytics using regression and classification algorithms with data visualization.",
    icon: "📈",
    tags: ["AI/ML", "Analytics", "Python"],
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800"]
  },
  {
    id: 128,
    title: "Chatbot Development",
    description: "AI chatbot using natural language processing with machine learning for intelligent conversations and customer support.",
    icon: "💬",
    tags: ["AI/ML", "NLP", "Chatbot"],
    images: ["https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800", "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"]
  },
  {
    id: 129,
    title: "Recommendation Engine",
    description: "Machine learning recommendation system using collaborative filtering and content-based algorithms for personalized suggestions.",
    icon: "🎯",
    tags: ["AI/ML", "Recommendation", "Filtering"],
    images: ["https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800"]
  },
  {
    id: 130,
    title: "Sentiment Analysis Tool",
    description: "Natural language processing system for sentiment analysis of social media posts and customer reviews.",
    icon: "😊",
    tags: ["AI/ML", "NLP", "Sentiment Analysis"],
    images: ["https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800", "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800"]
  },
  {
    id: 131,
    title: "Stock Price Predictor",
    description: "Machine learning model for stock market prediction using time series analysis and neural networks.",
    icon: "📊",
    tags: ["AI/ML", "Finance", "Time Series"],
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800"]
  },
  {
    id: 132,
    title: "Image Classification System",
    description: "Deep learning CNN model for image classification with multiple categories and accuracy optimization.",
    icon: "🖼️",
    tags: ["AI/ML", "Deep Learning", "CNN"],
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"]
  },
  {
    id: 133,
    title: "Speech Recognition System",
    description: "AI-powered speech-to-text conversion system with natural language understanding and voice commands.",
    icon: "🎙️",
    tags: ["AI/ML", "Speech Recognition", "Audio Processing"],
    images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800"]
  },
  {
    id: 134,
    title: "Fraud Detection System",
    description: "Machine learning system for detecting fraudulent transactions using anomaly detection and pattern recognition.",
    icon: "🔍",
    tags: ["AI/ML", "Fraud Detection", "Security"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 135,
    title: "Medical Diagnosis AI",
    description: "AI system for medical diagnosis assistance using machine learning on patient symptoms and medical history.",
    icon: "⚕️",
    tags: ["AI/ML", "Healthcare", "Diagnosis"],
    images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800", "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800"]
  },
  {
    id: 136,
    title: "Text Summarization Tool",
    description: "NLP-based automatic text summarization system using extractive and abstractive summarization techniques.",
    icon: "📝",
    tags: ["AI/ML", "Text Summarization", "NLP"],
    images: ["https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800", "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800"]
  },
  {
    id: 137,
    title: "Weather Prediction Model",
    description: "Machine learning model for weather forecasting using historical data and meteorological parameters.",
    icon: "🌦️",
    tags: ["AI/ML", "Weather Prediction", "Data Science"],
    images: ["https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800", "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800"]
  },
  {
    id: 138,
    title: "Customer Churn Prediction",
    description: "Predictive model for customer retention using machine learning to identify customers likely to churn.",
    icon: "👥",
    tags: ["AI/ML", "Customer Analytics", "Business Intelligence"],
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"]
  },
  {
    id: 139,
    title: "Music Recommendation AI",
    description: "AI-powered music recommendation system using collaborative filtering and audio feature analysis.",
    icon: "🎵",
    tags: ["AI/ML", "Music", "Recommendation Systems"],
    images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800"]
  },
  {
    id: 140,
    title: "Object Detection AI",
    description: "Real-time object detection system using YOLO and deep learning for multiple object recognition.",
    icon: "👁️",
    tags: ["AI/ML", "Object Detection", "Computer Vision"],
    images: ["https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800", "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800"]
  },
  {
    id: 141,
    title: "Language Translation AI",
    description: "Neural machine translation system for multi-language translation using transformer models.",
    icon: "🌐",
    tags: ["AI/ML", "Language Translation", "Transformers"],
    images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800", "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800"]
  },
  {
    id: 142,
    title: "Handwriting Recognition",
    description: "Deep learning system for handwritten text recognition using CNN and RNN architectures.",
    icon: "✍️",
    tags: ["AI/ML", "Handwriting Recognition", "Deep Learning"],
    images: ["https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800", "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800"]
  },
  {
       id: 143,
    title: "Sales Forecasting AI",
    description: "Predictive analytics system for sales forecasting using time series analysis and machine learning.",
    icon: "💰",
    tags: ["AI/ML", "Sales Forecasting", "Business Analytics"],
    images: ["https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800", "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800"]
  },
  {
    id: 144,
    title: "Game AI Bot",
    description: "Intelligent game bot using reinforcement learning and minimax algorithms for strategic gameplay.",
    icon: "🎮",
    tags: ["AI/ML", "Game AI", "Reinforcement Learning"],
    images: ["https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800", "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"]
  },
  {
    id: 145,
    title: "Email Spam Classifier",
    description: "Machine learning classifier for email spam detection using text processing and feature extraction.",
    icon: "📧",
    tags: ["AI/ML", "Spam Detection", "Text Classification"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },
  {
    id: 146,
    title: "Credit Risk Assessment",
    description: "AI system for credit risk evaluation using machine learning on financial data and credit history.",
    icon: "💳",
    tags: ["AI/ML", "Credit Assessment", "Financial Analysis"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 147,
    title: "Traffic Pattern Analysis",
    description: "Machine learning system for analyzing traffic patterns and optimizing traffic flow in smart cities.",
    icon: "🚦",
    tags: ["AI/ML", "Traffic Analysis", "Smart City"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800"]
  },
  {
    id: 148,
    title: "Face Emotion Recognition",
    description: "Deep learning system for real-time facial emotion recognition using CNN and computer vision techniques.",
    icon: "😀",
    tags: ["AI/ML", "Emotion Recognition", "Facial Analysis"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },
  {
    id: 149,
    title: "Plant Disease Detection",
    description: "AI system for agricultural plant disease detection using image processing and machine learning.",
    icon: "🌱",
    tags: ["AI/ML", "Agriculture", "Disease Detection"],
    images: ["https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800", "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800"]
  },
  {
    id: 150,
    title: "Voice Assistant AI",
    description: "Intelligent voice assistant with speech recognition, natural language understanding, and task automation.",
    icon: "🗣️",
    tags: ["AI/ML", "Voice Assistant", "Speech Processing"],
    images: ["https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800", "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"]
  },

  // Cryptography & Security - 25 Projects
  {
    id: 151,
    title: "Secure File Encryption Tool",
    description: "Advanced cryptography project implementing AES, RSA encryption algorithms with digital signatures and key management.",
    icon: "🔐",
    tags: ["Cryptography", "Security", "Encryption"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 152,
    title: "Digital Signature System",
    description: "PKI-based digital signature implementation with certificate management and signature verification.",
    icon: "✍️",
    tags: ["Cryptography", "PKI", "Security"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 153,
    title: "Blockchain Voting System",
    description: "Secure voting platform using blockchain technology with smart contracts and transparency features.",
    icon: "🗳️",
    tags: ["Cryptography", "Blockchain", "Smart Contracts"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800"]
  },
  {
    id: 154,
    title: "Network Security Scanner",
    description: "Cybersecurity tool for network vulnerability scanning and penetration testing with automated reporting.",
    icon: "🛡️",
    tags: ["Cryptography", "Network Security", "Scanning"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 155,
    title: "Password Security Manager",
    description: "Secure password management system with encryption, secure storage, and password strength analysis.",
    icon: "🔑",
    tags: ["Cryptography", "Password Security", "Secure Storage"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 156,
    title: "Secure Communication Protocol",
    description: "End-to-end encrypted messaging system with perfect forward secrecy and secure key exchange.",
    icon: "💬",
    tags: ["Cryptography", "Secure Communication", "Encryption"],
    images: ["https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"]
  },
  {
    id: 157,
    title: "Steganography Tool",
    description: "Data hiding application using steganography techniques for covert communication in images and audio.",
    icon: "🖼️",
    tags: ["Cryptography", "Steganography", "Data Hiding"],
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"]
  },
  {
    id: 158,
    title: "Multi-Factor Authentication",
    description: "Comprehensive MFA system with biometric authentication, SMS verification, and hardware tokens.",
    icon: "🔐",
    tags: ["Cryptography", "Authentication", "Biometrics"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },
  {
    id: 159,
    title: "Cryptocurrency Wallet",
    description: "Secure digital wallet for cryptocurrency storage with multi-signature support and cold storage features.",
    icon: "💰",
    tags: ["Cryptography", "Cryptocurrency", "Blockchain"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800"]
  },
  {
    id: 160,
    title: "Hash Function Analysis",
    description: "Cryptographic hash function implementation and analysis including SHA-256, MD5, and collision detection.",
    icon: "🔢",
    tags: ["Cryptography", "Hash Functions", "Security Analysis"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800"]
  },
  {
    id: 161,
    title: "SSL/TLS Implementation",
    description: "Secure communication protocol implementation with certificate validation and encrypted data transmission.",
    icon: "🔒",
    tags: ["Cryptography", "SSL/TLS", "Network Security"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800"]
  },
  {
    id: 162,
    title: "Key Management System",
    description: "Enterprise key management solution with key generation, distribution, rotation, and secure storage.",
    icon: "🗝️",
    tags: ["Cryptography", "Key Management", "Enterprise Security"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 163,
    title: "Intrusion Detection System",
    description: "Network-based IDS for detecting and preventing cyber attacks with real-time monitoring and alerting.",
    icon: "🚨",
    tags: ["Cryptography", "Intrusion Detection", "Cybersecurity"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800"]
  },
  {
    id: 164,
    title: "Secure File Sharing",
    description: "End-to-end encrypted file sharing platform with access control and audit logging.",
    icon: "📁",
    tags: ["Cryptography", "File Sharing", "Access Control"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"]
  },
  {
    id: 165,
    title: "Quantum Cryptography Simulator",
    description: "Quantum key distribution simulation with quantum cryptography protocols and security analysis.",
    icon: "⚛️",
    tags: ["Cryptography", "Quantum Computing", "Advanced Security"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800"]
  },
  {
    id: 166,
    title: "Zero-Knowledge Proof System",
    description: "Implementation of zero-knowledge proofs for privacy-preserving authentication and verification.",
    icon: "🎭",
    tags: ["Cryptography", "Zero-Knowledge", "Privacy"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 167,
    title: "Biometric Security System",
    description: "Multi-modal biometric authentication using fingerprint, face, and iris recognition with encryption.",
    icon: "👁️",
    tags: ["Cryptography", "Biometrics", "Multi-modal Authentication"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },
  {
    id: 168,
    title: "Secure Database Encryption",
    description: "Database encryption system with field-level encryption, key rotation, and secure query processing.",
    icon: "🗄️",
    tags: ["Cryptography", "Database Security", "Data Protection"],
    images: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800", "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800"]
  },
  {
    id: 169,
    title: "Homomorphic Encryption",
    description: "Privacy-preserving computation using homomorphic encryption for secure cloud computing.",
    icon: "☁️",
    tags: ["Cryptography", "Homomorphic Encryption", "Cloud Security"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 170,
    title: "Secure Email System",
    description: "End-to-end encrypted email platform with PGP implementation and secure key exchange.",
    icon: "📧",
    tags: ["Cryptography", "Email Security", "PGP"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },
  {
    id: 171,
    title: "Digital Forensics Tool",
    description: "Cybersecurity forensics application for evidence collection, analysis, and chain of custody management.",
    icon: "🔍",
    tags: ["Cryptography", "Digital Forensics", "Evidence Analysis"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 172,
    title: "Smart Contract Security",
    description: "Blockchain smart contract security analysis tool with vulnerability detection and code auditing.",
    icon: "📜",
    tags: ["Cryptography", "Smart Contracts", "Blockchain Security"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800"]
  },
  {
    id: 173,
    title: "Access Control System",
    description: "Role-based access control system with attribute-based permissions and security policy enforcement.",
    icon: "🚪",
    tags: ["Cryptography", "Access Control", "Security Policies"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800"]
  },
  {
    id: 174,
    title: "Secure API Gateway",
    description: "API security gateway with OAuth, JWT tokens, rate limiting, and threat protection.",
    icon: "🌐",
    tags: ["Cryptography", "API Security", "OAuth"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800"]
  },
  {
    id: 175,
    title: "Privacy-Preserving Analytics",
    description: "Differential privacy implementation for secure data analytics without compromising individual privacy.",
    icon: "📊",
    tags: ["Cryptography", "Differential Privacy", "Data Analytics"],
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800"]
  },

  // Digital Image Processing - 25 Projects
  {
    id: 176,
    title: "Medical Image Analysis System",
    description: "Advanced medical imaging analysis with filtering, enhancement, segmentation, and diagnostic features using MATLAB.",
    icon: "🏥",
    tags: ["Digital Image Processing", "MATLAB", "Medical"],
    images: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800"]
  },
  {
    id: 177,
    title: "Image Enhancement Tool",
    description: "Comprehensive image processing application with filters, histogram equalization, and noise reduction algorithms.",
    icon: "🖼️",
    tags: ["Digital Image Processing", "MATLAB", "Enhancement"],
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"]
  },
  {
    id: 178,
    title: "Medical Image Segmentation",
    description: "Advanced image segmentation techniques for medical imaging using region growing and edge detection methods.",
    icon: "🔬",
    tags: ["Digital Image Processing", "Medical", "Segmentation"],
    images: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800"]
  },
  {
    id: 179,
    title: "Satellite Image Processing",
    description: "Remote sensing image analysis with atmospheric correction, land use classification, and change detection.",
    icon: "🛰️",
    tags: ["Digital Image Processing", "Remote Sensing", "GIS"],
    images: ["https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800", "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800"]
  },
  {
    id: 180,
    title: "Fingerprint Recognition System",
    description: "Biometric fingerprint processing with minutiae extraction, matching algorithms, and database management.",
    icon: "👆",
    tags: ["Digital Image Processing", "Biometrics", "Pattern Recognition"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },
  {
    id: 181,
    title: "OCR Text Recognition",
    description: "Optical character recognition system with preprocessing, feature extraction, and machine learning classification.",
    icon: "📝",
    tags: ["Digital Image Processing", "OCR", "Text Recognition"],
    images: ["https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800", "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800"]
  },
  {
    id: 182,
    title: "Aerial Image Analysis",
    description: "Drone and aerial image processing for agriculture monitoring, urban planning, and environmental analysis.",
    icon: "🚁",
    tags: ["Digital Image Processing", "Aerial Imaging", "Analysis"],
    images: ["https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800", "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800"]
  },
  {
    id: 183,
    title: "Image Restoration Tool",
    description: "Advanced image restoration techniques for removing blur, noise, and artifacts from degraded images.",
    icon: "🔧",
    tags: ["Digital Image Processing", "Restoration", "Denoising"],
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"]
  },
  {
    id: 184,
    title: "Morphological Operations",
    description: "Implementation of morphological image processing operations including erosion, dilation, opening, and closing.",
    icon: "🔄",
    tags: ["Digital Image Processing", "Morphology", "Shape Analysis"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },
  {
    id: 185,
    title: "Edge Detection Algorithms",
    description: "Comprehensive edge detection system implementing Sobel, Canny, Prewitt, and Laplacian operators.",
    icon: "📐",
    tags: ["Digital Image Processing", "Edge Detection", "Feature Extraction"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },
  {
    id: 186,
    title: "Color Space Conversion",
    description: "Image color space transformation tools for RGB, HSV, LAB, and YUV color models with analysis.",
    icon: "🎨",
    tags: ["Digital Image Processing", "Color Analysis", "Transformation"],
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"]
  },
  {
    id: 187,
    title: "Texture Analysis System",
    description: "Texture feature extraction and classification using GLCM, LBP, and Gabor filters for material recognition.",
    icon: "🧩",
    tags: ["Digital Image Processing", "Texture Analysis", "Pattern Recognition"],
    images: ["https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800", "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800"]
  },
  {
    id: 188,
    title: "Image Compression Tool",
    description: "Implementation of image compression algorithms including JPEG, wavelet compression, and lossless methods.",
    icon: "🗜️",
    tags: ["Digital Image Processing", "Compression", "Algorithms"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"]
  },
  {
    id: 189,
    title: "Image Registration System",
    description: "Medical image registration for aligning multiple images using feature-based and intensity-based methods.",
    icon: "🔗",
    tags: ["Digital Image Processing", "Image Registration", "Medical Imaging"],
    images: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800"]
  },
  {
    id: 190,
    title: "Histogram Processing",
    description: "Advanced histogram analysis and manipulation for image enhancement and statistical analysis.",
    icon: "📊",
    tags: ["Digital Image Processing", "Histogram", "Statistical Analysis"],
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800"]
  },
  {
    id: 191,
    title: "Fourier Transform Analysis",
    description: "Frequency domain image processing using FFT for filtering, analysis, and image reconstruction.",
    icon: "🌊",
    tags: ["Digital Image Processing", "Fourier Transform", "Frequency Analysis"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800"]
  },
  {
    id: 192,
    title: "Watermarking System",
    description: "Digital watermarking implementation for copyright protection and image authentication using LSB and DCT.",
    icon: "💧",
    tags: ["Digital Image Processing", "Watermarking", "Copyright Protection"],
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"]
  },
  {
    id: 193,
    title: "Image Quality Assessment",
    description: "Objective and subjective image quality metrics including PSNR, SSIM, and perceptual quality measures.",
    icon: "⭐",
    tags: ["Digital Image Processing", "Quality Assessment", "Metrics"],
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"]
  },
  {
    id: 194,
    title: "Panoramic Image Stitching",
    description: "Image stitching algorithm for creating panoramic images with feature matching and blending techniques.",
    icon: "🌄",
    tags: ["Digital Image Processing", "Image Stitching", "Panoramic"],
    images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800"]
  },
  {
    id: 195,
    title: "Medical Image Fusion",
    description: "Multi-modal medical image fusion combining CT, MRI, and PET images for enhanced diagnosis.",
    icon: "🔬",
    tags: ["Digital Image Processing", "Image Fusion", "Multi-modal"],
    images: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800"]
  },
  {
    id: 196,
    title: "Iris Recognition System",
    description: "Biometric iris recognition with preprocessing, feature extraction, and matching using Gabor wavelets.",
    icon: "👁️",
    tags: ["Digital Image Processing", "Iris Recognition", "Biometrics"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },
  {
    id: 197,
    title: "Image Deblurring Tool",
    description: "Motion and out-of-focus blur removal using Wiener filtering and blind deconvolution techniques.",
    icon: "🔍",
    tags: ["Digital Image Processing", "Deblurring", "Restoration"],
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"]
  },
  {
    id: 198,
    title: "Shape Analysis System",
    description: "Geometric shape analysis with contour detection, shape descriptors, and classification algorithms.",
    icon: "🔷",
    tags: ["Digital Image Processing", "Shape Analysis", "Geometric Features"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },
  {
    id: 199,
    title: "Multispectral Image Analysis",
    description: "Analysis of multispectral and hyperspectral images for agriculture, mining, and environmental monitoring.",
    icon: "🛰️",
    tags: ["Digital Image Processing", "Multispectral", "Remote Sensing"],
    images: ["https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800", "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800"]
  },
  {
    id: 200,
    title: "3D Image Reconstruction",
    description: "Three-dimensional image reconstruction from multiple 2D projections using tomographic techniques.",
    icon: "📐",
    tags: ["Digital Image Processing", "3D Reconstruction", "Tomography"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },

  // Computer Vision - 25 Projects
  {
    id: 201,
    title: "Real-time Face Detection",
    description: "OpenCV-based face detection system with real-time video processing using Haar cascades and deep learning models.",
    icon: "👤",
    tags: ["Computer Vision", "OpenCV", "Face Detection"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },
  {
    id: 202,
    title: "License Plate Recognition",
    description: "Automatic license plate detection and recognition system using computer vision and OCR techniques.",
    icon: "🚗",
    tags: ["Computer Vision", "OCR", "License Plate"],
    images: ["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800", "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800"]
  },
  {
    id: 203,
    title: "Gesture Recognition System",
    description: "Hand gesture recognition for human-computer interaction using computer vision and machine learning.",
    icon: "✋",
    tags: ["Computer Vision", "Gesture Recognition", "HCI"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },
  {
    id: 204,
    title: "Object Tracking System",
    description: "Multi-object tracking in video streams using Kalman filters and deep learning techniques.",
    icon: "🎯",
    tags: ["Computer Vision", "Object Tracking", "Video Processing"],
    images: ["https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800", "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800"]
  },
  {
    id: 205,
    title: "Motion Detection Camera",
    description: "Intelligent surveillance system with motion detection, alerts, and automated recording capabilities.",
    icon: "📹",
    tags: ["Computer Vision", "Motion Detection", "Surveillance"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800"]
  },
  {
    id: 206,
    title: "QR Code Scanner",
    description: "Real-time QR code detection and decoding system with mobile integration and data validation.",
    icon: "📱",
    tags: ["Computer Vision", "QR Code", "Mobile"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },
  {
    id: 207,
    title: "Augmented Reality Markers",
    description: "AR marker detection and 3D object overlay system using computer vision and graphics rendering.",
    icon: "🔮",
    tags: ["Computer Vision", "Augmented Reality", "3D Graphics"],
    images: ["https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800", "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800"]
  },
  {
    id: 208,
    title: "Document Scanner App",
    description: "Mobile document scanning with perspective correction, edge detection, and text enhancement.",
    icon: "📄",
    tags: ["Computer Vision", "Document Scanning", "Mobile App"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"]
  },
  {
    id: 209,
    title: "Color-based Object Detection",
    description: "Real-time object detection and tracking based on color segmentation and HSV filtering.",
    icon: "🎨",
    tags: ["Computer Vision", "Color Detection", "Object Recognition"],
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"]
  },
  {
    id: 210,
    title: "Pose Estimation System",
    description: "Human pose estimation and analysis using computer vision for fitness and sports applications.",
    icon: "🤸",
    tags: ["Computer Vision", "Pose Estimation", "Human Analysis"],
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800"]
  },
  {
    id: 211,
    title: "Traffic Sign Recognition",
    description: "Automated traffic sign detection and classification for autonomous driving applications.",
    icon: "🚦",
    tags: ["Computer Vision", "Traffic Signs", "Autonomous Driving"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800"]
  },
  {
    id: 212,
    title: "Crowd Counting System",
    description: "AI-powered crowd density estimation and people counting using computer vision techniques.",
    icon: "👥",
    tags: ["Computer Vision", "Crowd Analysis", "People Counting"],
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"]
  },
  {
    id: 213,
    title: "Barcode Scanner System",
    description: "Multi-format barcode detection and decoding with inventory management integration.",
    icon: "📊",
    tags: ["Computer Vision", "Barcode", "Inventory"],
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"]
  },
  {
    id: 214,
    title: "Eye Tracking System",
    description: "Gaze tracking and eye movement analysis for HCI and accessibility applications.",
    icon: "👁️",
    tags: ["Computer Vision", "Eye Tracking", "Accessibility"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },
  {
    id: 215,
    title: "Vehicle Detection System",
    description: "Real-time vehicle detection and classification for traffic monitoring and smart city applications.",
    icon: "🚙",
    tags: ["Computer Vision", "Vehicle Detection", "Traffic Monitoring"],
    images: ["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"]
  },
  {
    id: 216,
    title: "Hand Writing Analysis",
    description: "Handwriting recognition and analysis system for signature verification and document processing.",
    icon: "✍️",
    tags: ["Computer Vision", "Handwriting", "Document Analysis"],
    images: ["https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800", "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800"]
  },
  {
    id: 217,
    title: "Smart Parking Detection",
    description: "Computer vision-based parking space detection and monitoring for smart parking systems.",
    icon: "🅿️",
    tags: ["Computer Vision", "Smart Parking", "IoT"],
    images: ["https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"]
  },
  {
    id: 218,
    title: "Defect Detection System",
    description: "Industrial quality control using computer vision for automated defect detection in manufacturing.",
    icon: "🔍",
    tags: ["Computer Vision", "Quality Control", "Manufacturing"],
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"]
  },
  {
    id: 219,
    title: "Sports Video Analysis",
    description: "Player tracking and performance analysis in sports videos using computer vision techniques.",
    icon: "⚽",
    tags: ["Computer Vision", "Sports Analysis", "Video Processing"],
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800"]
  },
  {
    id: 220,
    title: "3D Reconstruction System",
    description: "Stereo vision-based 3D reconstruction and depth estimation from multiple camera views.",
    icon: "📐",
    tags: ["Computer Vision", "3D Reconstruction", "Stereo Vision"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800"]
  },
  {
    id: 221,
    title: "Medical Image Diagnosis",
    description: "Computer vision system for medical image analysis and automated diagnosis assistance.",
    icon: "🏥",
    tags: ["Computer Vision", "Medical Imaging", "Healthcare"],
    images: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800"]
  },
  {
    id: 222,
    title: "Age and Gender Detection",
    description: "Real-time age and gender classification using deep learning and computer vision techniques.",
    icon: "👶",
    tags: ["Computer Vision", "Age Detection", "Gender Classification"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },
  {
    id: 223,
    title: "Video Stabilization",
    description: "Real-time video stabilization system for removing camera shake and motion blur.",
    icon: "📹",
    tags: ["Computer Vision", "Video Stabilization", "Image Processing"],
    images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800"]
  },
  {
    id: 224,
    title: "Background Subtraction",
    description: "Advanced background subtraction for foreground object detection in surveillance systems.",
    icon: "🎭",
    tags: ["Computer Vision", "Background Subtraction", "Surveillance"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800"]
  },
  {
    id: 225,
    title: "Optical Flow Analysis",
    description: "Motion estimation using optical flow for video analysis and object tracking applications.",
    icon: "🌊",
    tags: ["Computer Vision", "Optical Flow", "Motion Analysis"],
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800", "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800"]
  },

  // Full Stack Development (FSD) - 25 Projects
  {
    id: 226,
    title: "E-Commerce Platform",
    description: "Complete online shopping platform with React frontend, Node.js backend, MongoDB database, and payment integration.",
    icon: "🛒",
    tags: ["FSD", "React", "Node.js", "MongoDB"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 227,
    title: "Social Media Dashboard",
    description: "Full-stack social media management platform with real-time chat, posts, and analytics using MERN stack.",
    icon: "📱",
    tags: ["FSD", "MERN", "Real-time", "Social Media"],
    images: ["https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800", "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800"]
  },
  {
    id: 228,
    title: "Learning Management System",
    description: "Educational platform with course management, video streaming, quizzes, and progress tracking.",
    icon: "🎓",
    tags: ["FSD", "Education", "Video Streaming", "LMS"],
    images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"]
  },
  {
    id: 229,
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates, file sharing, and team collaboration features.",
    icon: "📋",
    tags: ["FSD", "Project Management", "Collaboration", "Real-time"],
    images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800", "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800"]
  },
  {
    id: 230,
    title: "Blog Publishing Platform",
    description: "Full-featured blogging platform with content management, SEO optimization, and user engagement features.",
    icon: "📝",
    tags: ["FSD", "Blog", "CMS", "SEO"],
    images: ["https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800", "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800"]
  },
  {
    id: 231,
    title: "Food Delivery App",
    description: "Complete food delivery platform with restaurant management, order tracking, and payment processing.",
    icon: "🍕",
    tags: ["FSD", "Food Delivery", "Mobile App", "GPS"],
    images: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"]
  },
  {
    id: 232,
    title: "Real Estate Portal",
    description: "Property listing and management platform with search filters, virtual tours, and agent management.",
    icon: "🏠",
    tags: ["FSD", "Real Estate", "Search", "Virtual Tours"],
    images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"]
  },
  {
    id: 233,
    title: "Healthcare Management System",
    description: "Hospital management platform with patient records, appointment scheduling, and telemedicine features.",
    icon: "⚕️",
    tags: ["FSD", "Healthcare", "Telemedicine", "Management"],
    images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800", "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800"]
  },
  {
    id: 234,
    title: "Event Booking Platform",
    description: "Event management and ticket booking system with venue management and payment processing.",
    icon: "🎪",
    tags: ["FSD", "Event Management", "Booking", "Payments"],
    images: ["https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"]
  },
  {
    id: 235,
    title: "Fitness Tracking App",
    description: "Personal fitness platform with workout tracking, nutrition planning, and social features.",
    icon: "💪",
    tags: ["FSD", "Fitness", "Health", "Tracking"],
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800"]
  },
  {
    id: 236,
    title: "Music Streaming Platform",
    description: "Full-stack music streaming service with playlist management, recommendations, and artist profiles.",
    icon: "🎵",
    tags: ["FSD", "Music Streaming", "Audio", "Recommendations"],
    images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800"]
  },
  {
    id: 237,
    title: "Chat Application",
    description: "Real-time messaging platform with group chats, file sharing, and video calling features.",
    icon: "💬",
    tags: ["FSD", "Real-time Chat", "WebSocket", "Video Call"],
    images: ["https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"]
  },
  {
    id: 238,
    title: "Job Portal Platform",
    description: "Job search and recruitment platform with resume builder, application tracking, and employer dashboard.",
    icon: "💼",
    tags: ["FSD", "Job Portal", "Recruitment", "Career"],
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"]
  },
  {
    id: 239,
    title: "Weather Dashboard",
    description: "Weather monitoring platform with real-time data, forecasts, and interactive maps.",
    icon: "🌤️",
    tags: ["FSD", "Weather API", "Maps", "Real-time Data"],
    images: ["https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800", "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800"]
  },
  {
    id: 240,
    title: "Banking Web Application",
    description: "Secure online banking platform with account management, transactions, and financial analytics.",
    icon: "🏦",
    tags: ["FSD", "Banking", "Security", "Fintech"],
    images: ["https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"]
  },
  {
    id: 241,
    title: "Travel Booking System",
    description: "Complete travel booking platform with flight, hotel, and car rental management.",
    icon: "✈️",
    tags: ["FSD", "Travel", "Booking", "Tourism"],
    images: ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800", "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800"]
  },
  {
    id: 242,
    title: "Inventory Management Portal",
    description: "Warehouse management system with stock tracking, supplier management, and analytics dashboard.",
    icon: "📦",
    tags: ["FSD", "Inventory", "Warehouse", "Analytics"],
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"]
  },
  {
    id: 243,
    title: "Recipe Sharing Platform",
    description: "Social cooking platform with recipe sharing, meal planning, and cooking video tutorials.",
    icon: "🍳",
    tags: ["FSD", "Recipe", "Social", "Video"],
    images: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"]
  },
  {
    id: 244,
    title: "Expense Tracker App",
    description: "Personal finance management with expense tracking, budgeting, and financial goal setting.",
    icon: "💰",
    tags: ["FSD", "Finance", "Budgeting", "Personal"],
    images: ["https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800", "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800"]
  },
  {
    id: 245,
    title: "Portfolio Website Builder",
    description: "Drag-and-drop portfolio builder with templates, hosting, and domain management.",
    icon: "🎨",
    tags: ["FSD", "Portfolio", "Website Builder", "Templates"],
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"]
  },
  {
    id: 246,
    title: "News Aggregator Platform",
    description: "News aggregation and curation platform with personalized feeds and article recommendations.",
    icon: "📰",
    tags: ["FSD", "News", "Aggregator", "Personalization"],
    images: ["https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800", "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800"]
  },
  {
    id: 247,
    title: "Video Conference Platform",
    description: "Video conferencing application with screen sharing, recording, and meeting management features.",
    icon: "📹",
    tags: ["FSD", "Video Conference", "WebRTC", "Screen Share"],
    images: ["https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"]
  },
  {
    id: 248,
    title: "Library Management Portal",
    description: "Digital library system with book catalog, borrowing management, and reading analytics.",
    icon: "📚",
    tags: ["FSD", "Library", "Digital", "Management"],
    images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800", "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800"]
  },
  {
    id: 249,
    title: "CRM Dashboard",
    description: "Customer relationship management platform with sales pipeline, analytics, and automation features.",
    icon: "👥",
    tags: ["FSD", "CRM", "Sales", "Analytics"],
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"]
  },
  {
    id: 250,
    title: "Forum Discussion Platform",
    description: "Community forum with threaded discussions, user moderation, and reputation system.",
    icon: "💭",
    tags: ["FSD", "Forum", "Community", "Discussion"],
    images: ["https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800", "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800"]
  },

  // Python Programming - 25 Projects
  {
    id: 251,
    title: "Data Analysis Dashboard",
    description: "Interactive data visualization dashboard using Pandas, Matplotlib, and Streamlit for business analytics.",
    icon: "📊",
    tags: ["Python", "Data Analysis", "Pandas", "Visualization"],
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800"]
  },
  {
    id: 252,
    title: "Web Scraping Automation",
    description: "Automated web scraping tool using BeautifulSoup and Selenium for data collection and analysis.",
    icon: "🕷️",
    tags: ["Python", "Web Scraping", "Automation", "BeautifulSoup"],
    images: ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"]
  },
  {
    id: 253,
    title: "Machine Learning Pipeline",
    description: "End-to-end ML pipeline with data preprocessing, model training, and deployment using Scikit-learn.",
    icon: "🤖",
    tags: ["Python", "Machine Learning", "Scikit-learn", "Pipeline"],
    images: ["https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800"]
  },
  {
    id: 254,
    title: "Discord Bot Development",
    description: "Feature-rich Discord bot with commands, moderation, music, and database integration.",
    icon: "🤖",
    tags: ["Python", "Discord Bot", "API", "Automation"],
    images: ["https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"]
  },
  {
    id: 255,
    title: "Stock Price Predictor",
    description: "Financial prediction model using Python with real-time data fetching and LSTM neural networks.",
    icon: "📈",
    tags: ["Python", "Finance", "Prediction", "Neural Networks"],
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800"]
  },
  {
    id: 256,
    title: "Password Manager Tool",
    description: "Secure password management application with encryption, password generation, and database storage.",
    icon: "🔐",
    tags: ["Python", "Security", "Encryption", "Password"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 257,
    title: "Weather API Application",
    description: "Weather monitoring app with API integration, forecasting, and location-based alerts.",
    icon: "🌤️",
    tags: ["Python", "API", "Weather", "Alerts"],
    images: ["https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800", "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800"]
  },
  {
    id: 258,
    title: "File Organizer Script",
    description: "Automated file organization tool with custom rules, duplicate detection, and batch processing.",
    icon: "📁",
    tags: ["Python", "Automation", "File Management", "Scripting"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"]
  },
  {
    id: 259,
    title: "Email Automation System",
    description: "Automated email sending and management system with templates, scheduling, and tracking.",
    icon: "📧",
    tags: ["Python", "Email", "Automation", "Scheduling"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },
  {
    id: 260,
    title: "URL Shortener Service",
    description: "URL shortening service with analytics, custom domains, and click tracking using Flask.",
    icon: "🔗",
    tags: ["Python", "Flask", "URL Shortener", "Analytics"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"]
  },
  {
    id: 261,
    title: "PDF Processing Tool",
    description: "PDF manipulation toolkit with merging, splitting, watermarking, and text extraction features.",
    icon: "📄",
    tags: ["Python", "PDF", "Document Processing", "Automation"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"]
  },
  {
    id: 262,
    title: "Social Media Analytics",
    description: "Social media data analysis tool with sentiment analysis, trend detection, and visualization.",
    icon: "📱",
    tags: ["Python", "Social Media", "Analytics", "Sentiment Analysis"],
    images: ["https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800", "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800"]
  },
  {
    id: 263,
    title: "Cryptocurrency Tracker",
    description: "Real-time cryptocurrency price monitoring with alerts, portfolio tracking, and market analysis.",
    icon: "₿",
    tags: ["Python", "Cryptocurrency", "API", "Tracking"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800"]
  },
  {
    id: 264,
    title: "Image Batch Processor",
    description: "Bulk image processing tool with resizing, format conversion, and filter application using Pillow.",
    icon: "🖼️",
    tags: ["Python", "Image Processing", "Batch", "Pillow"],
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"]
  },
  {
    id: 265,
    title: "Quiz Game Generator",
    description: "Interactive quiz application with multiple categories, scoring system, and progress tracking.",
    icon: "🧠",
    tags: ["Python", "Game", "Quiz", "Interactive"],
    images: ["https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800", "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800"]
  },
  {
    id: 266,
    title: "Log File Analyzer",
    description: "Server log analysis tool with pattern detection, error tracking, and performance monitoring.",
    icon: "📋",
    tags: ["Python", "Log Analysis", "Monitoring", "Regex"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"]
  },
  {
    id: 267,
    title: "Voice Assistant Bot",
    description: "Personal voice assistant with speech recognition, natural language processing, and task automation.",
    icon: "🗣️",
    tags: ["Python", "Voice Assistant", "Speech Recognition", "NLP"],
    images: ["https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800", "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"]
  },
  {
    id: 268,
    title: "Network Scanner Tool",
    description: "Network security scanner with port scanning, device discovery, and vulnerability assessment.",
    icon: "🌐",
    tags: ["Python", "Network Security", "Scanning", "Cybersecurity"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800"]
  },
  {
    id: 269,
    title: "Database Migration Tool",
    description: "Database migration and synchronization tool with support for multiple database systems.",
    icon: "🗄️",
    tags: ["Python", "Database", "Migration", "Synchronization"],
    images: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800", "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800"]
  },
  {
    id: 270,
    title: "Task Scheduler App",
    description: "Personal task management and scheduling application with reminders and productivity tracking.",
    icon: "⏰",
    tags: ["Python", "Task Management", "Scheduling", "Productivity"],
    images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800", "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800"]
  },
  {
    id: 271,
    title: "Scientific Calculator",
    description: "Advanced scientific calculator with graphing capabilities, equation solving, and unit conversion.",
    icon: "🔬",
    tags: ["Python", "Calculator", "Scientific", "Mathematics"],
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800"]
  },
  {
    id: 272,
    title: "Text-to-Speech Converter",
    description: "Text-to-speech application with multiple voices, speed control, and file output options.",
    icon: "🔊",
    tags: ["Python", "Text-to-Speech", "Audio", "Accessibility"],
    images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800"]
  },
  {
    id: 273,
    title: "Expense Tracking Tool",
    description: "Personal finance tracker with category management, budget alerts, and spending analysis.",
    icon: "💰",
    tags: ["Python", "Finance", "Expense Tracking", "Budgeting"],
    images: ["https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800", "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800"]
  },
  {
    id: 274,
    title: "Code Quality Analyzer",
    description: "Python code analysis tool with complexity metrics, style checking, and optimization suggestions.",
    icon: "⚙️",
    tags: ["Python", "Code Quality", "Analysis", "Optimization"],
    images: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800", "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800"]
  },
  {
    id: 275,
    title: "API Testing Framework",
    description: "Automated API testing framework with request generation, response validation, and reporting.",
    icon: "🔧",
    tags: ["Python", "API Testing", "Automation", "Framework"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"]
  },

  // Java Development - 25 Projects
  {
    id: 276,
    title: "Spring Boot E-Commerce API",
    description: "RESTful e-commerce API using Spring Boot with JWT authentication, payment integration, and microservices architecture.",
    icon: "🛍️",
    tags: ["Java", "Spring Boot", "REST API", "Microservices"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 277,
    title: "Banking Management System",
    description: "Enterprise banking application with Spring Security, transaction management, and audit logging.",
    icon: "🏦",
    tags: ["Java", "Spring Security", "Banking", "Enterprise"],
    images: ["https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"]
  },
  {
    id: 278,
    title: "Hospital Management Platform",
    description: "Comprehensive hospital management system with patient records, appointment scheduling, and billing.",
    icon: "🏥",
    tags: ["Java", "Healthcare", "Management", "JSF"],
    images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800", "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800"]
  },
  {
    id: 279,
    title: "Library Management System",
    description: "Digital library platform with book catalog, member management, and circulation tracking using Java EE.",
    icon: "📚",
    tags: ["Java", "Java EE", "Library", "Database"],
    images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800", "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800"]
  },
  {
    id: 280,
    title: "Student Information System",
    description: "Academic management platform with grade tracking, attendance, and parent portal using Spring MVC.",
    icon: "🎓",
    tags: ["Java", "Spring MVC", "Education", "Academic"],
    images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"]
  },
  {
    id: 281,
    title: "Inventory Control System",
    description: "Warehouse management application with stock tracking, supplier management, and reporting dashboard.",
    icon: "📦",
    tags: ["Java", "Inventory", "Swing", "Database"],
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"]
  },
  {
    id: 282,
    title: "Chat Application Server",
    description: "Multi-threaded chat server with room management, user authentication, and message history.",
    icon: "💬",
    tags: ["Java", "Socket Programming", "Multi-threading", "Chat"],
    images: ["https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"]
  },
  {
    id: 283,
    title: "File Transfer System",
    description: "Secure file transfer application with encryption, resume capability, and progress tracking.",
    icon: "📁",
    tags: ["Java", "File Transfer", "Network", "Security"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"]
  },
  {
    id: 284,
    title: "Payroll Management System",
    description: "HR payroll application with salary calculation, tax computation, and report generation.",
    icon: "💰",
    tags: ["Java", "Payroll", "HR", "Reporting"],
    images: ["https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800", "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800"]
  },
  {
    id: 285,
    title: "Online Examination Portal",
    description: "Exam management system with question banks, automated grading, and result analytics.",
    icon: "📝",
    tags: ["Java", "Examination", "Spring Boot", "Assessment"],
    images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800", "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800"]
  },
  {
    id: 286,
    title: "Hotel Reservation System",
    description: "Hotel booking platform with room management, customer profiles, and billing integration.",
    icon: "🏨",
    tags: ["Java", "Hotel Management", "Booking", "CRM"],
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800"]
  },
  {
    id: 287,
    title: "Employee Attendance System",
    description: "Attendance tracking application with biometric integration, shift management, and reporting.",
    icon: "⏰",
    tags: ["Java", "Attendance", "Biometric", "Employee"],
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"]
  },
  {
    id: 288,
    title: "Point of Sale System",
    description: "Retail POS application with inventory integration, customer management, and sales analytics.",
    icon: "🛒",
    tags: ["Java", "POS", "Retail", "Sales"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800"]
  },
  {
    id: 289,
    title: "Document Management System",
    description: "Enterprise document management with version control, access permissions, and search functionality.",
    icon: "📄",
    tags: ["Java", "Document Management", "Enterprise", "Version Control"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"]
  },
  {
    id: 290,
    title: "Vehicle Fleet Management",
    description: "Fleet tracking system with GPS integration, maintenance scheduling, and fuel monitoring.",
    icon: "🚛",
    tags: ["Java", "Fleet Management", "GPS", "Tracking"],
    images: ["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800", "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800"]
  },
  {
    id: 291,
    title: "Insurance Management Portal",
    description: "Insurance policy management with claims processing, premium calculation, and customer service.",
    icon: "🛡️",
    tags: ["Java", "Insurance", "Claims", "Policy Management"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 292,
    title: "Sports League Manager",
    description: "Sports tournament management with team registration, match scheduling, and statistics tracking.",
    icon: "⚽",
    tags: ["Java", "Sports", "Tournament", "Statistics"],
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800"]
  },
  {
    id: 293,
    title: "Real Estate CRM",
    description: "Property management CRM with listing management, client tracking, and sales pipeline.",
    icon: "🏠",
    tags: ["Java", "Real Estate", "CRM", "Property"],
    images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"]
  },
  {
    id: 294,
    title: "Supply Chain Management",
    description: "End-to-end supply chain platform with vendor management, procurement, and logistics tracking.",
    icon: "🚚",
    tags: ["Java", "Supply Chain", "Logistics", "Procurement"],
    images: ["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"]
  },
  {
    id: 295,
    title: "Event Management Platform",
    description: "Conference and event management with registration, scheduling, and attendee management.",
    icon: "🎪",
    tags: ["Java", "Event Management", "Conference", "Registration"],
    images: ["https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"]
  },
  {
    id: 296,
    title: "Stock Trading Platform",
    description: "Stock trading application with real-time market data, portfolio management, and risk analysis.",
    icon: "📈",
    tags: ["Java", "Stock Trading", "Finance", "Real-time"],
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800"]
  },
  {
    id: 297,
    title: "Content Management System",
    description: "Web content management platform with WYSIWYG editor, template system, and SEO optimization.",
    icon: "📝",
    tags: ["Java", "CMS", "Web", "Content"],
    images: ["https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800", "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800"]
  },
  {
    id: 298,
    title: "Task Management System",
    description: "Project task management with team collaboration, time tracking, and progress reporting.",
    icon: "📋",
    tags: ["Java", "Task Management", "Collaboration", "Project"],
    images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800", "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800"]
  },
  {
    id: 299,
    title: "Appointment Scheduling System",
    description: "Healthcare appointment management with calendar integration, reminders, and patient records.",
    icon: "📅",
    tags: ["Java", "Appointment", "Healthcare", "Scheduling"],
    images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800", "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800"]
  },
  {
    id: 300,
    title: "Learning Management System",
    description: "Educational LMS with course creation, student enrollment, grading, and progress tracking.",
    icon: "🎓",
    tags: ["Java", "LMS", "Education", "E-learning"],
    images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800"]
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
  const location = useLocation();

  const projectsPerPage = 9;
  const categories = [
    'All', 'PPS', 'OODP', 'APP', 'DSA', 'DBMS', 'AI/ML', 'Cryptography',
    'Digital Image Processing', 'Computer Vision', 'FSD', 'Python', 'Java'
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
    if (selectedCategory === 'All') return 'All Academic Projects';
    return `${selectedCategory} Projects`;
  };

  // Listen for AI bot project selections
  useEffect(() => {
    const handleProjectModalOpen = (event: CustomEvent) => {
      const { project } = event.detail;
      setSelectedProject(project);
    };

    window.addEventListener('openProjectModal', handleProjectModalOpen as EventListener);
    
    return () => {
      window.removeEventListener('openProjectModal', handleProjectModalOpen as EventListener);
    };
  }, []);

  // Handle location state for direct navigation
  useEffect(() => {
    const { state } = location;
    if (state?.selectedProjectId && state?.openModal) {
      const project = allProjects.find(p => p.id === state.selectedProjectId);
      if (project) {
        setSelectedProject(project);
        // Clear the state to prevent reopening on page refresh
        navigate('/projects', { replace: true });
      }
    }
  }, [location, navigate]);

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
                  ? "Explore our complete collection of academic programming projects. Perfect for CSE students and programming enthusiasts."
                  : `Discover amazing ${selectedCategory} projects designed for academic learning and practical implementation.`
                }
              </p>

              {/* Category Badge */}
              {selectedCategory !== 'All' && (
                <div className="inline-flex items-center gap-2 bg-coral/20 dark:bg-coral/30 border border-coral/40 px-4 py-2 rounded-full mt-4 text-sm font-semibold text-coral">
                  <span>🎯</span>
                  <span>Subject: {selectedCategory}</span>
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
        
        {/* Replace existing bot with Enhanced AI Bot */}
        <EnhancedAIBot />
      </div>
    </ThemeProvider>
  );
};

export default Projects;
export {allProjects};