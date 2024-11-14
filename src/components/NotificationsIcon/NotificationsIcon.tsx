import React, { Component } from 'react'
import styles from './NotificationsIcon.module.css'

export default class Input extends Component {
    render() {
        return(
            <div className={`w-[4rem] h-[4rem] p-2 flex justify-center items-center rounded-2xl ${styles.notIcon}`}>
                <p>teste</p>
            </div>
        )
    }
}