'use client'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/menu-dropdown'

const DropdownMenu = ({ title, icon, menuList }) => {
    return (
        <Accordion type="single" collapsible className=''>
            <AccordionItem value="item-1">
                <AccordionTrigger className='px-2 text-xs py-2 md:py-1 hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out rounded-sm'>
                    <div className='flex flex-row items-center gap-2'>
                        {icon}
                        {title}
                    </div>
                </AccordionTrigger>
                <AccordionContent className='ml-6 space-y-1'>
                    {menuList.map((menuItem, index) => (
                        <Link key={index} href={menuItem.path} className='text-xs gap-2 flex flex-row items-center hover:bg-muted hover:cursor-pointer transition-all duration-300 ease-in-out px-2 py-2 md:py-1 rounded-sm'>
                            {menuItem.title}
                        </Link>
                    ))}


                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default DropdownMenu