import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Rocket, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Stars Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black opacity-80" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            initial={{
              opacity: Math.random(),
              scale: Math.random() * 0.5 + 0.5,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
            }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute z-10 opacity-20"
        initial={{ x: -100, y: -100, rotate: 0 }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ top: "20%", left: "20%" }}
      >
        <div className="h-32 w-32 rounded-full border-2 border-dashed border-cyan-500/30" />
      </motion.div>

      <motion.div
        className="absolute z-10 opacity-20"
        initial={{ x: 100, y: 100, rotate: 0 }}
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          rotate: -360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ bottom: "20%", right: "20%" }}
      >
        <div className="h-48 w-48 rounded-full border border-purple-500/30" />
      </motion.div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <motion.h1
            className="text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10"
            animate={{
              textShadow: [
                "0 0 10px rgba(255,255,255,0.1)",
                "0 0 20px rgba(255,255,255,0.3)",
                "0 0 10px rgba(255,255,255,0.1)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.h1>
          <motion.div
            className="absolute -right-12 -top-12 text-cyan-500"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Rocket size={64} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Lost in Space?
          </h2>
          <p className="mx-auto max-w-[600px] text-lg text-gray-400">
            The coordinates you are looking for do not exist in this solar system.
            Let's get you back to solid ground.
          </p>

          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] border border-white/10"
            >
              <Home size={20} className="transition-transform group-hover:-translate-y-1" />
              <span>Return to Home</span>
              <div className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
