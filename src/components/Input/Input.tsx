import React, { Component } from 'react'
import styles from './Input.module.css'

export default class Input extends Component {
    render() {
        return(
            <div>
                <input type="text" className={`${styles.input} p-2 rounded-2xl w-full`} />
            </div>
        )
    }
}