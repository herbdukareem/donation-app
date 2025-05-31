
const About = () => {
  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-24">
      <section className="text-center mb-16 fade-up">
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/069103c6-68f8-4425-912d-32a7bedc9a21.png" 
            alt="UNILORIN @ 50" 
            className="h-24"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          About UNILORIN @ 50
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Celebrating five decades of excellence, innovation, and impact.
        </p>
      </section>

      <div className="prose prose-lg max-w-3xl mx-auto">
        <p className="mb-6">
          The University of Ilorin, fondly known as UNILORIN, is celebrating its 50th anniversary - 
          a major milestone that marks five decades of academic excellence, research innovation, 
          and community impact in Nigeria's educational landscape.
        </p>
        
        <p className="mb-6">
          Established in 1975, UNILORIN has grown to become one of Nigeria's most respected 
          universities, known for its consistent academic calendar, quality education, 
          and cutting-edge research facilities.
        </p>
        
        <h2 className="text-3xl font-semibold mt-12 mb-6">Our Golden Jubilee</h2>
        <p className="mb-6">
          The UNILORIN @ 50 Celebration is a year-long series of events and initiatives designed to:
        </p>
        <ul className="list-disc pl-6 space-y-4">
          <li>Honor our rich heritage and accomplishments over five decades</li>
          <li>Recognize the contributions of our alumni, staff, and partners</li>
          <li>Strengthen our infrastructure to support future generations</li>
          <li>Establish new scholarships and research opportunities</li>
          <li>Position UNILORIN for even greater impact in its next 50 years</li>
        </ul>
        
        <h2 className="text-3xl font-semibold mt-12 mb-6">How Your Donation Helps</h2>
        <p className="mb-6">
          Your generous contribution to the UNILORIN @ 50 Campaign will:
        </p>
        <ul className="list-disc pl-6 space-y-4">
          <li>Fund scholarships for talented but financially challenged students</li>
          <li>Support the renovation and development of key campus facilities</li>
          <li>Advance groundbreaking research in various fields</li>
          <li>Help organize commemorative events throughout our jubilee year</li>
        </ul>
        
        <div className="flex justify-center mt-12">
          <img 
            src="/lovable-uploads/6b69e294-8cbc-41b6-8380-beeca3f2dd5a.png" 
            alt="UNILORIN Crest" 
            className="h-48 mx-auto"
          />
        </div>
        
        <p className="text-center text-xl font-semibold mt-8">
          "Character and Learning" - Probitas Doctrina
        </p>
      </div>
    </div>
  );
};

export default About;
