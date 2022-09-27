
interface Props {
  navigation: React.ReactNode;
  info?: React.ReactNode;
  detail?: React.ReactNode;
  children?: React.ReactNode;
}

const Shell = (props: Props) => {

  // const Navigation = () => props.navigation
  return (
    <>
      {/* Background color split screen for large screens */}
      <div className="hidden xl:block fixed top-0 left-0 h-full w-1/2 bg-gray-50" aria-hidden="true" />
      <div className="hidden xl:block fixed top-0 right-0 h-full w-1/2 bg-tan-200" aria-hidden="true" />

      <div className="relative flex min-h-full flex-col">
        {/* Navbar */}
        {props.navigation}

        {/* 3 column wrapper */}
        <div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">

          {/* Primary Content */}
          <div className="min-w-0 flex-1 bg-gray-50 xl:flex">

            {/* Left Sidebar */}
            <div className="bg-gray-50 xl:w-64 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
              <div className="py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
                <div className="flex items-center justify-between">

                  {/* Note there's a 2rem space between child elements here */}
                  <div className="flex-1 space-y-8">
                    {props.info}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-gray-50 lg:min-w-0 lg:flex-1">
              {props.children}
            </div>
          </div>

          {/* Activity feed + Detail View*/}
          <div className="bg-tan-200 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
            <div className="pl-6 lg:w-80">
              <div className="flex items-center justify-between">
                <div className="flex-1 space-y-8">
                  {props.detail}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { Shell };
