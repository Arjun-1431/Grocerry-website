import React from "react";

const About = () => {
  return (
    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="md:pt-8 lg:flex lg:flex-col lg:justify-center">
              <p className="text-center font-bold text-green-500 md:text-left">
                About Our Restaurant
              </p>

              <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6 md:text-left">
                Serving Delightful Experiences Since 1990
              </h1>

              <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
                Nestled in the heart of the city, our restaurant has been a haven
                for food lovers for over three decades. We believe that great
                food brings people together, creating memories that last a
                lifetime. Our passion is to serve dishes crafted with love,
                using the freshest ingredients and authentic recipes.
              </p>
            </div>
            <div>
              <div className="h-64 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  loading="lazy"
                  alt="Restaurant ambiance"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4 md:text-left">
                Our Story
              </h2>

              <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
                From our humble beginnings as a small family-run eatery, we have
                grown into a beloved destination for culinary enthusiasts. Our
                chefs bring their expertise to the table, combining tradition
                with innovation to create a menu that caters to all tastes. Be
                it a casual lunch, a romantic dinner, or a special celebration,
                we ensure every visit feels extraordinary.
              </p>

              <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4 md:text-left">
                Our Values
              </h2>

              <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
                We are committed to sustainability, sourcing ingredients
                responsibly, and supporting local farmers. Our staff strives to
                provide a warm and welcoming atmosphere where every guest feels
                at home. At the heart of everything we do is the belief that
                good food has the power to connect people and create joy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
