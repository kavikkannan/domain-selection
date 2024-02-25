'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export const MaskContainer = ({
    children,
    revealText,
    size = 10,
    revealSize = 600,
    className,
}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: null, y: null })
    const containerRef = useRef(null)
    const updateMousePosition = (e) => {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    useEffect(() => {
        containerRef.current.addEventListener('mousemove', updateMousePosition)
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener(
                    'mousemove',
                    updateMousePosition,
                )
            }
        }
    }, [])
    let maskSize = isHovered ? revealSize : size

    return React.createElement(
        motion.div,
        {
            ref: containerRef,
            className: cn('h-screen relative', className),
            animate: {
                backgroundColor: isHovered
                    ? 'var(--slate-900)'
                    : 'var(--white)',
            },
        },
        React.createElement(
            motion.div,
            {
                className:
                    'w-full h-full flex items-center justify-center text-6xl absolute bg-black bg-grid-white/[0.2] text-white [mask-image:url(/mask.svg)] [mask-size:40px] [mask-repeat:no-repeat]',
                animate: {
                    WebkitMaskPosition: `${mousePosition.x - maskSize / 2}px ${
                        mousePosition.y - maskSize / 2
                    }px`,
                    WebkitMaskSize: `${maskSize}px`,
                },
                transition: { type: 'tween', ease: 'backOut', duration: 0.1 },
            },
            React.createElement('div', {
                className:
                    'absolute inset-0 bg-black h-full w-full z-0 opacity-50',
            }),
            React.createElement(
                'div',
                {
                    onMouseEnter: () => {
                        setIsHovered(true)
                    },
                    onMouseLeave: () => {
                        setIsHovered(false)
                    },
                    className:
                        'max-w-4xl mx-auto text-center text-white  text-4xl font-bold relative z-20',
                },
                children,
            ),
        ),
        React.createElement(
            'div',
            {
                className:
                    'w-full h-full flex items-center justify-center  text-white',
            },
            revealText,
        ),
    )
}
