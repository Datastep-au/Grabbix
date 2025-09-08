import { MapPin } from "lucide-react";
import { Link } from "wouter";

interface LocalNoteProps {
  note: string;
}

export default function LocalNote({ note }: LocalNoteProps) {
  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-start gap-4">
          <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <p className="text-blue-800 leading-relaxed">
              {note.split(/\b(Locations)\b/i).map((part, index) => {
                if (part.toLowerCase() === 'locations') {
                  return (
                    <Link 
                      key={index}
                      href="/locations"
                      className="font-semibold text-blue-600 hover:text-blue-700 underline decoration-blue-600/30 hover:decoration-blue-600/60 underline-offset-2"
                    >
                      {part}
                    </Link>
                  );
                }
                return part;
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}