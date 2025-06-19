
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  const handleCategoryClick = () => {
    // Scroll to top when navigating to browse page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-sidebar border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resportz</h3>
            <p className="text-sm text-muted-foreground">
              {t('footer.about.desc')}
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-medium">{t('footer.categories')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/browse?category=golf" 
                  onClick={handleCategoryClick}
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('category.golf')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/browse?category=tennis" 
                  onClick={handleCategoryClick}
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('category.tennis')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/browse?category=cycling" 
                  onClick={handleCategoryClick}
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('category.cycling')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/browse?category=padel" 
                  onClick={handleCategoryClick}
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('category.padel')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/browse?category=hockey" 
                  onClick={handleCategoryClick}
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('category.hockey')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-medium">{t('footer.support')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-primary">
                  {t('footer.shipping')}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-primary">
                  {t('footer.returns')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-medium">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary">
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Resportz. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
