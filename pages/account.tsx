import Head from "next/head"
import Link from "next/link"
import useAuth from "../hooks/useAuth"
import { useEffect } from "react"
import MemberShip from "../components/MemberShip"

const Account = () => {
    const { user, logout } = useAuth()
    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <div>
            <Head>
                <title>Account Settings - Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="bg-backdrop">
                <Link href="/">
                    <img
                        src="https://rb.gy/ulxxee"
                        width={120}
                        height={120}
                        className="cursor-pointer object-contain"
                    />
                </Link>
                <Link href="/account">
                    <img
                        src="https://rb.gy/g1pwyx"
                        className="cursor-pointer rounded"
                    />
                </Link>
            </header>
            <main className="mx-auto max-w-6xl px-5 pb-12 pt-24 transition-all md:px-10">
                <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
                    <h1 className="text-3xl md:text-4xl">Account</h1>
                    <div className="flex items-center gap-x-1.5 -ml-0.5">
                        <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
                        <p className="text-xs font-semibold text-[#555]">
                            Member since {user?.metadata?.creationTime?.split(" ").slice(0, 4).join(" ")}
                        </p>
                    </div>
                </div>

                <MemberShip/>

                <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-b-0 md:px-0 md:pb-0">
                    <h4>Plan Details</h4>
                    <div>
                        Basic
                    </div>
                    <p className="cursor-pointer hover:underline md:text-right text-blue-500">Change plan</p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-b-0 md:px-0 md:pb-0">
                    <h4 className="text-lg text-[gray]">Settings</h4>
                    <p className="col-span-3 cursor-pointer text-blue-500 hover:underline" onClick={logout}>Sign out all devices</p>
                </div>
            </main>
        </div>
    )
}

export default Account