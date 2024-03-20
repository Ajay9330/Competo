import React from 'react';
import centralize from "../assets/illustrators/centralize.jpg";
import fiter from "../assets/illustrators/filter.svg";
import compete from "../assets/illustrators/compete.jpg";
import shocase from "../assets/illustrators/showcase.svg";
import designer from "../assets/illustrators/designer-girl.avif"
export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <header className="text-center mt-8 mb-12 flex flex-col sm:flex-row items-center">
        <div>
        <h1 className="text-6xl font-bold mb-4 text-blue-700">Welcome to Competo</h1>
        <p className="text-lg text-gray-800">Explore, Learn, Share, Grow...</p>
        </div>
          <div>
          <img src={designer} alt="" />
            </div>
      </header>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Why Competo?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="feature-card  p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:bg-opacity-85">
            <img src={compete} alt="Feature 1" className="h-32 w-32 mb-4 object-cover rounded-full" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Explore Competitions</h3>
            <p className="text-base text-gray-800">Discover various competitions from different fields such as coding, art, sports, and more. Showcase your talent and learn new skills.</p>
          </div>
          <div className="feature-card  p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:bg-opacity-85">
            <img src={fiter} alt="Feature 2" className="h-32 w-32 mb-4 object-cover rounded-full" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Filter and Customize</h3>
            <p className="text-base text-gray-800">Easily filter competitions based on your interests, location, prize, and whether they are remote or in-person. Customize your competition search for the best fit.</p>
          </div>
          <div className="feature-card  p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:bg-opacity-85">
            <img src={centralize} alt="Feature 3" className="h-32 w-32 mb-4 object-cover rounded-full" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Centralized Platform</h3>
            <p className="text-base text-gray-800">Competo provides a centralized platform where you can find and join competitions from various sources. No need to search multiple websites anymore.</p>
          </div>
          <div className="feature-card  p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:bg-opacity-85">
            <img src={shocase} alt="Feature 4" className=" h-32 w-32 mb-4 object-cover rounded-full" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Showcase Your Talent</h3>
            <p className="text-base text-gray-800">Competo allows you to showcase your talent and skills to a wider audience. Participate in competitions, win prizes, and gain recognition.</p>
          </div>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Get Started Today</h2>
        <p className="text-lg text-gray-800 mb-4">Ready to explore all that Competo has to offer? Sign up now to get started!</p>
        <div className="flex justify-center">
          <button className="btn-signup bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:bg-opacity-85">Sign Up</button>
        </div>
      </section>
      <footer className="text-center pb-8">
        <p className="text-lg text-gray-800">&copy; 2024 Competo. All rights reserved.</p>
      </footer>
    </div>
  );
}
