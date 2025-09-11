import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="w-screen -ml-27.5 bg-[#f76097] text-white">
            <div className='grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-10 sm:gap-14 my-10 mt-15 text-sm px-4 sm:px-10 -ml-2'>
                <div>
                    <img src={assets.logo} className='-mt-12 w-65 -ml-17' alt="logo" />
                    <p className='w-full -mt-22 -ml-2 md:w-3/3 text-sm sm:text-base md:text-lg text-white'>
                        Since 1950, our clothing shop has stood as a symbol of enduring quality and style. Founded by Rubaiya Khan, a passionate tailor with a vision for timeless fashion, our legacy is built on precision craftsmanship, premium fabrics, and generations of trust.
                    </p>
                </div>

                {/* Company Links */}
                <div className='mt-5 sm:mt-18 text-start sm:text-left'>
                    <p className='text-2xl font-bold mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-0 sm:gap-1 text-white text-xl'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/delivery">Delivery</Link></li>
                        <li><Link to="/privacy-policy">Privacy policy</Link></li>
                    </ul>
                </div>


                {/* Contact */}
                <div className='mt-5 sm:mt-18 text-start sm:text-left'>
                    <p className='text-2xl font-bold mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-white text-xl'>
                        <li><a href="tel:+8801618758">+880-1618-758-208</a></li>
                        <li><a href="mailto:jerinrubaiyakhan@gmail.com">jerinrubaiyakhan11@gmail.com</a></li>
                    </ul>
                </div>
            </div>

            {/* Zigzag Line (Full Width) */}
            <div className="w-full">
                {/* Desktop Zigzag */}
                <div className="hidden sm:block w-full">
                    <img
                        src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 6' preserveAspectRatio='none'><path d='M0 3 L10 0 L20 6 L30 0 L40 6 L50 0 L60 6 L70 0 L80 6 L90 0 L100 6 L110 0 L120 6 L130 0 L140 6 L150 0 L160 6 L170 0 L180 6 L190 0 L200 6 L210 0 L220 6 L230 0 L240 6 L250 0 L260 6 L270 0 L280 6 L290 0 L300 6 L310 0 L320 6 L330 0 L340 6 L350 0 L360 6 L370 0 L380 6 L390 0 L400 6 L410 0 L420 6 L430 0 L440 6 L450 0 L460 6 L470 0 L480 6 L490 0 L500 6 L510 0 L520 6 L530 0 L540 6 L550 0 L560 6 L570 0 L580 6 L590 0 L600 6 L610 0 L620 6 L630 0 L640 6 L650 0 L660 6 L670 0 L680 6 L690 0 L700 6 L710 0 L720 6 L730 0 L740 6 L750 0 L760 6 L770 0 L780 6 L790 0 L800 6 L810 0 L820 6 L830 0 L840 6 L850 0 L860 6 L870 0 L880 6 L890 0 L900 6 L910 0 L920 6 L930 0 L940 6 L950 0 L960 6 L970 0 L980 6 L990 0 L1000 6 L1010 0 L1020 6 L1030 0 L1040 6 L1050 0 L1060 6 L1070 0 L1080 6 L1090 0 L1100 6 L1110 0 L1120 6 L1130 0 L1140 6 L1150 0 L1160 6 L1170 0 L1180 6 L1190 0 L1200 6 L1210 0 L1220 6 L1230 0 L1240 6 L1250 0 L1260 6 L1270 0 L1280 6 L1290 0 L1300 6 L1310 0 L1320 6 L1330 0 L1340 6 L1350 0 L1360 6 L1370 0 L1380 6 L1390 0 L1400 6 L1410 0 L1420 6 L1430 0 L1440 6 L1450 0 L1460 6 L1470 0 L1480 6 L1490 0 L1500 6 L1510 0 L1520 6 L1530 0 L1540 6 L1550 0 L1560 6 L1570 0 L1580 6 L1590 0 L1600 6 L1610 0 L1620 6 L1630 0 L1640 6 L1650 0 L1660 6 L1670 0 L1680 6 L1690 0 L1700 6 L1710 0 L1720 6 L1730 0 L1740 6 L1750 0 L1760 6 L1770 0 L1780 6 L1790 0 L1800 6 L1810 0 L1820 6 L1830 0 L1840 6 L1850 0 L1860 6 L1870 0 L1880 6 L1890 0 L1900 6 L1910 0 L1920 6 L1930 0 L1940 6 L1950 0 L1960 6 L1970 0 L1980 6 L1990 0 L2000 3' stroke='%23f76097' fill='transparent' stroke-width='0.5'/></svg>"
                        alt="zigzag"
                        className="w-full h-[6px] object-cover"
                    />
                </div>

                {/* Mobile Zigzag */}
                <div className="block sm:hidden w-full">
                    <img
                        src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 6' preserveAspectRatio='none'><path d='M0 3 L10 0 L20 6 L30 0 L40 6 L50 0 L60 6 L70 0 L80 6 L90 0 L100 6 L110 0 L120 6 L130 0 L140 6 L150 0 L160 6 L170 0 L180 6 L190 0 L200 6 L210 0 L220 6 L230 0 L240 6 L250 0 L260 6 L270 0 L280 6 L290 0 L300 6 L310 0 L320 6 L330 0 L340 6 L350 0 L360 6 L370 0 L380 6 L390 0 L400 6 L410 0 L420 6 L430 0 L440 6 L450 0 L460 6 L470 0 L480 6 L490 0 L500 6 L510 0 L520 6 L530 0 L540 6 L550 0 L560 6 L570 0 L580 6 L590 0 L600 6 L610 0 L620 6 L630 0 L640 6 L650 0 L660 6 L670 0 L680 6 L690 0 L700 6 L710 0 L720 6 L730 0 L740 6 L750 0 L760 6 L770 0 L780 6 L790 0 L800 6 L810 0 L820 6 L830 0 L840 6 L850 0 L860 6 L870 0 L880 6 L890 0 L900 6 L910 0 L920 6 L930 0 L940 6 L950 0 L960 6 L970 0 L980 6 L990 0 L1000 3' stroke='%23f76097' fill='transparent' stroke-width='0.5'/></svg>"
                        alt="zigzag"
                        className="w-full h-[6px] object-cover"
                    />
                </div>
            </div>

            <p className="py-5 text-sm text-center">
                Copyright 2025 © Zephyra.com – All Rights Reserved.
            </p>
        </div>
    )
}

export default Footer
