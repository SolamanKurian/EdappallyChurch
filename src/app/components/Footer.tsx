import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-8 sm:py-12 px-4">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          
          {/* Logo and Address Section */}
          <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
            <div className="mb-4 sm:mb-6">
              <img 
                src="/hero/edpng.png" 
                alt="Church Logo" 
                className="h-10 sm:h-12 w-auto object-contain mb-3 mx-auto sm:mx-0"
              />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-amber-100">Edappally Church of God</h3>
                <p className="text-gray-400 text-sm">A Christ-Centered Ministry</p>
              </div>
            </div>
            <div className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
              <p>Edappally Toll, Ernakulam, Kerala, India</p>
              <p>+91 9447154450</p>
              <p>info@edappallychurch.com</p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-amber-100 mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-amber-400 transition-colors text-sm sm:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-amber-400 transition-colors text-sm sm:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/listen" className="text-gray-300 hover:text-amber-400 transition-colors text-sm sm:text-base">
                  Sermons
                </Link>
              </li>
              <li>
                <Link href="/watch" className="text-gray-300 hover:text-amber-400 transition-colors text-sm sm:text-base">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/read" className="text-gray-300 hover:text-amber-400 transition-colors text-sm sm:text-base">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/attend" className="text-gray-300 hover:text-amber-400 transition-colors text-sm sm:text-base">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Services Section */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-amber-100 mb-3 sm:mb-4">Services</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link href="/attend" className="text-gray-300 hover:text-amber-400 transition-colors text-sm sm:text-base">
                  Attend Service
                </Link>
              </li>
              <li>
                <Link href="/listen" className="text-gray-300 hover:text-amber-400 transition-colors text-sm sm:text-base">
                  Listen Online
                </Link>
              </li>
              <li>
                <Link href="/watch" className="text-gray-300 hover:text-amber-400 transition-colors text-sm sm:text-base">
                  Watch Online
                </Link>
              </li>
              <li>
                <Link href="/read" className="text-gray-300 hover:text-amber-400 transition-colors text-sm sm:text-base">
                  Read Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-amber-400 transition-colors text-sm sm:text-base">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/notice-board" className="text-gray-300 hover:text-amber-400 transition-colors text-sm sm:text-base">
                  Notice Board
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright and Developer */}
        <div className="border-t border-gray-800 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            {/* Copyright */}
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-xs sm:text-sm">
                &copy; {currentYear} Edappally Church of God. All rights reserved.
              </p>
            </div>

            {/* Developer Information */}
            <div className="text-center sm:text-right">
              <p className="text-gray-500 text-xs">
                Developed by{" "}
                <a 
                  href="https://www.dexqbit.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Dexqbit Solutions Pvt Ltd
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 