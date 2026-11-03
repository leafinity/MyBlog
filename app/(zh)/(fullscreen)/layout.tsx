import Navbar from '../../../components/Navbar';
import Footer from "../../../components/Footer";

export default function ZhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-grow">{children}</main>
    </div>
}