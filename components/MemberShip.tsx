import useAuth from "../hooks/useAuth"

const MemberShip = () => {
    const { user } = useAuth()

    return (
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-b-0 md:px-0 md:pb-0">
            <div className="space-y-2 py-4">
                <h4 className="text-lg text-[gray]">Membership & Billing</h4>
                <button className="h-10 w-3/5 bg-gray-300 whitespace-nowrap py-2 text-black text-sm font-medium shadow-md hover:bg-gray-200 md:w-4/5">
                    Cancel Membership
                </button>
            </div>
            <div className="col-span-3">
                <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
                    <div>
                        <p className="font-medium">{user?.email}</p>
                        <p className="text-[gray]">Password: ********</p>
                    </div>
                    <div className="md:text-right">
                        <p className="membershipLink">Change email</p>
                        <p className="membershipLink">Change password</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberShip