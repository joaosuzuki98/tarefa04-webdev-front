import React, { Component } from 'react'
import styles from './Button.module.css'

type buttonProps = {
    onClickHandle?: () => void
    children: React.ReactNode
    disabled?: boolean
}

export default class Button extends Component<buttonProps> {
    constructor(props: buttonProps) {
        super(props)
    }
    render() {
        const { children, onClickHandle, disabled } = this.props
        return(
            <div>
                <button className={`neumorphic-look rounded-full w-[3.6rem] h-[3.6rem] p-4 flex justify-center items-center`} onClick={onClickHandle} disabled={disabled}>
                    {children}
                </button>
            </div>
        )
    }
}