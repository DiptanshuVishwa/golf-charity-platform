import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600 opacity-20 blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600 opacity-20 blur-[120px]"></div>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 h-screen">

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Play. Win.{" "}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            Give Back.
          </span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl">
          Track your performance, participate in monthly draws, and support
          meaningful causes — all in one platform.
        </p>

        <div className="mt-8 flex gap-4">
          
          {/* ✅ FIXED BUTTON */}
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:scale-105 transition duration-300 shadow-lg shadow-purple-500/20"
          >
            Get Started
          </button>

          <button className="px-8 py-3 border border-gray-600 rounded-xl hover:bg-gray-800 transition duration-300">
            Learn More
          </button>

        </div>

      </section>

      {/* FEATURES */}
      <section className="relative px-6 py-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {[
          {
            title: "Track Scores",
            desc: "Keep your latest performance updated with smart score tracking.",
          },
          {
            title: "Win Rewards",
            desc: "Participate in monthly draws and win exciting prizes.",
          },
          {
            title: "Support Charity",
            desc: "Contribute to meaningful causes with every subscription.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:scale-105 transition duration-300 hover:border-purple-500/30"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}

      </section>

      {/* CTA */}
      <section className="text-center py-20 relative">
        <h2 className="text-3xl font-bold">Start your journey today</h2>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 px-10 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:scale-105 transition duration-300 shadow-lg shadow-pink-500/20"
        >
          Join Now
        </button>
      </section>

    </div>
  );
}