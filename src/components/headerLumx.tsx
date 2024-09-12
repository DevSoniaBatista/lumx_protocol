import Link from "next/link";

export default function HeaderLumx() {
  return (
    <>
      <main className="m-0 p-0 relative">
        <div className="absolute inset-0 bg-white m-0 p-0"></div>
        <div className="container mx-auto relative p-0">
          <nav className="flex flex-wrap items-center justify-between m-0 p-0">
            <Link href="https://www.lumx.io/" target="_blank" className="block group overflow-hidden relative rounded-xl m-0 p-0">
              <div className="bg-white rounded-2xl m-0 p-0">
                <img src="/logo.png" className="object-contain m-0 p-0" alt="Lumx Protocol" width="100" height="100" />
              </div>
            </Link>
            <div className="flex-1 hidden space-y-2 w-full lg:flex lg:items-center lg:space-x-4 lg:space-y-0 lg:w-auto" data-name="nav-menu">
              <div className="flex flex-col ml-auto lg:flex-row">
                <Link href="/zk" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-gray-900lg:p-4 xl:px-6">Create Token zK</Link>
                <Link href="/custom" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-gray-900lg:p-4 xl:px-6">Custom Transaction</Link>
                <Link href="/" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-gray-900lg:p-4 xl:px-6">Home</Link>
              </div>
            </div>
          </nav>
        </div>
      </main>
    </>
  );
}