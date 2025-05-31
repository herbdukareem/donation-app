import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, ChartBar, Filter, Shield } from "lucide-react";

// Mock donation data for demonstration
const initialDonations = [
  { id: "tx_123456", name: "John Doe", email: "john@example.com", amount: "5000", date: "2025-04-25", category: "scholarships" },
  { id: "tx_123457", name: "Jane Smith", email: "jane@example.com", amount: "10000", date: "2025-04-26", category: "infrastructure" },
  { id: "tx_123458", name: "Alice Johnson", email: "alice@example.com", amount: "2500", date: "2025-04-26", category: "research" },
  { id: "tx_123459", name: "Robert Williams", email: "robert@example.com", amount: "7500", date: "2025-04-27", category: "scholarships" },
];

type Donation = {
  id: string;
  name: string;
  email: string;
  amount: string;
  date: string;
  category: string;
};

const categories = [
  { id: "all", label: "All Donations" },
  { id: "scholarships", label: "Student Scholarships" },
  { id: "infrastructure", label: "Campus Development" },
  { id: "research", label: "Research Initiatives" },
];

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showLoginDialog, setShowLoginDialog] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'unilorin@fifty') {
      setIsAuthenticated(true);
      setShowLoginDialog(false);
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <Dialog open={showLoginDialog} onOpenChange={() => navigate('/')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Login
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = 
      donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.amount.includes(searchTerm);
    
    const matchesCategory = selectedCategory === 'all' || donation.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const totalAmount = filteredDonations.reduce(
    (total, donation) => total + Number(donation.amount),
    0
  );

  const handleDownloadCSV = () => {
    const headers = ["ID", "Name", "Email", "Amount (₦)", "Date", "Category"];
    const csvRows = [
      headers.join(','),
      ...filteredDonations.map(d => 
        `${d.id},${d.name},${d.email},${d.amount},${d.date},${d.category}`
      )
    ];
    const csvContent = csvRows.join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const filename = selectedCategory === 'all' 
      ? `unilorin-all-donations-${new Date().toISOString().split('T')[0]}.csv`
      : `unilorin-${selectedCategory}-donations-${new Date().toISOString().split('T')[0]}.csv`;
    link.setAttribute('download', filename);
    link.click();
    
    toast({
      title: "Download started",
      description: `Donor list for ${selectedCategory === 'all' ? 'all donations' : categories.find(c => c.id === selectedCategory)?.label} has been downloaded as CSV`,
    });
  };

  const simulateNewDonation = () => {
    const newDonation = {
      id: `tx_${Math.floor(Math.random() * 1000000)}`,
      name: "New Donor",
      email: "newdonor@example.com",
      amount: `${Math.floor(Math.random() * 10000) + 1000}`,
      date: new Date().toISOString().split('T')[0],
      category: "scholarships"
    };
    
    setDonations(prev => [newDonation, ...prev]);
    
    toast({
      title: "New donation received!",
      description: `${newDonation.name} donated ₦${parseInt(newDonation.amount).toLocaleString()}`,
    });
  };

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-24">
      <section className="text-center mb-16 fade-up">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Monitor and manage donations for UNILORIN @ 50 Celebration
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="donation-card p-6">
          <h3 className="text-xl font-semibold mb-2">Total Donations</h3>
          <p className="text-3xl font-bold text-primary">{filteredDonations.length}</p>
        </div>
        <div className="donation-card p-6">
          <h3 className="text-xl font-semibold mb-2">Total Amount</h3>
          <p className="text-3xl font-bold text-primary">₦{totalAmount.toLocaleString()}</p>
        </div>
        <div className="donation-card p-6">
          <h3 className="text-xl font-semibold mb-2">Average Donation</h3>
          <p className="text-3xl font-bold text-primary">
            ₦{filteredDonations.length ? Math.round(totalAmount / filteredDonations.length).toLocaleString() : 0}
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search donors..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <Filter className="mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button onClick={handleDownloadCSV} variant="outline" className="w-full md:w-auto flex items-center gap-2">
            <Download size={18} />
            Export {selectedCategory !== 'all' && categories.find(c => c.id === selectedCategory)?.label} CSV
          </Button>
          <Button onClick={simulateNewDonation} className="w-full md:w-auto flex items-center gap-2">
            <ChartBar size={18} />
            Simulate New Donation
          </Button>
        </div>
      </section>

      <section className="glass-effect rounded-lg overflow-hidden mb-8">
        <Table>
          <TableCaption>List of all donations for UNILORIN @ 50 Celebration</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Donor</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonations.length > 0 ? (
              filteredDonations.map((donation) => (
                <TableRow key={donation.id} className="fade-up">
                  <TableCell className="font-mono">{donation.id}</TableCell>
                  <TableCell className="font-medium">{donation.name}</TableCell>
                  <TableCell>{donation.email}</TableCell>
                  <TableCell>₦{parseInt(donation.amount).toLocaleString()}</TableCell>
                  <TableCell>{donation.date}</TableCell>
                  <TableCell>{donation.category}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No donations found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default Admin;
