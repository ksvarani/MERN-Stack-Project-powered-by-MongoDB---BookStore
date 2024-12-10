import React from "react";
import "./AboutUs.css"; // External CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>About Us</h1>
        <p>Your Gateway to a World of Knowledge and Innovation...</p>
        <p>Welcome to Atlas Bookstore, your one-stop destination for books that inspire, educate, and entertain! At Atlas, we believe that every book holds the power to transform lives and expand horizons. Our mission is to provide a seamless online platform where readers of all ages and interests can explore a curated collection of books spanning diverse genres, from fiction and non-fiction to academic and self-help. We are committed to delivering a user-friendly shopping experience, secure purchases, and timely deliveries, ensuring every reader finds their perfect read. Join us on this literary journey and discover the stories that will stay with you forever.</p>
        <p>At Atlas Bookstore, we are passionate about connecting readers with stories, knowledge, and ideas that ignite imagination and spark growth. Founded with a vision to create a haven for book lovers, we offer a wide array of titles across genres to cater to every reader’s taste. Whether you're searching for the latest bestsellers, timeless classics, or niche topics, our platform ensures a hassle-free experience, secure transactions, and prompt delivery. We strive to make reading accessible and enjoyable, empowering you to embark on countless adventures—one book at a time.</p>
      </div>

      <div className="about-us-content">
        <div className="about-us-card">
          <h2>Our Mission</h2>
          <p>
            At Atlas Bookstore, we aim to make knowledge accessible to everyone. 
            We provide a diverse range of books and resources to ignite your curiosity 
            and support your growth.
          </p>
        </div>
        <div className="about-us-card">
          <h2>Our Vision</h2>
          <p>
            To be a one-stop destination for book enthusiasts and knowledge seekers, 
            inspiring minds and fostering creativity across the globe.
          </p>
        </div>
        <div className="about-us-card">
          <h2>Our Values</h2>
          <ul>
            <li>Integrity and transparency</li>
            <li>Commitment to excellence</li>
            <li>Fostering a love for learning</li>
            <li>Empowering the community</li>
          </ul>
        </div>
      </div>

      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-card">
            <img src="/62.jpeg" alt="Team Member 1" className="team-image" />
            <h3>V. Krishna Sai</h3>
            <p>Team Leader</p>
            <p>Leading the vision and mission of Atlas Bookstore with passion and dedication.</p>
          </div>
          <div className="team-card">
            <img src="/63.jpg" alt="Team Member 2" className="team-image" />
            <h3>R. Vasanth</h3>
            <p>Team Member</p>
            <p>Architect of our digital platforms, ensuring a seamless user experience.</p>
          </div>
          <div className="team-card">
            <img src="/58.jpg" alt="Team Member 3" className="team-image" />
            <h3>J. Tamilselvan</h3>
            <p>Team Member</p>
            <p>Spreading the word about Atlas Bookstore and connecting with our readers.</p>
          </div>
          <div className="team-card">
            <img src="/59.jpg" alt="Team Member 4" className="team-image" />
            <h3>R. Thamizharasan</h3>
            <p>Team Member</p>
            <p>Ensuring smooth day-to-day operations and excellent customer service.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
