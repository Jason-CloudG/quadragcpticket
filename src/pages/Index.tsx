
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FeaturedBlog from "@/components/FeaturedBlog";
import BlogCard from "@/components/BlogCard";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getFeaturedPosts, getRecentPosts, getAllCategories } from "@/lib/blogData";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts(6);
  const categories = getAllCategories();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <Badge className="mb-4" variant="outline">
              Google Cloud Blog Collection
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Insights & Expertise on Google Cloud Technologies
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl">
              Deep dives, best practices, and expert guidance on leveraging the full power of Google Cloud Platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/blogs">
                <Button size="lg" className="font-medium group">
                  Explore All Blogs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline" size="lg">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                  Featured Posts
                </h2>
                <p className="text-muted-foreground mt-2">
                  Selected articles for deeper exploration
                </p>
              </div>
              <Link to="/blogs">
                <Button variant="ghost" className="group">
                  View all
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {featuredPosts.map((post) => (
                <div
                  key={post.id}
                  className={`animate-fade-in opacity-0`}
                  style={{
                    animationDelay: mounted ? `${parseInt(post.id) * 100}ms` : "0ms",
                    animationFillMode: "forwards",
                  }}
                >
                  <FeaturedBlog post={post} className="h-[500px]" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                Recent Articles
              </h2>
              <p className="text-muted-foreground mt-2">
                The latest insights from our blog
              </p>
            </div>
            <Link to="/blogs">
              <Button variant="ghost" className="group">
                View all
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Explore by Category
            </h2>
            <p className="text-muted-foreground">
              Dive into specific Google Cloud topics
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <Link
                key={category}
                to={`/categories/${category.toLowerCase()}`}
                className={`bg-card hover:bg-accent transition-colors duration-300 shadow rounded-lg p-6 text-center group animate-fade-in opacity-0`}
                style={{
                  animationDelay: mounted ? `${index * 100}ms` : "0ms",
                  animationFillMode: "forwards",
                }}
              >
                <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {category}
                </h3>
                <div className="flex justify-center mt-4">
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/categories">
              <Button size="lg" variant="outline">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between bg-muted rounded-xl p-8 md:p-12">
            <div className="md:max-w-md">
              <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Stay Updated
              </h2>
              <p className="text-muted-foreground mb-4">
                Subscribe to our newsletter for the latest Google Cloud insights, tutorials, and best practices.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
