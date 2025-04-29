
import { CircleCheck } from "lucide-react";
import { Button } from "./ui/button";

interface CouponResultProps {
  qrData: string;
  onScanAgain: () => void;
}

const CouponResult = ({ qrData, onScanAgain }: CouponResultProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="w-20 h-20 flex items-center justify-center bg-success/10 rounded-full mb-4">
        <CircleCheck className="w-12 h-12 text-success animate-pulse-success" />
      </div>
      
      <h2 className="text-2xl font-bold text-success mb-2">Coupon Eligible!</h2>
      
      <p className="text-gray-600 mb-4 text-center">
        The scanned coupon has been successfully validated.
      </p>
      
      <div className="p-3 bg-gray-100 rounded-md w-full mb-6">
        <p className="text-sm font-mono break-all">
          <span className="font-semibold">QR Data:</span> {qrData}
        </p>
      </div>

      <Button 
        onClick={onScanAgain} 
        className="w-full bg-primary hover:bg-primary/90"
      >
        Scan Another Coupon
      </Button>
    </div>
  );
};

export default CouponResult;
