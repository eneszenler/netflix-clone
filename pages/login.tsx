import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/router";

interface Inputs {
    email: string
    password: string
    passwordAgain: string
}

const Login = () => {
    const [login, setLogin] = useState(false)
    const { signIn, signUp, loading, user } = useAuth()

    const router = useRouter()

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        if (!login) {
            await signIn(email, password)
        } else {
            await signUp(email, password)
        }
    }

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user])


    return (
        <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
            <Head>
                <title>Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Image
                src="https://assets.nflxext.com/ffe/siteui/vlv3/f1c3c4eb-2fea-42c7-9ebd-1c093bd8a69d/120567a4-143d-40e9-b2ac-85713045f7ba/TR-tr-20230403-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                className="-z-10 !hidden opacity-60 sm:!inline object-cover object-center"
                fill
                alt="logo"
            />
            <img
                src="https://rb.gy/ulxxee"
                className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
                width={150}
                height={150}
            />
            {
                !login ? (
                    <div
                        className="relative mt-24 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 space-y-8"
                    >
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <h1 className="text-4xl font-semibold">Sign In</h1>
                            <div className="space-y-4">
                                <label className="inline-block w-full">
                                    <input type="email" placeholder="Email" className="input" {...register("email", { required: true })} />
                                    {errors.email && <p className="p-1 text-[13px] font-light text-orange-500">Please enter a valid email.</p>}
                                </label>
                                <label className="inline-block w-full">
                                    <input type="password" placeholder="Password" className="input" {...register("password", { required: true })} />
                                    {errors.password && <p className="p-1 text-[13px] font-light text-orange-500">Password must contain between 4 and 60 characters.</p>}
                                </label>
                            </div>

                            <button onClick={() => setLogin(false)} className="flex justify-center w-full rounded bg-[#e50914] py-3 font-semibold">{loading ? (<FaSpinner className="w-7 h-7 animate-spin" />) : 'Sign In'}</button>
                        </form>

                        <div className="text-[gray]">
                            New to Netflix?{" "}
                            <button onClick={() => setLogin(true)} type="submit" className="text-white hover:underline">Sign Up</button>
                        </div>
                    </div>

                ) : (
                    <div
                        className="relative mt-24 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 space-y-8"
                    >
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <h1 className="text-4xl font-semibold">Sign Up</h1>
                            <div className="space-y-4">
                                <label className="inline-block w-full">
                                    <input type="email" placeholder="Email" className="input" {...register("email", { required: true })} />
                                    {errors.email && <p className="p-1 text-[13px] font-light text-orange-500">Please enter a valid email.</p>}
                                </label>
                                <label className="inline-block w-full">
                                    <input type="password" placeholder="Password" className="input" {...register("password", { required: true })} />
                                    {errors.password && <p className="p-1 text-[13px] font-light text-orange-500">Password must contain between 4 and 60 characters.</p>}
                                </label>

                                <label className="inline-block w-full">
                                    <input type="password" placeholder="Password Again" className="input" {...register("passwordAgain", {
                                        required: true,
                                        validate: (val: string) => {
                                            if (watch('password') != val) {
                                                return "Your passwords do no match";
                                            }
                                        },
                                    })} />
                                    {errors.passwordAgain && <p className="p-1 text-[13px] font-light text-orange-500">Your passwords do no match.
                                    </p>}
                                </label>
                            </div>

                            <button onClick={() => setLogin(true)} className="flex justify-center w-full rounded bg-[#e50914] py-3 font-semibold">{loading ? (<FaSpinner className="w-7 h-7 animate-spin" />) : 'Sign Up'}</button>
                        </form>
                        <div className="text-[gray]">
                            Already a member?{" "}
                            <button onClick={() => setLogin(false)} type="submit" className="text-white hover:underline">Sign In</button>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default Login