import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const categories = [
  {
    id: "scholarships",
    title: "Student Scholarships",
    description: "Support talented students with financial aid",
    amount: 10000,
  },
  {
    id: "infrastructure",
    title: "Campus Development",
    description: "Help build and renovate facilities for the 50th celebration",
    amount: 50000,
  },
  {
    id: "research",
    title: "Research Initiatives",
    description: "Fund groundbreaking research and innovations",
    amount: 25000,
  },
];

const DonationAmounts = [5000, 10000, 25000, 50000, 100000];

interface DonorDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

const Index = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [donorDetails, setDonorDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [receiptDetails, setReceiptDetails] = useState<{
    transactionId: string;
    date: string;
    category: string;
    amount: string;
  } | null>(null);

  const handleDonorDetailsChange = (field: keyof DonorDetails, value: string) => {
    setDonorDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDonate = () => {
    if (!isFormValid()) return;

    const handler = (window as any).PaystackPop.setup({
      key: "pk_live_46a66bda92f1fa7663134ac6dbaccdddef517893",
      email: donorDetails.email,
      amount: parseInt(amount) * 100, // in kobo
      currency: "NGN",
      ref: `UNILORIN-${Date.now()}`,
      subaccount: "ACCT_7p5yddylh9fec50", // Unilorin's subaccount
      bearer: "subaccount", // Subaccount bears the fee
      percentage_charge: 99.9, // Share of donation sent to subaccount

      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: donorDetails.fullName,
          },
          {
            display_name: "Phone",
            variable_name: "phone",
            value: donorDetails.phone,
          },
          {
            display_name: "Address",
            variable_name: "address",
            value: donorDetails.address,
          },
          {
            display_name: "Donation Category",
            variable_name: "donation_category",
            value: selectedCategory,
          },
        ],
      },

      callback: (response: any) => {
        fetch(`http://localhost:8000/verify/${response.reference}`)
          .then((res) => res.json())
          .then((result) => {
            console.log("Payment verification result:", result);
          })
          .catch((error) => {
            console.error("Error verifying payment:", error);
          });
      },

      onClose: function () {
        toast({
          title: "Payment cancelled",
          description: "You cancelled the payment process.",
          variant: "destructive",
        });
      },
    });

    handler.openIframe();
  };

  const isFormValid = () => {
    return selectedCategory && amount && parseInt(amount) > 0 && donorDetails.fullName && donorDetails.email && donorDetails.phone && donorDetails.address;
  };

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-24">
      <section className="text-center mb-16 fade-up">
        <div className="flex justify-center mb-6">
          <img src="/lovable-uploads/069103c6-68f8-4425-912d-32a7bedc9a21.png" alt="UNILORIN @ 50" className="h-24 md:h-32" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Support UNILORIN @ 50</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Join us in celebrating 50 years of excellence by contributing to the future of University of Ilorin.</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {categories.map((category, index) => (
          <Card key={category.id} className={`donation-card p-6 cursor-pointer ${selectedCategory === category.id ? "ring-2 ring-primary" : ""}`} onClick={() => setSelectedCategory(category.id)}>
            <div className="slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3 className="text-2xl font-semibold mb-3">{category.title}</h3>
              <p className="text-muted-foreground mb-4">{category.description}</p>
            </div>
          </Card>
        ))}
      </section>

      <section className="max-w-md mx-auto glass-effect rounded-2xl p-8 fade-up">
        <h2 className="text-3xl font-semibold mb-6 text-center">Make Your Donation</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Select Initiative</label>
            <Select onValueChange={setSelectedCategory} value={selectedCategory}>
              <SelectTrigger className="input-field">
                <SelectValue placeholder="Choose an initiative" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Donation Amount (₦)</label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="input-field mb-3" placeholder="Enter your donation amount" min="1" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Donor Information</h3>

            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input type="text" value={donorDetails.fullName} onChange={(e) => handleDonorDetailsChange("fullName", e.target.value)} className="input-field" placeholder="Enter your full name" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" value={donorDetails.email} onChange={(e) => handleDonorDetailsChange("email", e.target.value)} className="input-field" placeholder="Enter your email" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input type="tel" value={donorDetails.phone} onChange={(e) => handleDonorDetailsChange("phone", e.target.value)} className="input-field" placeholder="Enter your phone number" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Input type="text" value={donorDetails.address} onChange={(e) => handleDonorDetailsChange("address", e.target.value)} className="input-field" placeholder="Enter your address" />
            </div>
          </div>

          <button className="button-primary w-full" onClick={handleDonate} disabled={!isFormValid() || isProcessing}>
            {isProcessing ? "Processing..." : amount && !isNaN(parseInt(amount)) ? `Donate ₦${parseInt(amount).toLocaleString()}` : "Donate"}
          </button>
        </div>
      </section>

      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="glass-effect">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold mb-4">Donation Receipt</DialogTitle>
          </DialogHeader>
          {receiptDetails && (
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="text-sm text-muted-foreground">Transaction ID</p>
                <p className="font-medium">{receiptDetails.transactionId}</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{receiptDetails.date}</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-sm text-muted-foreground">Donor</p>
                <p className="font-medium">{donorDetails.fullName}</p>
                <p className="text-sm">{donorDetails.email}</p>
                <p className="text-sm">{donorDetails.address}</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{receiptDetails.category}</p>
              </div>
              <div className="pb-4">
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-xl font-semibold">₦{parseInt(receiptDetails.amount).toLocaleString()}</p>
              </div>
              <button className="button-primary w-full" onClick={() => setShowReceipt(false)}>
                Close Receipt
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
