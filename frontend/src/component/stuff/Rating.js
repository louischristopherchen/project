import React from 'react';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
export function renderBintang(y){
    
    if(y>=0)
    {
        
    var z=[]
    for(var x=0;x<Math.floor(y);x++)
    {
        z.push(<span className="fa fa-star" style={{color:"orange"}}> </span>)
    }
    
    if((y-Math.floor(y))>=0.5)
    {
        z.push(<span className="fa fa-star-half-full" style={{color:"orange"}}> </span>)
    }
    if(y<4)
    {
        for(var w=4-Math.ceil(y);w>=0;w--)
        {
            z.push(<span className="fa fa-star-o" style={{color:"orange"}}> </span>)
        }
        
    }
    return z;
    }
    else{
        return y;
    }
    
}