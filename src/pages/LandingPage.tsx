import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Phone, MessageSquare, Calendar, Users, Mic, BarChart3, 
  Shield, Clock, TrendingUp, CheckCircle2, Star, ArrowRight,
  Stethoscope, Pill, ChevronRight, Play, Zap, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Mic,
    title: "Tamil Voice AI",
    description: "24/7 AI assistant that speaks fluent Tamil for seamless appointment booking and patient queries",
    highlight: "95% Resolution",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Integration",
    description: "Native WhatsApp Business API for reminders, prescriptions, and patient communication",
    highlight: "2x Engagement",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI-powered calendar with automatic conflict resolution and smart slot optimization",
    highlight: "50% Less No-Shows",
  },
  {
    icon: Users,
    title: "Patient CRM",
    description: "Complete patient profiles with family management, visit history, and preferences",
    highlight: "360° View",
  },
  {
    icon: Stethoscope,
    title: "Clinical EMR",
    description: "ABDM-compliant electronic medical records with e-prescriptions and lab integrations",
    highlight: "ABDM Ready",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time insights, revenue forecasting, and operational metrics at your fingertips",
    highlight: "AI-Powered",
  },
];

const impactMetrics = [
  { value: "50%", label: "Fewer No-Shows", description: "Smart reminders via WhatsApp" },
  { value: "95%", label: "Call Resolution", description: "Tamil Voice AI handles queries" },
  { value: "30%", label: "More Patients", description: "Optimized scheduling" },
  { value: "80%", label: "Time Saved", description: "Automated admin tasks" },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for small clinics getting started",
    features: ["Voice AI (100 calls/month)", "WhatsApp Booking", "Basic EMR", "5 Staff Accounts", "Email Support"],
    popular: false,
  },
  {
    name: "Professional",
    price: "₹1,000",
    period: "/month",
    description: "For growing practices",
    features: ["Voice AI (500 calls/month)", "WhatsApp + SMS", "Full EMR & E-Rx", "Unlimited Staff", "Analytics Dashboard", "Priority Support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₹2,000",
    period: "/month",
    description: "Multi-location hospitals",
    features: ["Unlimited Voice AI", "Custom Integrations", "On-Premise Option", "Dedicated Account Manager", "Custom Training", "SLA Guarantee"],
    popular: false,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation - Modern & Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-teal flex items-center justify-center shadow-md">
              <Phone className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-semibold text-foreground tracking-tight">
              Clinic<span className="text-primary">Voice</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#impact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Impact</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Log in
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="gradient-teal text-white border-0 shadow-md hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clean & Modern */}
      <section className="pt-28 md:pt-36 pb-20 md:pb-28 px-4 md:px-6 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/8 via-accent/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <Zap className="w-3.5 h-3.5" />
              Tamil-First Healthcare AI
            </div>
            
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
              <span className="text-foreground">Your Clinic,</span>
              <br />
              <span className="text-gradient-teal">Powered by AI</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              The only clinic management solution with native Tamil Voice AI. 
              Automate appointments, engage patients, and grow your practice.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
              <Link to="/auth">
                <Button size="lg" className="gradient-teal text-white border-0 shadow-lg hover:shadow-xl hover:opacity-95 transition-all gap-2 px-6 h-12 text-base font-medium w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 px-6 h-12 text-base font-medium border-border/60 hover:bg-secondary/50 w-full sm:w-auto">
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {[
                { value: "500+", label: "Clinics" },
                { value: "24/7", label: "AI Support" },
                { value: "95%", label: "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 px-4 md:px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Globe className="w-3 h-3" />
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Everything Your Clinic Needs
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              90+ features across Voice AI, Patient Management, Clinical EMR, and Business Analytics
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group rounded-2xl bg-card border border-border/60 p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl gradient-teal flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-md">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {feature.highlight}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 md:py-28 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              <TrendingUp className="w-3 h-3" />
              Impact
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Real Results for Clinics
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See how ClinicVoice transforms healthcare practices across Tamil Nadu
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {impactMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="rounded-2xl bg-card border border-border/60 p-6 text-center hover:shadow-md transition-shadow"
              >
                <p className="text-3xl md:text-4xl font-bold text-gradient-teal mb-2">{metric.value}</p>
                <p className="text-sm font-semibold text-foreground mb-1">{metric.label}</p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-28 px-4 md:px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Pricing
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Start free, upgrade from just ₹1,000/month — 10x cheaper than competitors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={`relative rounded-2xl p-6 md:p-7 ${
                  plan.popular 
                    ? "gradient-teal text-white shadow-xl ring-2 ring-primary/20 md:scale-[1.03]" 
                    : "bg-card border border-border/60"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-white text-primary shadow-md">
                    Most Popular
                  </span>
                )}
                <h3 className={`text-lg font-bold mb-1 ${plan.popular ? 'text-white' : 'text-foreground'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-5 ${plan.popular ? 'text-white/70' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.popular ? 'text-white/70' : 'text-muted-foreground'}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className={`flex items-start gap-2.5 text-sm ${plan.popular ? 'text-white/90' : 'text-muted-foreground'}`}>
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full h-11 font-medium ${
                    plan.popular 
                      ? "bg-white text-primary hover:bg-white/90" 
                      : "gradient-teal text-white hover:opacity-90"
                  }`}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 tracking-tight">
              Ready to Transform Your Clinic?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join 500+ clinics across Tamil Nadu using ClinicVoice AI to deliver better patient care
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/auth">
                <Button size="lg" className="gradient-teal text-white border-0 shadow-lg hover:shadow-xl hover:opacity-95 transition-all gap-2 px-6 h-12 text-base font-medium">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 px-6 h-12 text-base font-medium border-border/60" asChild>
                <a href="tel:+919176772077">
                  <Phone className="w-4 h-4" />
                  +91 9176772077
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              14-day free trial • No credit card required
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 md:px-6 border-t border-border/60 bg-secondary/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-teal flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-muted-foreground">
              © 2026 ClinicVoice AI by Terv Pro Technology
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
