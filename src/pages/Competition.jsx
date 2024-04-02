import React from 'react'
import CompCard from '../components/common/CompCard'

const comp1={
 
    title:"Hackthon | CTF",
    startregistrationDate:"12",
    endregistrationDate:"5",
    competitionDate:"",
    prize:"",
    description:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ducimus expedita saepe odio veniam laborum vel perferendis consectetur fugit recusandae nemo, alias unde sit quam aut voluptatum! Asperiores, recusandae voluptas?",
    postedby:"collegename",
    collegeId:"",
    rules:["rule1","rule2"],
    contact:"",
    eligblity:"",
    competitionId:"",



}

function Competition() {
  return (
    <div className='flex-1'>
    

          <div className=' grid gap-5 sm:grid-cols-2 lg:grid-cols-3  flex-wrap w-full sm:p-5'>
        
            <CompCard competition={comp1}/>
            <CompCard competition={comp1}/>
            <CompCard competition={comp1}/>
            <CompCard competition={comp1}/>
        </div>

  
    </div>
      
    
  
  )
}

export default Competition