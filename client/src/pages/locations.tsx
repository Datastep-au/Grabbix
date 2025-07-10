import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const melbourneLocations = [
  "Abbotsford", "Armadale", "Ashburton", "Balwyn", "Bentleigh", "Blackburn", "Box Hill", "Brighton", "Brunswick",
  "Bulleen", "Burwood", "Camberwell", "Canterbury", "Caulfield", "Chadstone", "Cheltenham", "Clayton", "Coburg",
  "Cremorne", "Dingley Village", "Doncaster", "Elsternwick", "Essendon", "Glen Iris", "Glen Waverley", "Hampton",
  "Hawthorn", "Highett", "Kew", "Keysborough", "Kooyong", "Malvern", "Mentone", "Moorabbin", "Mordialloc",
  "Mulgrave", "Noble Park", "Northcote", "Notting Hill", "Oakleigh", "Parkdale", "Pascoe Vale", "Prahran",
  "Richmond", "Sandringham", "South Yarra", "Springvale", "St Kilda", "Strathmore", "Templestowe", "Toorak"
];

export default function Locations() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Melbourne Locations
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how Grabbix smart stores are transforming retail experiences across Melbourne. 
              Each location is tailored to meet the unique needs of its community.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-grabbix-teal mb-2">51+</div>
                <div className="text-gray-600">Melbourne Locations</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-grabbix-teal mb-2">24/7</div>
                <div className="text-gray-600">Always Available</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-grabbix-teal mb-2">100%</div>
                <div className="text-gray-600">Contactless Service</div>
              </CardContent>
            </Card>
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {melbourneLocations.map((location) => {
              const slug = location.toLowerCase().replace(/\s+/g, '-');
              return (
                <Card key={slug} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-grabbix-teal" />
                        <CardTitle className="text-base">{location}</CardTitle>
                      </div>
                      <Button
                        onClick={() => window.location.href = `/location/${slug}`}
                        variant="outline"
                        size="sm"
                        className="border-grabbix-teal text-grabbix-teal hover:bg-grabbix-teal hover:text-white"
                      >
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="bg-grabbix-teal text-white">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">
                  Don't See Your Location?
                </h2>
                <p className="text-xl mb-6">
                  We're expanding across Melbourne! Contact us to bring smart vending to your area.
                </p>
                <Button
                  onClick={() => window.location.href = '/contact'}
                  className="bg-white text-grabbix-teal hover:bg-gray-100"
                >
                  Contact Us Today
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}