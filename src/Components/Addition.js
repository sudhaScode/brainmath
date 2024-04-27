import styles from './Addition.module.css'
import Card from '../UI/Card';
import { useEffect, useState, useRef } from 'react';
import React from 'react';


function randomNumGenerator(range1, range2) {
    return Math.floor(Math.random() * (range2 - range1 + 1)) + range1;
}

function Addition() {
    let intervalId;
    const [level, setLevel] = useState("easy");
    const rangeRef = useRef([20, 100]);
    const inputRef = useRef(null);

    const [numberOne, setNumberOne] = useState(randomNumGenerator(rangeRef[0], rangeRef[1]));
    const [numberTwo, setNumberTwo] = useState(randomNumGenerator(rangeRef[0], rangeRef[1]));

    const [result, setResult] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isEqual, setIsEqual] = useState(false);
    const [timer, setTimer] = useState(0);
    const [timerStatus,  setTimerStatus] = useState(false);

    
    const continueHandler = () => {
        setIsEqual(false);
        setNumberOne(randomNumGenerator(rangeRef.current[0], rangeRef.current[1]));
        setNumberTwo(randomNumGenerator(rangeRef.current[0], rangeRef.current[1]));
        setResult('');
        setTimer(30);
        //console.log("Updating timer:: ", timer)
        inputRef.current.value='';
    }
    // when easy level clicked it must hightlight
    const levelHandler = (lev) => {
        //levelRef.current = lev;
        if (lev === "difficult") {  
            rangeRef.current = [250, 500];
        } else if (lev === "medium") {
            rangeRef.current = [100, 250];
        } else {
            rangeRef.current = [20, 100];
        }
        setLevel(lev);
    };
    
    //get input when keydown  update the result
    
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setResult(event.target.value);
            setTimerStatus(true);
           // console.log("Entered results")
            
        }
    }
    function comparator(value, val1, val2) {

        if (value == (val1 + val2)) {
            //console.log(val1+" "+val2);
            setIsEqual(true);
        }
        else{
            setIsEqual(false);
        }
    }

    const validation = (num) => {
        if (num / 2 > 0 && num.length != null) {
            setIsValid(true);
            comparator(num, numberOne, numberTwo);
        }

    }

    const customTimer =(lvl)=>{
        let delay =500;
        const timerFun = ()=>{
            if(timer >0 ){
                setTimer(timer-1)

            }
            else{ 
                console.log("clearing time:::")
                clearInterval(intervalId)
            }
        };
        if (lvl === "difficult") {  
          delay=700;
        } else if (lvl === "medium") {
           delay = 900;
        }
        //console.log(isEqual); 
        intervalId= setInterval(timerFun, delay);
          if(isEqual){
                //console.log("results got::verfying stop timer")
                clearInterval(intervalId);
            }   

    }
    useEffect(()=>{
        window.addEventListener('keydown', handleKeyDown);
        setTimer(30);
        inputRef?.current?.focus();
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    },[])

    useEffect(()=>{
        customTimer(level);
        let timerID;// which helps the continuing after time ip
        if(timer<=0){
            timerID = setTimeout(()=>{
                continueHandler();
            }, 1000);
    
           // console.log(timerID)
        }
        
        return () => {
            clearInterval(intervalId)
            clearTimeout(timerID);
        };
    }, [level,timer])//when component gets mounts  and change in timer 
  
    useEffect(() => {
        //validate and comapre at set resutlt and isEqual
      validation(result);
    }, [result]); // componentDidMount and when state of result changes

    useEffect(() => {
        continueHandler();
    }, [level]); // componentDidMount and when state of result changes and when component will unmoount



    return (    
        <div>
            {timer<=0? <div className={styles["timer-container"]}>Time Up!</div>:<div className={styles["timer-container"]}>Timer: {timer}</div> }
            <Card className={styles.part}>
                <div className={styles.container}>
                    <ul className={styles.level}>
                        <li><button className={level === "easy" ? styles.clicked : styles.click} onClick={() => levelHandler("easy")}>Easy</button></li>
                        <li><button className={level === "medium" ? styles.clicked : styles.click} onClick={() => levelHandler("medium")}>Medium</button></li>
                        <li><button className={level === "difficult" ? styles.clicked : styles.click} onClick={() => levelHandler("difficult")}>Hard</button></li>
                    </ul>
                    <div className={styles.divider}></div>
                    <ul className={styles.numberlist}>
                        <li className={styles.number}>
                            <label className={styles.input}>{numberOne.toString()}</label>
                        </li>
                        <li className={styles.number}>
                            <label className={styles.operator}> {"+"}</label>
                        </li>
                        <li className={styles.number}>
                            <label className={styles.input}>{numberTwo.toString()}</label>
                        </li>
                    </ul>

                    <input placeholder={'Enter answer'} className={styles.enter} required id="result" ref={inputRef}/>
                    {isEqual && isValid && <h2 className={styles.result}>{`Cheers ${result.toString()} is correct`} </h2>}
                    {!isEqual && result && <h2 className={styles.wrong}>{`Ohh! ${result.toString()} is not correct`}</h2>}
                

                    {isEqual &&
                        <div className={styles.submit}>
                            <button onClick={continueHandler} className={styles.continue}>Continue</button>
                        </div>}
                </div>
            </Card>
            
        </div>  
    );
}
export default Addition;