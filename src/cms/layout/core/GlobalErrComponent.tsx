import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {ToastContainer, toast} from 'react-toastify'

const GlobalErrComponent = () => {
  const globalError = useSelector((state: any) => state.globalError)

  useEffect(() => {
    if (globalError?.errorMessage) {
      toast.error(globalError?.errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }, [globalError])
  return (
    <div>
      <ToastContainer />
    </div>
  )
}

export default GlobalErrComponent
