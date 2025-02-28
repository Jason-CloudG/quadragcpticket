
import { Badge } from "@/components/ui/badge";
import { Ticket } from "@/lib/ticketData";

interface TicketStatusBadgeProps {
  status: Ticket["status"];
}

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "resolved":
        return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400";
      case "closed":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800/60 dark:text-gray-400";
      default:
        return "";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <Badge variant="outline" className={getStatusStyles()}>
      {getStatusText()}
    </Badge>
  );
}
