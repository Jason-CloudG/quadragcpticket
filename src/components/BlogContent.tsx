
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Calendar, Share2 } from 'lucide-react';
import { BlogPost } from '@/lib/blogData';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

interface BlogContentProps {
  post: BlogPost;
  className?: string;
}

export function BlogContent({ post, className }: BlogContentProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  
  useEffect(() => {
    const img = new Image();
    img.src = post.coverImage;
    img.onload = () => setImageLoaded(true);
    
    // Set initial load false after component mounts
    const timer = setTimeout(() => setInitialLoad(false), 500);
    return () => clearTimeout(timer);
  }, [post.coverImage]);

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Would typically show a toast here
      alert('Link copied to clipboard!');
    }
  };

  return (
    <article className={cn(
      "animate-fade-in",
      className
    )}>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="rounded-full">
            <Link to={`/categories/${post.category.toLowerCase()}`}>
              {post.category}
            </Link>
          </Badge>
          <button 
            onClick={handleShare}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>
        
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-4 mt-6 mb-8">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span className="text-sm font-medium">{post.author.name}</span>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formattedDate}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime} min read
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative mb-10 rounded-lg overflow-hidden">
        <div className={cn(
          "aspect-[16/9] w-full",
          !imageLoaded && "image-loading"
        )}>
          <img 
            src={post.coverImage} 
            alt={post.title}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-500",
              imageLoaded ? "opacity-100" : "opacity-0"
            )} 
          />
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto blog-content">
        <ReactMarkdown>
          {post.content}
        </ReactMarkdown>
      </div>
      
      <div className="mt-12 pt-6 border-t">
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary">
              <Link to={`/blogs?tag=${tag}`}>
                {tag}
              </Link>
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}

export default BlogContent;
