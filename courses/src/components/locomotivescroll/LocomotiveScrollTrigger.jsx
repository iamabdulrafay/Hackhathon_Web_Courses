import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'locomotive-scroll/dist/locomotive-scroll.css'; // Import Locomotive Scroll CSS
import './LocomotiveScrollTrigger.css'; // Import your custom CSS

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const LocomotiveScrollTrigger = () => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: scrollContainerRef.current,
      smooth: true,
    });

    // Initialize ScrollTrigger with Locomotive Scroll
    ScrollTrigger.scrollerProxy(scrollContainerRef.current, {
      scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
      },
      getScrollPos() {
        return scroll.instance.scroll.y;
      },
      pinType: scrollContainerRef.current.style.transform ? 'transform' : 'fixed',
    });

    ScrollTrigger.addEventListener('refresh', scroll.update);
    ScrollTrigger.refresh();

    // Cleanup on component unmount
    return () => {
      if (scroll) {
        scroll.destroy();
        ScrollTrigger.removeEventListener('refresh', scroll.update);
      }
    };
  }, []);

  return (
    <div data-scroll-container ref={scrollContainerRef}>
      <section data-scroll-section>
        <h1 data-scroll data-scroll-speed="2">Smooth Scroll with Locomotive</h1>
        <p data-scroll data-scroll-class="fade-in" data-scroll-repeat>
          Scroll-triggered content
        </p>
      </section>
      {/* Add more sections or content here */}
    </div>
  );
};

export default LocomotiveScrollTrigger;
