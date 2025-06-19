
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PublishListingButtonProps {
  onPublish: () => void;
  isLoading: boolean;
  formValid: boolean;
}

const PublishListingButton = ({ onPublish, isLoading, formValid }: PublishListingButtonProps) => {
  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Form Status */}
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${formValid ? 'text-green-600' : 'text-orange-600'}`}>
              <div className={`w-2 h-2 rounded-full ${formValid ? 'bg-green-600' : 'bg-orange-600'}`}></div>
              <span className="text-sm font-medium">
                {formValid ? 'Ready to publish' : 'Complete required fields'}
              </span>
            </div>
          </div>

          {/* Publish Button */}
          <Button
            onClick={onPublish}
            disabled={!formValid || isLoading}
            className={`flex items-center space-x-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform ${
              formValid && !isLoading
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
            }`}
            size="lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Rocket className="h-5 w-5" />
                <span>Publish Listing</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishListingButton;
