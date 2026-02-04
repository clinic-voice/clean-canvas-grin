import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Phone, MessageSquare, Calendar, Users, Mic, BarChart3, 
  Shield, Clock, TrendingUp, CheckCircle2, Star, ArrowRight,
  Stethoscope, Pill, CreditCard, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "@/components/clinicvoice/FloatingParticles";

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
      {/* Navigation - Professional & Clean */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-semibold text-foreground tracking-tight">ClinicVoice</span>
              <span className="text-lg font-semibold text-primary"> AI</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#impact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Impact</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Login</Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Professional & Clean */}
      <section className="pt-36 pb-24 px-6 relative overflow-hidden">
        {/* Subtle background - minimal, professional */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-transparent to-transparent" />
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider mb-8">
              Enterprise Healthcare Solution
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
              <span className="text-foreground">Tamil-First AI</span>
              <br />
              <span className="text-primary">Clinic Management</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              The only clinic management solution with native Tamil Voice AI for appointment booking, 
              patient engagement, and practice growth
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Link to="/auth">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8 h-12 text-base font-medium">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 px-8 h-12 text-base font-medium border-border hover:bg-muted">
                <Phone className="w-4 h-4" />
                Book Demo
              </Button>
            </div>

            {/* Stats - Clean grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { value: "90+", label: "Features" },
                { value: "95%", label: "Call Resolution" },
                { value: "50%", label: "No-Show Reduction" },
                { value: "24/7", label: "AI Availability" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Clean cards */}
      <section id="features" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-6 mb-4">
              Everything Your Clinic Needs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                className="rounded-xl bg-card border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  {feature.highlight}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section - Clean metrics */}
      <section id="impact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
              Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-6 mb-4">
              Real Results for Clinics
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl bg-card border border-border p-6 text-center hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-muted-foreground mb-4 font-medium">{metric.label}</p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div>
                    <p className="text-lg font-semibold text-red-500 line-through">{metric.before}</p>
                    <p className="text-xs text-muted-foreground">Before</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-lg font-semibold text-green-600">{metric.after}</p>
                    <p className="text-xs text-muted-foreground">After</p>
                  </div>
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {metric.improvement}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Clean cards */}
      <section id="pricing" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
              Pricing
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-6 mb-4">
              Affordable for Every Clinic
            </h2>
            <p className="text-lg text-muted-foreground">
              Starting at just ₹2,999/month - 10x cheaper than competitors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl p-8 ${
                  plan.popular 
                    ? "bg-primary text-primary-foreground shadow-xl scale-105" 
                    : "bg-card border border-border"
                }`}
              >
                {plan.popular && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-foreground'}`}>{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.popular ? 'text-white/70' : 'text-muted-foreground'}`}>{plan.description}</p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-foreground'}`}>{plan.price}</span>
                  <span className={plan.popular ? 'text-white/70' : 'text-muted-foreground'}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className={`flex items-center gap-2 text-sm ${plan.popular ? 'text-white/90' : 'text-muted-foreground'}`}>
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-green-600'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Clean & Professional */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Clinic?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join 500+ clinics across Tamil Nadu using ClinicVoice AI
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 px-8 border-border hover:bg-muted" asChild>
              <a href="tel:+919176772077">
                <Phone className="w-4 h-4" />
                Call: +91 9176772077
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer - Clean */}
      <footer className="py-12 px-6 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">
              © 2026 ClinicVoice AI by Santhira (Terv Pro Technology Pvt Ltd)
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
