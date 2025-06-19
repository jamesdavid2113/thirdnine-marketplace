
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Plus,
  LogOut,
  Package,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

const NavBar = () => {
  const { user, signOut } = useAuth();
  const { getCartCount } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const cartCount = getCartCount();

  const handleAuthClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  const sportsCategories = [
    { id: 'golf', name: t('nav.golf'), icon: '⛳' },
    { id: 'tennis', name: t('nav.tennis'), icon: '🎾' },
    { id: 'padel', name: t('nav.padel'), icon: '🏓' },
    { id: 'hockey', name: t('nav.hockey'), icon: '🏒' },
    { id: 'cycling', name: t('nav.cycling'), icon: '🚴‍♂️' },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/59f44332-c010-488a-bdb7-07aeafe57f26.png" 
            alt="Resportz logo" 
            className="h-8 w-auto"
          />
          <span className="font-bold text-xl">Resportz</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/browse" className="text-sm font-medium hover:text-primary">
            {t('nav.browse')}
          </Link>
          {sportsCategories.map((category) => (
            <Link 
              key={category.id}
              to={`/browse?category=${category.id}`} 
              className="flex items-center space-x-1 text-sm font-medium hover:text-primary"
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>

          {user && (
            <>
              <Link to="/list-product">
                <Button variant="ghost" size="icon">
                  <Plus className="h-5 w-5" />
                </Button>
              </Link>

              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
            </>
          )}

          <LanguageToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  {t('nav.profile')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <Package className="mr-2 h-4 w-4" />
                  {t('nav.orders')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/list-product')}>
                  <Plus className="mr-2 h-4 w-4" />
                  {t('nav.list')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('nav.signout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={handleAuthClick} size="sm">
              {t('nav.signin')}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
