
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/blogData';
import { cn } from '@/lib/utils';

interface FeaturedBlogProps {
  post: BlogPost;
  className?: string;
}

export function FeaturedBlog({ post, className }: FeaturedBlogProps) {
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
    <div className={cn(
      "group relative overflow-hidden rounded-xl",
      className
    )}>
      <div className="absolute inset-0 z-0">
        <div className={cn(
          "absolute inset-0 transition-transform duration-700 ease-in-out group-hover:scale-105",
          !imageLoaded && "image-loading"
        )} 
          style={{ 
            backgroundImage: `url(${post.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/5" />
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge className="bg-primary text-primary-foreground">
            Featured
          </Badge>
          <Badge variant="secondary">{post.category}</Badge>
        </div>
        
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2 md:mb-4">
          {post.title}
        </h2>
        
        <p className="text-muted-foreground md:text-lg mb-4 md:mb-6 max-w-3xl">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            {formattedDate}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            {post.readTime} min read
          </div>
        </div>
        
        <Link to={`/blog/${post.slug}`}>
          <Button className="group/button">
            Read Article
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FeaturedBlog;
