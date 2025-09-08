import { TrendingUp } from "lucide-react";

interface MiniCaseStudyProps {
  title: string;
  body: string;
}

export default function MiniCaseStudy({ title, body }: MiniCaseStudyProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-grabbix-teal/5 to-blue-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-grabbix-teal" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {title}
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}