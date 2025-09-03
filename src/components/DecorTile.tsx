import Image from "next/image";

type Props = {
  label: string;
  img?: { src: string; alt?: string };
  className?: string;
};

export default function DecorTile({ label, img, className = "" }: Props) {
  return (
    <div
      className={`relative w-full aspect-[16/9] rounded-[40px] overflow-hidden bg-slate-800 ${className}`}
      aria-hidden="true"
    >
      {img ? (
        <Image
          src={img.src}
          alt={img.alt || label}
          fill
          className="object-cover"
          priority={false}
        />
      ) : null}
      <div className="absolute left-4 bottom-3 text-[12px] tracking-wide text-white/85">
        {label.toUpperCase()}
      </div>
    </div>
  );
}


