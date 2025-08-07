export default function Footer() {
  return (
    <footer className="bg-orange-500 text-white text-sm font-sans w-full">
      <div className="max-w-[1680px] mx-auto px-10 py-12 grid grid-cols-2 md:grid-cols-6 gap-8">
        {/* Column 1: Company */}
        <div>
          <h6 className="font-semibold mb-2">Company</h6>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Who We Are</li>
          </ul>
        </div>

        {/* Column 2: Franchising */}
        <div>
          <h6 className="font-semibold mb-2">Franchising</h6>
          <ul className="space-y-1">
            <li>Our Business Model</li>
            <li>Franchise Process</li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h6 className="font-semibold mb-2">Services</h6>
          <ul className="space-y-1">
            <li><a href="https://quicktrackinc.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">QuickTrack Inc</a></li>
            <li><a href="https://www.quicktrackfuel.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">QuickTrack Fuel</a></li>
            <li><a href="#" className="hover:underline">Buy, Sell & Lease</a></li>
            <li><a href="https://www.lamawholesale.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">LaMa Wholesale</a></li>
          </ul>
        </div>

        {/* Column 4: Need Help? */}
        <div>
          <h6 className="font-semibold mb-2">Need Help?</h6>
          <ul className="space-y-1">
            <li>1-800-255-0711</li>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Business</li>
            <li>Investors</li>
          </ul>
        </div>

        {/* Column 5: Empty */}
        <div></div>

        {/* Column 6: Empty */}
        <div></div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/50 py-6 px-10 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Legal Links */}
        <div className="flex flex-wrap gap-4 text-white">
          <a href="/terms-conditions" className="hover:underline">Terms & Conditions</a>
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
          <a href="/texas-privacy" className="hover:underline">Texas Privacy</a>
          <a href="/texas-transparency" className="hover:underline">Texas Transparency in Supply Chains Act</a>
          <a href="/tx-cleaning-products" className="hover:underline">TX Cleaning Products Right to Know</a>
          <a href="/do-not-sell" className="hover:underline">Do Not Sell or Share My Information</a>
        </div>

        {/* Social Icons (placeholders) */}
        <div className="flex gap-3">
          <div className="w-6 h-6 bg-white rounded-full"></div>
          <div className="w-6 h-6 bg-white rounded-full"></div>
          <div className="w-6 h-6 bg-white rounded-full"></div>
          <div className="w-6 h-6 bg-white rounded-full"></div>
        </div>
      </div>
    </footer>
  );
} 