import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(""); // For success/error message

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(""); // Reset status message

    try {
      // Post request to backend API
      const response = await axios.post("http://localhost:8000/api/contact", formData);

      // Handle success
      setStatus("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Clear form

    } catch (error) {
      // Handle error
      setStatus(
        error.response?.data?.error || "Failed to send the message. Please try again later."
      );
    }
  };

  return (
    <div className="font-sans text-base text-gray-900 sm:px-10">
      <div className="text-base text-gray-900">
        <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="mx-2 pt-12 text-center md:mx-auto md:w-2/3 md:pb-12">
            <h1 className="mb-4 text-3xl font-black sm:text-5xl xl:text-6xl">Contact Us</h1>
            <div className="text-lg sm:text-xl xl:text-xl">
              <p className="mb-4">
                Have questions, feedback, or want to make a reservation? We’d love to hear from you!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-20 flex w-full max-w-screen-lg flex-col overflow-hidden rounded-xl text-gray-900 md:flex-row md:border md:shadow-lg">
        <form
          className="mx-auto w-full max-w-xl border-gray-200 px-10 py-8 md:px-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="text mb-2 block font-medium" htmlFor="name">
              Your Name:
            </label>
            <input
              className="w-full rounded border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text mb-2 block font-medium" htmlFor="email">
              Your Email:
            </label>
            <input
              className="w-full rounded border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text mb-2 block font-medium" htmlFor="message">
              Message:
            </label>
            <textarea
              className="h-52 w-full rounded border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="flex items-center">
            <div className="flex-1"></div>
            <button
              className="rounded-xl bg-green-600 px-4 py-3 text-center font-bold text-white hover:bg-green-700"
              type="submit"
            >
              Send Message
            </button>
          </div>
          {status && (
            <p
              className={`mt-4 text-center ${status.includes("successfully") ? "text-green-600" : "text-red-600"}`}
            >
              {status}
            </p>
          )}
        </form>
        <div className="mt-10 bg-green-600 px-10 py-8 text-gray-100 md:mt-0 md:ml-auto">
          <div>
            <p className="mb-4 font-medium border-b pb-2">RESTAURANT HOURS</p>
            <p className="mb-4">Monday – Thursday: 11:00 AM – 10:00 PM</p>
            <p className="mb-4">Friday – Saturday: 11:00 AM – 11:00 PM</p>
            <p className="mb-4">Sunday: 12:00 PM – 9:00 PM</p>
            <p className="mb-4">
              Reservations:
              <a href="tel:+123456789" className="font-semibold underline">
                +1 234-567-89
              </a>
            </p>
            <p className="mb-4">
              Email:
              <a href="mailto:info@restaurant.com" className="font-semibold underline">
                info@restaurant.com
              </a>
            </p>
            <hr className="my-2 h-0 border-t border-r-0 border-b-0 border-l-0 border-gray-300" />
            <p className="mb-4">Location: 123 Foodie Lane, Gourmet City</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
