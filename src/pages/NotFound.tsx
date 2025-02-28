
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TicketX, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 px-4 h-[90vh] flex flex-col items-center justify-center">
      <div className="text-center">
        <TicketX className="h-16 w-16 mb-6 mx-auto text-muted-foreground" />
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              Go to Homepage
            </Button>
          </Link>
          <Link to="/tickets">
            <Button variant="outline">View Tickets</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
