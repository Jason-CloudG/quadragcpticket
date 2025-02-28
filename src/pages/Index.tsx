
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
  ArrowRight
} from "lucide-react";

export default function Index() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Google Cloud Platform Support Ticketing
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Submit, track, and resolve issues with your Google Cloud Platform services
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
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

          <Card>
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

          <Card>
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

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Supported GCP Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gcpServices.map((service) => (
              <Card key={service} className="bg-muted/40">
                <CardContent className="p-4 text-center flex items-center justify-center h-24">
                  <p className="font-medium">{service}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              Ready to get support?
            </CardTitle>
            <CardDescription>
              Create a ticket and our team will help resolve your GCP issues
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pb-6">
            <Link to="/tickets/new">
              <Button className="gap-2">
                Create New Ticket
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
