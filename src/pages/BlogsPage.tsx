
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/BlogCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  blogPosts, 
  filterPostsByCategory, 
  getAllTags, 
  filterPostsByTag,
  searchPosts
} from "@/lib/blogData";

const BlogsPage = () => {
  const location = useLocation();
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState(blogPosts);
  const [activeTab, setActiveTab] = useState("all");
  const [mounted, setMounted] = useState(false);
  
  const tags = getAllTags();

  useEffect(() => {
    setMounted(true);
    
    // Parse URL search params
    const searchParams = new URLSearchParams(location.search);
    const tagParam = searchParams.get("tag");
    const searchParam = searchParams.get("search");
    
    if (tagParam) {
      setPosts(filterPostsByTag(tagParam));
      setActiveTab(`tag-${tagParam}`);
    } else if (category) {
      setPosts(filterPostsByCategory(category));
      setActiveTab(`category-${category}`);
    } else if (searchParam) {
      setSearchQuery(searchParam);
      setPosts(searchPosts(searchParam));
      setActiveTab("search");
    } else {
      setPosts(blogPosts);
      setActiveTab("all");
    }
  }, [location.search, category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setPosts(searchPosts(searchQuery));
      setActiveTab("search");
    } else {
      setPosts(blogPosts);
      setActiveTab("all");
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <section className="pt-32 md:pt-40 pb-10">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {category ? `${category} Blogs` : "Blog Archive"}
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              {category 
                ? `Browse our collection of ${category} articles and tutorials`
                : "Explore our collection of articles, tutorials, and insights"}
            </p>
            
            <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Search</Button>
            </form>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <TabsList className="overflow-x-auto w-full sm:w-auto p-1">
                <TabsTrigger value="all" className="text-sm">
                  All
                </TabsTrigger>
                {tags.map((tag) => (
                  <TabsTrigger key={tag} value={`tag-${tag}`} className="text-sm">
                    {tag}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="px-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.length > 0 ? (
                  posts.map((post, index) => (
                    <div
                      key={post.id}
                      className={`animate-fade-in opacity-0`}
                      style={{
                        animationDelay: mounted ? `${index * 100}ms` : "0ms",
                        animationFillMode: "forwards",
                      }}
                    >
                      <BlogCard post={post} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setPosts(blogPosts);
                        setActiveTab("all");
                        setSearchQuery("");
                      }}
                    >
                      View all articles
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
