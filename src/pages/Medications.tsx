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
  Pill,
  Search,
  Plus,
  Package,
  AlertTriangle,
  TrendingUp,
  Clock,
  MoreVertical,
} from "lucide-react";

interface Medication {
  id: string;
  name: string;
  genericName: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  expiryDate: string;
  supplier: string;
}

const mockMedications: Medication[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    genericName: "Acetaminophen",
    category: "Pain Relief",
    stock: 450,
    minStock: 100,
    price: 2.5,
    expiryDate: "2027-06-15",
    supplier: "PharmaCare India",
  },
  {
    id: "2",
    name: "Metformin 500mg",
    genericName: "Metformin HCL",
    category: "Diabetes",
    stock: 85,
    minStock: 100,
    price: 8.0,
    expiryDate: "2026-12-20",
    supplier: "MedLife Pharma",
  },
  {
    id: "3",
    name: "Amoxicillin 250mg",
    genericName: "Amoxicillin",
    category: "Antibiotics",
    stock: 200,
    minStock: 50,
    price: 12.0,
    expiryDate: "2026-09-10",
    supplier: "HealthFirst",
  },
  {
    id: "4",
    name: "Omeprazole 20mg",
    genericName: "Omeprazole",
    category: "Gastric",
    stock: 320,
    minStock: 75,
    price: 6.5,
    expiryDate: "2027-03-25",
    supplier: "PharmaCare India",
  },
  {
    id: "5",
    name: "Amlodipine 5mg",
    genericName: "Amlodipine Besylate",
    category: "Cardiac",
    stock: 45,
    minStock: 60,
    price: 15.0,
    expiryDate: "2026-08-01",
    supplier: "CardioMed",
  },
  {
    id: "6",
    name: "Cetirizine 10mg",
    genericName: "Cetirizine HCL",
    category: "Allergy",
    stock: 180,
    minStock: 40,
    price: 4.0,
    expiryDate: "2027-11-30",
    supplier: "MedLife Pharma",
  },
];

const stats = [
  {
    title: "Total Medications",
    value: "156",
    icon: Pill,
    color: "text-cv-primary-light",
    bgColor: "bg-cv-primary/10",
  },
  {
    title: "Low Stock Items",
    value: "8",
    icon: AlertTriangle,
    color: "text-cv-warning",
    bgColor: "bg-cv-warning/10",
  },
  {
    title: "Expiring Soon",
    value: "3",
    icon: Clock,
    color: "text-cv-danger",
    bgColor: "bg-cv-danger/10",
  },
  {
    title: "Monthly Sales",
    value: "₹1.2L",
    icon: TrendingUp,
    color: "text-cv-success",
    bgColor: "bg-cv-success/10",
  },
];

export default function Medications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [medications] = useState<Medication[]>(mockMedications);

  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock <= minStock * 0.5) {
      return { label: "Critical", className: "bg-cv-danger/20 text-cv-danger" };
    }
    if (stock <= minStock) {
      return { label: "Low", className: "bg-cv-warning/20 text-cv-warning" };
    }
    return { label: "In Stock", className: "bg-cv-success/20 text-cv-success" };
  };

  return (
    <DashboardLayout
      title="Medications"
      subtitle="Manage your clinic's medication inventory and prescriptions"
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
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-text-muted" />
            <Input
              placeholder="Search medications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/30 border-border"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Package className="w-4 h-4" />
              Reorder
            </Button>
            <Button size="sm" className="gap-2 gradient-primary border-0">
              <Plus className="w-4 h-4" />
              Add Medication
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-cv-text-muted">Medication</TableHead>
                <TableHead className="text-cv-text-muted">Category</TableHead>
                <TableHead className="text-cv-text-muted">Stock</TableHead>
                <TableHead className="text-cv-text-muted">Price</TableHead>
                <TableHead className="text-cv-text-muted">Expiry</TableHead>
                <TableHead className="text-cv-text-muted">Supplier</TableHead>
                <TableHead className="text-cv-text-muted w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedications.map((med) => {
                const stockStatus = getStockStatus(med.stock, med.minStock);
                return (
                  <TableRow key={med.id} className="border-border">
                    <TableCell>
                      <div>
                        <p className="font-medium text-cv-text-primary">{med.name}</p>
                        <p className="text-xs text-cv-text-muted">{med.genericName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-muted text-cv-text-secondary">
                        {med.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-cv-text-primary">{med.stock}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${stockStatus.className}`}>
                          {stockStatus.label}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-cv-text-primary">₹{med.price.toFixed(2)}</TableCell>
                    <TableCell className="text-cv-text-secondary">
                      {new Date(med.expiryDate).toLocaleDateString("en-IN", {
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-cv-text-secondary text-sm">{med.supplier}</TableCell>
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
            Showing {filteredMedications.length} of {medications.length} medications
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
    </DashboardLayout>
  );
}
