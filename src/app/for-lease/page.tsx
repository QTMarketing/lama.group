import PartnershipDealerForm from "@/components/PartnershipDealerForm";

export default function ForLeasePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">For Lease Properties</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Discover our available properties for lease. Whether you're looking for retail space, 
              office buildings, or commercial real estate, we have options to suit your business needs.
            </p>
          </div>

          {/* Partnership Dealer Opportunities Form */}
          <div id="partnership-dealer-opportunities-form" className="mt-12">
            <div className="rounded-[16px] border border-slate-200 p-5">
              <h3 className="text-[20px] leading-[28px] text-slate-900 mb-4" style={{fontFamily: 'Plus Jakarta Sans Medium'}}>
                Partnership Dealer Opportunities Form
              </h3>
              <div className="mt-3">
                <PartnershipDealerForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
