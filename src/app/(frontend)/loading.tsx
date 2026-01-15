import './loading.css'
const Loading = () => {
  return (
    <div className="flex w-full h-[calc(100vh-theme(space.16))] justify-center items-center">
      <div className="loader"></div>
    </div>
  )
}
export default Loading
