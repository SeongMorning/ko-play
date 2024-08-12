"use client";

export default function Garo() {
    window.addEventListener('resize', function(){
        console.log(window.matchMedia('(orientation : landscape)').matches)
        if(window.matchMedia('(orientation : landscape)').matches){
            console.log(1);
        }else{  
            console.log(2);
        }
    })
  return <></>;
}
