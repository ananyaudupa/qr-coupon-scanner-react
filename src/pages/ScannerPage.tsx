
import { useState } from "react";
import QRCodeScanner from "../components/QRCodeScanner";
import CouponResult from "../components/CouponResult";
import { useToast } from "../components/ui/use-toast";

const ScannerPage = () => {
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleQRResult = (result: string) => {
    setScannedResult(result);
    toast({
      title: "QR Code Scanned Successfully",
      description: "Your coupon has been validated.",
      duration: 3000,
    });
  };

  const handleScanAgain = () => {
    setScannedResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <header className="w-full max-w-md text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">QR Coupon Scanner</h1>
        <p className="text-gray-600">
          Scan a QR code to check coupon eligibility
        </p>
      </header>

      <main className="w-full max-w-md flex-1 flex flex-col items-center justify-center">
        {scannedResult ? (
          <CouponResult 
            qrData={scannedResult} 
            onScanAgain={handleScanAgain} 
          />
        ) : (
          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <QRCodeScanner onResult={handleQRResult} />
            <div className="mt-4 text-sm text-center text-gray-500">
              Position a QR code inside the scanning area
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ScannerPage;
