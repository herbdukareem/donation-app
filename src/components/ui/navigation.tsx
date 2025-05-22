
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-full bg-white/70 backdrop-blur-md border-b border-border/50 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/069103c6-68f8-4425-912d-32a7bedc9a21.png" 
              alt="UNILORIN @ 50" 
              className="h-10 mr-3"
            />
            <Link to="/" className="text-2xl font-semibold text-primary">
              UNILORIN @ 50
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link 
              to="/help" 
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Help
            </Link>
            <Link 
              to="/admin" 
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
