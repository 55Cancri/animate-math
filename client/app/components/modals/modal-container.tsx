import React from 'react'
import { connect } from 'react-redux'
import { Store } from '@types'

// import all modal components
// import selectSchoolModal from '@components/modals/select-school-modal'

// modal directory based on props.modalType
// the jsx for each modal is assigned to a property on the object
const MODAL_COMPONENTS = {
  // SELECT_SCHOOL_MODAL: selectSchoolModal
  // GRADE_ADJUSTMENTS_MODAL: gradeAdjustmentsModal,
  // MISGRID_APPROVAL_MODAL: misgridApprovalModal
  // MANAGE_FEES_MODAL: manageFeesModal,
}

export const ModalContainer = ({ modalType }) => {
  // if no modal is set in store, render nothing
  // eslint-disable-next-line fp/no-nil
  if (!modalType) return null

  // otherwise grab the jsx of the specific modal requested in the dispatched action
  // eslint-disable-next-line security/detect-object-injection
  const SpecificModal = MODAL_COMPONENTS[modalType]

  // and return it, equivalent to returning jsx from a function
  return <SpecificModal />
}

// learn what modal was requested in the action by reading the value from the global store
const mapStateToProps = (state: Store) => ({
  modalType: state.modal.modalType
})

export default connect(mapStateToProps)(ModalContainer)
