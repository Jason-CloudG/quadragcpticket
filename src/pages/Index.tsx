
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { gcpServices } from "@/lib/ticketData";
import {
  TicketPlus,
  SearchCheck,
  ClipboardList,
  CheckCircle2,
  ArrowRight,
  Phone
} from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import servicesBackground from "@/assets/services-background.jpg";
import ctaBackground from "@/assets/cta-background.jpg";

export default function Index() {
  return (
    <div className="relative min-h-screen">
      {/* Background image and overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-background/95 z-10"></div>
        <img 
          src={heroBackground} 
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <TicketPlus className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Create Tickets</CardTitle>
                <CardDescription>
                  Submit detailed support tickets for any GCP service
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Quickly create detailed tickets with all the information our team needs
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/tickets/new">
                  <Button>Create New Ticket</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <SearchCheck className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>
                  Monitor the status of your tickets in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Stay updated with the latest status and follow the progress of your tickets
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/tickets">
                  <Button variant="outline">View All Tickets</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <ClipboardList className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Manage Issues</CardTitle>
                <CardDescription>
                  Organize and prioritize your support requests
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Filter by priority, status, and service to manage your tickets efficiently
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/tickets">
                  <Button variant="outline">Manage Tickets</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Services section with AI-themed background */}
          <div className="mb-16 relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-background/90 mix-blend-multiply z-10"></div>
              <img 
                src={servicesBackground} 
                alt="Technology background" 
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative z-10 p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Supported GCP Services</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {gcpServices.map((service) => (
                  <Card key={service} className="bg-white/90 backdrop-blur-sm hover:bg-white/100 transition-colors">
                    <CardContent className="p-4 text-center flex items-center justify-center h-24">
                      <p className="font-medium">{service}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10">
              <img 
                src={ctaBackground} 
                alt="User with laptop" 
                className="h-full w-full object-cover object-center"
              />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Ready to get support?
              </CardTitle>
              <CardDescription>
                Create a ticket and our team will help resolve your GCP issues
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col items-center pb-6 relative z-10">
              <Link to="/tickets/new" className="mb-4">
                <Button className="gap-2">
                  Create New Ticket
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center justify-center text-sm text-muted-foreground mt-2">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <p>For business requirements, contact our sales team: <span className="font-medium text-primary">+91 9688989687</span></p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
