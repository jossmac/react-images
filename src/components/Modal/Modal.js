// @flow
// @jsx glam
import React, { cloneElement, Component } from 'react';
import glam from 'glam';
import Fullscreen from 'react-full-screen';
import ScrollLock from 'react-scrolllock';
import focusStore from 'a11y-focus-store';

import { Fade, SlideUp } from './Animation';
import { type CarouselType } from '../Carousel';
import { Blanket, Positioner, Dialog } from './styled';
import { defaultStyles, type StylesConfig } from '../../styles';

type MouseOrKeyboardEvent = MouseEvent | KeyboardEvent;
export type CloseType = (event: MouseOrKeyboardEvent) => void;
export type ModalPropsForCarousel = {
  allowFullscreen: boolean,
  isFullscreen: boolean,
  onClose: CloseType,
  toggleFullscreen: any => void,
};

export type ModalProps = {
  /* Enable/disable the ability to "fullscreen" the dialog */
  allowFullscreen: boolean,
  /* Carousel only supported */
  children: CarouselType,
  /* Enable/disable calling `onClose` when the backdrop is clicked */
  closeOnBackdropClick: boolean,
  /* Enable/disable calling `onClose` when the `esc` key is pressed */
  closeOnEsc: boolean,
  /*
    Show the component; triggers the enter or exit states
    NOTE: provided by TransitionGroup, NOT supplied by the user
  */
  in: boolean,
  /* Function called to request close of the modal */
  onClose: CloseType,
  /* Style modifier methods */
  styles: StylesConfig,
};
type ModalState = { isFullscreen: boolean };
const defaultProps = {
  allowFullscreen: true,
  closeOnBackdropClick: true,
  closeOnEsc: true,
  styles: {},
};
class Modal extends Component<ModalProps, ModalState> {
  positioner: HTMLElement;
  commonProps: any; // TODO
  state: ModalState = { isFullscreen: false };

  static defaultProps = defaultProps;

  modalDidMount = () => {
    document.addEventListener('keyup', this.handleKeyUp);
    focusStore.storeFocus();
  };
  modalWillUnmount = () => {
    document.removeEventListener('keyup', this.handleKeyUp);
    focusStore.restoreFocus();
  };

  handleFullscreenChange = (isFullscreen: boolean) => {
    this.setState({ isFullscreen });
  };
  handleKeyUp = (event: KeyboardEvent) => {
    const { allowFullscreen, closeOnEsc } = this.props;
    const { isFullscreen } = this.state;
    const allowClose = event.key === 'Escape' && closeOnEsc && !isFullscreen;

    // toggle fullscreen
    if (allowFullscreen && event.key === 'f') {
      this.toggleFullscreen();
    }

    // close on escape when not fullscreen
    if (allowClose) this.handleClose(event);
  };
  handleBackdropClick = (event: MouseEvent) => {
    const { closeOnBackdropClick } = this.props;

    if (event.target !== this.positioner || !closeOnBackdropClick) return;

    this.handleClose(event);
  };
  getPositioner = (ref: HTMLElement) => {
    this.positioner = ref;
  };
  toggleFullscreen = () => {
    this.setState(state => ({ isFullscreen: !state.isFullscreen }));
  };
  handleClose = (event: MouseOrKeyboardEvent) => {
    const { onClose } = this.props;
    const { isFullscreen } = this.state;

    // force exit fullscreen mode on close
    if (isFullscreen) {
      this.toggleFullscreen();
    }

    // call the consumer's onClose func
    onClose(event);
  };

  getStyles = (key: string, props: {}): {} => {
    const base = defaultStyles[key](props);
    base.boxSizing = 'border-box';
    const custom = this.props.styles[key];
    return custom ? custom(base, props) : base;
  };
  getCommonProps() {
    const { isFullscreen } = this.state;

    return {
      getStyles: this.getStyles,
      isFullscreen,
      modalProps: this.props,
    };
  }
  render() {
    const { allowFullscreen, children } = this.props;
    const { isFullscreen } = this.state;
    const commonProps = (this.commonProps = this.getCommonProps());

    // $FlowFixMe
    const transitionIn = this.props.in;

    // forward props to modal for use in internal components
    const modalProps: ModalPropsForCarousel = {
      allowFullscreen,
      isFullscreen,
      onClose: this.handleClose,
      toggleFullscreen: this.toggleFullscreen,
    };

    // augment user carousel with modal props
    const carouselComponent: CarouselType = cloneElement(children, {
      isModal: true,
      modalProps,
    });

    return (
      <Fullscreen enabled={isFullscreen} onChange={this.handleFullscreenChange}>
        <Fade {...commonProps} component={Blanket} in={transitionIn} />
        <SlideUp
          {...commonProps}
          component={Positioner}
          in={transitionIn}
          innerProps={{
            innerRef: this.getPositioner,
            onClick: this.handleBackdropClick,
          }}
          onEntered={this.modalDidMount}
          onExited={this.modalWillUnmount}
        >
          <Dialog {...commonProps}>{carouselComponent}</Dialog>
          <ScrollLock />
        </SlideUp>
      </Fullscreen>
    );
  }
}
export default Modal;
export type ModalType = typeof Modal;
