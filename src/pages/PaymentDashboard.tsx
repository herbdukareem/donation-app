import { Card } from '@/components/ui/card';

const PaymentDashboard = () => {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Payment Dashboard
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Real-time transparency of donations received for UNILORIN@50 Anniversary Fund
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 text-center">
          <h3 className="text-2xl font-bold text-primary mb-2">₦0</h3>
          <p className="text-muted-foreground">Total Raised (NGN)</p>
        </Card>
        <Card className="p-6 text-center">
          <h3 className="text-2xl font-bold text-primary mb-2">$0</h3>
          <p className="text-muted-foreground">Total Raised (USD)</p>
        </Card>
        <Card className="p-6 text-center">
          <h3 className="text-2xl font-bold text-primary mb-2">0</h3>
          <p className="text-muted-foreground">Total Donors</p>
        </Card>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Recent Donations</h2>
        <div className="text-center text-muted-foreground py-8">
          <p>No donations received yet. Be the first to support UNILORIN@50!</p>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Initiative Breakdown</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
            <span className="font-medium">PRIORITY 1: Transcript and Innovation Hubs</span>
            <span className="text-primary font-bold">₦0</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
            <span className="font-medium">PRIORITY 2: Learning Environment and Welfare</span>
            <span className="text-primary font-bold">₦0</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
            <span className="font-medium">PRIORITY 3: Excellence in Research</span>
            <span className="text-primary font-bold">₦0</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentDashboard;
