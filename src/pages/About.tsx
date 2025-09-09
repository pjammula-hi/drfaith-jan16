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
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="relative overflow-hidden border-none shadow-xl bg-gradient-to-br from-primary/5 via-background to-primary/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative z-10 pb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-primary">Education</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                <div className="bg-background/50 rounded-lg p-4 border border-primary/10">
                  <h4 className="text-lg font-bold text-primary mb-2">Doctor of Medicine (MD)</h4>
                  <p className="text-base font-medium text-foreground mb-1">
                    Renaissance School of Medicine
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Stony Brook University
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4 border border-primary/10">
                  <h4 className="text-lg font-bold text-primary mb-2">Psychiatry Residency</h4>
                  <p className="text-base font-medium text-foreground">
                    Westchester Medical Center, New York
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-none shadow-xl bg-gradient-to-br from-secondary/5 via-background to-secondary/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative z-10 pb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl text-secondary">Specialized Certifications</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4">
                <div className="bg-background/50 rounded-lg p-4 border border-secondary/10 flex items-center space-x-3">
                  <div className="w-3 h-3 bg-secondary rounded-full flex-shrink-0"></div>
                  <p className="text-base font-medium text-foreground">
                    Mindfulness-Based Stress Reduction
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4 border border-secondary/10 flex items-center space-x-3">
                  <div className="w-3 h-3 bg-secondary rounded-full flex-shrink-0"></div>
                  <p className="text-base font-medium text-foreground">
                    International Society for Sports Psychiatry
                  </p>
                </div>
              </CardContent>
            </Card>
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