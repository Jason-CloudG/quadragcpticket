
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  gcpService: string;
  createdBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  ticketId: string;
  content: string;
  author: string;
  createdAt: string;
}

export const gcpServices = [
  "Compute Engine",
  "Cloud Storage",
  "BigQuery",
  "Cloud Run",
  "Kubernetes Engine",
  "Cloud Functions",
  "Cloud SQL",
  "Vertex AI",
  "App Engine",
  "Cloud Spanner",
  "Dataflow",
  "Dataproc",
  "Pub/Sub",
  "Other"
];

// Mock data for development
export const mockTickets: Ticket[] = [
  {
    id: "T-1001",
    title: "Compute Engine VM not starting",
    description: "Our production VM instance stopped responding and won't restart. We need urgent assistance.",
    status: "in-progress",
    priority: "critical",
    gcpService: "Compute Engine",
    createdBy: "alex@example.com",
    assignedTo: "support@gcp-team.com",
    createdAt: "2023-07-15T09:24:00Z",
    updatedAt: "2023-07-15T10:30:00Z",
    comments: [
      {
        id: "C-100",
        ticketId: "T-1001",
        content: "We're looking into this issue. Could you provide the VM instance ID?",
        author: "support@gcp-team.com",
        createdAt: "2023-07-15T09:45:00Z"
      },
      {
        id: "C-101",
        ticketId: "T-1001",
        content: "Instance ID is vm-prod-app-01. We've tried standard troubleshooting steps.",
        author: "alex@example.com",
        createdAt: "2023-07-15T10:00:00Z"
      }
    ]
  },
  {
    id: "T-1002",
    title: "BigQuery query timeout",
    description: "Our analytics queries are timing out consistently when processing large datasets.",
    status: "open",
    priority: "high",
    gcpService: "BigQuery",
    createdBy: "sarah@example.com",
    createdAt: "2023-07-14T15:30:00Z",
    updatedAt: "2023-07-14T15:30:00Z",
    comments: []
  },
  {
    id: "T-1003",
    title: "Need assistance with Cloud Run deployment",
    description: "We're trying to deploy our containerized application to Cloud Run but receiving build errors.",
    status: "resolved",
    priority: "medium",
    gcpService: "Cloud Run",
    createdBy: "mike@example.com",
    assignedTo: "devops@gcp-team.com",
    createdAt: "2023-07-10T11:24:00Z",
    updatedAt: "2023-07-12T09:15:00Z",
    comments: [
      {
        id: "C-102",
        ticketId: "T-1003",
        content: "Could you share the specific error messages you're seeing?",
        author: "devops@gcp-team.com",
        createdAt: "2023-07-10T13:20:00Z"
      },
      {
        id: "C-103",
        ticketId: "T-1003",
        content: "Error is: 'Container failed to start. Failed to start and then listen on the port defined by the PORT environment variable.'",
        author: "mike@example.com",
        createdAt: "2023-07-10T14:05:00Z"
      },
      {
        id: "C-104",
        ticketId: "T-1003",
        content: "This is typically caused by your application not listening on the port specified by the PORT environment variable. Please modify your application to listen on the port specified by the PORT environment variable.",
        author: "devops@gcp-team.com",
        createdAt: "2023-07-11T09:30:00Z"
      },
      {
        id: "C-105",
        ticketId: "T-1003",
        content: "That fixed the issue. Thank you for your help!",
        author: "mike@example.com",
        createdAt: "2023-07-12T09:15:00Z"
      }
    ]
  },
  {
    id: "T-1004",
    title: "Cloud Storage access permissions",
    description: "Need help setting up proper IAM roles for our team to access specific buckets.",
    status: "closed",
    priority: "low",
    gcpService: "Cloud Storage",
    createdBy: "jessica@example.com",
    assignedTo: "iam@gcp-team.com",
    createdAt: "2023-07-05T10:00:00Z",
    updatedAt: "2023-07-07T16:45:00Z",
    comments: [
      {
        id: "C-106",
        ticketId: "T-1004",
        content: "I've set up the requested permissions. Please check if your team can access the buckets now.",
        author: "iam@gcp-team.com",
        createdAt: "2023-07-06T11:30:00Z"
      },
      {
        id: "C-107",
        ticketId: "T-1004",
        content: "Access is working correctly now. Thank you!",
        author: "jessica@example.com",
        createdAt: "2023-07-07T09:15:00Z"
      }
    ]
  },
  {
    id: "T-1005",
    title: "Vertex AI model deployment failing",
    description: "We're trying to deploy our custom ML model to Vertex AI but the deployment is failing.",
    status: "open",
    priority: "high",
    gcpService: "Vertex AI",
    createdBy: "david@example.com",
    createdAt: "2023-07-14T17:00:00Z",
    updatedAt: "2023-07-14T17:00:00Z",
    comments: []
  }
];

// Ticket service functions
let tickets = [...mockTickets];

export const getAllTickets = (): Ticket[] => {
  return tickets;
};

export const getTicketById = (id: string): Ticket | undefined => {
  return tickets.find(ticket => ticket.id === id);
};

export const createTicket = (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'comments'>): Ticket => {
  const now = new Date().toISOString();
  const newTicket: Ticket = {
    ...ticket,
    id: `T-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: now,
    updatedAt: now,
    comments: []
  };
  
  tickets = [newTicket, ...tickets];
  return newTicket;
};

export const updateTicket = (id: string, updates: Partial<Ticket>): Ticket | undefined => {
  const index = tickets.findIndex(ticket => ticket.id === id);
  
  if (index !== -1) {
    const updatedTicket = {
      ...tickets[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    tickets[index] = updatedTicket;
    return updatedTicket;
  }
  
  return undefined;
};

export const addComment = (ticketId: string, content: string, author: string): Comment | undefined => {
  const ticket = tickets.find(t => t.id === ticketId);
  
  if (!ticket) return undefined;
  
  const newComment: Comment = {
    id: `C-${Math.floor(100 + Math.random() * 900)}`,
    ticketId,
    content,
    author,
    createdAt: new Date().toISOString()
  };
  
  ticket.comments.push(newComment);
  ticket.updatedAt = new Date().toISOString();
  
  return newComment;
};

export const searchTickets = (query: string): Ticket[] => {
  const searchTerm = query.toLowerCase();
  return tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchTerm) || 
    ticket.description.toLowerCase().includes(searchTerm) ||
    ticket.gcpService.toLowerCase().includes(searchTerm) ||
    ticket.id.toLowerCase().includes(searchTerm)
  );
};

export const filterTickets = (filters: {
  status?: Ticket['status'][];
  priority?: Ticket['priority'][];
  gcpService?: string[];
}): Ticket[] => {
  return tickets.filter(ticket => {
    let matches = true;
    
    if (filters.status && filters.status.length > 0) {
      matches = matches && filters.status.includes(ticket.status);
    }
    
    if (filters.priority && filters.priority.length > 0) {
      matches = matches && filters.priority.includes(ticket.priority);
    }
    
    if (filters.gcpService && filters.gcpService.length > 0) {
      matches = matches && filters.gcpService.includes(ticket.gcpService);
    }
    
    return matches;
  });
};
