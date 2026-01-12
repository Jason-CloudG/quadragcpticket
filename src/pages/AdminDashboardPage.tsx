import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  getAllTickets,
  getTicketById,
  updateTicket,
  addComment,
  Ticket
} from "@/lib/ticketData";
import { useToast } from "@/hooks/use-toast";
import { TicketStatusBadge } from "@/components/TicketStatusBadge";
import { TicketPriorityBadge } from "@/components/TicketPriorityBadge";
import { TicketCard } from "@/components/TicketCard";
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  UserCog,
  LogOut,
  Ticket as TicketIcon,
  PieChart,
  Bell
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  available: boolean;
}

export const supportTeam: TeamMember[] = [
  { id: "1", name: "John Smith", email: "support@gcp-team.com", role: "Support Lead", department: "Customer Support", available: true },
  { id: "2", name: "Sarah Johnson", email: "devops@gcp-team.com", role: "DevOps Engineer", department: "Operations", available: true },
  { id: "3", name: "Mike Chen", email: "iam@gcp-team.com", role: "Security Specialist", department: "Security", available: false },
  { id: "4", name: "Emily Davis", email: "network@gcp-team.com", role: "Network Engineer", department: "Infrastructure", available: true },
  { id: "5", name: "Alex Kumar", email: "cloud@gcp-team.com", role: "Cloud Architect", department: "Architecture", available: true },
  { id: "6", name: "Lisa Wang", email: "billing@gcp-team.com", role: "Billing Specialist", department: "Finance", available: true },
];

