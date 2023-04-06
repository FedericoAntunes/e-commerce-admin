import { useEffect, useState } from "react";

function ScrollToTop() {
  // The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          type="button"
          className="fixed right-40 z-100 bottom-5 inline-block rounded-full border-2 border-blue bg-blue-700 px-2 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:border-blue-600 hover:bg-blue-900 hover:bg-opacity-10 hover:text-blue-900 focus:border-blue-600 focus:text-blue-600 focus:outline-none focus:ring-0 active:border-blue-700 active:text-blue-700"
        >
          <svg
            fill="none"
            className="w-6 h-6"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
            ></path>
          </svg>
        </button>
      )}
      {/* &#8679; is used to create the upward arrow */}
    </>
  );
}

export default ScrollToTop;
