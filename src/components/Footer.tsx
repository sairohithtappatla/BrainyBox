import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    Product: [
      { name: 'Featured Projects', href: '#projects' },
      { name: 'Solutions', href: '#solutions' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Documentation', href: '#docs' },
    ],
    Company: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' },
    ],
    Resources: [
      { name: 'Help Center', href: '#help' },
      { name: 'API Reference', href: '#api' },
      { name: 'Community', href: '#community' },
      { name: 'Status', href: '#status' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:brainybox459@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-background border-t border-border/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-coral/3 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-raspberry/3 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 sm:py-20">
          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-coral/10 to-raspberry/10 rounded-3xl p-8 sm:p-12 border border-coral/20 mb-16">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                Stay Updated with BrainyBox
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Get the latest updates on new projects, features, and exclusive developer resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border border-border/40 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/50 transition-all duration-300"
                />
                <Button className="bg-gradient-to-r from-coral to-raspberry hover:from-coral/90 hover:to-raspberry/90 text-white px-8 py-3 font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-105 rounded-xl">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
            {/* Logo & Description */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <div className="mb-6">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-coral via-raspberry to-coral bg-clip-text text-transparent tracking-tight mb-4">
                  BrainyBox
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Empowering developers with premium, enterprise-grade solutions that accelerate innovation and drive success.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-10 h-10 bg-background/80 backdrop-blur-sm border border-border/40 rounded-xl flex items-center justify-center hover:border-coral/50 hover:bg-coral/10 transition-all duration-300 hover:scale-110"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-coral transition-colors duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-bold text-foreground mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-coral transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/30 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-muted-foreground text-sm">
              © 2025 BrainyBox. All rights reserved. Built with ❤️ for students.
            </p>
          </div>

          <Button
            onClick={scrollToTop}
            variant="outline"
            size="icon"
            className="bg-background/80 backdrop-blur-sm border border-border/40 hover:border-coral/50 hover:bg-coral/10 transition-all duration-300 hover:scale-110 rounded-xl"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;