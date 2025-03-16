import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      from_name: formData.name, 
      reply_to: formData.email,  
      message: formData.message, 
    };

    emailjs.send(
      "service_57fvwhd",  
      "template_ho4amnr",  
      templateParams,
      "jODZ1RCIh1RdFopBZ"  
    )
    .then(() => {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    })
    .catch(() => {
      toast.error("Failed to send message.");
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-12 bg-white shadow-lg rounded-lg grid md:grid-cols-2 gap-6 mt-44 max-sm:px-6">
      {/* Left Side - Contact Details */}
      <div className="space-y-6">
        <h2 className="text-3xl font-medium text-gray-800 overflow-hidden">Get in Touch</h2>
        <p className="text-gray-600">We’d love to hear from you! Reach out with any questions or feedback.</p>
        <div className="space-y-4">
          <p className="flex items-center gap-2 text-blue-600"><FaEnvelope /> support@edutech.com</p>
          <p className="flex items-center gap-2 text-blue-600"><FaPhone /> +1 (234) 567-890</p>
          <p className="flex items-center gap-2 text-blue-600"><FaMapMarkerAlt /> 123 EduTech Street, Tech City, TX 75001</p>
        </div>
        <div className="flex gap-4 text-xl">
          <a href="#" className="text-blue-600 hover:text-blue-800"><FaFacebook /></a>
          <a href="#" className="text-blue-600 hover:text-blue-800"><FaTwitter /></a>
          <a href="#" className="text-blue-600 hover:text-blue-800"><FaLinkedin /></a>
          <a href="#" className="text-blue-600 hover:text-blue-800"><FaInstagram /></a>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className="bg-gray-100 p-6 rounded-lg max-sm:p-3">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
