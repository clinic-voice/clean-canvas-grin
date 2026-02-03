import { useState } from "react";
import { DashboardLayout } from "@/components/clinicvoice/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  Search,
  Plus,
  Download,
  IndianRupee,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  MoreVertical,
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  patientName: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "cancelled";
  paymentMethod?: string;
  services: string;
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2026-001",
    patientName: "Priya Lakshmi",
    date: "2026-02-03",
    amount: 1500,
    status: "paid",
    paymentMethod: "UPI",
    services: "General Consultation",
  },
  {
    id: "2",
    invoiceNumber: "INV-2026-002",
    patientName: "Rajesh Kumar",
    date: "2026-02-03",
    amount: 3200,
    status: "pending",
    services: "Diabetes Review + Lab Tests",
  },
  {
    id: "3",
    invoiceNumber: "INV-2026-003",
    patientName: "Meera Sundaram",
    date: "2026-02-02",
    amount: 2500,
    status: "paid",
    paymentMethod: "Card",
    services: "Follow-up + Medications",
  },
  {
    id: "4",
    invoiceNumber: "INV-2026-004",
    patientName: "Karthik Venkat",
    date: "2026-02-01",
    amount: 5800,
    status: "overdue",
    services: "Full Health Checkup",
  },
  {
    id: "5",
    invoiceNumber: "INV-2026-005",
    patientName: "Anitha Rajan",
    date: "2026-02-01",
    amount: 1200,
    status: "paid",
    paymentMethod: "Cash",
    services: "Blood Pressure Consultation",
  },
  {
    id: "6",
    invoiceNumber: "INV-2026-006",
    patientName: "Suresh Pillai",
    date: "2026-01-31",
    amount: 4500,
    status: "cancelled",
    services: "Cardiac Evaluation",
  },
];

const stats = [
  {
    title: "Today's Revenue",
    value: "₹28,500",
    icon: IndianRupee,
    color: "text-cv-success",
    bgColor: "bg-cv-success/10",
    change: "+12%",
  },
  {
    title: "Pending Payments",
    value: "₹45,200",
    icon: Clock,
    color: "text-cv-warning",
    bgColor: "bg-cv-warning/10",
    change: "8 invoices",
  },
  {
    title: "Monthly Revenue",
    value: "₹3.2L",
    icon: TrendingUp,
    color: "text-cv-primary-light",
    bgColor: "bg-cv-primary/10",
    change: "+18%",
  },
  {
    title: "Collection Rate",
    value: "94%",
    icon: CheckCircle2,
    color: "text-cv-blue",
    bgColor: "bg-cv-blue/10",
    change: "+2%",
  },
];

export default function Billing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return {
          label: "Paid",
          className: "bg-cv-success/20 text-cv-success",
          icon: CheckCircle2,
        };
      case "pending":
        return {
          label: "Pending",
          className: "bg-cv-warning/20 text-cv-warning",
          icon: Clock,
        };
      case "overdue":
        return {
          label: "Overdue",
          className: "bg-cv-danger/20 text-cv-danger",
          icon: XCircle,
        };
      case "cancelled":
        return {
          label: "Cancelled",
          className: "bg-muted text-cv-text-muted",
          icon: XCircle,
        };
    }
  };

  return (
    <DashboardLayout
      title="Billing"
      subtitle="Manage invoices, payments, and financial reports"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl bg-card border border-border p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-xs font-medium text-cv-success">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-cv-text-primary">{stat.value}</p>
            <p className="text-xs text-cv-text-muted">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-text-muted" />
              <Input
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/30 border-border"
              />
            </div>
            <div className="flex gap-1">
              {["all", "paid", "pending", "overdue"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? "gradient-primary border-0" : ""}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2 gradient-primary border-0">
              <Plus className="w-4 h-4" />
              New Invoice
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-cv-text-muted">Invoice</TableHead>
                <TableHead className="text-cv-text-muted">Patient</TableHead>
                <TableHead className="text-cv-text-muted">Services</TableHead>
                <TableHead className="text-cv-text-muted">Date</TableHead>
                <TableHead className="text-cv-text-muted">Amount</TableHead>
                <TableHead className="text-cv-text-muted">Status</TableHead>
                <TableHead className="text-cv-text-muted w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((inv) => {
                const statusConfig = getStatusConfig(inv.status);
                return (
                  <TableRow key={inv.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-cv-primary/10 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-cv-primary-light" />
                        </div>
                        <span className="font-medium text-cv-text-primary">{inv.invoiceNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-cv-text-primary font-medium">
                      {inv.patientName}
                    </TableCell>
                    <TableCell className="text-cv-text-secondary text-sm max-w-[200px] truncate">
                      {inv.services}
                    </TableCell>
                    <TableCell className="text-cv-text-secondary">
                      {new Date(inv.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </TableCell>
                    <TableCell className="font-semibold text-cv-text-primary">
                      ₹{inv.amount.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig.className}`}>
                          <statusConfig.icon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                        {inv.paymentMethod && (
                          <span className="text-[10px] text-cv-text-muted">
                            via {inv.paymentMethod}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4 text-cv-text-muted" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <p className="text-xs text-cv-text-muted">
            Showing {filteredInvoices.length} of {invoices.length} invoices
          </p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Card */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-cv-text-primary mb-4 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-cv-primary-light" />
            Payment Methods
          </h3>
          <div className="space-y-3">
            {[
              { method: "UPI", percentage: 45, color: "bg-cv-primary" },
              { method: "Card", percentage: 30, color: "bg-cv-accent" },
              { method: "Cash", percentage: 20, color: "bg-cv-success" },
              { method: "Insurance", percentage: 5, color: "bg-cv-blue" },
            ].map((item) => (
              <div key={item.method} className="flex items-center gap-3">
                <span className="text-sm text-cv-text-secondary w-20">{item.method}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-cv-text-primary w-10 text-right">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-cv-primary/20 to-cv-accent/10 border border-cv-primary/20 p-5">
          <h3 className="text-sm font-semibold text-cv-text-primary mb-3">
            💡 AI Billing Assistant
          </h3>
          <p className="text-sm text-cv-text-secondary mb-4">
            Send automated payment reminders via WhatsApp for pending invoices
          </p>
          <Button size="sm" className="gradient-primary border-0">
            Send Reminders (8 pending)
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
