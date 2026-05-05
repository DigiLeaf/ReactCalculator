import {useState} from "react";

import Wapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';
import Wrapper from './components/Wrapper';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="]
];



function App() {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) =>{
    e.preventDefault();
    const value = e.target.innerHTML;

    //number can be at most 16 integers long
    if (calc.num.length < 16){
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            //check if whole num

            : calc.num % 1 === 0
            //add new digit and convert back to a num
            //removes leading zeroes 
            ? Number(calc.num + value)

            //if num is already a decimal,
            //keep it as a string so decimald format is preserved
            : calc.num + value,

        // if no operator been selected reset result to 0.    
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  //uses . for comma because ensure worldwide applicability
  const commaClickHandler= (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;


    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };


  //get the operation needing to be performed.
  const signClickHandler = (e) =>{
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  //calcualate results of requested math operation
  //cannot divide with zero is the only restriction.
  const equalsClickHandler = (e) => {
    if (calc.sign && calc.num){
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;
      
      setCalc({
        ...calc,
        res: 
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
      });
    }
  }

   const invertClickHandler= ()=>{
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
    })
   }

   const percentClickHandler = () => {
    let num = calc.num ? parse.Float(calc.num) : 0;
    let res = calc.res ? parse.Float(calc.res) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100,1)),
      res: (res /= Math.pow(100,1)),
      sign: "",
    });
   };

   const resetClickHandler = () =>{
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
   };


  return(
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn,i)=>{
            return (
              <Button
                key = {i}
                className={btn === "=" ? "equals" : ""}
                value ={btn}
                onClick={
                  btn === "C"
                    ? resetClickHandler
                    : btn === "+-"
                    ? invertClickHandler
                    : btn === "%"
                    ? percentClickHandler
                    : btn === "="
                    ? equalsClickHandler
                    : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                    ? signClickHandler
                    : btn === "."
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            )
          })
        }
        
      </ButtonBox>

    </Wrapper>
  );
};

export default App;
