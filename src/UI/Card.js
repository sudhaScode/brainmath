import styles from './Card.module.css'; 
import React from 'react';

function Card (props){
    const childrenContent = isNaN(props.children) ? 'Not a Number' : props.children;
    return (
        <div className = {`${styles.card} ${props.className}`}>
           {props.children}
        </div>
    );

}

export default Card;