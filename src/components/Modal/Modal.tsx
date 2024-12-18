import React, { Component } from 'react'

type modalProps = {
    onClose: () => void
    onSubmit: any
    title: string
    children: React.ReactNode
}

export default class Modal extends Component<modalProps, {}> {
    constructor(props: modalProps) {
        super(props)
    }
    render() {
        const {children, onClose, onSubmit, title} = this.props
        return (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="absolute w-full h-full backdrop-blur-md" onClick={onClose}></div>
                <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 w-[90%] modal-container">
                    <h2 className='font-bold text-xl'>{title}</h2>
                    <form onSubmit={onSubmit}>
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
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
