
import { Shield, Award, Clock, Truck } from "lucide-react";

const PromoSection = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Buyer Protection",
      description: "All transactions are secure and protected",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Quality Verified",
      description: "All items are checked by our community",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast Delivery",
      description: "Get your items quickly and safely",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Easy Returns",
      description: "No-hassle return policy on all items",
    },
  ];

  return (
    <section className="bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="rounded-lg p-4 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
