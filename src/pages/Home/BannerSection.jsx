import { Carousel } from 'react-responsive-carousel';
import { FaSearch } from 'react-icons/fa';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const BannerSection = () => {
  const bannerImages = [
    {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      title: "Discover Campus Meals",
      desc: "Delicious food, daily menus, and real reviews — all in one place!",
    },
    {
      url: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
      title: "Rate & Request Your Meals",
      desc: "Vote for upcoming meals and leave honest reviews.",
    },
    {
      url: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      title: "Premium Meal Plans",
      desc: "Enjoy exclusive access to upcoming meal menus and features.",
    }

  ];

  return (
    <div className="w-full relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
      >
        {bannerImages.map((banner, index) => (
          <div key={index} className="relative h-[400px] md:h-[500px]">
            <img
              src={banner.url}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-4 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-3">{banner.title}</h2>
              <p className="mb-6 text-sm md:text-base">{banner.desc}</p>

              {/* Search Bar */}
              {/* Search Bar */}
              <div className="flex items-center w-full max-w-md bg-white rounded-full overflow-hidden shadow-md border">
                <input
                  type="text"
                  placeholder="Search meals..."
                  className="px-5 py-2 w-full text-gray-700 outline-none bg-transparent"
                />
                <button className="bg-primary text-white px-5 py-4 font-medium hover:bg-primary/90 transition-all">
                  <FaSearch className="text-lg" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerSection;
