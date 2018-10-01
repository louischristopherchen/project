import React, {Component} from 'react';
import Slide from './stuff/Slide';
import RestolistD from './stuff/Restolist';
class Home extends Component{
    
    render(){

        return(
            <div>
                <div className="container-fluid bgBlackGold">
                <h1 >HOW TO USE/FITUR</h1>
                <Slide></Slide>
                <Slide></Slide>
                </div>
                
                <RestolistD></RestolistD>
                
             
            </div>
         

                 );
    }
}

export default Home;