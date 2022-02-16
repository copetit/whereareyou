function PasswordChkModal(props: any) {
  const { isOpen, setShowModal } = props;
  function closeModal() {
    setShowModal(false);
  }
  if (isOpen) {
    return (
      <>
        <div className="modal-bg w-full h-full bg-black absolute top-0 left-0 bg-opacity-90"></div>
        <div className="modal bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div className="h-96 relative bg-white rounded-lg shadow">
              <div className="flex justify-end p-2">
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                  data-modal-toggle="authentication-modal"
                  onClick={closeModal}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <form
                className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
                action="#"
              >
                <h3 className="text-xl font-medium text-gray-900 ">
                  Enter your Password
                </h3>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  EDIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default PasswordChkModal;
