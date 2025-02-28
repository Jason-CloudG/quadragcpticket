
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCategories, filterPostsByCategory } from "@/lib/blogData";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";

const CategoriesPage = () => {
  const [mounted, setMounted] = useState(false);
  const categories = getAllCategories();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen pb-16">
      <section className="pt-32 md:pt-40 pb-10">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Categories
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse articles by category to find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const categoryPosts = filterPostsByCategory(category).slice(0, 1);
              
              return (
                <div 
                  key={category}
                  className={`animate-fade-in opacity-0`}
                  style={{
                    animationDelay: mounted ? `${index * 100}ms` : "0ms",
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="bg-card rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <h2 className="font-heading text-2xl font-semibold tracking-tight mb-4">
                        {category}
                      </h2>
                      
                      <div className="mb-6">
                        {categoryPosts.map(post => (
                          <BlogCard key={post.id} post={post} />
                        ))}
                      </div>
                      
                      <Link to={`/categories/${category.toLowerCase()}`}>
                        <Button className="w-full group">
                          Browse {category} Articles
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;
