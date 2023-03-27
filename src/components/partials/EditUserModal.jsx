function EditUserModal({
  user,
  actualUser,
  isEditModalOpen,
  setIsEditModalOpen,
}) {
  return (
    <>
      {isEditModalOpen && actualUser === user.id ? (
        <>
          <div className="h-fit w-fit m-auto mt-10 h-auto fixed top-0 left-0 right-0 z-50 items-center justify-center p-4 overflow-y-auto md:inset-0">
            <div className=" relative w-auto mx-auto h-full max-w-2xl md:h-auto lg:w-[100rem]   ">
              <form action="#" className="relative bg-white rounded-lg shadow ">
                <div className="flex items-start justify-between p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Edit user
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    onClick={() => setIsEditModalOpen()}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="first-name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        First Name
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        name="first-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${user.firstname}`}
                        required=""
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="last-name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Last Name
                      </label>
                      <input
                        id="last-name"
                        type="text"
                        name="last-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${user.lastname}`}
                        required=""
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${user.email}`}
                        required=""
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="phone-number"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone-number"
                        type="number"
                        name="phone-number"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder="e.g. +(12)3456 789"
                        required=""
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="user-image"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Avatar
                      </label>
                      <input
                        id="user-image"
                        type="text"
                        name="user-image"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${user.avatar}`}
                        required=""
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="new-password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        New Password
                      </label>
                      <input
                        id="new-password"
                        type="password"
                        name="new-password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder="••••••••"
                        required=""
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                  <button
                    onClick={() => setIsEditModalOpen()}
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Save all
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            onClick={() => setIsEditModalOpen()}
            className="opacity-25 fixed inset-0 z-40 bg-black"
          ></div>
        </>
      ) : null}
    </>
  );
}

export default EditUserModal;
