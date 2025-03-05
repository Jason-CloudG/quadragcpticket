import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getTicketById,
  updateTicket,
  addComment,
  Ticket,
  Comment
} from "@/lib/ticketData";
import { CommentItem } from "@/components/CommentItem";
import { TicketStatusBadge } from "@/components/TicketStatusBadge";
import { TicketPriorityBadge } from "@/components/TicketPriorityBadge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  ArrowLeft,
  MessageSquare,
  Send,
  Users,
  Edit,
  Clock,
  Calendar,
  UserPlus,
} from "lucide-react";

const supportTeam = [
  "support@gcp-team.com",
  "devops@gcp-team.com",
  "iam@gcp-team.com",
  "network@gcp-team.com"
];

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<Ticket["status"]>("open");
  const [showAssignTicket, setShowAssignTicket] = useState(false);
  const [assigneeEmail, setAssigneeEmail] = useState("");
  const [customEmail, setCustomEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth") === "true";
    setIsAdmin(adminAuth);
    
    if (id) {
      const fetchedTicket = getTicketById(id);
      
      if (fetchedTicket) {
        setTicket(fetchedTicket);
        setNewStatus(fetchedTicket.status);
        setAssigneeEmail(fetchedTicket.assignedTo || "");
      } else {
        navigate("/not-found", { replace: true });
      }
      
      setLoading(false);
    }
  }, [id, navigate]);
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "PPP p");
  };
  
  const getInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim() || !ticket || !userEmail.trim()) {
      return;
    }
    
    setSubmittingComment(true);
    
    try {
      addComment(ticket.id, commentText, userEmail);
      
      const updatedTicket = getTicketById(ticket.id);
      if (updatedTicket) {
        setTicket(updatedTicket);
      }
      
      setCommentText("");
      
      toast({
        title: "Comment added",
        description: "Your comment has been added to the ticket",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error adding comment",
        description: "There was a problem adding your comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmittingComment(false);
    }
  };
  
  const handleUpdateStatus = () => {
    if (!ticket || ticket.status === newStatus) return;
    
    try {
      const updatedTicket = updateTicket(ticket.id, { status: newStatus });
      
      if (updatedTicket) {
        setTicket(updatedTicket);
        setShowUpdateStatus(false);
        
        toast({
          title: "Status updated",
          description: `Ticket status changed to ${newStatus}`,
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error updating status",
        description: "There was a problem updating the ticket status. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleAssignTicket = () => {
    if (!ticket) return;
    
    const emailToAssign = assigneeEmail === "custom" ? customEmail : assigneeEmail;
    
    if (assigneeEmail === "custom" && (!customEmail || !customEmail.includes('@'))) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const updatedTicket = updateTicket(ticket.id, { 
        assignedTo: emailToAssign || undefined,
        status: emailToAssign ? "in-progress" : ticket.status
      });
      
      if (updatedTicket) {
        setTicket(updatedTicket);
        setShowAssignTicket(false);
        
        toast({
          title: emailToAssign ? "Ticket assigned" : "Assignment removed",
          description: emailToAssign ? `Ticket assigned to ${emailToAssign}` : "Ticket is now unassigned",
        });
        
        if (emailToAssign) {
          addComment(
            ticket.id,
            `Ticket assigned to ${emailToAssign}`,
            "system"
          );
          const refreshedTicket = getTicketById(ticket.id);
          if (refreshedTicket) {
            setTicket(refreshedTicket);
          }
        }
      }
    } catch (error) {
      console.error("Error assigning ticket:", error);
      toast({
        title: "Error assigning ticket",
        description: "There was a problem assigning the ticket. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 bg-muted rounded w-64 mb-4"></div>
          <div className="h-6 bg-muted rounded w-32"></div>
        </div>
      </div>
    );
  }
  
  if (!ticket) {
    return null;
  }
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex items-center mb-8">
        <Link to="/tickets">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Tickets
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline">{ticket.gcpService}</Badge>
                <TicketStatusBadge status={ticket.status} />
                <TicketPriorityBadge priority={ticket.priority} />
              </div>
              
              <CardTitle className="text-2xl font-bold">{ticket.title}</CardTitle>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Created {formatDate(ticket.createdAt)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Updated {formatDate(ticket.updatedAt)}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="prose dark:prose-invert max-w-none mb-6">
                <p className="whitespace-pre-wrap">{ticket.description}</p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-5 w-5" />
                  <h3 className="text-lg font-medium">
                    Comments ({ticket.comments.length})
                  </h3>
                </div>
                
                {ticket.comments.length > 0 ? (
                  <div className="space-y-4">
                    {ticket.comments.map((comment) => (
                      <CommentItem key={comment.id} comment={comment} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-6">
                    No comments yet. Be the first to comment.
                  </p>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Add Comment</h3>
                <form onSubmit={handleSubmitComment}>
                  <div className="space-y-4">
                    <div>
                      <Textarea
                        placeholder="Add your comment or update..."
                        className="h-32 resize-none"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Input
                        type="email"
                        placeholder="Your email address"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="gap-2"
                        disabled={submittingComment}
                      >
                        <Send className="h-4 w-4" />
                        {submittingComment ? "Sending..." : "Add Comment"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="space-y-4">
                <div>
                  <div className="text-muted-foreground mb-1">Ticket ID</div>
                  <div className="font-medium">{ticket.id}</div>
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-1">Status</div>
                  <div className="flex items-center justify-between">
                    <TicketStatusBadge status={ticket.status} />
                    <Dialog open={showUpdateStatus} onOpenChange={setShowUpdateStatus}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Ticket Status</DialogTitle>
                          <DialogDescription>
                            Change the current status of this ticket.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <Select 
                            value={newStatus} 
                            onValueChange={(val) => setNewStatus(val as Ticket["status"])}
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
                        <DialogFooter>
                          <Button 
                            variant="outline" 
                            onClick={() => setShowUpdateStatus(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleUpdateStatus}>
                            Update Status
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-1">Priority</div>
                  <TicketPriorityBadge priority={ticket.priority} />
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-1">GCP Service</div>
                  <div>{ticket.gcpService}</div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="text-muted-foreground mb-1">Submitted By</div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{getInitials(ticket.createdBy)}</AvatarFallback>
                    </Avatar>
                    <span>{ticket.createdBy}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground mb-1">Assigned To</div>
                    {isAdmin && (
                      <Dialog open={showAssignTicket} onOpenChange={setShowAssignTicket}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Ticket</DialogTitle>
                            <DialogDescription>
                              Assign this ticket to a team member or add a custom email
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 space-y-4">
                            <Select 
                              value={assigneeEmail} 
                              onValueChange={setAssigneeEmail}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select team member" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="">Unassigned</SelectItem>
                                {supportTeam.map(email => (
                                  <SelectItem key={email} value={email}>{email}</SelectItem>
                                ))}
                                <SelectItem value="custom">Add Custom Email</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            {assigneeEmail === "custom" && (
                              <div>
                                <label className="text-sm font-medium block mb-2">
                                  Enter Email
                                </label>
                                <Input 
                                  type="email"
                                  placeholder="team.member@example.com"
                                  value={customEmail}
                                  onChange={(e) => setCustomEmail(e.target.value)}
                                />
                              </div>
                            )}
                          </div>
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => setShowAssignTicket(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleAssignTicket}>
                              Assign Ticket
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                  
                  {ticket.assignedTo ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{getInitials(ticket.assignedTo)}</AvatarFallback>
                      </Avatar>
                      <span>{ticket.assignedTo}</span>
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm">Not assigned</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
