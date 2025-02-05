import styles from "./homeimage.module.css";

export default function Text() {
    return(
        <>
    <div className="flex flex-col justify-center items-center text-center mb-3">
      <h1 className={styles.font}>A community for students - connect, share and learn.</h1>
      <p className="w-1/3 text-center text-gray-600 text-lg">
        Say goodbye 👋 to the hassle of student life. Find what you need, share what you have, and make the most of your university journey with CampusPlatz.
      </p>
    </div>
        </>
    );
}