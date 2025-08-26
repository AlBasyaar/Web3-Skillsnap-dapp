import React, { useState } from 'react';
import { X, Info } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, courseTitle = 'UI Design Fundamentals', courseData }) => {
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);

  const coursePriceETH = '0.0020';
  const commitmentFeeETH = '0.00064';
  const totalETH = '0.00264';
  const coursePriceIDR = '62.846';
  const commitmentFeeIDR = '20.202';
  const totalIDR = '83.048';

  if (!isOpen) return null;

  const handleMetamaskConnect = () => {
    // Handle Metamask connection
    setIsMetamaskConnected(true);
  };

  const handlePayment = () => {
    // Handle payment
    console.log('Processing payment...');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-gray-800 rounded-t-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
          {/* Close button */}
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-gray-700 rounded-md text-gray-300 hover:text-white focus:outline-none"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Checkout */}
            <div className="border-r border-gray-700 pr-6">
              <h3 className="text-lg font-medium text-white mb-6">Checkout</h3>
              
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-20 h-16 rounded-lg flex-shrink-0 overflow-hidden">
                  {courseData?.thumbnail ? (
                    <img 
                      src={courseData.thumbnail} 
                      alt={courseData.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                      UI
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-white font-medium">{courseData?.title || courseTitle}</h4>
                  <p className="text-sm text-gray-400">Kategori: {courseData?.level || 'Common'}</p>
                  {courseData?.duration && (
                    <p className="text-sm text-gray-500">{courseData.duration}</p>
                  )}
                </div>
              </div>

              {/* Price details */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-300">Rincian Harga</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Course</span>
                    <div className="text-right">
                      <div className="text-white">{coursePriceETH} ETH</div>
                      <div className="text-gray-400 text-xs">Rp{coursePriceIDR}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-400">Commitment Fee</span>
                      <Info className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="text-right">
                      <div className="text-white">{commitmentFeeETH} ETH</div>
                      <div className="text-gray-400 text-xs">Rp{commitmentFeeIDR}</div>
                    </div>
                  </div>
                  
                  <div className="pt-2 mt-4 border-t border-gray-700">
                    <div className="flex justify-between font-medium">
                      <span className="text-white">Total</span>
                      <div className="text-right">
                        <div className="text-white">{totalETH} ETH</div>
                        <div className="text-gray-400 text-xs">Rp{totalIDR}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-2">
                  <p>"can't refund if you're not done program in 5 month"</p>
                </div>
              </div>
            </div>

            {/* Right Side - Payment */}
            <div>
              <h3 className="text-lg font-medium text-white mb-6">Payment</h3>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-300">Opsi Pembayaran</h4>
                
                <div className="space-y-3">
                  {/* Metamask */}
                  <button
                    onClick={handleMetamaskConnect}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border ${
                      isMetamaskConnected 
                        ? 'border-purple-500 bg-purple-900/30' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://res.cloudinary.com/dr5pehdsw/image/upload/v1755760016/dacf9cb9634f008d57d7d5e2e88c03a0abc5165c_uecrk2.png"
                        alt="Metamask Logo"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-white">
                        {isMetamaskConnected ? '0xC1c6b...AfAbc' : 'Metamask'}
                      </span>
                    </div>
                    {isMetamaskConnected && (
                      <span className="text-xs text-green-400">Connected</span>
                    )}
                  </button>
                  
                  {/* Plug */}
                  <button className="w-full flex items-center space-x-3 p-4 rounded-lg border border-gray-600 hover:border-gray-500">
                    <img
                      src="https://res.cloudinary.com/dr5pehdsw/image/upload/v1755759991/0244d61aadeaf17c1cbf49efac9df4db950e3262_hcbm33.png"
                      alt="Plug Logo"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-white">Connect with Plug</span>
                  </button>
                </div>
                
                {/* Pay Button */}
                <div className="pt-4">
                  <button
                    onClick={handlePayment}
                    disabled={!isMetamaskConnected}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-center ${
                      isMetamaskConnected
                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default PaymentModal;
