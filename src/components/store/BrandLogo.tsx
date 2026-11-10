import logo from "@/assets/luviana-logo.jpg.asset.json";

export function BrandLogo({ className = "" }: { className?: string }) {
  return <img src={logo.url} alt="لوفيانا" width={598} height={446} className={`shrink-0 object-contain ${className}`} />;
}