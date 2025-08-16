import React from "react";

const AboutCampusCrave = () => {
  return (
    <section className="py-24 ">
      <div className="max-w-5xl mx-auto px-8 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-sky-900 mb-6 drop-shadow-lg">
          About Campus Crave
        </h2>

        {/* Paragraph */}
        <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-10 max-w-3xl mx-auto">
          Campus Crave is your one-stop meal ordering platform tailored
          specifically for university students and campus dwellers. Whether
          you're on the go between classes or studying late in the library,
          Campus Crave makes it easy to browse daily menus, place quick orders,
          and pick up freshly prepared meals — all within your campus community.
          <br /><br />
          With Campus Crave, you can explore nearby cafeterias and food outlets
          offering student-friendly pricing, enjoy lightning-fast ordering with
          secure payments, and schedule pickups at times that suit your busy
          campus life — all without waiting in long lines.
        </p>

        {/* Features List */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <li className="flex items-start space-x-4 bg-white/70 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <span className="text-sky-700 text-3xl">🍽️</span>
            <p className="text-sm md:text-base text-gray-700">
              Browse nearby cafeterias and food outlets offering
              student-friendly pricing and daily meal plans.
            </p>
          </li>
          <li className="flex items-start space-x-4 bg-white/70 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <span className="text-sky-700 text-3xl">⚡</span>
            <p className="text-sm md:text-base text-gray-700">
              Enjoy lightning-fast ordering, secure payment processing, and
              real-time order status.
            </p>
          </li>
          <li className="flex items-start space-x-4 bg-white/70 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <span className="text-sky-700 text-3xl">💳</span>
            <p className="text-sm md:text-base text-gray-700">
              Pay using your campus card, student wallet, or various digital
              payment methods — seamless and hassle-free.
            </p>
          </li>
          <li className="flex items-start space-x-4 bg-white/70 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <span className="text-sky-700 text-3xl">⏳</span>
            <p className="text-sm md:text-base text-gray-700">
              Choose pickup times that suit your schedule — no more waiting in
              long cafeteria lines.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AboutCampusCrave;
