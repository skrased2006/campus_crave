import { Link } from "react-router";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-10 pb-6 mt-16 border-t">
      <div className="max-w-10/12 mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <img
              src="https://i.ibb.co/wZX5dygz/images.png"
              alt="logo"
              className="w-10 h-10"
            />
            Campus Crave
          </Link>
          <p className="mt-2 text-sm text-gray-600">
            Taste the Campus Life. Discover, Review & Request Meals with Ease.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="footer-title">Navigation</h3>
          <ul className="mt-2 space-y-1">
            <li><Link to="/" className="link link-hover">Home</Link></li>
            <li><Link to="/meals" className="link link-hover">Meals</Link></li>
            <li><Link to="/upcoming-meals" className="link link-hover">Upcoming Meals</Link></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="footer-title">Useful</h3>
          <ul className="mt-2 space-y-1">
            <li><Link to="/dashboard/my-profile" className="link link-hover">Dashboard</Link></li>
            <li><Link to="/login" className="link link-hover">Join Us</Link></li>
            <li><Link to="/checkout/silver" className="link link-hover">Buy Membership</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="footer-title">Contact Us</h3>
          <p className="text-sm mt-2">Email: support@campuscrave.com</p>
          <p className="text-sm">Phone: +880 979962617</p>
          <div className="flex gap-4 mt-3 text-xl">
          <a
  href="https://www.facebook.com/profile.php?id=61557281361139"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaFacebook className="hover:text-blue-500" />
</a>

            <a href="https://www.linkedin.com/in/shaikh-rasedul-islam-284512377/"><FaLinkedin className="hover:text-sky-500" /></a>
            <a href="https://www.instagram.com/sksayem2006/"><FaInstagram className="hover:text-pink-500" /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Campus Crave. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
