import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../global/navbar-logged-in.js";
import CoverImage from "../global/common-section.js";
import Card from "../shared/cardHome.js";

const HomePage1 = () => {
  const navigate = useNavigate();

 

  return (
    <>
      <Navbar />
      <CoverImage title={"Select Workout"} />
      <section className="bg-white">
        <section className="h-screen flex flex-wrap justify-center gap-8 mt-8">
          {/* Render multiple card components */}
          <Card
            title="Muay Thai"
            description="Muay Thai is a martial art that originated in Thailand. Also known as Thai boxing, Muay Thai involves a combination of punches, kicks, elbows, knees, and body agility to fight against an opponent. Besides being a sport, Muay Thai is often used in competitive fights."
          />
          <Card
            title="Yoga"
            description="Yoga is a physical, mental, and spiritual practice that originated in India. Its goal is to achieve harmony between the body, mind, and soul. Yoga practice involves body movements, breathing exercises, meditation, and relaxation. Yoga can improve flexibility, strength, balance, and help reduce stress while enhancing overall well-being."
          />
          <Card
            title="HIIT"
            description="HIIT (High-Intensity Interval Training): HIIT is a training method that involves intense and short workout sessions followed by shorter recovery periods. Typically, HIIT sessions last around 20-30 minutes and involve cardiovascular exercises such as running, jumping, or bodyweight exercises. This workout is designed to improve strength, speed, and endurance in a short amount of time."
          />
          <Card
            title="Zumba"
            description="Zumba is a cardiovascular exercise that combines elements of Latin dance styles such as salsa, merengue, reggaeton, and samba. In a Zumba session, participants follow energetic dance movements while performing aerobic exercises. Zumba not only helps improve fitness and burn calories but also provides a fun way to exercise and express oneself through dance movements."
          />
          <Card
            title="Pilates"
            description="Pilates is an exercise system that focuses on strengthening the core muscles (lower back, abdomen, and hips), improving flexibility, and enhancing body awareness. Pilates exercises involve controlled movements, proper breathing techniques, and the use of equipment such as a mat or specialized apparatus like the Reformer. The goal is to improve body posture, muscle strength, and balance."
          />
          <Card
            title="Poundfit"
            description="Poundfit is a unique and energetic workout that combines dance movements and drumstick strikes using special drumsticks called ripstix. In a Poundfit session, participants follow dance movement patterns and perform strikes in sync with rhythmic music. This exercise helps improve overall body strength, cardiovascular fitness, and coordination while providing a fun sensation of being a drummer."
          />
        </section>
      </section>
    </>
  );
};

export default HomePage1;
