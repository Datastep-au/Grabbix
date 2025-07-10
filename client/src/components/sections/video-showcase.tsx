export default function VideoShowcase() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-grabbix-dark mb-4">See Grabbix in Action</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch how our smart store technology transforms the way people shop and interact with retail spaces
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/ZBBYBfYSI_U"
              title="Grabbix Product Showcase"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-8">
            Experience the future of autonomous retail with Grabbix's cutting-edge technology
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-grabbix-teal rounded-full mr-2"></div>
              AI-Powered Recognition
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-grabbix-teal rounded-full mr-2"></div>
              Seamless Checkout
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-grabbix-teal rounded-full mr-2"></div>
              Real-time Inventory
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-grabbix-teal rounded-full mr-2"></div>
              24/7 Availability
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}