export const QuestionHeader = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="
      border-b border-t border-gray-200
      pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6
    ">
      <div className="flex items-center">
        <h1 className="flex-1 text-lg font-medium">Questions</h1>
        { children }
      </div>
    </div>
  )
}
export default QuestionHeader
