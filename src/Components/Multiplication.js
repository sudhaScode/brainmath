
import classes from './Addition.module.css'
import Card from '../UI/Card';
import { useEffect, useState, useRef } from 'react';
import React from 'react';


function randomNumGenerator(range1, range2) {
    return Math.floor(Math.random() * (range2 - range1 + 1)) + range1;
}

function Multiplication() {
    let intervalId;
    const [level, setLevel] = useState("easy");
    const rangeRef = useRef([10, 20]);
    const inputRef = useRef(null);

    const [numberOne, setNumberOne] = useState(randomNumGenerator(rangeRef[0], rangeRef[1]));
    const [numberTwo, setNumberTwo] = useState(randomNumGenerator(rangeRef[0], rangeRef[1]));

    const [result, setResult] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isEqual, setIsEqual] = useState(false);
    const [timer, setTimer] = useState(0);

    
    const continueHandler = () => {
        setIsEqual(false);
        setNumberOne(randomNumGenerator(rangeRef.current[0], rangeRef.current[1]));
        setNumberTwo(randomNumGenerator(rangeRef.current[0], rangeRef.current[1]));
        setResult('');
        setTimer(30)
        inputRef.current.value='';
    }
    // when easy level clicked it must hightlight
    const levelHandler = (lev) => {
        //levelRef.current = lev;
        if (lev === "difficult") {  
            rangeRef.current = [50, 100];
        } else if (lev === "medium") {
            rangeRef.current = [20, 50];
        } else {
            rangeRef.current = [10, 20];
        }
        setLevel(lev);
    };
    
    //get input when keydown  update the result
    
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setResult(event.target.value)
        }
    }
    function comparator(value, val1, val2) {

        if (value == (val1 * val2)) {
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
        let delay =1000;
        const timerFun = ()=>{
            if(timer >0 ){
                setTimer(timer-1)
            }
            else{
                clearInterval(intervalId);
                console.log("clearing time:::")
            }
        };
        if (lvl === "difficult") {  
          delay=3000;
        } else if (lvl === "medium") {
           delay = 4000;
        }
        //console.log(isEqual); 
        intervalId= setInterval(timerFun, delay);
          if(isEqual){
               // console.log("results got::verfying stop timer")
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
        //console.log(timer)
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
         {timer<=0? <div className={classes["timer-container"]}>Time Up!</div>:<div className={classes["timer-container"]}>Timer: {timer}</div> }
       
        <Card className={classes.part}>
            <div className={classes.container}>
                <ul className={classes.level}>
                    <li><button className={level === "easy" ? classes.clicked : classes.click} onClick={() => levelHandler("easy")}>Easy</button></li>
                    <li><button className={level === "medium" ? classes.clicked : classes.click} onClick={() => levelHandler("medium")}>Medium</button></li>
                    <li><button className={level === "difficult" ? classes.clicked : classes.click} onClick={() => levelHandler("difficult")}>Hard</button></li>
                </ul>
                <div className={classes.divider}></div>
                <ul className={classes.numberlist}>
                    <li className={classes.number}>
                        <label className={classes.input}>{numberOne.toString()}</label>
                    </li>
                    <li className={classes.number}>
                        <label className={classes.operator}> {"*"}</label>
                    </li>
                    <li className={classes.number}>
                        <label className={classes.input}>{numberTwo.toString()}</label>
                    </li>
                </ul>

                <input placeholder={'Enter answer'} className={classes.enter} ref={inputRef} type="number"/>
                {isEqual && isValid && <h2 className={classes.result}>{`Cheers ${result} is currect`} </h2>}
                {!isEqual && result && <h2 className={classes.wrong}>{`Ohh! ${result} is not currect`}</h2>}

                {isEqual &&
                    <div className={classes.submit}>
                        <button onClick={continueHandler} className={classes.continue}>Continue</button>
                    </div>}
            </div>

        </Card>
        </div>

    );
}

export default Multiplication;