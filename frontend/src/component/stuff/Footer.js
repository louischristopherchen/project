import React,{Component} from 'react';
import '../../support/css/component/Footer.css';
class Footer extends Component
{
    render(){
        return (
        <div className="container-fluid foot">
        <div className="container">
            <div className="col-xs-12 col-md-4 footcontent">
                FOOT CONTENT
                <div className="line"></div>
                <p/>CONtent1
                <p/>content2
                <p/>content3
                <p/>content4
            </div>
            
            <div className="col-xs-12 col-md-2 footcontent">
                FOOT CONTENT
                <div className="line"></div>
                <p/>CONtent1
                <p/>content2
                <p/>content3
                <p/>content4
            </div>

            <div className="col-xs-12 col-md-2 footcontent">
                FOOT CONTENT
                <div className="line"></div>
                <p/>CONtent1
                <p/>content2
                <p/>content3
                <p/>content4
            </div>

            <div className="col-xs-12 col-md-4 footcontent">
                FOOT CONTENT
                <div className="line"></div>
                <p/>CONtent1
                <p/>content2
                <p/>content3
                <p/>content4
            </div>
            
        </div>
        <div className="col-lg-12 copyright">
                copyright@Louis
            </div>
        </div>
        );
    }
}
export default Footer;