import React, { Component } from 'react'

export default class Input extends Component {
    render() {
        return(
            <div>
                <input type="text" className={`neumorphic-look p-2 rounded-2xl w-full`} />
            </div>
        )
    }
}