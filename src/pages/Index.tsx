// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <main className="min-h-screen relative overflow-hidden pt-8" style={{ background: 'var(--hero-gradient)' }}>
      {/* Gradient overlay for additional depth */}
      <div className="absolute inset-0 opacity-60" style={{ background: 'var(--hero-gradient-overlay)' }}></div>
      
      <div className="container px-6 relative z-10">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Welcome to Your Journey</h1>
          <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
        </div>
      </div>
    </main>
  );
};

export default Index;
