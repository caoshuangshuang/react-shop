import React,{useState} from 'react'
import Css from './index.module.scss'

export default function AmountInput (props){

  const [amount,setAmount] =useState(0)
  // 输入改变
 function handleAmountChange(val){
    setAmount(val)
  }
    // 增加数量
   function incAmount(){
      setAmount(amount+1)
    }
  
    // 减少数量
   function decAmount(){
      if(amount>=1){
       setAmount(amount-1)
      }
    }
  return(
    <div className={Css["amount-input-wrap"]}>
    <div
      className={
        amount <= 0
          ? Css["dec"] + " " + Css["disable"]
          : Css["dec"]
      }
      onClick={()=>{decAmount()}}
    >
      -
    </div>
    <div className={Css["amount-input"]}>
      <input type="tel" name="" id="" value={amount}  onChange={e=>{handleAmountChange(e.target.value)}} />
    </div>
    <div className={Css["inc"]} onClick={()=>{incAmount()}}>+</div>
  </div>
  )
}