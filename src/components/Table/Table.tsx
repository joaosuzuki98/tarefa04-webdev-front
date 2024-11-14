import React, { Component } from 'react'
import styles from './Table.module.css'

export default class Table extends Component {
    render() {
        return(
            <div>
                <table className={`${styles.table} h-[2rem] w-full p-4`}>
                    <thead>
                        <tr>
                            <th>testes 1</th>
                            <th>testes 2</th>
                            <th>testes 3</th>
                            <th>testes 4</th>
                            <th>testes 5</th>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}