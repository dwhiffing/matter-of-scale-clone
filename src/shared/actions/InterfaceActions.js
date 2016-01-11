import request from 'shared/utils/APIUtils'
import { actionCreator } from 'shared/redux/helpers'

const InterfaceActions = {
  showNavigationBar: (show) => show,
  toggleModalMenu: (show) => show,
  displayFlashMessage: (message) => message,
  launchModal: (modal) => modal,
  closeModal: () => null,
  clearFlashMessage: () => null
}

export default actionCreator(InterfaceActions)
