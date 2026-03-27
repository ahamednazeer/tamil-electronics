import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
      <strong className="text-primary text-lg sm:text-xl md:text-2xl font-bold">Tamil</strong>
      <span className="text-theme text-lg sm:text-xl md:text-2xl font-bold">
        Electricals
      </span>
    </Link>
  );
};

export default Logo;
