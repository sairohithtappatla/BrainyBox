import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, Loader2, ExternalLink } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    year: '',
    subject: '',
    message: ''
  });
  const [showForm, setShowForm] = useState(true); // Always show form now
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '03b6581a-5dad-4c2e-a46a-72ca57901a38',
          name: formData.name,
          email: formData.email,
          year: formData.year,
          subject: `BrainyBox Contact: ${formData.subject}`,
          message: `
Contact Form Submission from BrainyBox Website

Name: ${formData.name}
Email: ${formData.email}
Study Year: ${formData.year || 'Not specified'}
Subject: ${formData.subject}

Message:
${formData.message}

---
Submitted at: ${new Date().toLocaleString()}
          `,
          from_name: 'BrainyBox Contact Form',
          to_email: 'brainybox459@gmail.com',
          replyTo: formData.email,
          redirect: false
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', year: '', subject: '', message: '' });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced email handler for better Gmail integration
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Pre-filled email data
    const subject = encodeURIComponent('Inquiry from BrainyBox Website');
    const body = encodeURIComponent(`Hello BrainyBox Team,

I'm interested in learning more about your services.

Best regards`);

    // Try to open Gmail compose directly
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=brainybox459@gmail.com&su=${subject}&body=${body}`;

    // Fallback to mailto
    const mailtoUrl = `mailto:brainybox459@gmail.com?subject=${subject}&body=${body}`;

    // Try Gmail first, then fallback to default email client
    const popup = window.open(gmailUrl, '_blank', 'width=800,height=600');

    // If popup is blocked or Gmail doesn't open, use mailto
    setTimeout(() => {
      if (!popup || popup.closed) {
        window.location.href = mailtoUrl;
      }
    }, 1000);
  };

  // WhatsApp handler
  const handleWhatsAppClick = () => {
    const phoneNumber = '918247439347';
    const message = encodeURIComponent(`Hello BrainyBox Team!

I'm interested in your amazing academic programming projects and would like to discuss:

What I'm looking for:
• Academic programming projects
• Complete source code solutions
• Documentation and support
• Pricing and delivery details

Subjects I'm interested in:
• Programming for Problem Solving (PPS)
• Object-Oriented Design & Programming (OODP)
• Data Structures & Algorithms (DSA)
• Full Stack Development (FSD)
• AI/ML Projects
• Database Management Systems (DBMS)
• And more...

Could you please help me find the perfect project for my academic needs?

