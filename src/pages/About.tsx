import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Award, Heart, Brain } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-background to-secondary/10"></div>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-10 left-1/3 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-1/3 w-40 h-40 bg-secondary/10 rounded-full blur-2xl"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Refined heading */}
          <div className="mb-6 space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-tight tracking-tight">
              EMPOWER YOUR LIFE
            </h1>
          </div>
          
          {/* Clean subtitle */}
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Comprehensive mental health care with
            </p>
            <p className="text-xl md:text-2xl font-semibold text-primary">
              Dr. Faith Consiglio
            </p>
            
            {/* Simple decorative accent */}
            <div className="flex items-center justify-center py-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/40"></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full mx-4"></div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/40"></div>
            </div>
            
            {/* Concise tagline */}
            <p className="text-base md:text-lg text-muted-foreground/80 italic max-w-2xl mx-auto">
              Discover your path to wellness and optimal mental health
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Education & Training */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            Education & Training
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-card rounded-lg p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">MD Degree</h3>
                    <p className="text-foreground">Renaissance School of Medicine, Stony Brook University</p>
                  </div>
                </div>
                <hr className="border-border" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Residency</h3>
                    <p className="text-foreground">Psychiatry at Westchester Medical Center, NY</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specialized Certifications */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            Specialized Certifications
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-lg p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Mindfulness-Based Stress Reduction</h3>
                </div>
                <hr className="border-border" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">International Society for Sports Psychiatry</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-16 bg-primary/20" />

        {/* My Approach */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            My Approach
          </h2>
          
          <Card className="border-primary/20 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/10">
            <CardContent className="p-12">
              <blockquote className="text-xl md:text-2xl leading-relaxed text-foreground italic">
                "I believe in treating the whole person, not just symptoms. My integrated approach 
                combines medication management, psychotherapy, and mindfulness practices to support 
                your journey toward optimal mental wellness."
              </blockquote>
              <div className="mt-8 text-lg text-primary font-semibold">
                — Dr. Faith Consiglio
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;