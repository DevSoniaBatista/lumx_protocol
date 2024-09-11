import Link from "next/link";

export default function Footer() {
    return (
        <>
            <footer className="bg-white text-gray-400 m-0 p-0">
                <div className="container mx-auto p-0 relative">
                    <hr className="mb-0 opacity-20" />
                    <div className="flex flex-wrap -mx-4 items-center justify-between m-0 p-0">
                        <div className="px-4 py-0">
                            <Link href="https://docs.lumx.io/get-started/introduction" target="_blank" className="text-gray-400 underline">
                                Lumx Protocol
                            </Link>
                        </div>
                        <div className="px-4 py-0">
                            SMB-2024
                        </div>
                        <div className="px-4 py-0">

                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}