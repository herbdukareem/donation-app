import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import DonorTypeForm from '@/components/DonorTypeForm';
import PaystackPop from '@paystack/inline-js';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const categories = [
  {
    id: 'innovation-hubs',
    title: 'Constructing Innovation and Transcript Hubs',
    description: 'A state-of-the-art facility to foster creativity, streamline academic processes, and enhance research capabilities.',
  },
  {
    id: 'learning-environment',
    title: 'Improving the Learning Environment',
    description: 'Upgrading infrastructure and resources to provide students with a world-class educational experience.',
  },
  {
    id: 'welfare',
    title: 'Promoting the Welfare of Staff and Students',
    description: 'Ensuring a supportive and thriving community for all members of the University.',
  }
];

const Index = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showAppreciation, setShowAppreciation] = useState(false);
  const [donorDetails, setDonorDetails] = useState<any>(null);
  const [receiptDetails, setReceiptDetails] = useState<any>(null);

  const isFormValid = () => {
    if (!donorDetails || !donorDetails.donorName || !donorDetails.email || !donorDetails.phoneNumber || !donorDetails.amount) {
      toast({
        title: "Incomplete Form",
        description: "Please complete all required fields before donating.",
        variant: "destructive",
      });
      return false;
    }
    if (!selectedCategory) {
      toast({
        title: "No Category Selected",
        description: "Please select a donation category.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleDonate = () => {
    if (!isFormValid()) return;

    setIsProcessing(true);

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_live_46a66bda92f1fa7663134ac6dbaccdddef517893",
      email: donorDetails.email,
      amount: parseInt(donorDetails.amount) * 100,
      currency: donorDetails.currency || "NGN",
      reference: `UNILORIN-${Date.now()}`,
      subaccount: "ACCT_7p5yddylh9fec50",
      bearer: "subaccount",
      metadata: {
        custom_fields: [
          { display_name: "Full Name", variable_name: "full_name", value: donorDetails.donorName },
          { display_name: "Phone", variable_name: "phone", value: donorDetails.phoneNumber },
          { display_name: "Address", variable_name: "address", value: donorDetails.contactAddress },
          { display_name: "Donation Category", variable_name: "donation_category", value: selectedCategory },
        ],
      },
      onSuccess: async (transaction: any) => {
        try {
          const response = await axios.get(`https://50thanniversary.unilorin.edu.ng/api/verify/${transaction.reference}`);
          const result = response.data;

          // setReceiptDetails({
          //   transactionId: result.transaction.reference,
          //   date: new Date().toLocaleDateString(),
          //   category: categories.find(c => c.id === selectedCategory)?.title || "",
          //   donorData: {
          //     donorName: donorDetails.donorName,
          //     email: donorDetails.email,
          //     contactAddress: donorDetails.contactAddress,
          //     amount: donorDetails.amount,
          //     currency: donorDetails.currency || "NGN",
          //   },
          // });

          // setShowReceipt(true);

          toast({
            title: "Thank you for your donation!",
            description: "Your payment was successful and routed to the UNILORIN account.",
          });
        } catch (error) {
          console.error("Error verifying payment:", error);
          toast({
            title: "Verification Error",
            description: "There was an error verifying your payment. Please contact support.",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
        }
      },
      onCancel: () => {
        toast({
          title: "Payment Cancelled",
          description: "You cancelled the payment process.",
          variant: "destructive",
        });
        setIsProcessing(false);
      },
    });
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setShowAppreciation(true);
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
  
      <section className="mb-16 fade-up">
        <Card className="glass-effect p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary">
            REQUEST FOR FINANCIAL SUPPORT FOR THE UNIVERSITY'S 50TH ANNIVERSARY
          </h2>
          
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="mb-4">
              On behalf of the Vice-Chancellor and the University of Ilorin Community, I am writing with great enthusiasm to inform you of the upcoming Golden Jubilee celebration of the University of Ilorin, scheduled from 23rd to 28th November 2025, marking 50 years of excellence in education, research, and community impact since its establishment in 1975.
            </p>
            
            <p className="mb-4">
              The University of Ilorin, fondly known as UNILORIN, has consistently been a beacon of academic excellence and innovation in Nigeria. Over the past five decades, it has nurtured numerous leaders, innovators, and change agents who have made significant contributions to society. As we celebrate this monumental milestone, we aim to reflect on our achievements, address the challenges we face, and set ambitious goals for the future.
            </p>
            
            <p className="mb-4">
              To commemorate this historic occasion, the University is launching a 50-billion-naira endowment fund. This initiative will be dedicated to:
            </p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Constructing Innovation and Transcript Hubs:</strong> A state-of-the-art facility to foster creativity, streamline academic processes, and enhance research capabilities.</li>
              <li><strong>Improving the Learning Environment:</strong> Upgrading infrastructure and resources to provide students with a world-class educational experience.</li>
              <li><strong>Promoting the Welfare of Staff and Students:</strong> Ensuring a supportive and thriving community for all members of the University.</li>
            </ul>
            
            <p className="mb-4">
              We humbly invite you to join us on this transformative journey by contributing to the UNILORIN 50TH ANNIVERSARY ENDOWMENT FUND. Your support will not only honour the legacy of the University but also pave the way for future generations to thrive and excel.
            </p>
            
            <div className="bg-accent/50 p-4 rounded-lg mb-4">
              <p className="font-semibold mb-2">How to Donate:</p>
              <p>
                Donations can be made in favour of <strong>UNILORIN 50TH ANNIVERSARY</strong> BY CHEQUE or PAID DIRECTLY TO <strong>ZENITH BANK ACCOUNT ILORIN ACC—NO 1229701741</strong>. We would be delighted to discuss this initiative further. Please feel free to contact the undersigned.
              </p>
            </div>
            
            <p className="mb-6">
              Thank you for considering this request. Your generosity and commitment to education and innovation are deeply appreciated.
            </p>
            
            <p className="mb-2">The details of the prioritized programme are hereby attached.</p>
            
            <p className="mb-4">Sincerely,</p>
            
            <p className="font-semibold text-lg">
              Professor Olugbenga A. MOKUOLU
            </p>
          </div>
        </Card>
      </section> 

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Choose an Initiative to Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={category.id}
              className={`donation-card p-6 cursor-pointer ${
                selectedCategory === category.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Donation Form */}
      <section className="max-w-2xl mx-auto glass-effect rounded-2xl p-8 fade-up donation-form">
        <h2 className="text-3xl font-semibold mb-6 text-center">Make Your Donation</h2>

        {selectedCategory && (
          <div className="mb-6 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Supporting:</p>
            <p className="font-semibold">
              {categories.find((c) => c.id === selectedCategory)?.title}
            </p>
          </div>
        )}

        <DonorTypeForm
          onSubmit={(data: any) => {
            setDonorDetails(data);
            handleDonate();
          }}
          isProcessing={isProcessing}
        />
      </section>

      {/* Receipt Dialog */}
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
                <p className="font-medium">{receiptDetails.donorData.donorName}</p>
                <p className="text-sm">{receiptDetails.donorData.email}</p>
                <p className="text-sm">{receiptDetails.donorData.contactAddress}</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-sm text-muted-foreground">Initiative</p>
                <p className="font-medium">{receiptDetails.category}</p>
              </div>
              <div className="pb-4">
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-xl font-semibold">
                  {receiptDetails.donorData.currency === 'NGN' ? '₦' : receiptDetails.donorData.currency}
                  {parseInt(receiptDetails.donorData.amount).toLocaleString()}
                </p>
              </div>
              <button className="button-primary w-full" onClick={handleCloseReceipt}>
                Continue
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Appreciation Dialog */}
      <Dialog open={showAppreciation} onOpenChange={setShowAppreciation}>
        <DialogContent className="glass-effect max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold mb-4">Thank You!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center mb-6">
              <img
                src="/lovable-uploads/069103c6-68f8-4425-912d-32a7bedc9a21.png"
                alt="UNILORIN @ 50"
                className="h-16 mx-auto mb-4"
              />
            </div>
            <p className="text-base leading-relaxed">
              The management of University of Ilorin, Ilorin, Nigeria, under the able leadership of the Vice-Chancellor, Prof Wahab Olasupo Egbewole (SAN) appreciated your kind donation...
            </p>
            <button
              className="button-primary w-full mt-6"
              onClick={() => setShowAppreciation(false)}
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;