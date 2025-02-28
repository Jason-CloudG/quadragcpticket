
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TicketStatusBadge } from "@/components/TicketStatusBadge";
import { TicketPriorityBadge } from "@/components/TicketPriorityBadge";
import { Clock, Calendar, MessageSquare } from "lucide-react";
import { Ticket } from "@/lib/ticketData";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

interface TicketCardProps {
  ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const getInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };

  const handleClick = () => {
    navigate(`/tickets/${ticket.id}`);
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${isHovered ? 'shadow-md' : 'shadow-sm'} hover:border-primary/50`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{ticket.gcpService}</Badge>
            <TicketStatusBadge status={ticket.status} />
          </div>
          <TicketPriorityBadge priority={ticket.priority} />
        </div>
        <CardTitle className="text-xl mt-2 line-clamp-1">{ticket.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2 mb-4">
          {ticket.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(ticket.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{ticket.comments.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Updated {formatDate(ticket.updatedAt)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex items-center">
          <div className="text-sm text-muted-foreground mr-2">Submitted by:</div>
          <Avatar className="h-6 w-6 mr-1">
            <AvatarFallback className="text-xs">{getInitials(ticket.createdBy)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{ticket.createdBy}</span>
        </div>
        
        {ticket.assignedTo && (
          <div className="flex items-center">
            <div className="text-sm text-muted-foreground mr-2">Assigned to:</div>
            <Avatar className="h-6 w-6 mr-1">
              <AvatarFallback className="text-xs">{getInitials(ticket.assignedTo)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{ticket.assignedTo}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
