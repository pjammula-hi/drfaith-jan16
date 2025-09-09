import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Award, Heart, Brain } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        {/* Background with modern gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Main heading with modern typography */}
          <div className="mb-8 space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-tight tracking-tight">
              EMPOWER
            </h1>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-primary/80 via-primary to-primary/70 bg-clip-text text-transparent leading-tight tracking-tight -mt-4">
              YOUR LIFE
            </h1>
          </div>
          
          {/* Elegant subtitle */}
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl lg:text-3xl text-foreground/80 font-light leading-relaxed mb-4">
              Comprehensive mental health care with
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-8">
              Dr. Faith Consiglio
            </p>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50"></div>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="h-px w-32 bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50"></div>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="h-px w-16 bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>
            
            {/* Inspiring tagline */}
            <p className="text-lg md:text-xl text-muted-foreground italic font-light max-w-2xl mx-auto">
              "Discover your path to wellness, confidence, and optimal mental health"
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
            <div className="prose prose-lg text-muted-foreground">
              <p className="leading-relaxed">
                Dr Faith Consiglio received her doctorate from the Renaissance School of Medicine at 
                Stony Brook University and completed her residency in Psychiatry at Westchester Medical Center in NY.
              </p>
              <p className="leading-relaxed">
                She offers a combination of medication management and psychotherapy, providing thorough 
                sessions and considering all facets of life including the nuances of physical, mental 
                and social well-being.
              </p>
              <p className="leading-relaxed">
                She is also a member of the International Society for Sports Psychiatry, and works with 
                athletes looking to improve their performance. She is certified in Mindfulness-Based 
                Stress Reduction, and helps clients manage burn out, build confidence, and acquire the 
                tools needed to reach their goals.
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
                <CardTitle className="text-2xl text-primary">MD Degree</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-semibold text-foreground mb-2">
                  Renaissance School of Medicine
                </p>
                <p className="text-muted-foreground">
                  Stony Brook University
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl text-primary">Residency</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-semibold text-foreground mb-2">
                  Psychiatry
                </p>
                <p className="text-muted-foreground">
                  Westchester Medical Center, NY
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Specialized Certifications */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            Specialized Certifications
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
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

            <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-primary/5 to-secondary/10">
              <CardHeader>
                <CardTitle className="text-2xl text-primary text-center">Specialties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Sports Performance Enhancement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Burnout Management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Confidence Building</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Goal Achievement Tools</span>
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