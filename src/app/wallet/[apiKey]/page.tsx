"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Header from "../../../components/header";

import { createWallet, WalletResponse, NewWallet } from "../../../services/lumxapi";

export default function Wallet() {

  const params = useParams();
  const initialApiKey = params && Array.isArray(params.apiKey) ? params.apiKey[0] : params?.apiKey || '';
  const initialApiKeyVerified = Array.isArray(initialApiKey) ? initialApiKey[0] : initialApiKey || '';
  const [apiKey, setApiKey] = useState<string>(initialApiKeyVerified);

  const [message, setMessage] = useState<string>("");
  const [wallet, setWallet] = useState<NewWallet | null>(null);
  const [walletResponse, setWalletResponse] = useState<WalletResponse | null>(null);

  const [copied, setCopied] = useState<{ id: boolean; address: boolean; apiKey: boolean }>({
    id: false,
    address: false,
    apiKey: false,
  });

  useEffect(() => {
    if (apiKey) {
      setWallet({ apiKey } as NewWallet);
    }
  }, [apiKey]);

  function btnCreateWallet() {
    if (!apiKey) return;

    setWalletResponse(null);
    setMessage("Creating Wallet... wait...");

    createWallet(apiKey)
      .then(walletResponse => {
        setMessage("Wallet created successfully!");
        setWalletResponse(walletResponse);
      })
      .catch(err => {
        const errorMessage = "Error: " + err.message || "An error occurred while creating wallet.";
        setMessage(errorMessage);
      });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setApiKey(e.target.value);
  };

  const handleCopyClick = (type: 'id' | 'address' | 'apiKey', text: string) => {
    navigator.clipboard.writeText(text);
    setCopied((prevState) => ({ ...prevState, [type]: true }));

    setTimeout(() => {
      setCopied((prevState) => ({ ...prevState, [type]: false }));
    }, 2000);
  };

  return (
    <>
      <main>
        <section className="bg-white pt-4 relative text-opacity-60 text-gray-900 sm:px-4">
          <Header />
        </section>
        <section className="bg-opacity-10 bg-primary-500 py-12 sm:px-4">
          <div className="container mx-auto px-4">
            <div className="-mx-4 flex flex-wrap gap-2 items-center mb-4">
              <div className="px-4 w-full md:flex-1">
                <h2 className="capitalize font-bold text-2xl text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" className="inline-block mb-2 mr-2 text-primary-500">
                    <path d="M12 23a7.5 7.5 0 0 1-5.138-12.963C8.204 8.774 11.5 6.5 11 1.5c6 4 9 8 3 14 1 0 2.5 0 5-2.47.27.773.5 1.604.5 2.47A7.5 7.5 0 0 1 12 23z"></path>
                  </svg>
                  <span>Create a Wallet from Lumx</span>
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap -mx-8">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <form className="w-full max-w-md">
                  <div className="mb-4">
                    <label htmlFor="apiKey" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">API Key:</label>
                    <textarea
                      id="apiKey"
                      value={apiKey}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      rows={20} required />
                  </div>
                  <button type="button" onClick={btnCreateWallet}
                    className="bg-black font-bold hover:bg-gray-800 inline-block px-8 py-2 rounded text-white">
                    Submit
                  </button>
                </form>
              </div>
              <div className="w-full px-4 md:w-1/2">
                {message && <p className="font-bold mt-4 text-sm">{message}</p>}
                {walletResponse && (
                  <div className="overflow-auto mt-4">
                    <table className="min-w-full max-w-2xl mx-auto divide-y divide-gray-200 table-fixed text-xs">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="w-1/4 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                          <th className="w-3/4 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(walletResponse).map(([key, value]) => (
                          <tr key={key}>
                            <td className="px-2 py-1 whitespace-normal break-words text-gray-900">{key}</td>
                            <td className="px-2 py-1 whitespace-normal break-words text-gray-500">
                              {value !== undefined && value !== null ? (
                                <>
                                  {['id', 'address', 'apiKey'].includes(key) && (
                                    <>
                                      <Image src="/copy.png" onClick={() => handleCopyClick(key as 'id' | 'address', value as string)}
                                        width="30" height="30" alt={`Copy ${key}`} />{' '}
                                      {copied[key as 'id' | 'address'] ? 'Copied!' : ''}
                                    </>
                                  )}
                                  {typeof value === 'string'
                                    ? value.split(',').map((val, idx) => (
                                      <span key={idx} className="block">{val.trim()}</span>
                                    ))
                                    : JSON.stringify(value, null, 2).split(',').map((val, idx) => (
                                      <span key={idx} className="block">{val.trim()}</span>
                                    ))}
                                </>
                              ) : "N/A"}
                            </td>
                          </tr>
                        ))}

                        <tr>
                          <td className="px-2 py-1 whitespace-normal break-words text-gray-900">apiKey</td>
                          <td className="px-2 py-1 whitespace-normal break-words text-gray-500">
                            <Image src="/copy.png" onClick={() => handleCopyClick('apiKey', apiKey)}
                              width="30" height="30" alt="Copy apiKey" /> {copied[`apiKey`] ? 'Copied!' : ''}
                            {apiKey?.substring(0, 50)} ......... {apiKey?.substring(1140)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                <br />
                {walletResponse && (
                  <Link href={`/contract/${apiKey}/${walletResponse.id}`}
                    className="bg-black font-bold hover:bg-gray-800 inline-block px-8 py-2 rounded text-white">
                    Create Contract</Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
