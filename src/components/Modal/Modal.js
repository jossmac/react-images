// @flow
// @jsx glam
import React, { cloneElement, Component } from 'react';
import glam from 'glam';
import Fullscreen from 'react-full-screen';
import ScrollLock from 'react-scrolllock';
import focusStore from 'a11y-focus-store';
import {
  defaultModalComponents,
  type ModalComponents,
} from '../defaultComponents';
import { Fade, SlideUp } from './Animation';
import { type CarouselType } from '../Carousel';
import { defaultModalStyles, type ModalStylesConfig } from '../../styles';
import { isTouch, className } from '../../utils';

type MouseOrKeyboardEvent = MouseEvent | KeyboardEvent;
export type CloseType = (event: MouseOrKeyboardEvent) => void;
export type ModalProps = {
  allowFullscreen: boolean,
  isFullscreen: boolean,
  onClose: CloseType,
  toggleFullscreen: any => void,
};

export type Props = {
  /* Enable/disable the ability to "fullscreen" the dialog */
  allowFullscreen: boolean,
  /* Carousel only supported */
  children: CarouselType,
  /* Enable/disable calling `onClose` when the backdrop is clicked */
  closeOnBackdropClick: boolean,
  /* Enable/disable calling `onClose` when the `esc` key is pressed */
  closeOnEsc: boolean,
  /* Replace any of the modal components */
  components?: ModalComponents,
  /*
    Show the component; triggers the enter or exit states
    NOTE: provided by TransitionGroup, NOT supplied by the user
  */
  in: boolean,
  /* Function called to request close of the modal */
  onClose: CloseType,
  /* Style modifier methods */
  styles: ModalStylesConfig,
};
type State = { isFullscreen: boolean };
const defaultProps = {
  allowFullscreen: !isTouch(),
  closeOnBackdropClick: true,
  closeOnEsc: true,
  styles: {},
};
class Modal extends Component<Props, State> {
  commonProps: any; // TODO
  components: ModalComponents;

  static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);

    this.cacheComponents(props.components);

    this.state = { isFullscreen: false };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.components !== this.props.components) {
      this.cacheComponents(nextProps.components);
    }
  }

  // emulate `componentDidMount` & `componentWillUnmount`
  // called on complete of enter & exit transitions respectively
  modalDidMount = () => {
    document.addEventListener('keyup', this.handleKeyUp);
    focusStore.storeFocus();
  };
  modalWillUnmount = () => {
    document.removeEventListener('keyup', this.handleKeyUp);
    focusStore.restoreFocus();
  };

  cacheComponents = (comps?: ModalComponents) => {
    this.components = defaultModalComponents(comps);
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

    if (!event.target.classList.contains(className('view')) || !closeOnBackdropClick) return;

    this.handleClose(event);
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
    const base = defaultModalStyles[key](props);
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
    const { Blanket, Positioner, Dialog } = this.components;
    const { allowFullscreen, children } = this.props;
    const { isFullscreen } = this.state;
    const commonProps = (this.commonProps = this.getCommonProps());

    // $FlowFixMe
    const transitionIn = this.props.in;

    // forward props to modal for use in internal components
    const modalProps: ModalProps = {
      allowFullscreen,
      isFullscreen,
      onClose: this.handleClose,
      toggleFullscreen: this.toggleFullscreen,
    };

    // augment user carousel with modal props
    // $FlowFixMe
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
