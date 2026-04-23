import React from 'react'
import bannerabout from '../assets/images/banner/aboutimg.png';
import diamond from '../assets/images/aboutimg/Selection.png';
import star from '../assets/images/aboutimg/Selection (1).png';
import leaf from '../assets/images/aboutimg/Selection (2).png';
import man from '../assets/images/aboutimg/Selection (3).png';
import badge from '../assets/images/aboutimg/Selection (4).png';
import bulb from '../assets/images/aboutimg/Selection (5).png';



export default function AboutUs(){
    return(
        <div>
            <div className="m-5 d-flex " style={{backgroundColor: '#a68a64'}}>
                <div className='container m-5 p-3'>
                    <div className='fs-2 fst-italic p-2'><b>Our Story: A Legacy Forged in Brilliance</b></div>
                    <div className='lh-base p-3'>LuxeJewels was born from a passion for exquisite craftsmanship and a desire to create jewelry that tells a story. From humble beginnings, our commitment to timeless elegance and ethical beauty has shaped every facet of our journey.</div>
                    <button className='fs-4 m-3'>Explore Our Legacy</button>
                </div>
                <div>
                    <div className='container pe-5 me-5 my-5' >
                        <img src={bannerabout} className='img-fluid rounded'  alt="jewellery-making"></img></div>
                </div>
            </div>
            <div>
                <div className='m-5 p-5'>
                    <div className='d-flex justify-content-center fs-2'>Our Vision & Values</div>
                    <div className='container p-2' style={{width:'50%'}}><div className=' text-center fst-italic fs-5'>"To craft timeless jewels that capture the essence of luxury and emotion, inspiring confidence and celebrating life's enduring beauty through unparalleled artistry and ethical integrity."</div></div>
                </div>
                <div className='m-5 p-5 '>
                    <div className=' mx-5 px-5' style={{}}>
                    <div className='row d-flex flex-row mb-3  justify-content-center align-middle'>
                        <div className='col text-center fst-italic mx-3 py-4 border '>
                            <div><img src={diamond} alt=""></img></div>
                            <div>Unrivaled Craftsmanship</div>
                            <div>Every piece is a testament to the skill and dedication of our master artisans, handcrafted with meticulous attention to detail.</div>
                        </div>
                        <div className='col text-center fst-italic mx-3 py-4 border'>
                            <div><img src={star} alt=""></img></div>
                            <div>Exceptional Quality</div>
                            <div>We source only the finest, ethically-mined gemstones and precious metals, ensuring each jewel radiates enduring beauty.</div>
                        </div>
                        <div className='col text-center fst-italic mx-3 py-4 border'>
                            <div><img src={leaf} alt=""></img></div>
                            <div>Sustainable Practice</div>
                            <div>Our commitment extends beyond beauty to include responsible sourcing and eco-friendly processes for a brighter future.</div>
                        </div>
                    </div>
                    <div className='row d-flex flex-row mb-3 justify-content-center'>
                        <div className='col text-center fst-italic m-3 py-4 border'>
                            <div><img src={man} alt=""></img></div>
                            <div>Client Centricity</div>
                            <div>our satisfaction is paramount. We strive to provide a personalized and memorable experience, from selection to ownership.</div>
                        </div>
                        <div className='col text-center fst-italic m-3 py-4 border'>
                            <div><img src={badge} alt=""></img></div>
                            <div>Timeless Elegance</div>
                            <div>Our designs transcend fleeting trends, offering classic sophistication that remains cherished for generations</div>
                        </div>
                        <div className='col text-center fst-italic m-3 py-4 border'>
                            <div><img src={bulb} alt=""></img></div>
                            <div>Innovation & Vision</div>
                            <div>We constantly evolve, blending traditional techniques with contemporary innovation to create truly unique and captivating designs.</div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    );
}