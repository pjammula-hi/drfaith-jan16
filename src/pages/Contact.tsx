import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { MapPin, Mail, Phone, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowVerification(true);
  };

  const handleVerificationSubmit = () => {
    if (verificationCode.length === 6) {
      setShowVerification(false);
      toast({
        title: "Message Sent Successfully",
        description: "Your message has been sent. We'll get back to you soon!",
      });
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
      setVerificationCode("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're here to help. Reach out to us for appointments, questions, or to learn more about our services.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Information */}
          <div className="space-y-6">
            {/* Address Card */}
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl font-medium">
                  <div className="p-2 rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  Office Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Lina Grand Central 18E 41st Street<br />
                  14th Floor<br />
                  New York, NY 10017
                </p>
              </CardContent>
            </Card>

            {/* Contact Details Card */}
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl font-medium">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  Contact Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">info@drfaithconsiglio.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">(347) 913-3221</span>
                </div>
              </CardContent>
            </Card>

            {/* Insurance Information Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl font-medium">
                  <div className="p-2 rounded-full bg-primary/20">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  Insurance Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Dr. Consiglio does not currently accept insurance. Please check if your insurance offers out-of-network benefits for possible reimbursement.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-medium text-center">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="bg-background/50 border-input/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                        className="bg-background/50 border-input/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="bg-background/50 border-input/50 focus:border-primary"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      className="bg-background/50 border-input/50 focus:border-primary"
                    />
                  </div>

                  {/* Services Dropdown */}
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-sm font-medium">
                      Service of Interest *
                    </Label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                      <SelectTrigger className="bg-background/50 border-input/50 focus:border-primary">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual-therapy">Individual Therapy</SelectItem>
                        <SelectItem value="couples-therapy">Couples Therapy</SelectItem>
                        <SelectItem value="family-therapy">Family Therapy</SelectItem>
                        <SelectItem value="group-therapy">Group Therapy</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about what you're looking for..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={4}
                      className="bg-background/50 border-input/50 focus:border-primary resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 transition-all duration-200"
                    size="lg"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* SMS Verification Modal */}
      <Dialog open={showVerification} onOpenChange={setShowVerification}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Verify Your Phone Number</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <p className="text-center text-muted-foreground">
              We've sent a 6-digit verification code to your phone number.
            </p>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={verificationCode}
                onChange={setVerificationCode}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowVerification(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleVerificationSubmit}
                disabled={verificationCode.length !== 6}
                className="flex-1"
              >
                Verify & Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;