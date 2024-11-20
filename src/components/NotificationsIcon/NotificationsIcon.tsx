import React, { Component } from 'react'

interface notificationState {
    showMessage: boolean
}

export default class NotificationsIcon extends Component<{}, notificationState> {
    state: notificationState = {
        showMessage: false
    }

    toggleMessage = () => {
        this.setState(prevState => ({
            showMessage: !prevState.showMessage
        }))
    }

    render() {
        const { showMessage } = this.state
        return(
            <div className={`w-[4rem] h-[4rem] p-2 flex justify-center items-center rounded-2xl neumorphic-look relative`} onClick={this.toggleMessage}>
                <i className="fa-regular fa-bell fa-shake text-2xl" style={{ animationDuration: '3s' }} ></i>
                <div className='bg-red-400 w-[14px] h-[14px] absolute top-[-4px] right-[-4px] p-2 rounded-full flex justify-center items-center'>
                    <p className='text-sm text-white'>1</p>
                </div>

                {showMessage && (
                    <div className="absolute top-[4rem] right-0 p-4 bg-white rounded-lg shadow-lg w-[200px]">
                        <p>Visit my <a href="https://portfolio-digital-suzuki-s-projects.vercel.app/" target='_blank' rel="noreferrer" className='text-blue-500'>portfolio</a></p>
                    </div>
                )}
            </div>
        )
    }
}