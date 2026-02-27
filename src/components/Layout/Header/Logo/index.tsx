import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <strong className="text-primary text-xl sm:text-2xl font-bold">Tamil</strong>
      <span className="text-theme text-xl sm:text-2xl font-bold">
        Electricals
      </span>
    </Link>
  );
};

export default Logo;
