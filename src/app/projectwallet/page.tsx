"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Header from "../../components/header";
import {createProjectAndWallet, NewProject, ProjectAndWalletResponse, BlockchainNameEnum, } from "../../services/lumxapi";

export default function Project() {

    const [message, setMessage] = useState<string>("");
    const [project, setProject] = useState<NewProject | null>(null);
    const [projectResponse, setProjectResponse] = useState<ProjectAndWalletResponse | null>(null);

    const [copied, setCopied] = useState<{ walletId: boolean; walletAddress: boolean; apiKey: boolean }>({
      walletId: false,
      walletAddress: false,
      apiKey: false,
    });

    function btnCreateProject() {
        if (!project) return;

        setProjectResponse(null);
        setMessage("Creating Project and Wallet... wait...");
        
        createProjectAndWallet(project)
            .then(projectResponse => {
                setMessage("Project and Wallet created successfully!");
                setProjectResponse(projectResponse);
            })
            .catch(err => {
                const errorMessage = "Error: "+err.message || "An error occurred while creating project and wallet.";
                 setMessage(errorMessage );
            });
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProject({ ...project, blockchainName: event.target.value });
    };

    const handleCopyClick = (type: 'walletId' | 'walletAddress' | 'apiKey', text: string) => {
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
                <span>Create a Project and Wallet from Lumx - Custom Transaction</span>
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4">
              <form className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                    <input type="text" id="name" value={project?.name} onChange={(e) => setProject({ ...project, name: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required />
                </div>
                <div className="mb-4">
                    <label htmlFor="blockchainName" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Blockchain Name:</label>
                    <select id="blockchainName" value={project?.blockchainName} onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                        {Object.values(BlockchainNameEnum).map((blockchain) => (
                            <option key={blockchain} value={blockchain}>{blockchain}</option>
                        ))}
                    </select>
                </div>
                <button type="button" onClick={btnCreateProject}
                    className="bg-black font-bold hover:bg-gray-800 inline-block px-8 py-2 rounded text-white">
                    Submit
                </button>
            </form>  
            </div>
            <div className="w-full md:w-1/2 px-4">
            {message && <p className="font-bold mt-4 text-sm">{message}</p>}
            {projectResponse && (
              <div className="overflow-auto mt-4">
                <table className="min-w-full max-w-2xl mx-auto divide-y divide-gray-200 table-fixed text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="w-1/4 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                      <th className="w-3/4 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(projectResponse).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-2 py-1 whitespace-normal break-words text-gray-900">{key}</td>
                        <td className="px-2 py-1 whitespace-normal break-words text-gray-500">
                          {value !== undefined && value !== null ? (
                            <>
                            {typeof value === 'string' && (value as string).includes(',')
                              ? (value as string).split(',').map((val, idx) => (
                                  <span key={idx} className="block">{val.trim()}</span>
                                ))
                              :  JSON.stringify(value, null, 2).split(',').map((val, idx) => (
                                <span key={idx} className="block">{val.trim()}</span>
                              ))
                            }

                            </>
                          ) : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>                
              )}
              {
                projectResponse && 
                (
                  <> 
                    <br/>
                    <p>Save important info in the .env file </p>

                    <Link href="#" onClick={() => handleCopyClick('apiKey', projectResponse?.projectResponse?.apiKey)}
                      className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-black lg:p-4 xl:px-6">
                        Api Key </Link> {copied[`apiKey`] ? 'Copied!' : ''}

                    <Link href="#" onClick={() => handleCopyClick('walletId', projectResponse?.walletResponse?.id)}
                      className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-black lg:p-4 xl:px-6">
                        Wallet Id </Link> {copied[`walletId`] ? 'Copied!' : ''}

                    <Link href="#" onClick={() => handleCopyClick('walletAddress', projectResponse?.walletResponse?.address)}
                      className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-black lg:p-4 xl:px-6">
                        Wallet Address </Link> {copied[`walletAddress`] ? 'Copied!' : ''} 
                    <br/>
                    <Link  href={`/customtransac/${projectResponse?.projectResponse?.apiKey}/${projectResponse?.walletResponse?.id}`} 
                      className="bg-black font-bold hover:bg-gray-800 inline-block px-8 py-2 rounded text-white">
                      Create Custom Transaction</Link>    
                  </>
                )
              }

            </div>
          </div>
        </div>
      </section>
    </main>
  </> 
  );
}
