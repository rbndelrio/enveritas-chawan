import { Transition } from '@headlessui/react'
import { Fragment } from 'react'

export const QuestionHeader = ({
  title,
  description,
  operations,
  controls,
  actions,
  showActionBar,
}: {
  title?: string
  description?: string
  operations?: React.ReactNode,
  controls?: React.ReactNode,
  showActionBar?: boolean
  actions?: React.ReactNode,
}) => {
  return (
    <div className="relative">
      <div className="
        border-b border-t border-gray-200
        pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6
        mb-7
      ">
        <div className="flex items-center">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{title || 'Survey Name'}</h1>
            <div className="prose">
              <p>{ description || 'Survey Description' }</p>
            </div>
          </div>

          <div className="
            flex flex-shrink flex-row flex-wrap items-center justify-end
            space-x-3 mt-1 mb-auto
          ">
            {operations}
          </div>
        </div>

        <div className="flex items-center space-x-3 justify-end">
            { controls }
        </div>
      </div>

      <div className="absolute top-full w-full z-30">
        <Transition
          show={!!showActionBar && !!actions}
          as={Fragment}
          unmount={false}
          enter="transform transition duration-150"
          enterFrom="opacity-0 -translate-y-4"
          enterTo="opacity-100 translate-y-0"
          entered="transform-none"
          leave="transform transition duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0"
        >
          <div className="
            border-b border-t border-gray-300/50 bg-gray-100
            pl-4 pr-6 pt-2 pb-2 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-2
          ">
              <div className="flex flex-auto space-x-3 justify-end items-center min-h-16">
              {actions}
              </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}
export default QuestionHeader
