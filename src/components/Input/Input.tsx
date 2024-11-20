import React, { Component } from 'react'

type inputProps = {
    value: string
    onChange: any
    placeholder: string
    required: boolean
}

export default class Input extends Component<inputProps, {}> {
    constructor(props: inputProps) {
        super(props)
    }
    render() {
        const { value, onChange, placeholder, required } = this.props
        return (
            <div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`neumorphic-look p-2 rounded-2xl w-full outline-none border-none transition-all`}
                    placeholder={placeholder}
                    required={required}
                />
            </div>
        )
    }
}
