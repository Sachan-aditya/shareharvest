import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom"; // Added for client-side navigation
import { Utensils, HandHeart, Leaf, Quote } from "lucide-react";

function Home() {
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: contentRef });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const howItWorks = [
    { step: 1, title: "Donors List Food", description: "List surplus food with ease.", icon: Utensils },
    { step: 2, title: "Receivers Request", description: "Browse and request donations.", icon: HandHeart },
    { step: 3, title: "Share & Reduce", description: "Share food and cut waste.", icon: Leaf },
  ];

  const impactStats = [
    { title: "Food Waste", stat: "67M tonnes", desc: "Reduced yearly in India." },
    { title: "Hunger", stat: "190M meals", desc: "Shared to fight hunger." },
    { title: "Community", stat: "Thousands", desc: "Connected daily." },
    { title: "Sustainability", stat: "Lowered", desc: "Emissions impact." },
  ];

  const customerReviews = [
    { text: "This platform transformed our NGO’s outreach!", author: "Anita D.", rating: 5 },
    { text: "Easy to use and impactful for my restaurant.", author: "Vikram S.", rating: 4 },
    { text: "Connected us to donors seamlessly.", author: "Meena R.", rating: 5 },
  ];

  const singleQuote = { text: "Together, we nourish and sustain.", author: "ShareHarvest Vision" };

  return (
    <div ref={contentRef} className="bg-light-green font-sans">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-green via-deep-green/70 to-transparent"></div>
        <div className="relative container mx-auto px-6 z-10 text-white flex flex-col items-center justify-center h-full">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg"
          >
            Share Food, <span className="text-yellow">Nourish Lives</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed drop-shadow"
          >
            Unite to reduce waste and feed communities across India.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <Link
              to="/register"
              className="inline-block bg-yellow text-deep-green px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-amber-400 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-yellow focus:ring-opacity-75"
              aria-label="Get started with ShareHarvest"
            >
              Join ShareHarvest
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Leaderboard Coming Soon */}
      <section className="py-16 bg-medium-green">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-12"
          >
            Leaderboard Coming Soon
          </motion.h2>
          <div className="bg-off-white p-6 rounded-xl shadow-md text-gray-800 mb-12">
            <p className="text-lg">Our leaderboard is under development! Stay tuned for updates and track your contributions.</p>
          </div>
        </div>
      </section>

      {/* How ShareHarvest Works */}
      <section className="py-20 bg-off-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-light-green to-transparent opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold text-deep-green text-center mb-16 leading-tight"
          >
            How <span className="text-yellow">ShareHarvest</span> Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-20 h-20 bg-yellow rounded-full flex items-center justify-center mb-6 shadow-md">
                  <item.icon className="h-10 w-10 text-deep-green" />
                </div>
                <h3 className="text-2xl font-bold text-deep-green mb-3">{item.title}</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-darker-green">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold text-yellow mb-16 leading-tight"
          >
            What Our Community Says
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {customerReviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="bg-white p-8 rounded-2xl shadow-xl text-left flex flex-col items-center justify-center h-full"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-7 h-7 text-yellow fill-current mx-0.5" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-800 text-lg italic mb-6 leading-relaxed text-center">{`"${review.text}"`}</p>
                <p className="text-deep-green font-bold flex items-center text-xl mt-auto">
                  <span className="w-12 h-12 bg-medium-green rounded-full flex items-center justify-center mr-3 text-white text-lg font-semibold border-2 border-yellow shadow-md">
                    {review.author.charAt(0)}
                  </span>
                  {review.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Sharing Impact */}
      <motion.section
        className="py-20 relative overflow-hidden flex items-center justify-center"
        ref={contentRef}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            y: backgroundY,
            backgroundSize: "cover",
          }}
        ></motion.div>
        <div className="absolute inset-0 bg-deep-green opacity-70 z-10"></div>
        <div className="relative container mx-auto px-6 text-center z-20 text-white">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold text-yellow mb-16 drop-shadow-lg leading-tight"
          >
            Our <span className="text-white">Impact</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 flex flex-col items-center justify-center h-full"
              >
                <h3 className="text-5xl font-extrabold text-yellow mb-4 drop-shadow-md">{stat.stat}</h3>
                <p className="text-2xl font-semibold text-white mb-2">{stat.title}</p>
                <p className="text-white/80 text-lg leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;