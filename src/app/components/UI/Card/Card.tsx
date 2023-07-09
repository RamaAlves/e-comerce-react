import React from 'react'
import style from './Card.module.scss'

interface ChildrenType {
    children: React.ReactNode
}

export function Card({ children}: ChildrenType) {
    return (
        <div className={style.card}>
            {children}
        </div>)
}