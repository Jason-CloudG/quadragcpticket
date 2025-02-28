
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  getAllTickets, 
  filterTickets,
  searchTickets,
  Ticket,
  gcpServices
} from "@/lib/ticketData";
import { TicketCard } from "@/components/TicketCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  TicketPlus, 
  Search, 
  Filter, 
  AlertCircle,
  Clock, 
  CheckCircle2, 
  XCircle 
} from "lucide-react";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [statusFilters, setStatusFilters] = useState<Ticket["status"][]>([]);
  const [priorityFilters, setPriorityFilters] = useState<Ticket["priority"][]>([]);
  const [serviceFilters, setServiceFilters] = useState<string[]>([]);
  
  useEffect(() => {
    const allTickets = getAllTickets();
    setTickets(allTickets);
    applyFilters(allTickets);
  }, []);
  
  const applyFilters = (ticketsToFilter: Ticket[]) => {
    let result = ticketsToFilter;
    
    // Apply search
    if (searchQuery) {
      result = searchTickets(searchQuery);
    }
    
    // Apply tab filter
    if (activeTab !== "all") {
      result = result.filter(ticket => {
        switch (activeTab) {
          case "open":
            return ticket.status === "open";
          case "in-progress":
            return ticket.status === "in-progress";
          case "resolved":
            return ticket.status === "resolved";
          case "closed":
            return ticket.status === "closed";
          default:
            return true;
        }
      });
    }
    
    // Apply advanced filters
    if (statusFilters.length > 0 || priorityFilters.length > 0 || serviceFilters.length > 0) {
      result = filterTickets({
        status: statusFilters.length > 0 ? statusFilters : undefined,
        priority: priorityFilters.length > 0 ? priorityFilters : undefined,
        gcpService: serviceFilters.length > 0 ? serviceFilters : undefined
      });
    }
    
    setFilteredTickets(result);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(tickets);
  };
  
  const handleStatusFilterChange = (status: Ticket["status"], checked: boolean) => {
    if (checked) {
      setStatusFilters(prev => [...prev, status]);
    } else {
      setStatusFilters(prev => prev.filter(s => s !== status));
    }
  };
  
  const handlePriorityFilterChange = (priority: Ticket["priority"], checked: boolean) => {
    if (checked) {
      setPriorityFilters(prev => [...prev, priority]);
    } else {
      setPriorityFilters(prev => prev.filter(p => p !== priority));
    }
  };
  
  const handleServiceFilterChange = (service: string) => {
    if (service === '') {
      setServiceFilters([]);
    } else {
      setServiceFilters([service]);
    }
  };
  
  const resetFilters = () => {
    setStatusFilters([]);
    setPriorityFilters([]);
    setServiceFilters([]);
    setSearchQuery("");
    setActiveTab("all");
    setFilteredTickets(tickets);
  };
  
  // Apply filters when filter states change
  useEffect(() => {
    applyFilters(tickets);
  }, [statusFilters, priorityFilters, serviceFilters, activeTab]);
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track support requests for your GCP services
          </p>
        </div>
        
        <Link to="/tickets/new">
          <Button>
            <TicketPlus className="mr-2 h-4 w-4" />
            New Ticket
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <form onSubmit={handleSearch} className="flex w-full gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tickets..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="md:w-auto w-full"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>
      
      {showFilters && (
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Filter Tickets</CardTitle>
            <CardDescription>
              Narrow down tickets based on specific criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="status-open" 
                      checked={statusFilters.includes("open")}
                      onCheckedChange={(checked) => 
                        handleStatusFilterChange("open", checked as boolean)
                      }
                    />
                    <Label htmlFor="status-open">Open</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="status-in-progress" 
                      checked={statusFilters.includes("in-progress")}
                      onCheckedChange={(checked) => 
                        handleStatusFilterChange("in-progress", checked as boolean)
                      }
                    />
                    <Label htmlFor="status-in-progress">In Progress</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="status-resolved" 
                      checked={statusFilters.includes("resolved")}
                      onCheckedChange={(checked) => 
                        handleStatusFilterChange("resolved", checked as boolean)
                      }
                    />
                    <Label htmlFor="status-resolved">Resolved</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="status-closed" 
                      checked={statusFilters.includes("closed")}
                      onCheckedChange={(checked) => 
                        handleStatusFilterChange("closed", checked as boolean)
                      }
                    />
                    <Label htmlFor="status-closed">Closed</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Priority</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="priority-critical" 
                      checked={priorityFilters.includes("critical")}
                      onCheckedChange={(checked) => 
                        handlePriorityFilterChange("critical", checked as boolean)
                      }
                    />
                    <Label htmlFor="priority-critical">Critical</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="priority-high" 
                      checked={priorityFilters.includes("high")}
                      onCheckedChange={(checked) => 
                        handlePriorityFilterChange("high", checked as boolean)
                      }
                    />
                    <Label htmlFor="priority-high">High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="priority-medium" 
                      checked={priorityFilters.includes("medium")}
                      onCheckedChange={(checked) => 
                        handlePriorityFilterChange("medium", checked as boolean)
                      }
                    />
                    <Label htmlFor="priority-medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="priority-low" 
                      checked={priorityFilters.includes("low")}
                      onCheckedChange={(checked) => 
                        handlePriorityFilterChange("low", checked as boolean)
                      }
                    />
                    <Label htmlFor="priority-low">Low</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">GCP Service</h3>
                <Select 
                  value={serviceFilters[0] || ''} 
                  onValueChange={handleServiceFilterChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Services</SelectLabel>
                      <SelectItem value="">All Services</SelectItem>
                      {gcpServices.map(service => (
                        <SelectItem key={service} value={service}>{service}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="open" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" /> Open
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> In Progress
          </TabsTrigger>
          <TabsTrigger value="resolved" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Resolved
          </TabsTrigger>
          <TabsTrigger value="closed" className="flex items-center gap-2">
            <XCircle className="h-4 w-4" /> Closed
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTickets.length > 0 ? (
          filteredTickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium">No tickets found</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Try adjusting your filters or create a new ticket
              </p>
              <Link to="/tickets/new">
                <Button>
                  <TicketPlus className="mr-2 h-4 w-4" />
                  New Ticket
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
