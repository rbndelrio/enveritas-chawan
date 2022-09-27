import { CakeIcon, CheckBadgeIcon, GlobeAsiaAustraliaIcon, RectangleStackIcon } from '@heroicons/react/20/solid'

const Info = () => {
  return (
    <>
      <div className="space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8">
        {/* Profile */}
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 flex-shrink-0">
            <a href="#">
              <img
                className="h-12 w-12 rounded-full"
                src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                alt=""
              />
            </a>
          </div>
          <div className="space-y-1">
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-jebena-700">Dana Sudrajad</a>
            <a href="#" className="group flex items-center space-x-1">
              <GlobeAsiaAustraliaIcon className="-ml-0.5 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              <span className="text-sm text-gray-500 group-hover:text-gray-900">
                Translator, Javanese
              </span>
            </a>
          </div>
        </div>
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row xl:flex-col">
          <button
            type="button"
            className="
              inline-flex items-center justify-center rounded-md border border-transparent
              px-4 py-2 text-sm font-medium
              bg-jebena-500 text-white shadow-sm hover:bg-jebena-600
              focus:outline-none focus:ring-2 focus:ring-jebena-400 focus:ring-offset-2 xl:w-full
            "
          >
            New Project Translation
          </button>
          <button
            type="button"
            className="
              mt-3 inline-flex items-center justify-center rounded-md border
              px-4 py-2 text-sm font-medium
              border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              sm:mt-0 sm:ml-3 xl:ml-0 xl:mt-3 xl:w-full
            "
          >
            Manage Blocks
          </button>
        </div>
      </div>
      {/* Meta info */}
      <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
        <div className="flex items-center space-x-2">
          <RectangleStackIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span className="text-sm font-medium text-gray-500">8 Active Projects</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckBadgeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span className="text-sm font-medium text-gray-500">Verified Editor</span>
        </div>
        <div className="flex items-center space-x-2">
          <CakeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span className="text-sm font-medium text-gray-500">Happy Birthday!</span>
        </div>
      </div>
    </>
  )
}

export { Info }
