const Insurance = () => {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">Insurance & Fees</h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Transparent pricing and payment information for your mental health care
            </p>
          </div>

          <div className="grid gap-8">
            {/* Insurance Information */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-6 bg-primary rounded-full"></div>
                <h2 className="text-xl font-semibold text-foreground">
                  Insurance Coverage
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Dr. Consiglio does not currently accept insurance, and understands this is a practical consideration. 
                  You may check if your insurance carrier offers out-of-network benefits, as they may reimburse for visits.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="border-l-2 border-primary pl-4">
                    <p className="text-foreground font-medium mb-2">
                      Previous Practice Patients
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      If you are from a previous practice of Dr. Consiglio's, please feel free to reach out to discuss options.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fee Structure */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-6 bg-primary rounded-full"></div>
                <h2 className="text-xl font-semibold text-foreground">
                  Fee Structure
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid gap-3">
                  <div className="bg-muted/30 border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-foreground">Initial Evaluation</h3>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                          <p className="text-muted-foreground text-sm font-medium">60 minutes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-semibold text-primary">$500</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-foreground">Psychotherapy Session</h3>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                          <p className="text-muted-foreground text-sm font-medium">45 minutes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-semibold text-primary">$400</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-foreground">Follow-up Visit</h3>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                          <p className="text-muted-foreground text-sm font-medium">30 minutes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-semibold text-primary">$300</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/20 border border-muted/30 rounded-lg p-4">
                  <div className="border-l-2 border-primary/50 pl-4">
                    <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                      Payment is due at the time of service. We accept cash, check, and major credit cards.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">Questions About Fees or Insurance?</h2>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                We're here to help you understand your options and make mental health care accessible. 
                Please don't hesitate to reach out with any questions about fees, payment plans, or insurance reimbursement.
              </p>
              <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm">
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