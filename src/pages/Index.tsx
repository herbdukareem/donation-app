'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from 'react';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const categories = [
  {
    id: 'scholarships',
    title: 'Student Scholarships',
    description: 'Support talented students with financial aid',
    amount: 10000
  },
  {
    id: 'infrastructure',
    title: 'Campus Development',
    description: 'Help build and renovate facilities for the 50th celebration',
    amount: 50000
  },
  {
    id: 'research',
    title: 'Research Initiatives',
    description: 'Fund groundbreaking research and innovations',
    amount: 25000
  }
];

interface DonorDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

const Index = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [donorDetails, setDonorDetails] = useState<DonorDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [receiptDetails, setReceiptDetails] = useState<{
    transactionId: string;
    date: string;
    category: string;
    amount: string;
  } | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleDonorDetailsChange = (field: keyof DonorDetails, value: string) => {
    setDonorDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getSplitDetails = (amount: number) => {
    if (amount >= 1000 && amount < 100000) {
      return "ACCT_mj9aiw5uvm41c1r"; // UNILORIN
    } else if (amount >= 500) {
      return "ACCT_h8imbv2laypvg4b"; // Ashlab
    }
    return undefined;
  };

  const handleDonate = () => {
    if (!isFormValid()) return;

    setIsProcessing(true);

    const splitCode = getSplitDetails(parseInt(amount));
    const handler = window.PaystackPop.setup({
      key: 'pk_test_0ef69c5e0189031d58bd743d5c0eaa5fa5b8c743',
      email: donorDetails.email,
      amount: parseInt(amount) * 100, // Paystack uses kobo
      currency: 'NGN',
      ref: `UNILORIN50-${Date.now()}`,
      metadata: {
        full_name: donorDetails.fullName,
        phone: donorDetails.phone,
        address: donorDetails.address,
        category: selectedCategory,
      },
      subaccount: splitCode,
      callback: function (response: any) {
        const receipt = {
          transactionId: response.reference,
          date: new Date().toLocaleDateString(),
          category: categories.find(c => c.id === selectedCategory)?.title || '',
          amount: amount
        };
        setReceiptDetails(receipt);
        setShowReceipt(true);
        toast({
          title: "Thank you for your donation!",
          description: "Your contribution to UNILORIN's 50th celebration will make a real difference.",
        });
        setIsProcessing(false);
      },
      onClose: function () {
        toast({
          title: "Donation Cancelled",
          description: "You closed the payment window.",
          variant: "destructive",
        });
        setIsProcessing(false);
      }
    });

    handler.openIframe();
  };

  const isFormValid = () => {
    return (
      selectedCategory &&
      amount &&
      parseInt(amount) > 0 &&
      donorDetails.fullName &&
      donorDetails.email &&
      donorDetails.phone &&
      donorDetails.address
    );
  };

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-24">
      <section className="text-center mb-16 fade-up">
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/069103c6-68f8-4425-912d-32a7bedc9a21.png" 
            alt="UNILORIN @ 50" 
            className="h-24 md:h-32"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Support UNILORIN @ 50
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Join us in celebrating 50 years of excellence by contributing to the future of University of Ilorin.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {categories.map((category, index) => (
          <Card 
            key={category.id}
            className={`donation-card p-6 cursor-pointer ${
              selectedCategory === category.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
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
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Donation Amount (₦)</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field mb-3"
              placeholder="Enter your donation amount"
              min="1"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Donor Information</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                type="text"
                value={donorDetails.fullName}
                onChange={(e) => handleDonorDetailsChange('fullName', e.target.value)}
                className="input-field"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={donorDetails.email}
                onChange={(e) => handleDonorDetailsChange('email', e.target.value)}
                className="input-field"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input
                type="tel"
                value={donorDetails.phone}
                onChange={(e) => handleDonorDetailsChange('phone', e.target.value)}
                className="input-field"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Input
                type="text"
                value={donorDetails.address}
                onChange={(e) => handleDonorDetailsChange('address', e.target.value)}
                className="input-field"
                placeholder="Enter your address"
              />
            </div>
          </div>

          <button
            className="button-primary w-full"
            onClick={handleDonate}
            disabled={!isFormValid() || isProcessing}
          >
            {isProcessing ? 'Processing...' : `Donate ₦${parseInt(amount || '0').toLocaleString()}`}
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
              <button
                className="button-primary w-full"
                onClick={() => setShowReceipt(false)}
              >
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
