import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TicketPlus } from "lucide-react";

export default function Index() {
  return (
    <div className="relative min-h-screen">
      {/* Background image and overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-background/95 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
          alt="Code background" 
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-16 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="pt-8 pb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
              Google Cloud Platform Support Ticketing
            </h1>
            <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
              Submit, track, and resolve issues with your Google Cloud Platform services
            </p>
          </div>

          <Link to="/tickets/new">
            <Button size="lg" className="gap-2">
              <TicketPlus className="h-5 w-5" />
              New Ticket
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
