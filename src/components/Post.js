const Post = ({ data, isShow, toggleModal }) => {

    return (
        <>
            {isShow && (
                <div id="popup-modal" className="fixed top-0 left-0 right-0 z-50   p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full flex flex-col items-center justify-center h-screen  shadow-[2px_2px_10px_2px_rgba(0,0,0,0.8)]">
                    <div className="relative  max-w-md max-h-full w-[600px]">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => toggleModal(false)}>
                                <svg className="w-3 h-3" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center mt-8">
                                <h3 className="mb-5 text-lg font-normal text-black-500 ">{data}</h3>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </>
    )
}

export default Post;