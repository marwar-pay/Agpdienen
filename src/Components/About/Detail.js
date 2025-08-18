// components/Parallax.js
import React from 'react';

const Detail = () => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundImage: 'url(https://assets.vogue.com/photos/65f8604e619fe40d5e1b0301/master/pass/western_Trends_001.jpg)', // Add your image path here
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundWidth:'100%',
          zIndex: '-1',
        //   height: '100vh',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: '1',
          color: '#000',
          textAlign: 'center',
          padding: '50px 20px',
        }}
      >
        {/* <h1>Welcome to the Parallax Effect</h1> */}
        {/* <p>This is an example of a parallax effect in Next.js!</p>     */}
          <div className="detail">
         {/* <div id="title" className="slide header" ><h1>Agpdienen</h1></div> */}
         <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-6 col-xsm-12'>
                 <div id="slide1" className="slide">
                              <div className="title">
                              <h1>New Fashion Trends</h1>
                               <p>
               Explore the latest fashion trends with our exclusive collection of  stylish outfits. From casual wear to elegant evening dresses, find
               everything you need to upgrade your wardrobe.
             </p>
           </div>
         </div></div>
         <div className='col-lg-6 col-md-6 col-sm-6 col-xsm-1'>
         <div id="slide2" className="slide">
           <div className="title">
             <h1 class>Premium Quality Fabrics</h1>
             <p>
               Our clothing is made from high-quality materials that offer comfort
               and durability. Whether it's cotton, silk, or denim, our fabrics
               are carefully selected to ensure the best experience.
             </p>
           </div>
           </div>
        
         </div>
         </div>
      </div>
    </div>
    
    </div>
  );
};

export default Detail;
