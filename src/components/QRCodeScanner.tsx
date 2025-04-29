
import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "./ui/button";
import { ScanQrCode } from "lucide-react";

interface QRCodeScannerProps {
  onResult: (result: string) => void;
}

const QRCodeScanner = ({ onResult }: QRCodeScannerProps) => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const startScanner = async () => {
    setError(null);
    setScanning(true);

    try {
      if (!containerRef.current) return;
      
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 250,
        },
        (decodedText) => {
          onResult(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          console.log(`QR Code scanning error: ${errorMessage}`);
        }
      );
    } catch (err) {
      setError("Could not access the camera. Please ensure camera permissions are granted.");
      setScanning(false);
      console.error("Error starting scanner:", err);
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current
        .stop()
        .catch((err) => console.error("Error stopping scanner:", err));
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .catch((err) => console.error("Error stopping scanner:", err));
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div
        id="qr-reader"
        ref={containerRef}
        className={`w-full max-w-md aspect-square border-2 ${
          scanning ? "border-primary" : "border-gray-300"
        } rounded-lg overflow-hidden mb-4`}
      />

      {!scanning ? (
        <Button 
          onClick={startScanner} 
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          <ScanQrCode className="w-5 h-5" />
          <span>Start Scanning</span>
        </Button>
      ) : (
        <Button 
          onClick={stopScanner} 
          variant="secondary"
        >
          Stop Scanning
        </Button>
      )}

      {error && <p className="text-destructive mt-2">{error}</p>}
    </div>
  );
};

export default QRCodeScanner;
