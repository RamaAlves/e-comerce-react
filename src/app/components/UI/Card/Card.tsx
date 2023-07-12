import React, { useContext } from 'react'
import styles from './Card.module.scss'
import { ThemeContext } from '../../../context/ThemeContext'

interface ChildrenType {
    children: React.ReactNode
}

export function Card({ children }: ChildrenType) {
    const [darkMode]= useContext(ThemeContext)
    return (
        <div className={[styles.card, darkMode? styles.darkMode: styles.lightMode].join(' ')}>
            {children}
        </div>)
}