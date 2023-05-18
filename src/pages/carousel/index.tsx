
import React, { useState } from 'react';
import { Carousel } from 'antd';
import './index.less'

const contentStyle: React.CSSProperties = {
    margin: 0,
    lineHeight: '160px',
    minHeight: '100vh'
};

const carousel: React.FC = () => {

    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };
    return (
        <div style={{ minHeight: '100vh' }}>
            <Carousel afterChange={onChange}>
                <div>
                    <h3 style={contentStyle}>
                    <div className="huacont">
                    <span className="hb1"></span>
                    <span className="hb2"></span>
                    <span className="hb3"></span>
                    <span className="hb4"></span>
                    <span className="hb5"></span>
                </div>
                <div className="huacontA">
                    <span className="hb1"></span>
                    <span className="hb2"></span>
                    <span className="hb3"></span>
                    <span className="hb4"></span>
                    <span className="hb5"></span>
                </div>
                <div className="huacontB">
                    <span className="hb1"></span>
                    <span className="hb2"></span>
                    <span className="hb3"></span>
                    <span className="hb4"></span>
                    <span className="hb5"></span>
                </div>
                <div className="huacontC">
                    <span className="hb1"></span>
                    <span className="hb2"></span>
                    <span className="hb3"></span>
                    <span className="hb4"></span>
                    <span className="hb5"></span>
                </div>
                <div className="huacontD">
                    <span className="hb1"></span>
                    <span className="hb2"></span>
                    <span className="hb3"></span>
                    <span className="hb4"></span>
                    <span className="hb5"></span>
                </div>
                    </h3>
                </div> </Carousel>
        </div>
    );

}; export default carousel;