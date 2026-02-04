import { Instagram, Linkedin } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { Separator } from '@/components/ui/separator';

/**
 * Minimal footer component with social links and copyright
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Copyright */}
          <p className="text-xs text-muted-foreground font-medium tracking-[0.1em] uppercase">
            © {currentYear} {photographerInfo.name}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-8">
            {photographerInfo.socialLinks.instagram && (
              <a
                href={photographerInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
            )}
            {photographerInfo.socialLinks.linkedin && (
              <a
                href={photographerInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-4" />
              </a>
            )}
            {photographerInfo.socialLinks.behance && (
              <a
                href={photographerInfo.socialLinks.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label="Behance"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h6a3 3 0 0 1 0 6H3V8z" />
                  <path d="M3 14h7a3 3 0 0 1 0 6H3v-6z" />
                  <path d="M14 7h7" />
                  <path d="M17 8a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
