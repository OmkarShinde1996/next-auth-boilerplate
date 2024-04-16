'use client'
import { Bell, BookCheck, Building, ChevronLeft, CircleUser, Gauge, GitMerge, HandCoins, KeyRound, Landmark, LayoutDashboard, LifeBuoy, LogOut, Menu, Newspaper, PanelsTopLeft, PencilLine, PencilRuler, PieChart, ReceiptText, Sparkles, UserRound, UsersRound, Wrench } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import DropdownMenu from '../global/DropdownMenu'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import { Progress } from '../ui/progress'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet'

const ComposeDropDownMenu = [
    {
        title: 'Articles',
        path: '/articles',
    },
    {
        title: 'Content Tags',
        path: '/contentTags',
    },
    {
        title: 'Automations',
        path: '/automations',
    },
]

const BoostDropDownMenu = [
    {
        title: 'Loyalty Program',
        path: '/loyaltyProgram',
    },
    {
        title: 'Suggestions',
        path: '/suggestions',
    },
    // {
    //     title: 'Magic Links',
    //     path: '/magicLinks',
    // },
]

const MonetizingDropDownMenu = [
    {
        title: 'Advertisements',
        path: '/advertisements',
    },
    {
        title: 'Memberships',
        path: '/memberships',
    },
    {
        title: 'Affiliate Program',
        path: '/affiliateProgram',
    },
]

const CommunityDropDownMenu = [
    {
        title: 'Members',
        path: '/members',
    },
    {
        title: 'Segments',
        path: '/segments',
    },
    {
        title: 'Opinion Polls',
        path: '/opinionPolls',
    },
    {
        title: 'Member Data',
        path: '/memberData',
    },
    {
        title: 'Surveys',
        path: '/surveys',
    },
    {
        title: 'Membership Forms',
        path: '/membershipForms',
    },
]

const AnalyticsDropDownMenu = [
    {
        title: 'Membership Insights',
        path: '/membershipInsights',
    },
    {
        title: 'Posts Insights',
        path: '/postsInsights',
    },
    {
        title: 'Clicks Insights',
        path: '/clicksInsights',
    },
]

const LearnMoreDropDownMenu = [
    {
        title: 'Blog',
        path: '/blog',
    },
    {
        title: 'Updates',
        path: '/updates',
    },
    {
        title: 'Guides',
        path: '/guides',
    },
]


