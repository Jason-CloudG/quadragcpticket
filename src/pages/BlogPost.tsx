
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BlogContent from "@/components/BlogContent";
import BlogCard from "@/components/BlogCard";
import { getPostBySlug, getRecentPosts, BlogPost as BlogPostType } from "@/lib/blogData";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on first load
    window.scrollTo(0, 0);
    
    if (slug) {
      const fetchedPost = getPostBySlug(slug);
      
      if (fetchedPost) {
        setPost(fetchedPost);
        
        // Get related posts (here we're just getting recent posts as a placeholder)
        setRelatedPosts(getRecentPosts(3).filter(p => p.id !== fetchedPost.id));
      } else {
        // Post not found, navigate to 404
        navigate("/not-found", { replace: true });
      }
    }
    
    setLoading(false);
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-muted rounded w-64 mb-4"></div>
          <div className="h-4 bg-muted rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="pt-32 md:pt-40 pb-10">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/blogs">
              <Button variant="ghost" size="sm" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Blogs
              </Button>
            </Link>
          </div>
          
          <BlogContent post={post} />
          
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-8">
              <Separator className="mb-8" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-8">
                Related Articles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} variant="compact" />
                ))}
              </div>
              
              <div className="flex justify-center mt-10">
                <Link to="/blogs">
                  <Button variant="outline" className="group">
                    View All Articles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
