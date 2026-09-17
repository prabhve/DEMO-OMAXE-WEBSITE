import React, { useState } from 'react';
import { Play, Quote, MessageSquare } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { VIDEO_TESTIMONIALS } from '../data/testimonials';
import { VideoModal } from '../components/ui/VideoModal';

interface TestimonialsPageProps {
  onOpenEnquiry?: (project?: string) => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onOpenEnquiry }) => {
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);

  return (
    <div className="flex-1 bg-cream text-ink">
      {/* Header Banner */}
      <section className="bg-ivory border-b border-line py-16 sm:py-24 px-5 sm:px-8 lg:px-16">
        <div className="max-w-[1360px] mx-auto">
          <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Video Testimonials' }]} />
          <div className="mt-8 max-w-3xl">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block mb-3">
              Customer Experiences
            </span>
            <h1 className="font-display text-[40px] sm:text-6xl lg:text-[72px] font-light text-ink leading-[1.05] tracking-[-0.03em]">
              Stories of Trust, Pride &amp; Belonging
            </h1>
            <p className="mt-6 text-stone text-base sm:text-lg font-light leading-relaxed max-w-[65ch]">
              Hear directly from our esteemed residents, investors, and business leaders as they share their firsthand experiences of living and thriving in Omaxe communities across India.
            </p>
          </div>
        </div>
      </section>

      {/* Video Testimonials Grid */}
      <section className="py-[72px] px-5 sm:py-72 sm:px-8 lg:py-80 lg:px-16">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {VIDEO_TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="bg-ivory border border-line flex flex-col justify-between group hover:border-gold transition-colors duration-300"
              >
                {/* Video Thumbnail Area with Custom Play Trigger */}
                <div
                  className="relative aspect-video bg-ink-soft cursor-pointer overflow-hidden"
                  onClick={() =>
                    setSelectedVideo({
                      id: item.videoId,
                      title: `${item.name} — ${item.project || item.descriptor}`,
                    })
                  }
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                    loading="lazy"
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-ink/30 flex items-center justify-center group-hover:bg-ink/10 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-cream/90 text-gold flex items-center justify-center border border-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-cream transition-all duration-300 shadow-lift">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-ink/80 text-[10px] uppercase font-mono text-cream tracking-wider">
                    Video Story
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <Quote className="w-5 h-5 text-gold/60" />
                    <p className="font-display text-xl font-light text-ink leading-snug">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-6 border-t border-line flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-light text-ink">
                        {item.name}
                      </h3>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-stone font-light mt-1">
                        {item.descriptor} {item.project ? `· ${item.project}` : ''}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setSelectedVideo({
                          id: item.videoId,
                          title: `${item.name} — ${item.project || item.descriptor}`,
                        })
                      }
                      aria-label={`Watch video of ${item.name}`}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-gold hover:text-ink transition-colors cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-ivory border-t border-line text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <SectionHeading
            align="center"
            eyebrow="Join Our Community"
            title="Experience the Omaxe Lifestyle"
            subtitle="Connect with our luxury property advisors to discover bespoke residences and commercial destinations tailored to your aspirations."
          />
          <div className="pt-4 flex justify-center">
            <Button
              variant="solid"
              size="lg"
              onClick={() => onOpenEnquiry?.()}
              icon={<MessageSquare className="w-4 h-4" />}
            >
              Request Private Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Video Modal Lightbox */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          videoId={selectedVideo.id}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};
