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
        {/* Introduction */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              About Dr. Faith Consiglio
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-foreground">
                She offers a combination of medication management and psychotherapy, providing thorough 
                sessions and considering all facets of life including the nuances of physical, mental 
                and social well-being.
              </p>
              <p className="text-foreground">
                She is certified in Mindfulness-Based Stress Reduction, and helps clients manage burn out, 
                build confidence, and acquire the tools needed to reach their goals.
              </p>
              <p className="text-foreground">
                Her integrated approach combines evidence-based treatments with personalized care, ensuring 
                each client receives comprehensive support tailored to their unique needs and circumstances.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 via-secondary/20 to-primary/5 rounded-2xl p-8 shadow-lg">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Heart className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Holistic Care</h3>
                <p className="text-muted-foreground">
                  Treating the whole person, not just symptoms
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Education & Training */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            Education & Training
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl text-primary">Education</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div>
                  <p className="text-lg font-semibold text-foreground mb-1">
                    MD Degree
                  </p>
                  <p className="text-base text-muted-foreground mb-1">
                    Renaissance School of Medicine
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Stony Brook University
                  </p>
                </div>
                <Separator className="my-4" />
                <div>
                  <p className="text-lg font-semibold text-foreground mb-1">
                    Psychiatry Residency
                  </p>
                  <p className="text-base text-muted-foreground">
                    Westchester Medical Center, NY
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl text-primary">Specialized Certifications</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Mindfulness-Based Stress Reduction
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  International Society for Sports Psychiatry
                </Badge>
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