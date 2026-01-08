export default function FeaturesSection() {
  const features = [
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "Free shipping on orders over $50"
    },
    {
      icon: "💳",
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: "↩️",
      title: "Easy Returns",
      description: "30-day money-back guarantee"
    },
    {
      icon: "📞",
      title: "24/7 Support",
      description: "Dedicated customer support"
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-center mb-12">Why Choose Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