export default function AdminDashboardPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [customEmail, setCustomEmail] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [newTickets, setNewTickets] = useState<Ticket[]>([]);
  
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth") === "true";
    if (!isAdmin) {
      navigate("/admin/login");
      return;
    }
    
    const allTickets = getAllTickets();
    setTickets(allTickets);
    
    const newTicketsFiltered = allTickets.filter(ticket => 
      ticket.status === 'open' && ticket.comments.length === 0
    );
    setNewTickets(newTicketsFiltered);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin dashboard",
    });
    navigate("/admin/login");
  };
  
  const handleStatusChange = (ticketId: string, newStatus: Ticket["status"]) => {
    const updatedTicket = updateTicket(ticketId, { status: newStatus });
    if (updatedTicket) {
      addComment(
        ticketId,
        `Status changed to ${newStatus}`,
        "system"
      );
      
      toast({
        title: "Ticket updated",
        description: `Ticket ${ticketId} status changed to ${newStatus}`,
      });
      
      setTickets(getAllTickets());
      
      if (selectedTicket && selectedTicket.id === ticketId) {
        const refreshedTicket = getTicketById(ticketId);
        if (refreshedTicket) {
          setSelectedTicket(refreshedTicket);
        }
      }
    }
  };
  
  const handleAssignTicket = (ticketId: string, assignee: string) => {
    const emailToAssign = assignee === "custom" ? customEmail : assignee;
    
    if (assignee === "custom" && (!customEmail || !customEmail.includes('@'))) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    const updatedTicket = updateTicket(ticketId, { 
      assignedTo: emailToAssign || undefined,
      status: emailToAssign ? 'in-progress' : 'open' 
    });
    
    if (updatedTicket) {
      addComment(
        ticketId,
        emailToAssign 
          ? `Ticket assigned to ${emailToAssign}`
          : `Ticket unassigned`,
        "system"
      );
      
      toast({
        title: "Ticket assigned",
        description: emailToAssign 
          ? `Ticket ${ticketId} assigned to ${emailToAssign}`
          : `Ticket ${ticketId} is now unassigned`,
      });
      
      setTickets(getAllTickets());
      
      if (selectedTicket && selectedTicket.id === ticketId) {
        const refreshedTicket = getTicketById(ticketId);
        if (refreshedTicket) {
          setSelectedTicket(refreshedTicket);
        }
      }
      
      setCustomEmail("");
    }
  };
  
  const openTickets = tickets.filter(ticket => ticket.status === 'open');
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'in-progress');
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'resolved');
  const closedTickets = tickets.filter(ticket => ticket.status === 'closed');
  
  const criticalTickets = tickets.filter(ticket => ticket.priority === 'critical');
  const highPriorityTickets = tickets.filter(ticket => ticket.priority === 'high');
  
  const filteredTickets = tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.gcpService.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const markNotificationsAsRead = () => {
    setNewTickets([]);
    setShowNotifications(false);
    toast({
      title: "Notifications cleared",
      description: "All ticket notifications have been marked as read",
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">GCP Support Ticket Management</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Button 
              variant="outline" 
              size="icon" 
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              {newTickets.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {newTickets.length}
                </span>
              )}
            </Button>
            
            {showNotifications && newTickets.length > 0 && (
              <div className="absolute right-0 mt-2 w-80 bg-card border rounded-md shadow-lg z-10">
                <div className="p-3 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">New Tickets</h3>
                    <Button variant="ghost" size="sm" onClick={markNotificationsAsRead}>
                      Mark all read
                    </Button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {newTickets.map(ticket => (
                    <div 
                      key={ticket.id} 
                      className="p-3 border-b hover:bg-accent cursor-pointer"
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setActiveTab("manage");
                        setShowNotifications(false);
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <TicketIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{ticket.id}: {ticket.title}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <TicketPriorityBadge priority={ticket.priority} />
                            <span className="text-xs text-muted-foreground">
                              {new Date(ticket.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-2xl">
          <TabsTrigger value="overview" className="gap-2">
            <PieChart className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tickets" className="gap-2">
            <TicketIcon className="h-4 w-4" />
            Tickets
          </TabsTrigger>
          <TabsTrigger value="manage" className="gap-2">
            <UserCog className="h-4 w-4" />
            Ticket Management
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold">
                  {openTickets.length}
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-orange-500" />
                  Open Tickets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground text-sm">
                  Waiting for assignment
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold">
                  {inProgressTickets.length}
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <UserCog className="h-4 w-4 text-blue-500" />
                  In Progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground text-sm">
                  Currently being worked on
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold">
                  {resolvedTickets.length}
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Resolved
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground text-sm">
                  Solution provided
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold">
                  {closedTickets.length}
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <XCircle className="h-4 w-4 text-gray-500" />
                  Closed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground text-sm">
                  Issue completed
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Critical Tickets</CardTitle>
                <CardDescription>
                  High-priority tickets requiring immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                {criticalTickets.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No critical tickets at the moment
                  </div>
                ) : (
                  <div className="space-y-4">
                    {criticalTickets.map(ticket => (
                      <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-md bg-red-50 dark:bg-red-900/10">
                        <div>
                          <div className="font-medium">{ticket.title}</div>
                          <div className="text-sm text-muted-foreground">{ticket.id} - {ticket.gcpService}</div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setActiveTab("manage");
                          }}
                        >
                          Manage
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recently Updated</CardTitle>
                <CardDescription>
                  Tickets with recent activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets
                      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                      .slice(0, 5)
                      .map(ticket => (
                        <TableRow key={ticket.id} className="cursor-pointer" onClick={() => {
                          setSelectedTicket(ticket);
                          setActiveTab("manage");
                        }}>
                          <TableCell className="font-medium">{ticket.id}</TableCell>
                          <TableCell className="truncate max-w-[200px]">{ticket.title}</TableCell>
                          <TableCell><TicketStatusBadge status={ticket.status} /></TableCell>
                          <TableCell><TicketPriorityBadge priority={ticket.priority} /></TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>All Tickets</CardTitle>
              <CardDescription>
                View and manage all support tickets
              </CardDescription>
              <div className="mt-4">
                <Input
                  placeholder="Search tickets by ID, title, service, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>GCP Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map(ticket => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell className="truncate max-w-[200px]">{ticket.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{ticket.gcpService}</Badge>
                      </TableCell>
                      <TableCell>
                        <TicketStatusBadge status={ticket.status} />
                      </TableCell>
                      <TableCell>
                        <TicketPriorityBadge priority={ticket.priority} />
                      </TableCell>
                      <TableCell className="truncate max-w-[150px]">{ticket.createdBy}</TableCell>
                      <TableCell className="truncate max-w-[150px]">
                        {ticket.assignedTo || "-"}
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setActiveTab("manage");
                          }}
                        >
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="manage">
          {selectedTicket ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-1">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle>Ticket Management</CardTitle>
                    <CardDescription>
                      Update status and assign tickets
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Update Status
                      </label>
                      <Select 
                        value={selectedTicket.status}
                        onValueChange={(value) => handleStatusChange(selectedTicket.id, value as Ticket["status"])}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Assign To Team Member
                      </label>
                      <Select 
                        value={selectedTicket.assignedTo || ""}
                        onValueChange={(value) => {
                          if (value === "custom") {
                            setCustomEmail("");
                          } else {
                            handleAssignTicket(selectedTicket.id, value);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select team member" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Unassigned</SelectItem>
                          {supportTeam.map((member) => (
                            <SelectItem 
                              key={member.id} 
                              value={member.email}
                              disabled={!member.available}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${member.available ? 'bg-green-500' : 'bg-gray-400'}`} />
                                <span>{member.name}</span>
                                <span className="text-muted-foreground text-xs">({member.role})</span>
                              </div>
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">Add Custom Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Team Member List */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Available Team Members
                      </label>
                      <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-2">
                        {supportTeam.map((member) => (
                          <div 
                            key={member.id}
                            className={`flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer transition-colors ${
                              selectedTicket.assignedTo === member.email ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50'
                            }`}
                            onClick={() => member.available && handleAssignTicket(selectedTicket.id, member.email)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                                member.available ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/30 text-muted-foreground'
                              }`}>
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="font-medium text-sm">{member.name}</div>
                                <div className="text-xs text-muted-foreground">{member.role} • {member.department}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {selectedTicket.assignedTo === member.email && (
                                <Badge variant="secondary" className="text-xs">Assigned</Badge>
                              )}
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                member.available 
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                              }`}>
                                {member.available ? 'Available' : 'Busy'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {selectedTicket.assignedTo === "custom" && (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Custom Email
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="email"
                            placeholder="team.member@example.com"
                            value={customEmail}
                            onChange={(e) => setCustomEmail(e.target.value)}
                          />
                          <Button 
                            size="sm"
                            onClick={() => handleAssignTicket(selectedTicket.id, "custom")}
                          >
                            Assign
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4">
                      <Button 
                        className="w-full"
                        variant="outline"
                        onClick={() => setSelectedTicket(null)}
                      >
                        Close Ticket View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="col-span-1 lg:col-span-2">
                <TicketCard ticket={selectedTicket} />
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Ticket Comments</CardTitle>
                    <CardDescription>
                      Communication history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedTicket.comments.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No comments on this ticket yet
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedTicket.comments.map(comment => (
                          <div key={comment.id} className="border rounded-lg p-4 bg-muted/50">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(comment.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <TicketIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Ticket Selected</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Select a ticket from the Tickets tab or Overview tab to manage its status and assignment
                </p>
                <Button onClick={() => setActiveTab("tickets")}>
                  View All Tickets
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
