import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="text-primary text-2xl font-bold">Tamil</span>
      <span className="text-white text-2xl font-bold">Electricals</span>
    </Link>
  );
};

export default Logo;
