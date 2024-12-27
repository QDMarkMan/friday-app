/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-27 11:22:14].
 *-------------------------------------------------------------------------------------------- */
import { motion } from 'motion/react'

export const MotionLoading: React.FC = () => {
  return (
    <motion.div
    animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
    }}
    transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 1,
    }}
    style={{
      display: "inline-block",
      width: 18,
      height: 18,
      backgroundColor: "var(--primary)",
      borderRadius: 4,
      overflow: "hidden",
    }}
    />
  )
}