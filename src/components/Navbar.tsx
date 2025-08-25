import { useState } from 'react';
import { ShoppingBag, Moon, Sun, Search, Gem, Menu, X, LogOut } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useTheme } from '../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { UserMenu } from './UserMenu';

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const navLinks = [
  { name: 'Collections', path: '/' },
  { name: 'Trending', path: '/collection/trending' },
  { name: 'New Arrivals', path: '/collection/new-arrivals' },
  { name: 'Discount', path: '/collection/discount' },
  { name: 'Saree', path: '/collection/saree' },
  { name: 'Panjabi', path: '/collection/panjabi' },
];

export const Navbar = ({ searchTerm, setSearchTerm }: NavbarProps) => {
  const { items } = useCartStore();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { openAuthModal } = useUIStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleAuthClick = (view: 'login' | 'signup') => {
    openAuthModal(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream/80 dark:bg-dark-bg/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Left Side: Logo & Desktop Nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Gem className="h-8 w-8 text-brand-primary" />
              <span className="text-2xl font-serif font-bold text-gray-800 dark:text-white">Aurene</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === '/'}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors pb-1"
                  style={({ isActive }) => isActive ? { color: '#8E7D70', borderBottom: '2px solid #8E7D70' } : {}}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right Side: Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-40 pl-9 pr-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-1 focus:ring-brand-primary/50 text-sm"
              />
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Shopping cart">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Right Side: Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Shopping cart">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={toggleMenu}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-cream dark:bg-dark-bg shadow-lg flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-semibold">Menu</span>
                <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Close menu">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-grow p-4 flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-1 focus:ring-brand-primary/50"
                    />
                  </div>
                  {navLinks.map(link => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      end={location.pathname === link.path}
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `px-4 py-3 rounded-lg text-lg transition-colors ${
                          isActive
                            ? 'bg-brand-primary/10 text-brand-primary font-semibold'
                            : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>

                <div className="flex flex-col gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {isAuthenticated && user ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-brand-primary font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{user.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                        </div>
                      </div>
                      <button onClick={() => { logout(); handleLinkClick(); }} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Logout">
                        <LogOut className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => handleAuthClick('login')}
                        className="w-full px-4 py-2 text-center font-semibold rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors"
                      >
                        Sign In
                      </button>
                    </div>
                  )}
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-lg">Switch Theme</span>
                    {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
