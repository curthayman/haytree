import { useEffect } from "react";
import { motion } from "framer-motion";
import { Palette, Code, Settings, Sprout, Hammer, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { ScrollProgress } from "@/components/scroll-progress";
import { FloatingParticles } from "@/components/floating-particles";
import { AnimatedTree } from "@/components/animated-tree";
import { TechBackground } from "@/components/tech-background";
import { FloatingCode } from "@/components/floating-code";
import { TerminalWidget } from "@/components/terminal-widget";
import { PasswordChecker } from "@/components/password-checker";
import { ContactForm } from "@/components/contact-form";
import { Testimonials } from "@/components/testimonials";
import { smoothScrollTo } from "@/lib/scroll-utils";
import logoPath from "@assets/HayTree_Web_Services_LLC_Green_1755799665804.png";

export default function Home() {
  useEffect(() => {
    // Set page title and meta description
    document.title = "HayTree Web Services - Delaware's Trusted Web Partner";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'HayTree Web Services offers comprehensive web solutions including website design, development, maintenance, security, and content updates. Delaware\'s trusted web partner helping businesses grow online.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'HayTree Web Services offers comprehensive web solutions including website design, development, maintenance, security, and content updates. Delaware\'s trusted web partner helping businesses grow online.';
      document.head.appendChild(meta);
    }
  }, []);

  const services = [
    {
      title: "Website Design",
      description: "Beautiful, responsive websites that reflect your brand and values—like leaves unique to every tree.",
      icon: Palette,
      color: "text-[var(--tree-green)]",
      bgColor: "bg-[var(--tree-green)]/10 group-hover:bg-[var(--tree-green)]/20"
    },
    {
      title: "Web Development", 
      description: "Robust, scalable solutions—your digital trunk and branches, built to last and adapt as you grow.",
      icon: Code,
      color: "text-[var(--tree-blue)]",
      bgColor: "bg-[var(--tree-blue)]/10 group-hover:bg-[var(--tree-blue)]/20"
    },
    {
      title: "Maintenance",
      description: "We nurture your site with security updates, and support—so your business stays evergreen.",
      icon: Settings,
      color: "text-[var(--accent-green)]",
      bgColor: "bg-[var(--accent-green)]/10 group-hover:bg-[var(--accent-green)]/20"
    }
  ];

  const processSteps = [
    {
      title: "Plant the Seed",
      description: "We listen to your vision and goals, laying the foundation for growth.",
      icon: Sprout,
      gradient: "from-[var(--tree-green)] to-[var(--accent-green)]"
    },
    {
      title: "Nurture & Build", 
      description: "We design, develop, and refine your digital presence with care and expertise.",
      icon: Hammer,
      gradient: "from-[var(--tree-blue)] to-blue-600"
    },
    {
      title: "Grow & Support",
      description: "We launch, host, and support your site—helping your business reach new heights.",
      icon: Rocket,
      gradient: "from-[var(--accent-green)] to-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <TechBackground />
      <FloatingCode />
      <TerminalWidget />
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 tech-grid overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-blue-900/90"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
            <motion.div 
              className="text-center lg:text-left py-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Delaware's<br />
                <span className="text-[var(--tree-green)]">Trusted</span><br />
                Web Partner
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                All your website services in one place. Website Security, Design, Maintenance, Content Updates & Pen Testing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => smoothScrollTo('contact')}
                  size="lg"
                  className="bg-[var(--tree-green)] text-white hover:bg-[var(--accent-green)] transform hover:scale-105 shadow-lg text-lg px-8 py-4"
                  data-testid="button-cta-primary"
                >
                  Let's Grow Together
                </Button>
                <Button
                  variant="outline"
                  onClick={() => smoothScrollTo('services')}
                  size="lg"
                  className="border-2 border-[var(--tree-green)] text-[var(--tree-green)] hover:bg-[var(--tree-green)] hover:text-white text-lg px-8 py-4"
                  data-testid="button-cta-secondary"
                >
                  Explore Services
                </Button>
              </div>
            </motion.div>

            <AnimatedTree />
          </div>
        </div>
      </section>

      {/* Our Roots Section */}
      <section className="py-20 bg-white" data-testid="roots-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[var(--dark-navy)] mb-6">Our Roots</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              At HayTree, we believe every business is like a tree: it needs strong roots, a healthy environment, and the right support to flourish. Our roots are in integrity, innovation, and a passion for helping others thrive in the digital world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 relative overflow-hidden" data-testid="services-section">
        {/* Tech orbs */}
        <div className="tech-orb w-96 h-96 -top-48 -left-48"></div>
        <div className="tech-orb w-64 h-64 -bottom-32 -right-32"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[var(--dark-navy)] mb-6">Some Of Our Branches</h2>
            <p className="text-xl text-gray-600">Growing your digital presence with expert care</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors ${service.bgColor}`}>
                      <service.icon className={`text-2xl ${service.color}`} size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--dark-navy)] mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className={`flex items-center font-semibold ${service.color} group-hover:translate-x-2 transition-transform`}>
                      <span>Learn More</span>
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-white" data-testid="process-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[var(--dark-navy)] mb-6">How We Grow</h2>
            <p className="text-xl text-gray-600">Our proven process for digital success</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                data-testid={`process-step-${index}`}
              >
                <div className="relative mb-8">
                  <motion.div 
                    className={`w-24 h-24 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <step.icon className="text-white text-3xl" size={32} />
                  </motion.div>
                  {index < processSteps.length - 1 && (
                    <div className="absolute top-12 left-1/2 w-px h-16 bg-gradient-to-b from-[var(--tree-green)] to-transparent transform -translate-x-1/2 hidden md:block"></div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-[var(--dark-navy)] mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <PasswordChecker />
      <ContactForm />

      {/* Footer */}
      <footer className="bg-[var(--dark-navy)] text-white py-12" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src={logoPath} 
                  alt="HayTree Web Services Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold">HayTree</span>
              </div>
              <p className="text-gray-400">Delaware's trusted web partner, helping businesses grow their digital presence.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => smoothScrollTo('services')} className="hover:text-[var(--tree-green)] transition-colors">Website Design</button></li>
                <li><button onClick={() => smoothScrollTo('services')} className="hover:text-[var(--tree-green)] transition-colors">Web Development</button></li>
                <li><button onClick={() => smoothScrollTo('services')} className="hover:text-[var(--tree-green)] transition-colors">Website Maintenance</button></li>
                <li><button onClick={() => smoothScrollTo('services')} className="hover:text-[var(--tree-green)] transition-colors">Security & Testing</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => smoothScrollTo('contact')} className="hover:text-[var(--tree-green)] transition-colors">Contact Us</button></li>
                <li>
                  <a 
                    href="https://g.page/r/Cc1QvmdAMe4GEAI/review" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[var(--tree-green)] transition-colors"
                  >
                    Leave a Review
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HayTree Web Services, LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
