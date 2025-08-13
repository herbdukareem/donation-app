import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DonorTypeForm from '@/components/DonorTypeForm';
import PaystackPop from '@paystack/inline-js';
import axios from 'axios';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


const categories = [
  {
    id: 'transcript-innovation-hubs',
    title: 'PRIORITY 1: Transcript and Innovation Hubs to Mark 50th Anniversary',
    description: 'A set of state-of-the-art facilities to foster creativity, innovations, enhanced efficiency in management of academic records and processing time.',
    projects: [
      { name: 'Transcript Hub', target: '₦1,500,000,000' },
      { name: 'Innovation Hub', target: '₦4,000,000,000' },
    ]
  },
  {
    id: 'learning-environment-welfare',
    title: 'PRIORITY 2: Improvement in Learning Environment and Welfare',
    description: 'Upgrading infrastructure and resources to provide staff and students with a world-class educational experience within a conducive environment. It will also ensure a supportive and thriving community for all members of the University.',
    projects: [
      { name: 'Solar Farm', target: '₦5,000,000,000' },
      { name: 'Expansion of water supply', target: '₦2,000,000,000' },
      { name: 'Upgrade the teaching and learning infrastructure and expand the internet capacity across 16 faculties and multiple campuses', target: '₦10,000,000,000' },
      { name: 'Improvement in transport systems', target: '₦3,000,000,000' },
    ]
  },
  {
    id: 'research-national-development',
    title: 'PRIORITY 3: Excellence in Research and National Development',
    description: 'Upgrade research facilities for high-end research activities and strengthen capacities for solutions towards national development.',
    projects: [
      { name: 'Upgrade of Laboratories', target: '₦16,000,000,000' },
      { name: 'Construct a stem cell, biotechnology, and nanotechnology laboratory complex', target: '₦5,000,000,000' },
    ]
  },
  {
    id: 'cross-cutting',
    title: 'Cross Cutting',
    description: 'Operational support and maintenance to ensure project sustainability and effectiveness.',
    projects: [
      { name: 'Operational cost', target: '₦3,500,000,000' },
    ]
  }
];
const Index = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showAppreciation, setShowAppreciation] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState<{
    transactionId: string;
    date: string;
    category: string;
    donorData: any;
  } | null>(null);

  const handleDonate = async (donorData: any) => {
    console.log('Donation form data:', donorData);
    
    if (!donorData.selectedInitiative) {
      toast({
        title: "Please select an initiative",
        description: "Choose which initiative you'd like to support.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
         const paystack = new PaystackPop();
         const pAmount  = donorData.currency === "NGN" ? parseInt(donorData.amount) * 100 : parseInt(donorData.amount);

         paystack.newTransaction({
               key: "pk_live_46a66bda92f1fa7663134ac6dbaccdddef517893",
               email: donorData.email,
               amount: pAmount,
               currency: donorData.currency || "NGN",
               reference: `UNILORIN-${Date.now()}`,
               subaccount: "ACCT_7p5yddylh9fec50",
               bearer: "subaccount",
               metadata: {
                 custom_fields: [
                   { display_name: "Full Name", variable_name: "full_name", value: donorData.donorName },
                   { display_name: "Phone", variable_name: "phone", value: donorData.phoneNumber },
                   { display_name: "Address", variable_name: "address", value: donorData.contactAddress },
                   { display_name: "Donation Category", variable_name: "donation_category", value: donorData.selectedInitiative },
                   { display_name: "Department", variable_name: "department", value: donorData.department },
                   { display_name: "Faculty", variable_name: "faculty", value: donorData.faculty },
                   { display_name: "Matric Number", variable_name: "matric_number", value: donorData.matricNumber },
                   { display_name: "Year of Graduation", variable_name: "year_of_graduation", value: donorData.yearOfGraduation },
                   { display_name: "Alumni Set Name", variable_name: "alumni_set_name", value: donorData.alumniSetName },
                   { display_name: "Organization Name", variable_name: "organization_name", value: donorData.organizationName },
                   { display_name: "Country", variable_name: "country", value: donorData.country },
                 ],
               },
               onSuccess: async (transaction: any) => {
                 try {
                   const response = await axios.get(`https://50thanniversary.unilorin.edu.ng/api/verify/${transaction.reference}`);
                   const result = response.data;
         
                   setReceiptDetails({
                     transactionId: result.transaction.reference,
                     date: new Date().toLocaleDateString(),
                     category: categories.find(c => c.id === selectedCategory)?.title || "",
                     donorData: {
                       donorName: donorData.donorName,
                       email: donorData.email,
                       contactAddress: donorData.contactAddress,
                       amount: donorData.amount,
                       currency: donorData.currency || "NGN",
                     },
                   });
         
                   setShowReceipt(true);
         
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
      
    

      toast({
        title: "Thank you for your donation!",
        description: "Your contribution to UNILORIN's 50th celebration will make a real difference.",
      });
    } catch (error) {
      toast({
        title: "Error processing donation",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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
          UNILORIN@50: CELEBRATING EXCELLENCE AND SUSTAINING GREATNESS...
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          CALLING ON EVERYONE AT HOME AND ABROAD TO JOIN US IN BUILDING A GREATER FUTURE
        </p>
      </section>

      {/* Letter Section */}
      <section className="mb-16 max-w-4xl mx-auto">
        <Card className="glass-effect p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary">
            REQUEST FOR SUPPORT FOR THE 50TH ANNIVERSARY ENDOWMENT FUND
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="mb-4">
              On behalf of the Vice-Chancellor, Professor Wahab Olasupo Egbewole, SAN, and the University of Ilorin Community, I am writing with great enthusiasm to inform all alumni, the university community, corporate organisations, friends of the University and the general public of the upcoming Golden Jubilee celebration of the University of Ilorin, scheduled from 23rd to 28th November 2025, marking 50 years of excellence in education, research, and community impact since its establishment in 1975.
            </p>
            
            <p className="mb-4">
              The University of Ilorin, fondly known as UNILORIN, has consistently been a beacon of academic excellence and innovation in Nigeria. Over the past five decades, it has nurtured numerous leaders, innovators, and change agents who have made significant contributions to society. As we celebrate this monumental milestone, we aim to reflect on our achievements, address the challenges we face, and set ambitious goals for the future.
            </p>
            
            <p className="mb-4">
              To commemorate this historic occasion, the University is launching a 50-billion-naira endowment fund through its UNILORIN Holdings. This initiative will be dedicated to:
            </p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>PRIORITY 1: Transcript and Innovation Hubs to Mark 50th Anniversary:</strong> A set of state-of-the-art facilities to foster creativity, innovations, enhanced efficiency in management of academic records and processing time.</li>
              <li><strong>PRIORITY 2: Improvement in Learning Environment and Welfare:</strong> Upgrading infrastructure and resources to provide staff and students with a world-class educational experience within a conducive environment. It will also ensure a supportive and thriving community for all members of the University.</li>
              <li><strong>PRIORITY 3: Excellence in Research and National Development:</strong> Upgrade research facilities for high-end research activities and strengthen capacities for solutions towards national development.</li>
            </ul>
            
            <p className="mb-4">
              Details of the projects under each priority area are provided here. We humbly invite you to join us on this transformative journey by contributing to the UNILORIN 50TH ANNIVERSARY ENDOWMENT FUND. Your support will not only honour the legacy of the University but also pave the way for future generations to thrive and excel.
            </p>
            
            <div className="bg-accent/50 p-4 rounded-lg mb-4">
              <p className="font-semibold mb-2">How to Donate:</p>
              <ol className="list-decimal pl-4 space-y-1">
                <li><strong>CHEQUE</strong> written in favour of <strong>UNILORIN 50TH ANNIVERSARY</strong></li>
                <li><strong>DIRECT DEPOSIT</strong> to <strong>UNILORIN 50TH ANNIVERSARY, ZENITH BANK ACCOUNT ILORIN ACC—NO 1229701741</strong></li>
                <li><strong>PAYMENT PLATFORM</strong> on this Portal (Click on the DONATE button below)</li>
              </ol>
            </div>
            
            <p className="mb-6">
              We would be delighted to discuss this initiative further. Please feel free to contact the undersigned.
            </p>
            
            <p className="mb-4">
              Thank you for considering this request. Your generosity and commitment to education and innovation are deeply appreciated.
            </p>
            
            <p className="mb-4">Sincerely,</p>
            
            <div className="text-lg">
              <p className="font-semibold">Professor Olugbenga A. MOKUOLU</p>
              <p>Chairman, UNILORIN 50th Anniversary Committee.</p>
              <p>+2348037137407</p>
            </div>
          </div>
        </Card>
      </section>

           <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">Choose an Initiative to Support</h2>
                <div className="max-w-6xl mx-auto">
                  <Accordion type="single" collapsible className="space-y-4">
                    {categories.map((category, index) => (
                      <AccordionItem key={category.id} value={category.id} className="border-0">
                        <Card className={`donation-card transition-all hover:shadow-lg ${
                          selectedCategory === category.id ? 'ring-2 ring-primary bg-primary/5' : ''
                        }`}>
                          <AccordionTrigger 
                            className="px-6 py-4 hover:no-underline"
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            <div className="slide-in text-left w-full" style={{ animationDelay: `${index * 0.1}s` }}>
                              <h3 className="text-lg font-semibold mb-2 leading-tight">{category.title}</h3>
                              <p className="text-muted-foreground text-sm">{category.description}</p>
                              {selectedCategory === category.id && (
                                <div className="text-primary text-sm font-medium mt-2">✓ Selected</div>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              {category.projects.map((project, projectIndex) => (
                                <div 
                                  key={projectIndex}
                                  className="border rounded-lg p-4 bg-accent/10 hover:bg-accent/20 transition-colors"
                                >
                                  <h4 className="font-semibold text-base mb-2">{project.name}</h4>
                                  <p className="text-primary font-bold text-lg">Target: {project.target}</p>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </Card>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </section>

    

      
      <section className="max-w-2xl mx-auto glass-effect rounded-2xl p-8 fade-up donation-form">
        <h2 className="text-3xl font-semibold mb-6 text-center">Make Your Donation</h2>
        
        {selectedCategory && (
          <div className="mb-6 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Supporting:</p>
            <p className="font-semibold text-sm">{categories.find(c => c.id === selectedCategory)?.title}</p>
          </div>
        )}
        
        <DonorTypeForm onSubmit={handleDonate} isProcessing={isProcessing} />
      </section>

      {/* Receipt Dialog */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="glass-effect max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold mb-4">Donation Receipt</DialogTitle>
          </DialogHeader>
          {receiptDetails && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <img 
                  src="/lovable-uploads/069103c6-68f8-4425-912d-32a7bedc9a21.png" 
                  alt="UNILORIN @ 50" 
                  className="h-16 mx-auto mb-4"
                />
              </div>
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
                <p className="font-medium text-sm">{receiptDetails.category}</p>
              </div>
              <div className="pb-4">
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-xl font-semibold">
                  {receiptDetails.donorData.currency === 'NGN' ? '₦' : receiptDetails.donorData.currency} 
                  {parseFloat(receiptDetails.donorData.amount).toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="button-primary flex-1"
                  onClick={() => window.print()}
                >
                  Print Receipt
                </button>
                <button
                  className="button-primary flex-1"
                  onClick={handleCloseReceipt}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Appreciation Message Dialog */}
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
              The management of University of Ilorin, Ilorin, Nigeria, under the able leadership of the Vice-Chancellor, Prof Wahab Olasupo Egbew
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
