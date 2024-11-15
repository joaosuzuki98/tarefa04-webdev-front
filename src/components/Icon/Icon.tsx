import React, { Component } from 'react'

export default class Icon extends Component {
    render() {
        return(
            <div>
                <figure className={`neumorphic-look rounded-full w-[3.6rem] h-[3.6rem] p-4 flex justify-center items-center`}>
                    <i className="fa-brands fa-github"></i>
                </figure>
            </div>
        )
    }
}