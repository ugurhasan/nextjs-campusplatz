import styles from "../home/marketplace.module.css";

export default function Cards({ cardsData }) {
  return (
    <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-row gap-24 justify-center pt-2">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className={`card border border-gray-200 px-5 pt-8 pb-4 rounded-lg bg-[#F9F9F9] cursor-pointer 
              transition-transform duration-300 hover:scale-105 hover:shadow-lg ${card.hoverClass}`}
          >
            <div className={styles[card.styleClass]}></div>
            <p className="text-2xl mt-3 text-center font-bold">{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
