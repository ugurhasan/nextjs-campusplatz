import styles from "./homeimage.module.css";

export default function HomeImageSection() {
    return(
        <>
        <div className="mt-[103px] h-[50px] justify-between flex items-center">
            <div className="ml-32">
            <a className="mx-6 text-lg text-gray-700 font-medium" href="">Electronics</a>
            <a className="mx-6 text-lg text-gray-700 font-medium" href="">Clothes</a>
            <a className="mx-6 text-lg text-gray-700 font-medium" href="">Books</a>
            <a className="mx-6 text-lg text-gray-700 font-medium" href="">Furniture</a>
            <a className="mx-6 text-lg text-red-700 font-medium" href="">All Products</a>
            </div>
            <div className="mr-32">
            <a className="mx-6 text-lg text-gray-700 font-medium" href="">Courses</a>
            <a className="mx-6 text-lg text-gray-700 font-medium" href="">Accommodation</a>
            <a className="mx-6 text-lg text-gray-700 font-medium" href="">Mini-Jobs</a>
            <a className="mx-6 text-lg text-red-700 font-medium" href="">All Services</a>
            </div>
        </div>
        <div className={`${styles.section} h-[50vh] bg-cover bg-center flex justify-center items-center`}>
          <div className="bg-white w-[26rem] h-[13rem] px-5 pt-6 mr-14">
            <h1 className="w-[20rem] font-bold text-2xl">Looking for a new home for your pre-loved items?</h1>
            <button className="bg-pink-600 hover:bg-pink-700 text-xl font-bold text-white px-3 py-2 rounded-md mt-3">
              Sell now
            </button>
            <p className="underline text-gray-500 cursor-pointer mt-2">How it works?</p>
          </div>
          <div className="bg-white w-[26rem] h-[13rem] px-5 pt-6 ml-14">
            <h1 className="w-[20rem] font-bold text-2xl">Looking for a new student to your services?</h1>
            <button className="bg-pink-600 hover:bg-pink-700 text-xl font-bold text-white px-3 py-2 rounded-md mt-3">
                Service now
            </button>
            <p className="underline text-gray-500 cursor-pointer mt-2">How it works?</p>
          </div>
        </div>
      </>
    );
}