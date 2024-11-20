import React, { Component } from 'react'

export default class Icon extends Component {
    render() {
        return(
            <div>
                <a href="https://github.com/joaosuzuki98" target='_blank' rel="noreferrer">
                    <figure className={`neumorphic-look rounded-full w-[3.6rem] h-[3.6rem] p-4 flex justify-center items-center`}>
                        <i className="fa-brands fa-github text-4xl"></i>
                    </figure>
                </a>
            </div>
        )
    }
}