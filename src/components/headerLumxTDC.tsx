import Link from "next/link";
import { useState } from "react";
import { connectWallet, WalletResponse } from "../services/lumxapi";

interface HeaderLumxProps {
  setWalletResponse: (walletResponse: WalletResponse | null) => void;
}

export default function HeaderLumxTDC({ setWalletResponse }: HeaderLumxProps) {
  const [walletResponse, setLocalWalletResponse] = useState<WalletResponse | null>(null);

  function btnConnectWallet() {
    setLocalWalletResponse(null);

    connectWallet()
      .then(walletResponse => {
        setLocalWalletResponse(walletResponse);
        setWalletResponse(walletResponse); 
      })
      .catch(err => {
        const errorMessage = "Error: " + err.message || "An error occurred while creating wallet.";
      });
  }

  return (
    <>
      <main className="m-0 p-0 relative">
        <div className="absolute inset-0 bg-white m-0 p-0"></div>
        <div className="container mx-auto relative p-0">
          <nav className="flex flex-wrap items-center justify-between m-0 p-0">
            <Link href="https://www.lumx.io/" target="_blank" className="block group overflow-hidden relative rounded-xl m-0 p-0">
              <div className="bg-white rounded-2xl m-0 p-0">
                <img src="logo.png" className="object-contain m-0 p-0" alt="Lumx Protocol" width="100" height="100" />
              </div>
            </Link>

            <div className="ml-auto">
              {walletResponse ? (
                <p className="font-bold text-gray-500">Wallet connected: {walletResponse.address}</p>
              ) : (
                <button
                  type="button"
                  onClick={btnConnectWallet}
                  className="bg-black font-bold hover:bg-gray-800 inline-block px-8 py-2 rounded text-white"
                >
                  Connect Wallet
                </button>
              )}
            </div>

          </nav>
        </div>
      </main>
    </>
  );
}
