"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/libs/utils";
import type { JSX } from "react";

/**
 * Feature Item Interface
 */
export interface FeatureItem {
  title: string;
  description: string;
  icon?: JSX.Element;
  type?: "video" | "image";
  path?: string;
  format?: string;
  alt?: string;
  svg?: JSX.Element;
}

/**
 * Features Component Props
 */
export interface FeaturesProps {
  /**
   * Array of feature items to display
   */
  features: FeatureItem[];
  
  /**
   * Display variant - grid, accordion, or listicle
   */
  variant?: "grid" | "accordion" | "listicle";
  
  /**
   * Section title
   */
  title?: string;
  
  /**
   * Section subtitle/description
   */
  subtitle?: string;
  
  /**
   * Custom className for the section
   */
  className?: string;
  
  /**
   * Number of columns for grid layout
   */
  columns?: 2 | 3 | 4;
  
  /**
   * Whether to show icons in grid variant
   */
  showIcons?: boolean;
  
  /**
   * Background color variant
   */
  background?: "default" | "muted" | "transparent";
}

/**
 * Grid Variant Component
 */
const FeaturesGrid: React.FC<{
  features: FeatureItem[];
  columns: number;
  showIcons: boolean;
}> = ({ features, columns, showIcons }) => {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-8", gridClasses[columns as keyof typeof gridClasses])}>
      {features.map((feature, index) => (
        <div
          key={index}
          className="group p-6 rounded-xl border border-secondary-200 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          {showIcons && (feature.icon || feature.svg) && (
            <div className="mb-6 p-3 rounded-lg bg-primary-50 text-primary-500 w-fit group-hover:bg-primary-100 transition-colors">
              {feature.icon || feature.svg}
            </div>
          )}
          <h3 className="text-xl font-semibold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
            {feature.title}
          </h3>
          <p className="text-secondary-600 leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

/**
 * Accordion Variant Component
 */
const FeaturesAccordion: React.FC<{
  features: FeatureItem[];
}> = ({ features }) => {
  const [featureSelected, setFeatureSelected] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFeatureClick = (index: number) => {
    setFeatureSelected(index);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Feature List */}
      <div className="lg:w-1/2 space-y-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "p-6 rounded-xl cursor-pointer transition-all duration-300",
              featureSelected === index
                ? "bg-primary-50 border-2 border-primary-200 shadow-md"
                : "bg-white border border-secondary-200 hover:bg-secondary-50"
            )}
            onClick={() => handleFeatureClick(index)}
          >
            <div className="flex items-start gap-4">
              {feature.svg && (
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  featureSelected === index
                    ? "bg-primary-100 text-primary-600"
                    : "bg-secondary-100 text-secondary-600"
                )}>
                  {feature.svg}
                </div>
              )}
              <div>
                <h3 className={cn(
                  "font-semibold text-lg mb-2 transition-colors",
                  featureSelected === index
                    ? "text-primary-700"
                    : "text-secondary-900"
                )}>
                  {feature.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Media Display */}
      <div className="lg:w-1/2">
        <div className="sticky top-8">
          {features[featureSelected]?.path && (
            <div className="rounded-xl overflow-hidden shadow-lg">
              {features[featureSelected].type === "video" ? (
                <video
                  ref={videoRef}
                  className="w-full"
                  autoPlay
                  muted
                  loop
                  controls
                >
                  <source
                    src={features[featureSelected].path}
                    type={features[featureSelected].format || "video/mp4"}
                  />
                </video>
              ) : (
                <Image
                  src={features[featureSelected].path!}
                  alt={features[featureSelected].alt || features[featureSelected].title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Listicle Variant Component
 */
const FeaturesListicle: React.FC<{
  features: FeatureItem[];
}> = ({ features }) => {
  return (
    <div className="space-y-12">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex-row gap-8 items-center"
        >
          <div className="lg:w-1/2 order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              {feature.title}
            </h3>
            <p className="text-lg text-secondary-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
          
          {feature.path && (
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="rounded-xl overflow-hidden shadow-lg">
                {feature.type === "video" ? (
                  <video
                    className="w-full"
                    autoPlay
                    muted
                    loop
                    controls
                  >
                    <source
                      src={feature.path}
                      type={feature.format || "video/mp4"}
                    />
                  </video>
                ) : (
                  <Image
                    src={feature.path}
                    alt={feature.alt || feature.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * Features Component
 * 
 * A flexible, unified component for displaying features in multiple formats.
 * Consolidates the functionality of FeaturesGrid, FeaturesAccordion, and FeaturesListicle.
 * 
 * @example
 * ```tsx
 * <Features
 *   variant="grid"
 *   columns={3}
 *   title="Key Features"
 *   subtitle="Everything you need to succeed"
 *   features={featuresData}
 *   showIcons={true}
 * />
 * ```
 */
export const Features: React.FC<FeaturesProps> = ({
  features,
  variant = "grid",
  title,
  subtitle,
  className,
  columns = 3,
  showIcons = true,
  background = "default",
}) => {
  const backgroundClasses = {
    default: "bg-white",
    muted: "bg-secondary-50",
    transparent: "bg-transparent",
  };

  return (
    <section className={cn(
      "py-16 lg:py-24",
      backgroundClasses[background],
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl lg:text-5xl font-bold text-secondary-900 mb-6 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl lg:text-2xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Feature Content */}
        {variant === "grid" && (
          <FeaturesGrid
            features={features}
            columns={columns}
            showIcons={showIcons}
          />
        )}
        
        {variant === "accordion" && (
          <FeaturesAccordion features={features} />
        )}
        
        {variant === "listicle" && (
          <FeaturesListicle features={features} />
        )}
      </div>
    </section>
  );
};

export default Features;
