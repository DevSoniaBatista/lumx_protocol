import Link from "next/link";

export default function FooterLumx() {
    return (
        <>
            <footer className="bg-white text-gray-400 w-full">
                <div className="container mx-auto p-0 relative">
                    <hr className="mb-0 opacity-20" />
                    <div className="flex flex-wrap -mx-4 items-center justify-between m-0 p-0">
                        <div className="px-4 py-0">
                            Launch your project with{' '}
                            <Link href="https://docs.lumx.io/get-started/introduction" target="_blank" className="text-gray-900 underline">
                                Lumx Protocol
                            </Link>
                        </div>

                        <div className="px-4 py-0">
                            <Link href="https://join.slack.com/t/lumxprotocol/shared_invite/zt-2m4eimrw0-fP0uPUK7rzZUS4E5Y_Ep2g" target="_blank" className="text-gray-400 ">
                                Community
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}