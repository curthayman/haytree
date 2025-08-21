import { Star, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Nicole (Nikki) Patrick",
    role: "C.Ht., Certified Hypnotherapist",
    text: "Haytree Webservices is absolutely amazing! They made the whole process so easy from start to finish and were a joy to work with. What really impressed me was how much time they took to walk me through the backend, teaching me how to update and make edits myself. It's rare to find a company that's not only skilled and professional but also patient and empowering. I love my website and I'm so grateful for their support! highly recommend!",
    initial: "N",
    color: "bg-[var(--tree-green)]"
  },
  {
    name: "Mark Wilson",
    role: "Bonner Private Security Firm",
    text: "Curt was knowledgeable about what my site needed and how to keep it performing at its best without outside interferences. Thank you HayTree Web Services.",
    initial: "M",
    color: "bg-[var(--tree-blue)]"
  },
  {
    name: "Alex P.",
    role: "Small Business Owner",
    text: "Haytree Web Services helped our business branch out online. The new site is beautiful and easy to use!",
    initial: "A",
    color: "bg-[var(--accent-green)]"
  },
  {
    name: "Jamie L.",
    role: "Entrepreneur",
    text: "Professional, responsive, and truly invested in our growth. Highly recommended for any business looking to thrive.",
    initial: "J",
    color: "bg-[var(--tree-green)]"
  },
  {
    name: "Morgan S.",
    role: "Startup Founder",
    text: "From seed to launch, the process was smooth and stress-free. The Haytree team really knows their roots!",
    initial: "M",
    color: "bg-[var(--tree-blue)]"
  }
];

const clientLogos = [
  {
    src: "https://www.haytreewebservices.com/images/fdhill.png",
    alt: "FD on the Hill",
    url: "https://www.fdhill.org/"
  },
  {
    src: "https://www.haytreewebservices.com/images/sebpo.png",
    alt: "SEBPO",
    url: "https://sebpo.com/"
  },
  {
    src: "https://www.haytreewebservices.com/images/215logo.png",
    alt: "215 Marketing",
    url: "https://215marketing.com/"
  }
];

export function Testimonials() {
  const renderStars = () => (
    <div className="flex text-yellow-400 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-current" />
      ))}
    </div>
  );

  return (
    <>
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--dark-navy)] mb-6">Voices in the Canopy</h2>
            <p className="text-xl text-gray-600">What our clients say about growing with HayTree</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                data-testid={`testimonial-card-${index}`}
              >
                <CardContent className="p-6">
                  {renderStars()}
                  <p className="text-gray-600 mb-4 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold`}>
                      {testimonial.initial}
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-[var(--dark-navy)]">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              className="bg-[var(--tree-green)] text-white hover:bg-[var(--accent-green)] transition-colors"
              data-testid="google-review-button"
            >
              <a 
                href="https://g.page/r/Cc1QvmdAMe4GEAI/review" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Leave a Google Review
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-16 bg-white" data-testid="client-logos-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[var(--dark-navy)] mb-4">Trusted by</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-100 transition-opacity">
            {clientLogos.map((logo, index) => (
              <a
                key={index}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105"
                data-testid={`client-logo-${index}`}
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-12 w-auto" 
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
