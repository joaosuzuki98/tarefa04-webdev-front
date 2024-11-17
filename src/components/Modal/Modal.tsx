import React, { Component } from 'react'

type modalProps = {
    onClose: () => void
    onSubmit: () => void
    children: React.ReactNode
}

export default class Modal extends Component<modalProps, {}> {
    constructor(props: modalProps) {
        super(props)
    }
    render() {
        const {children, onClose, onSubmit} = this.props
        return (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="absolute w-full h-full backdrop-blur-md" onClick={onClose}></div>
                <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 w-[90%]">
                    {children}
                    <div className='mt-4 w-full justify-evenly flex'>
                        <button
                            className="px-4 py-2 neumorphic-look rounded"
                            onClick={onClose}
                        >
                            Close
                        </button>                    
                        <button
                            className="px-4 py-2 neumorphic-look rounded"
                            onClick={onSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
