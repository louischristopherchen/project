import React, {Component} from 'react';
import { Carousel } from 'react-responsive-carousel';
import '../../support/css/component/Slide.css';
import image1 from '../../support/img/1.jpg';
import image2 from '../../support/img/2.jpg';
import image3 from '../../support/img/3.jpg';
// import image berhubungan dengan src di img
class Slide extends Component{
    render(){
        return(
            <div className="col-xs-12 col-md-12">

            <Carousel autoPlay={true} showThumbs={true} showIndicators={false} >
            
            <div className="pd0">
                <img src={image1} alt={image1}/>
                <p className="legend">Legend 1</p>
            </div >
            <div className="pd0" >
                <img src={image2} alt={image2}/>
                <p className="legend">Legend 2</p>
            </div>
            <div className="pd0">
                <img src={image3} alt={image3}/>
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
            </div>
     
        )
    }
}

export default Slide;