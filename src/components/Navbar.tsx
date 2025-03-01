
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Ticket, 
  TicketPlus,
  Home,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in as admin
    const adminAuth = localStorage.getItem('adminAuth');
    setIsAdmin(adminAuth === 'true');
  }, [location.pathname]); // Re-check when route changes

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4 mr-2" /> },
    { name: 'Tickets', path: '/tickets', icon: <Ticket className="h-4 w-4 mr-2" /> },
    { name: 'Create Ticket', path: '/tickets/new', icon: <TicketPlus className="h-4 w-4 mr-2" /> },
  ];

  // Admin links - only shown when admin is logged in
  const adminLinks = isAdmin ? [
    { name: 'Admin Dashboard', path: '/admin/dashboard', icon: <ShieldCheck className="h-4 w-4 mr-2" /> }
  ] : [
    { name: 'Admin Login', path: '/admin/login', icon: <ShieldCheck className="h-4 w-4 mr-2" /> }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80" 
          : "bg-transparent"
      )}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="text-xl md:text-2xl font-bold tracking-tight transition-colors hover:text-primary flex items-center"
            >
              {/* Replace the Ticket icon with your custom image */}
              <img 
                src="/your-logo.png" 
                alt="GCP Tickets Logo" 
                className="h-8 w-8 mr-2"
              />
              GCP Tickets
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-2 flex items-center",
                  isActive(link.path) 
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:transform after:scale-x-100 after:transition-transform" 
                    : "text-foreground/80 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-primary hover:after:transform hover:after:scale-x-0 hover:after:transition-transform hover:after:origin-center hover:after:duration-300 hover:after:ease-in-out hover:after:scale-x-100"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            {adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-2 flex items-center",
                  isActive(link.path) 
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:transform after:scale-x-100 after:transition-transform" 
                    : "text-foreground/80 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-primary hover:after:transform hover:after:scale-x-0 hover:after:transition-transform hover:after:origin-center hover:after:duration-300 hover:after:ease-in-out hover:after:scale-x-100"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            <Link to="/tickets/new">
              <Button size="sm" className="ml-2">
                <TicketPlus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </Link>
          </nav>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary py-2 flex items-center",
                      isActive(link.path) ? "text-primary" : "text-foreground"
                    )}
                    onClick={(e) => {
                      const sheet = document.querySelector('[data-state="open"]');
                      if (sheet) {
                        const closeButton = sheet.querySelector('button[data-close]') as HTMLButtonElement;
                        if (closeButton) closeButton.click();
                      }
                    }}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
                
                {adminLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary py-2 flex items-center",
                      isActive(link.path) ? "text-primary" : "text-foreground"
                    )}
                    onClick={(e) => {
                      const sheet = document.querySelector('[data-state="open"]');
                      if (sheet) {
                        const closeButton = sheet.querySelector('button[data-close]') as HTMLButtonElement;
                        if (closeButton) closeButton.click();
                      }
                    }}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
                
                <div className="mt-4 pt-4 border-t">
                  <Link to="/tickets/new" className="w-full">
                    <Button className="w-full">
                      <TicketPlus className="h-4 w-4 mr-2" />
                      Create New Ticket
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
