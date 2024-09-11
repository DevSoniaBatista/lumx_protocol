import Header from "../../components/header";
import Footer from "../../components/footer";
import Link from "next/link";

export default function Home() {
  return (

    <>
<main>
              <section className="bg-white pt-4 relative text-opacity-60 text-gray-900 sm:px-4">
                  <div className="absolute bg-white h-full inset-0 w-6/12 z-0 md:w-5/12 lg:w-4/12"></div>
                  <Header/>
                  <div className="container mx-auto pb-36 pt-16 px-4 relative">
                      <div className="-mx-4 flex flex-wrap items-center space-y-6 lg:space-y-0">
                          <div className="px-4 w-full lg:w-6/12 xl:w-5/12"> 
                              <div className="-ml-4 bg-white p-4 rounded-2xl w-10/12 sm:-ml-6 sm:p-6 md:w-7/12 lg:w-full"> 
                              </div>                             
                          </div>
                          <div className="mx-auto px-4 w-full lg:w-6/12"> 
                              <h4 className="font-bold leading-tight text-gray-900 ">
                                Chamadas a Lumx Protocol - Custom Transaction
                              </h4>
                                <div className="w-full lg:flex lg:items-center lg:space-x-4 lg:space-y-0 lg:w-auto" data-name="nav-menu"> 
                                <div className="gap-4 items-center"> 
                                <Link href="/projectwallet" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-gray-900lg:p-4 xl:px-6">
                                  Create Project and Wallet</Link> <br/>
                                <Link href={`/customtransac/${0}/${0}`} className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-gray-900lg:p-4 xl:px-6">
                                  Create Custom Transaction</Link> <br/>
                                </div>
                             </div>                              
                          </div>
                      </div>
                  </div>
              </section>
        </main>
        <Footer/>
</>
  );
}
