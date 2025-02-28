
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, TicketPlus, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { createTicket, gcpServices } from "@/lib/ticketData";

// Form validation schema
const ticketFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  priority: z.enum(["low", "medium", "high", "critical"]),
  gcpService: z.string().min(1, { message: "Please select a GCP service" }),
  createdBy: z.string().email({ message: "Please enter a valid email address" }),
});

type TicketFormValues = z.infer<typeof ticketFormSchema>;

export default function NewTicketPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      gcpService: "",
      createdBy: "",
    },
  });
  
  const onSubmit = (data: TicketFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create new ticket - ensuring all required fields are passed
      const newTicket = createTicket({
        title: data.title,
        description: data.description,
        priority: data.priority,
        gcpService: data.gcpService,
        createdBy: data.createdBy,
        status: "open",
      });
      
      // Show success toast
      toast({
        title: "Ticket created successfully",
        description: `Ticket ID: ${newTicket.id}`,
      });
      
      // Redirect to the ticket detail page
      setTimeout(() => {
        navigate(`/tickets/${newTicket.id}`);
      }, 1000);
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast({
        title: "Error creating ticket",
        description: "There was a problem creating your ticket. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex items-center mb-8">
        <Link to="/tickets">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Tickets
          </Button>
        </Link>
      </div>
      
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <TicketPlus className="h-6 w-6" />
            Create New Support Ticket
          </CardTitle>
          <CardDescription>
            Submit a new support request for your Google Cloud Platform services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Brief summary of the issue" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="gcpService"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GCP Service</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {gcpServices.map(service => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">
                            <div className="flex items-center gap-2 text-red-500">
                              <AlertTriangle className="h-4 w-4" />
                              Critical
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Detailed description of the issue, including any error messages or steps to reproduce" 
                        className="h-32 resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="createdBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="your.email@example.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-4 pt-4">
                <Link to="/tickets">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Ticket"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
