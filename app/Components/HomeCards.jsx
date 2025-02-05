import styles from "../home/marketplace.module.css";

export default function Cards() {
  return (
    <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center pt-2">
        {/* Card 1 */}
        <div className="relative w-full md:w-1/3 h-[500px] border">
          <div className={`${styles.card1} absolute inset-0`}></div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white">
            <h1 className="text-4xl font-bold whitespace-nowrap">What is CampusPlatz?</h1>
            <p className="text-lg max-w-[80%] mx-auto mt-2 font-extralight">
              Your ultimate student hub for buying, selling, finding jobs, housing, and tutors—all in one place!
            </p>
            <button className="mt-4 border border-white px-4 py-2 text-white hover:bg-white hover:text-black transition">
              FIND OUT NOW
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative w-full md:w-1/3 h-[500px] border">
          <div className={`${styles.card2} absolute inset-0`}></div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white">
            <h1 className="text-[33px] font-bold whitespace-nowrap">Why Choose CampusPlatz?</h1>
            <p className="text-lg max-w-[80%] mx-auto mt-2 font-extralight">
              Simplify student life with exclusive deals, trusted services, and a supportive community.
            </p>
            <button className="mt-4 border border-white px-4 py-2 text-white hover:bg-white hover:text-black transition">
              LEARN MORE
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative w-full md:w-1/3 h-[500px] border">
          <div className={`${styles.card3} absolute inset-0`}></div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white">
            <h1 className="text-4xl font-bold whitespace-nowrap">How CampusPlatz Works?</h1>
            <p className="text-lg max-w-[80%] mx-auto mt-2 font-extralight">
              Discover the hottest deals and opportunities handpicked just for you.
            </p>
            <button className="mt-4 border border-white px-4 py-2 text-white hover:bg-white hover:text-black transition">
              GET STARTED
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
