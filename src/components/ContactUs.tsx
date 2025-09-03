export default function ContactUs() {
  return (
    <section className="bg-[#F4F4F4] text-black py-20">
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold mb-12 text-center">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* For Fuel Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h4 className="text-2xl font-compressed-medium text-gray-900 mb-4 leading-[1.2] tracking-[0.2px]">For Fuel</h4>
            <p className="text-sm md:text-base text-gray-700 mb-1">Email us:</p>
            <a href="mailto:info@quicktrackfuel.com" className="text-sm md:text-base text-[#FF6600] hover:underline break-all">info@quicktrackfuel.com</a>
          </div>

          {/* For LaMa Wholesale Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h4 className="text-2xl font-compressed-medium text-gray-900 mb-4 leading-[1.2] tracking-[0.2px]">For LaMa Wholesale</h4>
            <p className="text-sm md:text-base text-gray-700 mb-1">Email us:</p>
            <a href="mailto:info@lamawholesale.com" className="text-sm md:text-base text-[#FF6600] hover:underline break-all">info@lamawholesale.com</a>
          </div>

          {/* For LaMa Foundation Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h4 className="text-2xl font-compressed-medium text-gray-900 mb-4 leading-[1.2] tracking-[0.2px]">For LaMa Foundation</h4>
            <p className="text-sm md:text-base text-gray-700 mb-1">Email us:</p>
            <a href="mailto:info@lamafoundation.com" className="text-sm md:text-base text-[#FF6600] hover:underline break-all">info@lamafoundation.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
