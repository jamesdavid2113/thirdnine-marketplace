
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-6xl font-bold">404</h1>
          <h2 className="mb-6 text-2xl font-semibold">{t('notfound.title')}</h2>
          <p className="mx-auto mb-8 max-w-md text-muted-foreground">
            {t('notfound.message')}
          </p>
          <Link to="/">
            <Button size="lg" className="rounded-full">{t('notfound.home')}</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