const Navbar = ({ session, user }) => {
    const [showSettings, setShowSettings] = useState(false);
    return (
        <>
            {showSettings && <div className='hidden lg:block h-full'>
                <SettingsMenu onClose={() => setShowSettings(false)} />
            </div>}

            {!showSettings && <div className='space-y-4 h-full hidden p-3 lg:block overflow-y-auto'>
                <div className='w-full flex justify-start items-center'>
                    <Link href={'/'} className=''>
                        <Image
                            src={'/longLogo.svg'}
                            width={150}
                            height={70}
                            alt='wrapplet logo'
                            className='-ml-3'
                        />
                    </Link>
                </div>
                <div className=''>
                    <nav className='w-full space-y-3 h-full'>
                        <Link href={'/dashboard'} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-1 rounded-sm'>
                            <LayoutDashboard className='w-4 h-4' />
                            Dashboard
                        </Link>
                        <DropdownMenu title='Compose' icon={<PencilLine className='w-4 h-4' />} menuList={ComposeDropDownMenu} />
                        <DropdownMenu title='Boost' icon={<Gauge className='w-4 h-4' />} menuList={BoostDropDownMenu} />
                        <DropdownMenu title='Monetizing' icon={<HandCoins className='w-4 h-4' />} menuList={MonetizingDropDownMenu} />
                        <DropdownMenu title='Community' icon={<UsersRound className='w-4 h-4' />} menuList={CommunityDropDownMenu} />
                        <DropdownMenu title='Analytics' icon={<PieChart className='w-4 h-4' />} menuList={AnalyticsDropDownMenu} />
                        <DropdownMenu title='Learn More' icon={<BookCheck className='w-4 h-4' />} menuList={LearnMoreDropDownMenu} />
                        <Separator />
                        <Link href={'#'} onClick={() => setShowSettings(true)} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-1 rounded-sm'>
                            <Wrench className='w-4 h-4' />
                            Settings
                        </Link>
                        <Link href={'/helpCenter'} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-1 rounded-sm'>
                            <LifeBuoy className='w-4 h-4' />
                            Help Center
                        </Link>
                        <div onClick={() => signOut()} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-1 rounded-sm'>
                            <LogOut className='w-4 h-4' />
                            Sign Out
                        </div>
                    </nav>
                </div>
                <div className='w-full space-y-2'>
                    <Separator />
                    <div className='p-2 bg-muted/30 rounded-md space-y-2'>
                        <div className='flex flex-row justify-between items-center'>
                            <span className='text-sm font-semibold'>Free Plan</span>
                            <div className='flex gap-1 justify-center items-center py-1 px-2 bg-gradient-to-r from-primary from-10% via-30% to-emerald-800 to-90% rounded-md'>
                                <Sparkles className='w-3 h-3' />
                                <span className='text-xs'>Trial</span>
                            </div>
                        </div>
                        <div className='space-y-1'>
                            <p className='text-xs font-extralight'>Free trial of 7 days</p>
                            <Progress value={10} className='h-2' />
                            <p className='text-xs font-extralight'>On day 1 of 7</p>
                        </div>
                    </div>
                    <Separator />
                    <div className='grid grid-cols-[25px_1fr] items-center gap-2'>
                        <div className='h-[25px] w-[25px] rounded-full'>
                            <CircleUser />
                        </div>
                        <div className='text-xs text-ellipsis overflow-hidden'>
                            <p className='text-ellipsis overflow-hidden font-medium'>
                                {`${user?.fName} ${user?.lName}`}
                            </p>
                            <p className='text-ellipsis overflow-hidden'>
                                {session?.user?.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>}


            <Sheet className='lg:hidden'>
                <SheetTrigger asChild className='lg:hidden m-3'>
                    <Button variant="outline" size="icon">
                        <Menu />
                    </Button>
                </SheetTrigger>

                <SheetContent side={'left'}>
                    {showSettings && <SettingsMenu onClose={() => setShowSettings(false)} />}
                    {!showSettings && <div className='space-y-4 h-full p-6 lg:hidden overflow-y-auto'>
                        <div className='w-full flex justify-start items-center'>
                            <Link href={'/'} className=''>
                                <Image
                                    src={'/longLogo.svg'}
                                    width={150}
                                    height={70}
                                    alt='wrapplet logo'
                                    className='-ml-3'
                                />
                            </Link>
                        </div>
                        <div className=''>
                            <nav className='w-full space-y-3 h-full'>
                                <Link href={'/dashboard'} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-1 rounded-sm'>
                                    <LayoutDashboard className='w-4 h-4' />
                                    Dashboard
                                </Link>
                                <DropdownMenu title='Compose' icon={<PencilLine className='w-4 h-4' />} menuList={ComposeDropDownMenu} />
                                <DropdownMenu title='Boost' icon={<Gauge className='w-4 h-4' />} menuList={BoostDropDownMenu} />
                                <DropdownMenu title='Monetizing' icon={<HandCoins className='w-4 h-4' />} menuList={MonetizingDropDownMenu} />
                                <DropdownMenu title='Community' icon={<UsersRound className='w-4 h-4' />} menuList={CommunityDropDownMenu} />
                                <DropdownMenu title='Analytics' icon={<PieChart className='w-4 h-4' />} menuList={AnalyticsDropDownMenu} />
                                <DropdownMenu title='Learn More' icon={<BookCheck className='w-4 h-4' />} menuList={LearnMoreDropDownMenu} />
                                <Separator />
                                <Link href={'#'} onClick={() => setShowSettings(true)} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-1 rounded-sm'>
                                    <Wrench className='w-4 h-4' />
                                    Settings
                                </Link>
                                <Link href={'/helpCenter'} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-1 rounded-sm'>
                                    <LifeBuoy className='w-4 h-4' />
                                    Help Center
                                </Link>
                                <div onClick={() => signOut()} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-1 rounded-sm'>
                                    <LogOut className='w-4 h-4' />
                                    Sign Out
                                </div>
                            </nav>
                        </div>
                        <div className='w-full space-y-2'>
                            <Separator />
                            <div className='p-2 bg-muted/30 rounded-md space-y-2'>
                                <div className='flex flex-row justify-between items-center'>
                                    <span className='text-sm font-semibold'>Free Plan</span>
                                    <div className='flex gap-1 justify-center items-center py-1 px-2 bg-gradient-to-r from-primary from-10% via-30% to-emerald-800 to-90% rounded-md'>
                                        <Sparkles className='w-3 h-3' />
                                        <span className='text-xs'>Trial</span>
                                    </div>
                                </div>
                                <div className='space-y-1'>
                                    <p className='text-xs font-extralight'>Free trial of 7 days</p>
                                    <Progress value={10} className='h-2' />
                                    <p className='text-xs font-extralight'>On day 1 of 7</p>
                                </div>
                            </div>
                            <Separator />
                            <div className='grid grid-cols-[25px_1fr] items-center gap-2'>
                                <div className='h-[25px] w-[25px] rounded-full'>
                                    <CircleUser />
                                </div>
                                <div className='text-xs text-ellipsis overflow-hidden'>
                                    <p className='text-ellipsis overflow-hidden font-medium'>
                                        {`${user?.fName} ${user?.lName}`}
                                    </p>
                                    <p className='text-ellipsis overflow-hidden'>
                                        {session?.user?.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>}
                </SheetContent>
            </Sheet>

        </>


    )
}

function SettingsMenu({ onClose }) {
    return (
        <div className='relative h-full p-6 lg:p-3'>
            <Button onClick={onClose} className='absolute bottom-0 rounded-full flex flex-row gap-1 justify-center items-center text-xs text-muted-foreground hover:text-white bg-transparent hover:bg-transparent transition-all duration-300 ease-in-out'>
                <ChevronLeft className='w-4 h-4' />
                Go Back
            </Button>
            <div className='space-y-2'>
                <div className='text-muted-foreground text-sm font-semibold'>
                    Account Settings
                </div>
                <div className='space-y-3'>
                    <Link href={'/profile'} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-2 md:py-1 rounded-sm'>
                        <UserRound className='w-4 h-4' />
                        Profile
                    </Link>
                    <Link href={'/notifications'} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-2 md:py-1 rounded-sm'>
                        <Bell className='w-4 h-4' />
                        Notifications
                    </Link>
                    <Link href={'/password'} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-2 md:py-1 rounded-sm'>
                        <KeyRound className='w-4 h-4' />
                        Password
                    </Link>
                </div>
                <Separator />
                <div className='text-muted-foreground text-sm font-semibold'>
                    Administrator Settings
                </div>
                <div className='space-y-3'>
                    <Link href={'/company'} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-2 md:py-1 rounded-sm'>
                        <Building className='w-4 h-4' />
                        Company
                    </Link>
                    <Link href={'/publication'} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-2 md:py-1 rounded-sm'>
                        <Newspaper className='w-4 h-4' />
                        Publication
                    </Link>
                    <Link href={'/designStudio'} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-2 md:py-1 rounded-sm'>
                        <PencilRuler className='w-4 h-4' />
                        Design Studio
                    </Link>
                    <Link href={'/website'} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-2 md:py-1 rounded-sm'>
                        <PanelsTopLeft className='w-4 h-4' />
                        Website
                    </Link>
                    <Link href={'/paymentAccounts'} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-2 md:py-1 rounded-sm'>
                        <Landmark className='w-4 h-4' />
                        Payment Accounts
                    </Link>
                    <Link href={'/integrations'} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-2 md:py-1 rounded-sm'>
                        <GitMerge className='w-4 h-4' />
                        Integrations
                    </Link>
                    <Link href={'/billing'} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-2 md:py-1 rounded-sm'>
                        <ReceiptText className='w-4 h-4' />
                        Billing
                    </Link>
                </div>
            </div>
        </div>
    );
}


export default Navbar

// {session?.user?.email}