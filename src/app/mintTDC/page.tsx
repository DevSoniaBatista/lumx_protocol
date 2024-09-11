"use client";

import React, { useRef, useState } from 'react';
import Image from "next/image";
import { MintResponse, mintTokenEvent, WalletResponse } from "../../services/lumxapi";
import HeaderLumxTDC from "../../components/headerLumxTDC";
import FooterLumx from "../../components/footerLumx";

export default function MintTDC() {
  const form = useRef<HTMLFormElement>(null);
  const [enviado, setEnviado] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageReturn, setMessageReturn] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>("");

  const [walletResponse, setWalletResponse] = useState<WalletResponse | null>(null);
  const [mintResponse, setMintResponse] = useState<MintResponse | null>(null);
  const [copied, setCopied] = useState<{ blockExplorerUrl: boolean; contractAddress: boolean }>({
    blockExplorerUrl: false,
    contractAddress: false
  });

  const CONTRACT_ADDRESS = process.env.LUMX_CONTRACT_ADDRESS!;

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Minting Token... wait...");

    if (form.current) {
      try {
        const formData = new FormData(form.current);
        const formObject = Object.fromEntries(formData.entries());

        await mintToken();
        setEnviado(true);
      } catch (error) {
        console.log('Erro durante o processo:', error);
        setEnviado(false);
      }
    }
  };

  const handleCopyClick = (type: 'blockExplorerUrl' | 'contractAddress', text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(prevState => ({ ...prevState, [type]: true }));
    setTimeout(() => {
      setCopied(prevState => ({ ...prevState, [type]: false }));
    }, 2000);
  };

  const mintToken = async () => {
    setMintResponse(null);
    setMessage("Minting Token... wait...");
    try {
      const response = await mintTokenEvent(walletResponse?.id || "");
      setMessageReturn("Token minted successfully - Token Id: " + response.tokenId);
      setMintResponse(response);
      setContractAddress("https://testnets.opensea.io/assets/amoy/" + CONTRACT_ADDRESS);
      setMessage("");

    } catch (err) {
      let errorMessage = "An error occurred while minting Token.";
      if (err instanceof Error) errorMessage = `${err.message}`;
      setMessage(errorMessage);
    }
  };

  return (
    <>
      <main className="min-h-screen flex flex-col justify-between">
        <section className="bg-white text-opacity-60 text-gray-900 m-0 p-0">
          <HeaderLumxTDC setWalletResponse={setWalletResponse} />
        </section>

        <section className="bg-opacity-10 bg-primary-500 flex items-start justify-center pt-0 m-0 p-0">
          <div className="container mx-auto flex flex-col md:flex-row justify-center gap-4 p-0">
            <div className="w-full max-w-md md:max-w-lg flex justify-center m-0 p-0">
              <div className="bg-white rounded-2xl m-0 p-0">
                <img src="NFT-TDC.jpeg" className="rounded-2xl w-full h-auto object-cover m-0 p-0" alt="TDC - Lumx" />
              </div>
            </div>

            <div className="w-full max-w-md flex flex-col text-black">
              <p className="font-aeonik text-2xl mb-2">Lumx at TDC São Paulo 2024</p>
              <p className="font-inter text-base mb-4 text-justify">
                This exclusive digital collectible from Lumx celebrates your participation and interaction with our team at TDC São Paulo 2024. The technology behind this redemption was developed by us to ensure you have a seamless, frictionless experience using blockchain. Enjoy this digital keepsake.
              </p>

              {enviado ? (
                <>
                  {mintResponse && (
                    <div className="overflow-auto mt-4">
                      <table className="min-w-full max-w-2xl mx-auto divide-y divide-gray-200 text-xs">
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td>
                              {messageReturn && <p className="block mb-1 text-sm font-medium" style={{ color: '#808285' }}>{messageReturn}</p>}
                            </td>
                          </tr>
                          {Object.entries(mintResponse).map(([key, value]) =>
                            key === 'blockExplorerUrl' && value !== undefined && value !== null ? (
                              <tr key={key}>
                                <td className="px-2 py-1 whitespace-normal break-words text-gray-500 text-xs">
                                  <>
                                    <Image
                                      src="/copy.png"
                                      onClick={() => handleCopyClick(key as 'blockExplorerUrl', value as string)}
                                      width="30"
                                      height="30"
                                      alt={`Copy ${key}`}
                                    />
                                    {copied[key as 'blockExplorerUrl'] ? 'Copied! ' : ''}

                                    {typeof value === 'string' ? (
                                      <a href={value.trim()} target="_blank" rel="noopener noreferrer" className="text-gray-400 underline">
                                        Block Explorer
                                      </a>
                                    ) : (
                                      JSON.stringify(value, null, 2).split(',').map((val, idx) => (
                                        <span key={idx} className="block">{val.trim()}</span>
                                      ))
                                    )}
                                  </>
                                </td>
                              </tr>
                            ) : null
                          )}

                          <tr>
                            <td className="px-2 py-1 whitespace-normal break-words text-gray-500">
                              <Image
                                src="/copy.png"
                                onClick={() => handleCopyClick('contractAddress', contractAddress)}
                                width="30"
                                height="30"
                                alt="Copy OpenSea"
                              /> {copied[`contractAddress`] ? 'Copied! ' : ''}
                              <a href={`${contractAddress}/${mintResponse.tokenId}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 underline">
                                OpenSea
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              ) : (
                walletResponse && (
                  <form ref={form} onSubmit={handleForm} className="w-full max-w-md text-gray-700 mb-0">
                    <div className="mb-4">
                    <input
                        type="hidden"
                        name="user_wallet"
                        value={walletResponse ? walletResponse.address : ''}
                        required
                      />
                      <label className="block mb-1 text-sm font-medium" style={{ color: '#808285' }}>Nome:</label>
                      <input
                        type="text"
                        name="user_name"
                        style={{ color: '#808285' }}
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                        required
                        onInput={(e) => e.currentTarget.value = e.currentTarget.value.trimStart()}
                      />

                      <label className="block mb-1 text-sm font-medium" style={{ color: '#808285' }}>Email:</label>
                      <input
                        type="email"
                        name="user_email"
                        style={{ color: '#808285' }}
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                        required
                      />

                      <label className="block mb-1 text-sm font-medium" style={{ color: '#808285' }}>Empresa:</label>
                      <input
                        type="text"
                        name="user_empresa"
                        style={{ color: '#808285' }}
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                        required
                        onInput={(e) => e.currentTarget.value = e.currentTarget.value.trimStart()}
                      />

                      <label className="block mb-1 text-sm font-medium" style={{ color: '#808285' }}>Cargo:</label>
                      <input
                        type="text"
                        name="user_cargo"
                        style={{ color: '#808285' }}
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                        required
                        onInput={(e) => e.currentTarget.value = e.currentTarget.value.trimStart()}
                      />
                    </div>
                    <button type="submit" className="bg-black font-bold hover:bg-gray-800 inline-block px-8 py-2 rounded-lg text-white mb-0">
                      Claim Now
                    </button>
                  </form>
                )
              )}

              {message && <p className="block mb-1 text-sm font-medium" style={{ color: '#808285' }}>{message}</p>}
            </div>
          </div>
        </section>

        <section className="bg-white text-opacity-60 text-gray-900 m-0 p-0">
          <FooterLumx />
        </section>
      </main>
    </>
  );
}
