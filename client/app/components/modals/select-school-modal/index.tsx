// #region package imports
import React, { Component, SyntheticEvent, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
// #endregion package imports
// #region file imports
import { hideModal } from '@actions/modal'
import Modal from '@components/modals/Modal'
import SelectSchoolPage from '@components/modals/select-school-modal/select-school-page'
// #endregion file imports
// #region interface imports
import { Store } from '@types'

interface IProps {
  aicode: string
  hideModal: () => any
}

interface IState {
  // school: string;
  // city: string;
  // state: string;
  isVisible: boolean
}
// #endregion interface imports

export class TosSelectSchoolModal extends Component<IProps, IState> {
  state = {
    //   school: '',
    // city: '',
    // state: 'all',
    isVisible: true
  }

  // turn off modal in global store
  // eslint-disable-next-line react/destructuring-assignment
  onClose = (): void => this.props.hideModal()

  // close modal with animation
  exitModal = () => this.setState({ isVisible: false })

  // updates local state based on element
  // onChange = (e: SyntheticEvent) => {
  //   const { name, value } = e.target as HTMLInputElement;

  //   return this.setState({ [name]: value } as object);
  // };

  // submit school search query
  // onSubmit = (e: SyntheticEvent): void => {};

  render = () => {
    const { isVisible } = this.state
    const { aicode } = this.props
    return (
      <Modal
        onClose={this.onClose}
        isVisible={isVisible}
        turnOffVisibility={this.exitModal}
      >
        <SelectSchoolPage
          // state={state}
          // onChange={this.onChange}
          // onSubmit={this.onSubmit}
          onExitModal={this.exitModal}
        />
      </Modal>
    )
  }
}

const mapStateToProps = (state: Store) => ({})

export default connect(
  mapStateToProps,
  { hideModal }
)(TosSelectSchoolModal)
