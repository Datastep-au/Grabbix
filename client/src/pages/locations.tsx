import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Building2, Coffee } from "lucide-react";

const melbourneLocations = [
  { name: "Melbourne CBD", slug: "melbourne-cbd", description: "Central business district with high foot traffic", icon: Building2 },
  { name: "South Yarra", slug: "south-yarra", description: "Trendy area with young professionals", icon: Coffee },
  { name: "Richmond", slug: "richmond", description: "Hip neighborhood with creative professionals", icon: Users },
  { name: "Fitzroy", slug: "fitzroy", description: "Artistic community with unique demographics", icon: Coffee },
  { name: "St Kilda", slug: "st-kilda", description: "Beachside location with tourists and locals", icon: MapPin },
  { name: "Carlton", slug: "carlton", description: "University area with student population", icon: Users },
  { name: "Prahran", slug: "prahran", description: "Shopping and dining destination", icon: Building2 },
  { name: "Collingwood", slug: "collingwood", description: "Trendy area with young professionals", icon: Coffee },
  { name: "Northcote", slug: "northcote", description: "Family-friendly suburb with local businesses", icon: Users },
  { name: "Brunswick", slug: "brunswick", description: "Multicultural area with diverse community", icon: MapPin },
  { name: "Hawthorn", slug: "hawthorn", description: "Upmarket suburb with affluent residents", icon: Building2 },
  { name: "Camberwell", slug: "camberwell", description: "Established area with shopping precincts", icon: Coffee },
  { name: "Kew", slug: "kew", description: "Prestigious suburb with high-end amenities", icon: Building2 },
  { name: "Toorak", slug: "toorak", description: "Exclusive area with luxury developments", icon: Building2 },
  { name: "Armadale", slug: "armadale", description: "Upscale shopping and dining precinct", icon: Coffee },
  { name: "Malvern", slug: "malvern", description: "Historic suburb with modern amenities", icon: Users },
  { name: "Glen Iris", slug: "glen-iris", description: "Residential area with local shopping", icon: MapPin },
  { name: "Ashburton", slug: "ashburton", description: "Quiet suburb with family-friendly facilities", icon: Users },
  { name: "Burwood", slug: "burwood", description: "Shopping hub with diverse demographics", icon: Building2 },
  { name: "Box Hill", slug: "box-hill", description: "Major shopping center with high foot traffic", icon: Building2 },
  { name: "Doncaster", slug: "doncaster", description: "Shopping destination with affluent residents", icon: Coffee },
  { name: "Balwyn", slug: "balwyn", description: "Established suburb with professional residents", icon: Users },
  { name: "Templestowe", slug: "templestowe", description: "Growing area with new developments", icon: MapPin },
  { name: "Eltham", slug: "eltham", description: "Artistic community with unique character", icon: Coffee },
  { name: "Greensborough", slug: "greensborough", description: "Suburban center with shopping facilities", icon: Building2 },
  { name: "Heidelberg", slug: "heidelberg", description: "Historic area with modern amenities", icon: Users },
  { name: "Ivanhoe", slug: "ivanhoe", description: "Riverside suburb with cafes and shops", icon: Coffee },
  { name: "Preston", slug: "preston", description: "Diverse community with local businesses", icon: MapPin },
  { name: "Reservoir", slug: "reservoir", description: "Growing area with new developments", icon: Users },
  { name: "Coburg", slug: "coburg", description: "Multicultural suburb with shopping strips", icon: Building2 },
  { name: "Pascoe Vale", slug: "pascoe-vale", description: "Family-friendly area with local amenities", icon: Users },
  { name: "Essendon", slug: "essendon", description: "Established suburb with shopping precincts", icon: Coffee },
  { name: "Moonee Ponds", slug: "moonee-ponds", description: "Trendy area with young professionals", icon: Coffee },
  { name: "Ascot Vale", slug: "ascot-vale", description: "Inner suburb with cafes and restaurants", icon: MapPin },
  { name: "Flemington", slug: "flemington", description: "Historic area with racing culture", icon: Users },
  { name: "Kensington", slug: "kensington", description: "Compact suburb with local character", icon: Building2 },
  { name: "West Melbourne", slug: "west-melbourne", description: "Industrial area converting to residential", icon: Building2 },
  { name: "North Melbourne", slug: "north-melbourne", description: "Inner city with mixed demographics", icon: Coffee },
  { name: "Parkville", slug: "parkville", description: "University and hospital precinct", icon: Users },
  { name: "Footscray", slug: "footscray", description: "Diverse community with growing food scene", icon: MapPin },
  { name: "Yarraville", slug: "yarraville", description: "Village feel with local businesses", icon: Coffee },
  { name: "Seddon", slug: "seddon", description: "Growing area with young families", icon: Users },
  { name: "Williamstown", slug: "williamstown", description: "Historic port with tourist attractions", icon: MapPin },
  { name: "Altona", slug: "altona", description: "Beachside suburb with family amenities", icon: Users },
  { name: "Sunshine", slug: "sunshine", description: "Major transport hub with diverse community", icon: Building2 },
  { name: "St Albans", slug: "st-albans", description: "Growing suburb with new developments", icon: Building2 },
  { name: "Deer Park", slug: "deer-park", description: "Residential area with local shopping", icon: Users },
  { name: "Laverton", slug: "laverton", description: "Industrial area with residential growth", icon: MapPin },
  { name: "Werribee", slug: "werribee", description: "Outer suburb with shopping facilities", icon: Building2 },
  { name: "Hoppers Crossing", slug: "hoppers-crossing", description: "Family-friendly area with amenities", icon: Users },
  { name: "Point Cook", slug: "point-cook", description: "New development with modern facilities", icon: Coffee },
  { name: "Tarneit", slug: "tarneit", description: "Fast-growing suburb with young families", icon: Users }
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {melbourneLocations.map((location) => {
              const IconComponent = location.icon;
              return (
                <Card key={location.slug} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-6 w-6 text-grabbix-teal" />
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {location.description}
                    </CardDescription>
                    <Button
                      onClick={() => window.open(`/location_pages/${location.slug}.html`, '_blank')}
                      variant="outline"
                      className="w-full border-grabbix-teal text-grabbix-teal hover:bg-grabbix-teal hover:text-white"
                    >
                      View Location Details
                    </Button>
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