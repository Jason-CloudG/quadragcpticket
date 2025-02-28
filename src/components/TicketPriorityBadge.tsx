
import { Badge } from "@/components/ui/badge";
import { Ticket } from "@/lib/ticketData";
import { 
  AlertTriangle, 
  AlertCircle, 
  ArrowDown, 
  ArrowUp 
} from "lucide-react";

interface TicketPriorityBadgeProps {
  priority: Ticket["priority"];
}

export function TicketPriorityBadge({ priority }: TicketPriorityBadgeProps) {
  const getPriorityStyles = () => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400";
      case "medium":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400";
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400";
      case "critical":
        return "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "";
    }
  };

  const getPriorityIcon = () => {
    switch (priority) {
      case "low":
        return <ArrowDown className="h-3.5 w-3.5 mr-1" />;
      case "medium":
        return <ArrowUp className="h-3.5 w-3.5 mr-1" />;
      case "high":
        return <AlertTriangle className="h-3.5 w-3.5 mr-1" />;
      case "critical":
        return <AlertCircle className="h-3.5 w-3.5 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Badge variant="outline" className={`flex items-center ${getPriorityStyles()}`}>
      {getPriorityIcon()}
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
}
