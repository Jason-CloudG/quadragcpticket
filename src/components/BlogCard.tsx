
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CalendarDays } from 'lucide-react';
import { BlogPost } from '@/lib/blogData';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'compact';
  className?: string;
}

export function BlogCard({ post, variant = 'default', className }: BlogCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = post.coverImage;
    img.onload = () => setImageLoaded(true);
  }, [post.coverImage]);

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link to={`/blog/${post.slug}`}>
      <Card className={cn(
        "overflow-hidden h-full transition-all duration-300 hover:shadow-lg border group",
        className
      )}>
        <div className={cn(
          "relative overflow-hidden",
          variant === 'default' ? "h-48 sm:h-56" : "h-32 sm:h-40"
        )}>
          <div className={cn(
            "absolute inset-0 transition-transform duration-500 group-hover:scale-105",
            !imageLoaded && "image-loading"
          )} 
            style={{ 
              backgroundImage: `url(${post.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          {post.featured && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-primary text-primary-foreground px-2 py-1">
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardContent className={cn(
          "flex flex-col",
          variant === 'default' ? "p-5" : "p-3"
        )}>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Badge variant="outline" className="rounded-full hover:bg-secondary">
              {post.category}
            </Badge>
            <div className="flex items-center">
              <CalendarDays className="h-3 w-3 mr-1" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {post.readTime} min read
            </div>
          </div>
          
          <h3 className={cn(
            "font-heading font-semibold tracking-tight group-hover:text-primary transition-colors line-clamp-2",
            variant === 'default' ? "text-xl mb-2" : "text-lg mb-1"
          )}>
            {post.title}
          </h3>
          
          {variant === 'default' && (
            <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
              {post.excerpt}
            </p>
          )}
          
          <div className="mt-auto flex flex-wrap gap-2">
            {variant === 'default' && post.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default BlogCard;
