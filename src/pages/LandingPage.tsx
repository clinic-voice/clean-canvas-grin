import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Phone, MessageSquare, Calendar, Users, Mic, BarChart3, 
  Shield, Clock, TrendingUp, CheckCircle2, Star, ArrowRight,
  Stethoscope, Pill, CreditCard, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Mic,
    title: "Tamil Voice AI",
    description: "24/7 AI that speaks fluent Tamil for appointment booking",
    highlight: "95% Resolution",
    color: "from-cv-secondary to-cv-danger",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Integration",
    description: "All communications via WhatsApp - no app needed",
    highlight: "Native API",
    color: "from-cv-success to-cv-primary",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI-powered appointment management with reminders",
    highlight: "50% Less No-Shows",
    color: "from-cv-blue to-cv-accent",
  },
  {
    icon: Users,
    title: "Patient CRM",
    description: "Complete patient profiles with family management",
    highlight: "360° View",
    color: "from-cv-accent to-cv-pink",
  },
  {
    icon: Stethoscope,
    title: "Clinical EMR",
    description: "ABDM-compliant records with e-prescriptions",
    highlight: "ABDM Ready",
    color: "from-cv-primary to-cv-blue",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time insights and revenue forecasting",
    highlight: "AI-Powered",
    color: "from-cv-pink to-cv-secondary",
  },
];

const impactMetrics = [
  { label: "Patient No-Shows", before: "25-30%", after: "10-15%", improvement: "50% Reduction" },
  { label: "Missed Calls", before: "40-50%", after: "<5%", improvement: "95% Resolved" },
  { label: "Daily Patients", before: "30-40", after: "40-55", improvement: "+30% Increase" },
  { label: "Staff Phone Time", before: "4-5 hrs", after: "<1 hr", improvement: "80% Reduction" },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "₹2,999",
    period: "/month",
    description: "Perfect for small clinics",
    features: ["Voice AI (100 calls/month)", "WhatsApp Booking", "Basic EMR", "5 Staff Accounts"],
    popular: false,
  },
  {
    name: "Professional",
    price: "₹7,999",
    period: "/month",
    description: "For growing practices",
    features: ["Voice AI (500 calls/month)", "WhatsApp + SMS", "Full EMR & E-Rx", "Unlimited Staff", "Analytics Dashboard", "Priority Support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₹19,999",
    period: "/month",
    description: "Multi-location hospitals",
    features: ["Unlimited Voice AI", "Custom Integrations", "On-Premise Option", "Dedicated Account Manager", "Custom Training", "SLA Guarantee"],
    popular: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-cv-text-primary">ClinicVoice</span>
              <span className="text-lg font-bold text-cv-primary-light"> AI</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-cv-text-secondary hover:text-cv-text-primary transition-colors">Features</a>
            <a href="#impact" className="text-sm text-cv-text-secondary hover:text-cv-text-primary transition-colors">Impact</a>
            <a href="#pricing" className="text-sm text-cv-text-secondary hover:text-cv-text-primary transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/auth">
              <Button className="gradient-primary text-white" size="sm">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cv-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cv-accent/15 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block px-6 py-2 rounded-full gradient-secondary text-white text-sm font-bold uppercase tracking-wider mb-8 animate-pulse">
              Enterprise Solution
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              <span className="gradient-text">Tamil-First AI</span>
              <br />
              <span className="text-cv-text-primary">Clinic Management</span>
            </h1>
            
            <p className="text-xl text-cv-text-secondary max-w-3xl mx-auto mb-10">
              The only clinic management solution with native Tamil Voice AI for appointment booking, 
              patient engagement, and practice growth
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Link to="/auth">
                <Button size="lg" className="gradient-primary text-white gap-2 px-8 py-6 text-lg">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 px-8 py-6 text-lg border-cv-primary/50 hover:bg-cv-primary/10">
                <Phone className="w-5 h-5" />
                Book Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { value: "90+", label: "Features" },
                { value: "95%", label: "Call Resolution" },
                { value: "50%", label: "No-Show Reduction" },
                { value: "24/7", label: "AI Availability" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-extrabold text-cv-primary-light">{stat.value}</p>
                  <p className="text-sm text-cv-text-muted uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cv-primary/20 text-cv-primary-light">
              Features
            </span>
            <h2 className="text-4xl font-extrabold text-cv-text-primary mt-4 mb-4">
              Everything Your Clinic Needs
            </h2>
            <p className="text-lg text-cv-text-secondary max-w-2xl mx-auto">
              90+ features across Voice AI, Patient Management, Clinical EMR, and Business Analytics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-card border border-border p-6 hover:border-cv-primary/30 transition-all hover:shadow-xl group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-cv-text-primary mb-2">{feature.title}</h3>
                <p className="text-cv-text-secondary mb-4">{feature.description}</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-cv-success/20 text-cv-success">
                  {feature.highlight}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cv-secondary/20 text-cv-secondary">
              Impact
            </span>
            <h2 className="text-4xl font-extrabold text-cv-text-primary mt-4 mb-4">
              Real Results for Clinics
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-card border border-border p-6 text-center"
              >
                <p className="text-sm text-cv-text-muted mb-4">{metric.label}</p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div>
                    <p className="text-lg font-bold text-cv-danger line-through">{metric.before}</p>
                    <p className="text-xs text-cv-text-muted">Before</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-cv-primary-light" />
                  <div>
                    <p className="text-lg font-bold text-cv-success">{metric.after}</p>
                    <p className="text-xs text-cv-text-muted">After</p>
                  </div>
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-cv-primary/20 text-cv-primary-light">
                  {metric.improvement}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cv-accent/20 text-cv-accent">
              Pricing
            </span>
            <h2 className="text-4xl font-extrabold text-cv-text-primary mt-4 mb-4">
              Affordable for Every Clinic
            </h2>
            <p className="text-lg text-cv-text-secondary">
              Starting at just ₹2,999/month - 10x cheaper than competitors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 ${
                  plan.popular 
                    ? "bg-gradient-to-br from-cv-primary/20 to-cv-accent/10 border-2 border-cv-primary" 
                    : "bg-card border border-border"
                }`}
              >
                {plan.popular && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-cv-primary text-white mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold text-cv-text-primary">{plan.name}</h3>
                <p className="text-cv-text-muted text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-cv-text-primary">{plan.price}</span>
                  <span className="text-cv-text-muted">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-cv-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-cv-success flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? "gradient-primary text-white" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-cv-text-primary mb-6">
            Ready to Transform Your Clinic?
          </h2>
          <p className="text-lg text-cv-text-secondary mb-8">
            Join 500+ clinics across Tamil Nadu using ClinicVoice AI
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gradient-primary text-white gap-2 px-8">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 px-8">
              <Phone className="w-5 h-5" />
              Call: +91 98765 43210
            </Button>
          </div>
          <p className="text-sm text-cv-text-muted mt-6">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-cv-text-muted">
              © 2026 ClinicVoice AI by Santhira (Terv Pro Technology Pvt Ltd)
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-cv-text-muted">
            <a href="#" className="hover:text-cv-text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-cv-text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-cv-text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
