const Insurance = () => {
  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Insurance & Fees</h1>
            <p className="text-xl text-muted-foreground">
              Transparent pricing and payment information for your mental health care
            </p>
          </div>

          <div className="grid gap-8 md:gap-12">
            {/* Insurance Information */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Insurance Coverage</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Dr. Consiglio does not currently accept insurance, and understands this is a practical consideration. 
                  You may check if your insurance carrier offers out-of-network benefits, as they may reimburse for visits.
                </p>
                <div className="bg-accent/20 border border-accent/30 rounded-lg p-4">
                  <p className="text-foreground font-medium">
                    Previous Practice Patients
                  </p>
                  <p className="text-muted-foreground mt-2">
                    If you are from a previous practice of Dr. Consiglio's, please feel free to reach out to discuss options.
                  </p>
                </div>
              </div>
            </div>

            {/* Fee Structure */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Fee Structure</h2>
              <div className="space-y-6">
                <div className="grid gap-4 md:gap-6">
                  <div className="flex justify-between items-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div>
                      <h3 className="text-lg font-medium text-foreground">Initial Evaluation</h3>
                      <p className="text-muted-foreground text-sm">60 minutes</p>
                    </div>
                    <div className="text-2xl font-bold text-primary">$500</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div>
                      <h3 className="text-lg font-medium text-foreground">Psychotherapy Session</h3>
                      <p className="text-muted-foreground text-sm">45 minutes</p>
                    </div>
                    <div className="text-2xl font-bold text-primary">$400</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div>
                      <h3 className="text-lg font-medium text-foreground">Follow-up Visit</h3>
                      <p className="text-muted-foreground text-sm">30 minutes</p>
                    </div>
                    <div className="text-2xl font-bold text-primary">$300</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Payment is due at the time of service. We accept cash, check, and major credit cards.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Questions About Fees or Insurance?</h2>
              <p className="text-muted-foreground mb-6">
                We're here to help you understand your options and make mental health care accessible. 
                Please don't hesitate to reach out with any questions about fees, payment plans, or insurance reimbursement.
              </p>
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Insurance;