Looking forward to working with you!`);

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get in touch via email',
      contact: 'brainybox459@gmail.com',
      href: 'mailto:brainybox459@gmail.com',
      onClick: handleEmailClick,
      special: true
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: '24/7 support available',
      contact: '+91 8247439347',
      href: 'tel:+918247439347'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Our Workspace Location',
      contact: 'SRM University, Chennai',
      href: 'https://maps.google.com/search/SRM+University+Chennai'
    }
  ];

  const subjects = [
    'General Inquiry',
    'Project Consultation',
    'Technical Support',
    'Custom Development',
    'Pricing Information',
    'Other'
  ];

  return (
    <section className="py-20 sm:py-24 px-6 bg-background relative overflow-hidden" id="contact">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-coral/5 dark:bg-coral/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-raspberry/5 dark:bg-raspberry/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-lavender/10 dark:bg-lavender/20 rounded-full blur-xl animate-bounce-gentle" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 bg-coral/10 dark:bg-coral/20 border border-coral/30 dark:border-coral/40 px-6 py-3 rounded-full mb-8 text-base font-semibold text-coral shadow-lg backdrop-blur-md">
            <span className="text-lg">📧</span>
            <span>Get In Touch</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-foreground leading-tight">
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-coral to-raspberry bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? Our expert team is here to help you
            <span className="text-coral font-semibold"> build exceptional software solutions</span> that
            drive your business forward.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Contact Info - Enhanced Cards */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-8 text-foreground">Contact Information</h3>

            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div
                    key={index}
                    onClick={info.onClick || (() => window.open(info.href, '_blank'))}
                    className={`group flex items-start gap-3 p-4 bg-card dark:bg-card/80 backdrop-blur-md rounded-xl border transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer ${info.special
                      ? 'border-coral/50 hover:border-coral shadow-lg hover:shadow-coral/20 dark:hover:shadow-coral/30'
                      : 'border-border/40 hover:border-coral/50'
                      }`}
                  >
                    <div className={`bg-gradient-to-br w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${info.special
                      ? 'from-coral/20 to-raspberry/20 dark:from-coral/30 dark:to-raspberry/30 shadow-md'
                      : 'from-coral/10 to-raspberry/10 dark:from-coral/20 dark:to-raspberry/20'
                      }`}>
                      <IconComponent className="w-5 h-5 text-coral" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-foreground group-hover:text-coral transition-colors duration-300 text-sm">
                          {info.title}
                        </h4>
                        {info.special && (
                          <ExternalLink className="w-3 h-3 text-coral opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{info.description}</p>
                      <p className="text-coral font-medium text-sm">{info.contact}</p>
                      {info.special && (
                        <p className="text-xs text-coral/70 mt-1">Click to compose email</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-coral/5 to-raspberry/5 dark:from-coral/10 dark:to-raspberry/10 rounded-2xl p-6 border border-coral/20 dark:border-coral/30 mb-6">
              <h4 className="font-bold text-foreground mb-3">Why Choose BrainyBox?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-coral rounded-full" />
                  <span>Enterprise-grade solutions</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-coral rounded-full" />
                  <span>24/7 expert support</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-coral rounded-full" />
                  <span>Proven track record</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-coral rounded-full" />
                  <span>Custom solutions available</span>
                </li>
              </ul>
            </div>

            {/* WhatsApp Button */}
            <div>
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 font-bold transition-all duration-300 hover:scale-105 rounded-xl shadow-lg hover:shadow-green-500/25"
              >
                <span> 💬  Chat on WhatsApp</span>
              </Button>
            </div>
          </div>

          {/* Contact Form - Fixed Dark Mode Styling */}
          <div className="lg:col-span-2">
            <div className="bg-card/80 dark:bg-card/60 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-border/30 dark:border-border/20 relative overflow-hidden shadow-xl dark:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-coral/3 to-raspberry/3 dark:from-coral/5 dark:to-raspberry/5 opacity-50" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 text-foreground">Send us a Message</h3>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50/90 dark:bg-green-950/50 border border-green-200/60 dark:border-green-800/40 rounded-xl flex items-center gap-3 backdrop-blur-sm">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        Message sent successfully!
                      </p>
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitError && (
                  <div className="mb-6 p-4 bg-red-50/90 dark:bg-red-950/50 border border-red-200/60 dark:border-red-800/40 rounded-xl backdrop-blur-sm">
                    <p className="text-red-800 dark:text-red-200 font-medium">
                      {submitError}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-border/50 dark:border-border/30 bg-background/70 dark:bg-background/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/60 dark:focus:border-coral/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-foreground placeholder:text-muted-foreground/70"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-border/50 dark:border-border/30 bg-background/70 dark:bg-background/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/60 dark:focus:border-coral/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-foreground placeholder:text-muted-foreground/70"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="year" className="block text-sm font-medium text-foreground mb-2">
                        Study Year
                      </label>
                      <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-border/50 dark:border-border/30 bg-background/70 dark:bg-background/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/60 dark:focus:border-coral/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-foreground appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.75rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em'
                        }}
                      >
                        <option value="" className="text-muted-foreground">Select your year</option>
                        <option value="1st Year" className="text-foreground bg-background">1st Year</option>
                        <option value="2nd Year" className="text-foreground bg-background">2nd Year</option>
                        <option value="3rd Year" className="text-foreground bg-background">3rd Year</option>
                        <option value="4th Year" className="text-foreground bg-background">4th Year</option>
                        <option value="Graduate" className="text-foreground bg-background">Graduate</option>
                        <option value="Professional" className="text-foreground bg-background">Professional</option>
                        <option value="Other" className="text-foreground bg-background">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-border/50 dark:border-border/30 bg-background/70 dark:bg-background/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/60 dark:focus:border-coral/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-foreground appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.75rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em'
                        }}
                      >
                        <option value="" className="text-muted-foreground">Select a subject</option>
                        {subjects.map((subject, index) => (
                          <option key={index} value={subject} className="text-foreground bg-background">
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-border/50 dark:border-border/30 bg-background/70 dark:bg-background/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/60 dark:focus:border-coral/50 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed text-foreground placeholder:text-muted-foreground/70"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-coral to-raspberry hover:from-coral/90 hover:to-raspberry/90 text-white px-8 py-4 text-lg font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_20px_60px_rgba(226,109,90,0.4)] dark:hover:shadow-[0_20px_60px_rgba(226,109,90,0.6)] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Message...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Your message will be sent directly to our team.
                    <br />
                    We typically respond within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
