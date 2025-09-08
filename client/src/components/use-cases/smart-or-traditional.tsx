import { Link } from "wouter";

interface SmartOrTraditionalProps {
  title: string;
  body: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export default function SmartOrTraditional({ title, body, links }: SmartOrTraditionalProps) {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            {body.split(/\b(smart stores|traditional vending machines|micro markets)\b/i).map((part, index) => {
              const link = links.find(link => 
                part.toLowerCase().includes(link.label.toLowerCase())
              );
              
              if (link) {
                return (
                  <Link 
                    key={index}
                    href={link.href}
                    className="text-grabbix-teal hover:text-grabbix-teal/80 font-semibold underline decoration-grabbix-teal/30 hover:decoration-grabbix-teal/60 underline-offset-2"
                  >
                    {part}
                  </Link>
                );
              }
              return part;
            })}
          </p>
          
          {/* Internal Links Section */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
            <span className="text-sm font-semibold text-gray-500 mr-2">Explore our solutions:</span>
            {links.map((link, index) => (
              <Link 
                key={index}
                href={link.href}
                className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-grabbix-teal/10 text-grabbix-teal font-semibold rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/locations"
              className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-grabbix-teal/10 text-grabbix-teal font-semibold rounded-lg transition-colors"
            >
              View Locations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}