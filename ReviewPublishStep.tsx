import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductFormData } from "./ProductListingContainer";
import { 
  Eye, 
  Edit, 
  CheckCircle, 
  AlertCircle,
  MapPin,
  Truck,
  Star
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReviewPublishStepProps {
  formData: ProductFormData;
  updateFormData: (field: keyof ProductFormData, value: any) => void;
  onPublish?: () => void;
  isSubmitting?: boolean;
}

const ReviewPublishStep = ({ formData, onPublish, isSubmitting = false }: ReviewPublishStepProps) => {
  const { t } = useLanguage();

  const getListingQualityScore = () => {
    let score = 0;
    const maxScore = 100;

    // Photos (30 points)
    if (formData.images.length >= 1) score += 10;
    if (formData.images.length >= 3) score += 10;
    if (formData.images.length >= 5) score += 10;

    // Product details (25 points)
    if (formData.name.length >= 10) score += 10;
    if (formData.brand) score += 5;
    if (formData.description.length >= 50) score += 10;

    // Category & size (15 points)
    if (formData.category && formData.subcategory) score += 10;
    if (formData.size) score += 5;

    // Condition & pricing (20 points)
    if (formData.condition) score += 10;
    if (formData.price) score += 5;
    if (formData.originalPrice) score += 5;

    // Location & shipping (10 points)
    if (formData.location) score += 5;
    if (formData.shippingOptions.length >= 2) score += 5;

    return Math.round((score / maxScore) * 100);
  };

  const getEstimatedViews = () => {
    const score = getListingQualityScore();
    if (score >= 80) return `50-100 ${t('listing.review.estimated.views')}`;
    if (score >= 60) return `25-50 ${t('listing.review.estimated.views')}`;
    if (score >= 40) return `10-25 ${t('listing.review.estimated.views')}`;
    return `5-15 ${t('listing.review.estimated.views')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />;
    return <AlertCircle className="h-4 w-4 text-yellow-600" />;
  };

  const qualityScore = getListingQualityScore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">{t('listing.review.title')}</h2>
        <p className="text-muted-foreground">
          {t('listing.review.desc')}
        </p>
      </div>

      {/* Listing Quality Score */}
      <Card className="border-2">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              {getScoreIcon(qualityScore)}
              <h3 className="text-lg font-semibold">{t('listing.review.quality.score')}</h3>
            </div>
            
            <div className={`text-4xl font-bold ${getScoreColor(qualityScore)}`}>
              {qualityScore}%
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span className="text-sm">{getEstimatedViews()}</span>
              </div>
              
              {qualityScore < 80 && (
                <p className="text-sm text-muted-foreground">
                  {t('listing.review.improve')}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mobile Preview */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              📱 {t('listing.review.mobile.preview')}
            </h3>
            
            <div className="bg-white border rounded-lg p-3 space-y-3">
              {/* Main image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {formData.images[0] ? (
                  <img 
                    src={formData.images[0]} 
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    {t('listing.review.no.image')}
                  </div>
                )}
              </div>
              
              {/* Product info */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm line-clamp-2">
                  {formData.name || t('listing.review.product.name')}
                </h4>
                
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">£{formData.price || "0"}</span>
                  {formData.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      £{formData.originalPrice}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <MapPin className="h-3 w-3" />
                  {formData.location || t('listing.review.location')}
                </div>
                
                <Badge variant="outline" className="text-xs">
                  {formData.condition || t('listing.review.condition')}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Desktop Preview */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              💻 {t('listing.review.desktop.preview')}
            </h3>
            
            <div className="bg-white border rounded-lg p-4 space-y-3">
              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {formData.images[0] ? (
                    <img 
                      src={formData.images[0]} 
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      {t('listing.review.no.image')}
                    </div>
                  )}
                </div>
                
                {/* Info */}
                <div className="flex-1 space-y-2">
                  <h4 className="font-medium text-sm line-clamp-2">
                    {formData.name || t('listing.review.product.name')}
                  </h4>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-bold">£{formData.price || "0"}</span>
                    {formData.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        £{formData.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {formData.location || t('listing.review.location')}
                    </div>
                    
                    <Badge variant="outline" className="text-xs">
                      {formData.condition || t('listing.review.condition')}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Details */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">{t('listing.review.summary')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">{t('listing.review.product')}</span>
                <p className="font-medium">{formData.name}</p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">{t('listing.review.brand')}</span>
                <p className="font-medium">{formData.brand}</p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">{t('listing.review.category')}</span>
                <p className="font-medium capitalize">{formData.category} › {formData.subcategory}</p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">{t('listing.review.size')}</span>
                <p className="font-medium">{formData.size}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">{t('listing.review.condition')}:</span>
                <p className="font-medium">{formData.condition}</p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">{t('listing.review.price')}</span>
                <p className="font-medium">£{formData.price}</p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">{t('listing.review.location')}:</span>
                <p className="font-medium">{formData.location}</p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">{t('listing.review.delivery')}</span>
                <p className="font-medium">{formData.shippingOptions.length} {t('listing.review.options.available')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publish Button */}
      {onPublish && (
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6 text-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{t('listing.review.ready')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('listing.review.visible')}
              </p>
            </div>
            
            <Button
              onClick={onPublish}
              disabled={isSubmitting}
              size="lg"
              className="w-full md:w-auto px-8"
            >
              {isSubmitting ? t('listing.publishing') : t('listing.review.publish.button')}
            </Button>
            
            <p className="text-xs text-muted-foreground">
              {t('listing.review.edit.anytime')}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReviewPublishStep;
