export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-dark-surface mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-serif font-semibold">Aurene</h3>
            <p className="mt-2 text-sm text-gray-500">Modern clothing for the modern soul.</p>
          </div>
          <div>
            <h4 className="font-semibold">Shop</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="text-gray-500 hover:text-gray-800 dark:hover:text-white">New Arrivals</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-800 dark:hover:text-white">Trending</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-800 dark:hover:text-white">Saree</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-800 dark:hover:text-white">Panjabi</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">About</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="text-gray-500 hover:text-gray-800 dark:hover:text-white">Our Story</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-800 dark:hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-800 dark:hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Stay Connected</h4>
            <p className="mt-4 text-sm text-gray-500">Join our newsletter for updates.</p>
            <div className="mt-2 flex">
              <input type="email" placeholder="Your email" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none" />
              <button className="px-4 py-2 bg-brand-primary text-white rounded-r-md">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Aurene. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
