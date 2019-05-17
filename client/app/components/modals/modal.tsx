import React, { Component, SyntheticEvent } from 'react';
import { CSSTransition } from 'react-transition-group';

// all 3 of these properties are passed in from each unique instance of <Modal />
interface Props {
  onClose: () => void;
  isVisible?: boolean;
  turnOffVisibility?: () => any;
}

export class Modal extends Component<Props> {
  // animate close when the escape key is pressed
  listenKeyboard = (e: KeyboardEvent) =>
    // eslint-disable-next-line react/destructuring-assignment
    e.key === 'Escape' || (e.keyCode === 27 && this.props.turnOffVisibility());

  // start listening for shortcut keys when the component mounts
  componentDidMount = (): void =>
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onClose && window.addEventListener('keydown', this.listenKeyboard, true);

  // prevent memory leaks by removing the event listener when the component unmounts
  componentWillUnmount = (): void =>
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onClose && window.removeEventListener('keydown', this.listenKeyboard, true);

  // close modal when whole page overlay is clicked (but not the modal itself)
  // eslint-disable-next-line react/destructuring-assignment
  onOverlayClick = async () => this.props.onClose();

  // prevents closing the modal if the click is within the modal
  // because by default it closes when whole page overlay is clicked
  onDialogClick = (e: SyntheticEvent): void => e.stopPropagation();

  render = () => {
    // the isVisible property is defined on every unique instance of the modal
    // if false, the "in" property on CSSTransition will begin the exit animation
    // setting state with the turnOffVisibilty function rerenders component and
    // allows CSSTransition to add classes and animate when the component mounts and unmounts
    const { isVisible, turnOffVisibility, children } = this.props;
    // the modal dispatch is called after CSSTransition has finished the exit animation
    return (
      <div>
        <div className="modal-overlay-div" />

        {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
        <div
          role="dialog" // will tell linter to ignore since div only captures events
          className="modal-content-div"
          onClick={turnOffVisibility} // set isVisible to false on each modal state
          onKeyPress={turnOffVisibility} // comply with accessibility standards
        >
          <CSSTransition
            in={isVisible}
            appear
            timeout={300}
            classNames="fade"
            onExited={() => !isVisible && this.onOverlayClick()}
          >
            <div
              role="dialog"
              className="modal-dialog-div"
              onClick={this.onDialogClick}
              onKeyPress={this.onDialogClick}
            >
              {children}
            </div>
          </CSSTransition>
        </div>
        {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */}
      </div>
    );
  };
}

export default Modal;
