import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Ticket, 
  TicketPlus,
  Home,
  ShieldCheck,
  User,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    setIsAdmin(adminAuth === 'true');
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAdmin(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4 mr-2" /> },
    { name: 'Tickets', path: '/tickets', icon: <Ticket className="h-4 w-4 mr-2" /> },
    { name: 'Create Ticket', path: '/tickets/new', icon: <TicketPlus className="h-4 w-4 mr-2" /> },
  ];

  const getAuthLinks = () => {
    if (isAdmin) {
      return [
        { name: 'Admin Dashboard', path: '/admin/dashboard', icon: <ShieldCheck className="h-4 w-4 mr-2" /> }
      ];
    }
    return [
      { name: 'Login', path: '/login', icon: <User className="h-4 w-4 mr-2" /> }
    ];
  };

  const authLinks = getAuthLinks();

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
              <img 
                src="/lovable-uploads/7be45ebf-5bc1-4395-8507-3cb8b363288d.png" 
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
            
            {authLinks.map((link) => (
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
            
            {isAdmin && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-sm font-medium text-foreground/80 hover:text-primary"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
            
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
                
                {authLinks.map((link) => (
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
                
                <div className="mt-4 pt-4 border-t space-y-3">
                  <Link to="/tickets/new" className="w-full">
                    <Button className="w-full">
                      <TicketPlus className="h-4 w-4 mr-2" />
                      Create New Ticket
                    </Button>
                  </Link>
                  
                  {isAdmin && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  )}
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
