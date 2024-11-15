import React, { Component } from 'react'

export default class Input extends Component {
    render() {
        return(
            <div className={`w-[4rem] h-[4rem] p-2 flex justify-center items-center rounded-2xl neumorphic-look`}>
                <i className="fa-regular fa-bell text-2xl"></i>
            </div>
        )
    }
}