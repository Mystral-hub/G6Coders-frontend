import type { IconType } from "react-icons";

interface ServiceVisualProps {
  title: string;
  image?: string;
  icon?: IconType;
  accentColor?: string;
}

export default function ServiceVisual({
  title,
  image,
  icon: Icon,
  accentColor = "#f38332",
}: ServiceVisualProps) {
  return (
    <div
      className="relative mb-6 flex h-40 items-center justify-center overflow-hidden rounded-2xl border bg-muted sm:h-44"
      style={{
        background: `linear-gradient(135deg, ${accentColor}18 0%, transparent 70%)`,
      }}
    >
      <div
        className="absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl"
        style={{ backgroundColor: `${accentColor}30` }}
        aria-hidden="true"
      />

      {image ? (
        <img
          src={image}
          alt={`Illustration du service ${title}`}
          className="relative z-10 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : Icon ? (
        <div
          className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-background shadow-md"
          style={{ color: accentColor }}
        >
          <Icon className="h-10 w-10" aria-hidden="true" />
        </div>
      ) : (
        <div
          className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-background text-3xl font-bold shadow-md"
          style={{ color: accentColor }}
          aria-hidden="true"
        >
          G6
        </div>
      )}
    </div>
  );
}
