// src/components/common/Loader2.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [hideLoader, setHideLoader] = useState(false);
  const [barComplete, setBarComplete] = useState(false);

  useEffect(() => {
    // Animate counter to 100 in ~1.2s
    const steps = 40;
    const duration = 1200; // total time in ms
    const stepTime = duration / steps;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setCount(Math.min(i * (100 / steps), 100));
      if (i >= steps) {
        clearInterval(interval);
        setTimeout(() => setBarComplete(true), 200);
        setTimeout(() => {
          setHideLoader(true);
          if (onComplete) onComplete();
        }, 900); // exit quickly after complete
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  const digits = String(Math.floor(count)).padStart(3, "0").split("");

  return (
    <AnimatePresence>
      {!hideLoader && (
        <motion.div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          {/* KC Logo */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[120%]"
            animate={{
              scale: barComplete ? [1, 40, 60] : 1,
              opacity: barComplete
                ? [1, 0.8, 0.4]
                : 0.4 + (count / 100) * 0.6,
            }}
            transition={{
              duration: barComplete ? 0.9 : 0.1,
              ease: "easeInOut",
            }}
            style={{ mixBlendMode: "screen", transformOrigin: "center" }}
          >
            <motion.img
              src="/images/KC.svg"
              alt="KC Logo"
              animate={{
                filter: `brightness(${0.7 + (count / 100) * 0.3})`,
              }}
              transition={{ duration: 0.3 }}
              style={{ width: "18vh", height: "18vh" }}
            />
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[260px] h-[6px] bg-gray-800 overflow-hidden rounded-full"
            animate={barComplete ? { y: -80, opacity: 0 } : {}}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div
              className="h-full bg-white origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              transition={{ duration: 0.01 }}
            />
          </motion.div>

          {/* Counter */}
          <div className="flex bottom-6 left-6 absolute">
            {digits.map((digit, idx) => (
              <motion.div
                key={idx + digit}
                className="text-white text-[8vh] h-[8vh] flex items-center justify-center overflow-hidden"
                style={{ width: "1em" }}
              >
                {digit}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
