import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  className?: string;
  theme?: 'light' | 'dark';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className = '',
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  return (
    <Link
      to={`/projects/${project.category}/${(project.city || 'all').toLowerCase().replace(/\s+/g, '-')}/${project.slug}`}
      aria-label={`${project.title}, ${project.type} in ${project.city}.`}
      className={`group block text-left transition-all duration-500 ease-luxury ${className}`}
    >
      {/* Pristine Architectural Photography without intrusive badges */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none bg-ink-soft">
        <img
          src={project.image}
          alt={`${project.title} - ${project.type} in ${project.city}`}
          loading="lazy"
          className="h-full w-full object-cover grayscale-[10%] transition-all duration-1000 ease-luxury group-hover:grayscale-0 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* Understated Editorial Caption Beneath Image */}
      <div className="pt-6 space-y-3">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-gold font-normal">
          <span>{project.city}</span>
          <span className="text-stone font-light">{project.type}</span>
        </div>

        <h3
          className={`font-display text-2xl font-light tracking-[-0.02em] transition-colors duration-300 ${
            isDark ? 'text-cream group-hover:text-gold' : 'text-ink group-hover:text-gold'
          }`}
        >
          {project.title}
        </h3>

        <div className="flex items-center justify-between pt-2 text-[11px] font-light text-stone border-t border-line/60">
          <span>{project.configuration}</span>
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-normal text-gold group-hover:translate-x-1 transition-transform duration-300">
            <span>Explore</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
};
