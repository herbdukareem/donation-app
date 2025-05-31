
const Help = () => {
  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-24">
      <section className="text-center mb-16 fade-up">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Help & Support
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions and learn how to make the most of your donation.
        </p>
      </section>

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">How are donations used?</h3>
              <p className="text-muted-foreground">
                Your donations directly support the category you choose, whether it's research initiatives, 
                student scholarships, or campus development projects.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Is my donation tax-deductible?</h3>
              <p className="text-muted-foreground">
                Yes, all donations are tax-deductible. You will receive a receipt for your records 
                immediately after your donation.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Can I make a recurring donation?</h3>
              <p className="text-muted-foreground">
                Currently, we only support one-time donations. We're working on adding recurring 
                donation options in the future.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Need Additional Help?</h2>
          <p className="text-muted-foreground mb-4">
            Our support team is here to help with any questions or concerns you may have about making a donation.
          </p>
          <p className="font-medium">Contact us at:</p>
          <p className="text-primary">support@campusgiving.edu</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
