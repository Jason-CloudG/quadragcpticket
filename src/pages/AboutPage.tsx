
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen pb-16">
      <section className="pt-32 md:pt-40 pb-10">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
              About GCloud Blogs
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              A collection of insights, tutorials, and best practices for Google Cloud Platform
            </p>
            
            <Separator className="my-8" />
            
            <div className="prose dark:prose-invert max-w-none">
              <h2>Our Mission</h2>
              <p>
                GCloud Blogs is dedicated to sharing knowledge, best practices, and innovative solutions for the Google Cloud Platform. Our mission is to help developers, architects, and decision-makers leverage the full potential of cloud technologies.
              </p>
              
              <h2>What We Cover</h2>
              <p>
                Our content spans a wide range of Google Cloud topics, including:
              </p>
              <ul>
                <li>Cloud architecture and design patterns</li>
                <li>Machine learning and AI on Google Cloud</li>
                <li>Data engineering and analytics</li>
                <li>Security best practices</li>
                <li>Cost optimization strategies</li>
                <li>DevOps and CI/CD pipelines</li>
                <li>Serverless architectures</li>
              </ul>
              
              <h2>About the Author</h2>
              <p>
                Our blogs are written by Alex Thompson, a Google Cloud certified professional with over 8 years of experience in cloud architecture and development. Alex has worked with companies of all sizes to design, implement, and optimize their Google Cloud infrastructure.
              </p>
              <p>
                With a background in software engineering and data science, Alex brings a unique perspective to cloud computing, focusing on practical solutions to real-world challenges.
              </p>
              
              <h2>Stay Connected</h2>
              <p>
                We're constantly adding new content and resources. To stay updated:
              </p>
              <ul>
                <li>Subscribe to our newsletter</li>
                <li>Follow us on social media</li>
                <li>Join our community forum</li>
              </ul>
              
              <h2>Contact Us</h2>
              <p>
                Have questions, suggestions, or want to collaborate? We'd love to hear from you!
              </p>
              <p>
                Email: contact@gcloudblogs.com
              </p>
            </div>
            
            <Separator className="my-8" />
            
            <div className="flex justify-center mt-8">
              <Link to="/blogs">
                <Button size="lg" className="group">
                  Explore Our Blogs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
