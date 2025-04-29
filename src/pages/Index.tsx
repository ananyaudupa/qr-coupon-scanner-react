
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { QrCode } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <QrCode className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">QR Coupon Scanner</h1>
        <p className="text-xl text-gray-600 mb-8">
          Scan QR codes to validate your coupons instantly
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto">
          <Link to="/scanner">
            Open Scanner
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
